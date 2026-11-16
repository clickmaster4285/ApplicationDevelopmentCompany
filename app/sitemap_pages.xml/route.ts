import { NextResponse } from "next/server";
import aboutData from "@/content/about";
import frameworksData from "@/content/frameworks";
import { directoryLetters } from "@/lib/location-directory";
import { contentPagePaths } from "@/lib/sitemap";

export async function GET() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://clickmastersapplicationdevelopment.com";

  // Section hubs (/blog, /solutions, /industries, …) are listed in their own
  // section sitemap, so they are not repeated here.
  const pages = [
    "",
    "about",
    "contact",
    "process",
    "privacy",
    "terms",
    // Indexable pages not covered by a section sitemap.
    ...contentPagePaths(aboutData.pages).map((path) => path.slice(1)),
    ...contentPagePaths(frameworksData.pages).map((path) => path.slice(1)),
    "locations/directory",
    ...directoryLetters().map((letter) => `locations/directory/${letter.toLowerCase()}`),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${page ? `/${page}` : ""}</loc>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
    },
  });
}