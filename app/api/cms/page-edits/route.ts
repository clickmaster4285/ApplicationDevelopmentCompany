import { getPageEdits } from "@/lib/cms/client";
import type { PageEditInstruction } from "@/lib/cms/types";

// Same-origin proxy for B2 so the browser never talks to the ERP directly
// (keeps the site's CSP intact). Always 200: { edits: null } means "leave the
// page untouched".
//
// Live: never cached by the browser/CDN or the Next.js data cache, so CRM
// edits reach visitors within one client poll (see ErpPageEdits). A tiny
// in-process cache coalesces many visitors polling the same path into at most
// one ERP round-trip per LIVE_CACHE_MS.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const HEADERS = { "Cache-Control": "no-store, max-age=0" };
const LIVE_CACHE_MS = 2000;
const LIVE_CACHE_MAX_ENTRIES = 500;

type Body = { edits: { version: number | string | null; instructions: PageEditInstruction[] } | null };

const liveCache = new Map<string, { at: number; promise: Promise<Body> }>();

function load(path: string): Promise<Body> {
  const hit = liveCache.get(path);
  if (hit && Date.now() - hit.at < LIVE_CACHE_MS) return hit.promise;

  const promise = getPageEdits(path, true)
    .then<Body>((edits) => ({
      edits: edits && edits.instructions.length > 0 ? { version: edits.version ?? null, instructions: edits.instructions } : null,
    }))
    .catch(() => {
      liveCache.delete(path);
      return { edits: null };
    });

  if (liveCache.size >= LIVE_CACHE_MAX_ENTRIES) liveCache.clear();
  liveCache.set(path, { at: Date.now(), promise });
  return promise;
}

export async function GET(request: Request) {
  const path = new URL(request.url).searchParams.get("path") ?? "/";
  if (path.length > 512) return Response.json({ edits: null }, { headers: HEADERS });
  return Response.json(await load(path), { headers: HEADERS });
}
