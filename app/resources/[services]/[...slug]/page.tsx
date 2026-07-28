// app/resources/[services]/[...slug]/page.tsx

import resourcesData from "@/content/resources";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  FAQSection,
  CTASection,
  StructuredData,
  FAQSchema,
  extractFAQs,
  MainContent,
  HeroHeader,
} from "@/components/shared/IndustryServicePage";

// Generate static params
export async function generateStaticParams() {
  return resourcesData.pages.map((page: any) => {
    // Get the path segments after "resources/"
    const pathWithoutResources = page.url
      .replace(/^\/+|\/+$/g, "") // Remove leading/trailing slashes
      .replace("resources/", ""); // Remove the resources/ prefix
    
    const segments = pathWithoutResources.split("/").filter(Boolean);
    
    // For URL: /resources/ai-development/ai-agents-vs-rpa
    // segments = ["ai-development", "ai-agents-vs-rpa"]
    
    return {
      services: segments[0] || "",  // "ai-development"
      slug: segments.slice(1) || [], // ["ai-agents-vs-rpa"] (must be array for catch-all)
    };
  });
}

// Generate metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ services: string; slug: string[] }>;
}): Promise<Metadata> {
  const { services, slug } = await params;

  // Join the segments back to match the URL pattern
  const fullSlug = `${services}/${slug.join("/")}`;
  
  const pageData = resourcesData.pages.find((page: any) => {
    const cleanUrl = page.url
      .replace(/^\/+|\/+$/g, "")
      .replace("resources/", "");
    return cleanUrl === fullSlug;
  });

  if (!pageData) {
    return {
      title: "Resource Not Found",
      description: "The requested resource page could not be found.",
    };
  }

  return {
    title: pageData.meta.title,
    description: pageData.meta.description,
    openGraph: {
      title: pageData.meta.title,
      description: pageData.meta.description,
      url: `https://clickmasters.com${pageData.url}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageData.meta.title,
      description: pageData.meta.description,
    },
    alternates: {
      canonical: `https://clickmasters.com${pageData.url}`,
    },
  };
}

// Main page component
export default async function ResourcesPage({
  params,
}: {
  params: Promise<{ services: string; slug: string[] }>;
}) {
  const { services, slug } = await params;

  // Join the segments back to match the URL pattern
  const fullSlug = `${services}/${slug.join("/")}`;

  const pageData = resourcesData.pages.find((page: any) => {
    const cleanUrl = page.url
      .replace(/^\/+|\/+$/g, "")
      .replace("resources/", "");
    return cleanUrl === fullSlug;
  });

  if (!pageData) {
    notFound();
  }

  // Extract FAQs directly from pageData
  const faqs = extractFAQs(pageData);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white/20">
      <HeroHeader pageData={pageData} type="Resource" />
      <MainContent pageData={pageData} />
      <FAQSection pageData={pageData} />
      <CTASection pageData={pageData} />
      <StructuredData pageData={pageData} />
      <FAQSchema faqs={faqs} />
    </div>
  );
}