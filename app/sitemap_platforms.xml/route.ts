import platformsData from "@/content/platforms";
import { contentPagePaths, sitemapResponse } from "@/lib/sitemap";

export async function GET() {
  return sitemapResponse(contentPagePaths(platformsData.pages), { hub: "/platforms" });
}
