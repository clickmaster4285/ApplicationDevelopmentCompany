# Production deployment (nginx + PM2)

## Why `/_next/static/*` returned 500 and pages returned 502

The site is served by `next start` behind nginx (no CDN): both HTML and
`/_next/static/*` assets come from the Next.js process.

When a deploy runs `next build` **inside the directory the live server is
using**, `.next/` is deleted and rewritten while it serves traffic:

- During the build, asset requests fail (**500**), because the running process
  still holds the old build's state while its files are replaced.
- Even after the build finishes, the old process keeps that state until it
  restarts. Reproduced locally: after rebuilding under a running server, chunk
  files that existed on disk were still not served.
- `pm2 restart` in fork mode (a single process) leaves nginx with no upstream
  for a few seconds (**502**). Any crawler request in that window, such as
  `/industries/biotech` during the audit, gets a 502.

These failures come back after each deploy and go away once the process
restarts. That matches the audit history (seen Nov 5, gone Nov 6, back after
the latest deploy).

## The fix: release directories + rolling reload

`scripts/deploy.sh` (run on the server):

1. Clones the branch into `releases/<timestamp>`. The live release is never touched.
2. `npm ci` + `next build` with `NEXT_DEPLOYMENT_ID=<git sha>`, which turns on
   Next.js version-skew protection.
3. Copies the previous build's static assets into the new build, so cached
   HTML and crawlers holding old chunk URLs still get 200.
4. Starts the new release on a spare port, then runs
   `scripts/verify-deploy.mjs`. If it fails, the deploy aborts and the live site
   is unchanged.
5. Switches the `current` symlink atomically, then runs `pm2 startOrReload`
   (cluster mode restarts workers one at a time, so there is no 502 window).
6. Checks the live port again (and `PUBLIC_URL` if set). If that fails, it
   rolls back automatically.

### One-time server setup

```bash
# 1. Layout
sudo mkdir -p /var/www/clickmasters-app/shared && sudo chown -R $USER /var/www/clickmasters-app
cp /path/to/current/checkout/.env.local /var/www/clickmasters-app/shared/.env.local

# 2. First deploy (builds a release; does not touch the old process yet)
REPO_URL=<git remote url> BRANCH=master PORT=3000 \
  bash /path/to/checkout/scripts/deploy.sh
```

The first deploy starts the new PM2 app `clickmasters-app` on `PORT`. If the
**old** PM2 process is still bound to that port, the new app cannot start.
In a quiet period, stop the old process first. Expect a few seconds of
downtime this one time only:

```bash
pm2 ls                      # find the old app name
pm2 delete <old-app-name>   # frees the port
REPO_URL=<git remote url> bash scripts/deploy.sh
pm2 save && pm2 startup     # survive reboots
```

Later deploys need only `bash /var/www/clickmasters-app/current/scripts/deploy.sh`.

**Never** run `git pull && npm run build` inside `current/` again. That is
the in-place build that causes the 500s.

### nginx

Keep proxying everything to Next.js. Make sure nginx is **not** caching
error responses for `/_next/static/`, and does not point an `alias` at an old
checkout:

```nginx
location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_buffering off;              # App Router streaming
}
```

If an `alias .../.next/static/` block exists, it must point to
`/var/www/clickmasters-app/current/.next/static/`. Then `sudo nginx -t &&
sudo systemctl reload nginx`.

### Verifying (and before every SEO audit)

```bash
node scripts/verify-deploy.mjs https://clickmastersapplicationdevelopment.com                    # smoke
node scripts/verify-deploy.mjs https://clickmastersapplicationdevelopment.com --all --markdown   # every sitemap URL
```

This checks every page and every referenced JS/CSS asset for HTTP 200 and the
right content type. With `--markdown` it also checks for raw Markdown in the
rendered text.
