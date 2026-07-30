import locationData from "@/content/locations";
import { NextResponse } from "next/server";

// Base URL for your site
const siteUrl = 'https://clickmastersapplicationdevelopment.com';

interface LocationPage {
  url: string;
  meta?: {
    title?: string;
    description?: string;
  };
  title?: string;
  updatedAt?: string;
}

export async function GET() {
  // Get all location URLs from the data with proper typing
  const locationUrls: string[] = locationData.pages.map((page: LocationPage) => {
    // Clean up the URL (remove leading/trailing slashes and ensure proper format)
    const cleanUrl: string = page.url
      .replace(/^\/+|\/+$/g, '')
      .replace('locations/', '');
    return `${siteUrl}/locations/${cleanUrl}`;
  });

  // Add the main locations page manually
  const allUrls: string[] = [
    `${siteUrl}/locations`, // Main locations page
    ...locationUrls, // All individual location pages
  ];

  // Get current date in YYYY-MM-DD format
  const today: string = new Date().toISOString().split('T')[0];

  // Generate the sitemap XML with all location URLs
  const xml: string = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map((url: string) => `  <url>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${url === `${siteUrl}/locations` ? 'weekly' : 'monthly'}</changefreq>
    <priority>${url === `${siteUrl}/locations` ? '0.6' : '0.5'}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, must-revalidate',
    },
  });
}