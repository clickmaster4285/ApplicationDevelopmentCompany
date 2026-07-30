import caseStudiesData from "@/content/case-studies";
import { NextResponse } from "next/server";

// Base URL for your site
const siteUrl = 'https://clickmastersapplicationdevelopment.com';

interface CaseStudyPage {
  url: string;
  meta?: {
    title?: string;
    description?: string;
  };
  caseStudy?: {
    timeline?: string;
    client?: string;
    industry?: string;
  };
  title?: string;
  updatedAt?: string;
}

export async function GET() {
  // Get all case study URLs from the data with proper typing
  const caseStudyUrls: string[] = caseStudiesData.pages.map((page: CaseStudyPage) => {
    // Clean up the URL (remove leading/trailing slashes and ensure proper format)
    const cleanUrl: string = page.url
      .replace(/^\/+|\/+$/g, '')
      .replace('case-studies/', '');
    return `${siteUrl}/case-studies/${cleanUrl}`;
  });

  // Add the main case studies page manually
  const allUrls: string[] = [
    `${siteUrl}/case-studies`, // Main case studies page
    ...caseStudyUrls, // All individual case study pages
  ];

  // Get current date in YYYY-MM-DD format
  const today: string = new Date().toISOString().split('T')[0];

  // Generate the sitemap XML with all case study URLs
  const xml: string = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map((url: string) => `  <url>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${url === `${siteUrl}/case-studies` ? 'weekly' : 'monthly'}</changefreq>
    <priority>${url === `${siteUrl}/case-studies` ? '0.8' : '0.7'}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, must-revalidate',
    },
  });
}