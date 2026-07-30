import ebooksData from "@/content/ebooks";
import { NextResponse } from "next/server";

// Base URL for your site
const siteUrl = 'https://clickmastersapplicationdevelopment.com';

interface EbookPage {
  url: string;
  meta?: {
    title?: string;
    description?: string;
  };
  title?: string;
  updatedAt?: string;
}

export async function GET() {
  // Get all ebook URLs from the data with proper typing
  const ebookUrls: string[] = ebooksData.pages.map((page: EbookPage) => {
    // Clean up the URL (remove leading/trailing slashes and ensure proper format)
    const cleanUrl: string = page.url
      .replace(/^\/+|\/+$/g, '')
      .replace('ebooks/', '');
    return `${siteUrl}/ebooks/${cleanUrl}`;
  });

  // Add the main ebooks page manually
  const allUrls: string[] = [
    `${siteUrl}/ebooks`, // Main ebooks page
    ...ebookUrls, // All individual ebook pages
  ];

  // Get current date in YYYY-MM-DD format
  const today: string = new Date().toISOString().split('T')[0];

  // Generate the sitemap XML with all ebook URLs
  const xml: string = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map((url: string) => `  <url>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${url === `${siteUrl}/ebooks` ? 'weekly' : 'monthly'}</changefreq>
    <priority>${url === `${siteUrl}/ebooks` ? '0.7' : '0.5'}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, must-revalidate',
    },
  });
}