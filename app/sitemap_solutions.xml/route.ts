import solutionData from "@/content/solutions";
import { NextResponse } from "next/server";

// Base URL for your site
const siteUrl = 'https://clickmastersapplicationdevelopment.com';

interface SolutionPage {
  url: string;
  meta?: {
    title?: string;
    description?: string;
  };
  title?: string;
  updatedAt?: string;
}

export async function GET() {
  // Get all solution URLs from the data with proper typing
  const solutionUrls: string[] = solutionData.pages.map((page: SolutionPage) => {
    // Clean up the URL (remove leading/trailing slashes and ensure proper format)
    const cleanUrl: string = page.url
      .replace(/^\/+|\/+$/g, '')
      .replace('solutions/', '');
    return `${siteUrl}/solutions/${cleanUrl}`;
  });

  // Add the main solutions page manually
  const allUrls: string[] = [
    `${siteUrl}/solutions`, // Main solutions page
    ...solutionUrls, // All individual solution pages
  ];

  // Get current date in YYYY-MM-DD format
  const today: string = new Date().toISOString().split('T')[0];

  // Generate the sitemap XML with all solution URLs
  const xml: string = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map((url: string) => `  <url>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${url === `${siteUrl}/solutions` ? 'daily' : 'weekly'}</changefreq>
    <priority>${url === `${siteUrl}/solutions` ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, must-revalidate',
    },
  });
}