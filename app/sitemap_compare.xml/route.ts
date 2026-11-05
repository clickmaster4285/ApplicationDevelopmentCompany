import compareData from "@/content/compare";
import { NextResponse } from "next/server";

const siteUrl = "https://clickmastersapplicationdevelopment.com";

export async function GET() {
  const urls = [
    `${siteUrl}/compare`,
    ...compareData.pages.map((page) => {
      const path = page.url.replace(/^\/+|\/+$/g, "");
      return `${siteUrl}/${path}`;
    }),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url}</loc>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}
