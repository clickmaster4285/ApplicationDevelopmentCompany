import technologiesData from "@/content/technologies";
import { contentPagePaths, sitemapResponse } from "@/lib/sitemap";

export async function GET() {
  return sitemapResponse(contentPagePaths(technologiesData.pages));
}
