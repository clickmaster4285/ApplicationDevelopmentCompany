// Shared builder for the per-section XML sitemaps (same output format as the
// existing sitemap_*.xml routes).
const siteUrl = "https://clickmastersapplicationdevelopment.com";

export function contentPagePaths(pages: { url: string }[]): string[] {
  return pages.map((page) => `/${page.url.replace(/^\/+|\/+$/g, "")}`);
}

export function sitemapResponse(
  paths: string[],
  { hub }: { hub?: string } = {},
): Response {
  const today = new Date().toISOString().split("T")[0];
  const unique = Array.from(new Set(hub ? [hub, ...paths] : paths));
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${unique
  .map(
    (path) => `  <url>
    <loc>${siteUrl}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${path === hub ? "daily" : "weekly"}</changefreq>
    <priority>${path === hub ? "1.0" : "0.8"}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}
