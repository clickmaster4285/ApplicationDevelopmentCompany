import servicesData from "@/content/services";
import { NextResponse } from "next/server";

// Base URL for your site
const siteUrl = 'https://clickmastersapplicationdevelopment.com';

interface ServicePage {
  url: string;
  meta?: {
    title?: string;
    description?: string;
  };
  title?: string;
  updatedAt?: string;
}

export async function GET() {
  // Get all service URLs from the data with proper typing
  const serviceUrls: string[] = servicesData.pages.map((page: ServicePage) => {
    // Clean up the URL (remove leading/trailing slashes and ensure proper format)
    const cleanUrl: string = page.url.replace(/^\/+|\/+$/g, '');
    return `${siteUrl}/${cleanUrl}`;
  });

  // Add the main services page manually
  const allUrls: string[] = [
    `${siteUrl}/services`, // Main services page
    ...serviceUrls, // All individual service pages
  ];

  // Get current date in YYYY-MM-DD format
  const today: string = new Date().toISOString().split('T')[0];

  // Generate the sitemap XML with all service URLs
  const xml: string = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map((url: string) => `  <url>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${url === `${siteUrl}/services` ? 'daily' : 'weekly'}</changefreq>
    <priority>${url === `${siteUrl}/services` ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, must-revalidate',
    },
  });
}