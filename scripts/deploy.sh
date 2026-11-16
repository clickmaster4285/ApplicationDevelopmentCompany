#!/usr/bin/env bash
# Zero-downtime, release-based production deploy (Linux server, PM2 + nginx).
#
# Why: running `next build` inside the directory the live server is reading
# wipes and rewrites .next/ while it is serving traffic. During that window
# /_next/static/* requests fail (HTTP 500), and a `pm2 restart` afterwards
# leaves nginx with no upstream (HTTP 502). This script builds each release in
# its own directory, verifies it, then switches atomically.
#
# Layout (APP_ROOT defaults to /var/www/clickmasters-app):
#   $APP_ROOT/shared/.env.local     production env file (create once)
#   $APP_ROOT/releases/<timestamp>  one directory per deploy
#   $APP_ROOT/current -> releases/<timestamp>   (PM2 cwd, see ecosystem.config.cjs)
#
# Usage (on the server):
#   REPO_URL=git@github.com:<org>/<repo>.git BRANCH=master bash scripts/deploy.sh
#
# Env: APP_ROOT, REPO_URL (default: origin of current release), BRANCH (master),
#      PORT (3000), SMOKE_PORT (3999), KEEP_RELEASES (5), PM2_APP_NAME,
#      PUBLIC_URL (optional; verified after the switch).
set -Eeuo pipefail

APP_ROOT="${APP_ROOT:-/var/www/clickmasters-app}"
BRANCH="${BRANCH:-master}"
PORT="${PORT:-3000}"
SMOKE_PORT="${SMOKE_PORT:-3999}"
KEEP_RELEASES="${KEEP_RELEASES:-5}"
export APP_ROOT PORT

RELEASES="$APP_ROOT/releases"
SHARED="$APP_ROOT/shared"
CURRENT="$APP_ROOT/current"
STAMP="$(date +%Y%m%d%H%M%S)"
RELEASE="$RELEASES/$STAMP"
SMOKE_PID=""

log() { printf '\n[deploy %s] %s\n' "$(date +%H:%M:%S)" "$*"; }
cleanup() { [ -n "$SMOKE_PID" ] && kill "$SMOKE_PID" 2>/dev/null || true; }
trap cleanup EXIT

mkdir -p "$RELEASES" "$SHARED"

# One deploy at a time.
exec 9>"$APP_ROOT/.deploy.lock"
flock -n 9 || { echo "Another deploy is running." >&2; exit 1; }

PREVIOUS=""
if [ -L "$CURRENT" ]; then PREVIOUS="$(readlink -f "$CURRENT")"; fi

if [ -z "${REPO_URL:-}" ]; then
  [ -n "$PREVIOUS" ] || { echo "Set REPO_URL for the first deploy." >&2; exit 1; }
  REPO_URL="$(git -C "$PREVIOUS" remote get-url origin)"
fi

[ -f "$SHARED/.env.local" ] || { echo "Missing $SHARED/.env.local (production env)." >&2; exit 1; }

log "Cloning $BRANCH into $RELEASE"
git clone --depth 1 --branch "$BRANCH" "$REPO_URL" "$RELEASE"
ln -sfn "$SHARED/.env.local" "$RELEASE/.env.local"
cd "$RELEASE"
GIT_SHA="$(git rev-parse --short HEAD)"

log "Installing dependencies"
npm ci --no-audit --no-fund

log "Building $GIT_SHA (the live site keeps serving the previous release)"
# Enables Next.js version-skew protection: clients on an old build hard-reload
# instead of requesting assets/actions that no longer exist.
NEXT_DEPLOYMENT_ID="$GIT_SHA" npm run build

# Record this build's own assets before merging older ones in.
(cd .next/static && find . -type f) > .next/own-static-files.txt

if [ -n "$PREVIOUS" ] && [ -d "$PREVIOUS/.next/static" ]; then
  log "Carrying over previous release's static assets (for cached HTML / crawlers)"
  # Content-hashed filenames never collide; -n never overwrites new files.
  # Only the previous build's own files, so old assets don't pile up forever.
  if [ -f "$PREVIOUS/.next/own-static-files.txt" ]; then
    (cd "$PREVIOUS/.next/static" && xargs -a "$PREVIOUS/.next/own-static-files.txt" -d '\n' \
      cp -n --parents -t "$RELEASE/.next/static/")
  else
    cp -rn "$PREVIOUS/.next/static/." "$RELEASE/.next/static/"
  fi
fi

log "Smoke-testing the new release on port $SMOKE_PORT"
PORT="$SMOKE_PORT" NODE_ENV=production node node_modules/next/dist/bin/next start -p "$SMOKE_PORT" >"$RELEASE/smoke.log" 2>&1 &
SMOKE_PID=$!
for _ in $(seq 1 60); do
  curl -fsS -o /dev/null "http://127.0.0.1:$SMOKE_PORT/" && break
  sleep 1
done
if ! node scripts/verify-deploy.mjs "http://127.0.0.1:$SMOKE_PORT"; then
  echo "Smoke test failed; live site untouched. Log: $RELEASE/smoke.log" >&2
  exit 1
fi
kill "$SMOKE_PID" 2>/dev/null || true
wait "$SMOKE_PID" 2>/dev/null || true
SMOKE_PID=""

log "Activating release $STAMP"
ln -sfn "$RELEASE" "$APP_ROOT/current.tmp"
mv -Tf "$APP_ROOT/current.tmp" "$CURRENT"

# Rolling reload (cluster mode): one worker at a time, no 502s.
pm2 startOrReload "$RELEASE/ecosystem.config.cjs" --update-env
pm2 save >/dev/null

rollback() {
  [ -n "$PREVIOUS" ] || return 0
  echo "Post-deploy verification failed; rolling back to $PREVIOUS" >&2
  ln -sfn "$PREVIOUS" "$APP_ROOT/current.tmp"
  mv -Tf "$APP_ROOT/current.tmp" "$CURRENT"
  pm2 startOrReload "$PREVIOUS/ecosystem.config.cjs" --update-env || true
  exit 1
}

sleep 3
node scripts/verify-deploy.mjs "http://127.0.0.1:$PORT" || rollback
if [ -n "${PUBLIC_URL:-}" ]; then
  node scripts/verify-deploy.mjs "$PUBLIC_URL" || rollback
fi

log "Pruning old releases (keeping $KEEP_RELEASES)"
ls -1dt "$RELEASES"/*/ | tail -n +"$((KEEP_RELEASES + 1))" | while read -r old; do
  [ "$(readlink -f "$old")" = "$(readlink -f "$CURRENT")" ] || rm -rf "$old"
done

log "Deployed $GIT_SHA ($STAMP)"
