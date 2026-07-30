import resourcesData from "@/content/resources";
import { NextResponse } from "next/server";

// Base URL for your site
const siteUrl = 'https://clickmastersapplicationdevelopment.com';

interface ResourcePage {
  url: string;
  meta?: {
    title?: string;
    description?: string;
  };
  title?: string;
  updatedAt?: string;
}

export async function GET() {
  // Get all resource URLs from the data with proper typing
  const resourceUrls: string[] = resourcesData.pages.map((page: ResourcePage) => {
    // Clean up the URL (remove leading/trailing slashes)
    const cleanUrl: string = page.url.replace(/^\/+|\/+$/g, '');
    return `${siteUrl}/${cleanUrl}`;
  });

  // Add the main resources page manually
  const allUrls: string[] = [
    `${siteUrl}/resources`, // Main resources page
    ...resourceUrls, // All individual resource pages (including nested ones)
  ];

  // Get current date in YYYY-MM-DD format
  const today: string = new Date().toISOString().split('T')[0];

  // Generate the sitemap XML with all resource URLs
  const xml: string = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map((url: string) => {
  // Determine priority and changefreq based on URL depth
  const urlPath = url.replace(siteUrl, '');
  const depth = urlPath.split('/').filter(Boolean).length;
  
  let priority = '0.6';
  let changefreq = 'weekly';
  
  if (urlPath === '/resources') {
    priority = '0.6';
    changefreq = 'weekly';
  } else if (depth === 2) {
    // Top-level resources like /resources/ai-development
    priority = '0.5';
    changefreq = 'monthly';
  } else {
    // Nested resources like /resources/ai-development/ai-agents-vs-rpa
    priority = '0.4';
    changefreq = 'monthly';
  }
  
  return `  <url>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}).join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, must-revalidate',
    },
  });
}