import costData from "@/content/cost";
import { contentPagePaths, sitemapResponse } from "@/lib/sitemap";

export async function GET() {
  return sitemapResponse(contentPagePaths(costData.pages));
}
