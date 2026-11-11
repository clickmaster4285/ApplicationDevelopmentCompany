import { getPageEdits } from "@/lib/cms/client";

// Same-origin proxy for B2 so the browser never talks to the ERP directly
// (keeps the site's CSP intact and shares the server's 60s data cache).
// Always 200: { edits: null } means "leave the page untouched".

export const runtime = "nodejs";

const HEADERS = {
  "Cache-Control": "public, max-age=0, s-maxage=60, stale-while-revalidate=60",
};

export async function GET(request: Request) {
  const path = new URL(request.url).searchParams.get("path") ?? "/";
  if (path.length > 512) return Response.json({ edits: null }, { headers: HEADERS });

  try {
    const edits = await getPageEdits(path);
    return Response.json(
      { edits: edits && edits.instructions.length > 0 ? { version: edits.version ?? null, instructions: edits.instructions } : null },
      { headers: HEADERS },
    );
  } catch {
    return Response.json({ edits: null }, { headers: HEADERS });
  }
}
