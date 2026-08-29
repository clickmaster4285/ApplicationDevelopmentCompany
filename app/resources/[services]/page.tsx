// app/resources/[services]/page.tsx
import resourcesData from "@/content/resources";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  FAQSection,
  CTASection,
  StructuredData,
  FAQSchema,
  MainContent,
} from "@/components/shared/IndustryServicePage";
import { extractFAQs } from "@/components/shared/IndustryServicePageUtils";
import { HeroHeader } from "@/components/shared/HeroHeader";

// Generate static params
export async function generateStaticParams() {
  // Only generate for single-segment resources
  return resourcesData.pages
    .filter((page: any) => {
      const pathWithoutResources = page.url
        .replace(/^\/+|\/+$/g, "")
        .replace("resources/", "");
      const segments = pathWithoutResources.split("/").filter(Boolean);
      return segments.length === 1; // Only single segment URLs
    })
    .map((page: any) => {
      const pathWithoutResources = page.url
        .replace(/^\/+|\/+$/g, "")
        .replace("resources/", "");
      return {
        services: pathWithoutResources,
      };
    });
}

// Generate metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ services: string }>;
}): Promise<Metadata> {
  const { services } = await params;

  const pageData = resourcesData.pages.find((page: any) => {
    const cleanUrl = page.url
      .replace(/^\/+|\/+$/g, "")
      .replace("resources/", "");
    return cleanUrl === services;
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
      url: `https://clickmastersapplicationdevelopment.com${pageData.url}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageData.meta.title,
      description: pageData.meta.description,
    },
    alternates: {
      canonical: `https://clickmastersapplicationdevelopment.com${pageData.url}`,
    },
  };
}

// Main page component
export default async function ResourcesPage({
  params,
}: {
  params: Promise<{ services: string }>;
}) {
  const { services } = await params;

  // services is a string like "ai-development"
  // Find the page data
  const pageData = resourcesData.pages.find((page: any) => {
    const cleanUrl = page.url
      .replace(/^\/+|\/+$/g, "")
      .replace("resources/", "");
    return cleanUrl === services;
  });

  if (!pageData) {
    notFound();
  }

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
