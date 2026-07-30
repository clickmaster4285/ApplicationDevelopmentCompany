import blogsData from "@/content/blogs";
import { NextResponse } from "next/server";

// Base URL for your site
const siteUrl = 'https://clickmastersapplicationdevelopment.com';

interface BlogPage {
  url: string;
  meta?: {
    title?: string;
    description?: string;
  };
  blog?: {
    publishDate?: string;
    author?: string;
    tags?: string[];
  };
  title?: string;
  updatedAt?: string;
}

export async function GET() {
  // Get all blog URLs from the data with proper typing
  const blogUrls: string[] = blogsData.pages.map((page: BlogPage) => {
    // Clean up the URL (remove leading/trailing slashes and ensure proper format)
    const cleanUrl: string = page.url
      .replace(/^\/+|\/+$/g, '')
      .replace('blog/', '');
    return `${siteUrl}/blog/${cleanUrl}`;
  });

  // Add the main blog page manually
  const allUrls: string[] = [
    `${siteUrl}/blog`, // Main blog page
    ...blogUrls, // All individual blog pages
  ];

  // Get current date in YYYY-MM-DD format
  const today: string = new Date().toISOString().split('T')[0];

  // Generate the sitemap XML with all blog URLs
  const xml: string = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map((url: string) => `  <url>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${url === `${siteUrl}/blog` ? 'daily' : 'weekly'}</changefreq>
    <priority>${url === `${siteUrl}/blog` ? '0.9' : '0.6'}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, must-revalidate',
    },
  });
}