// app/resources/[services]/[...slug]/page.tsx

import resourcesData from "@/content/resources";
import { Metadata } from "next";
import { canonicalUrl } from "@/lib/site";
import { limitSeoText } from "@/lib/seo";
import {
  FAQSection,
  CTASection,
  StructuredData,
  FAQSchema,
  MainContent,
} from "@/components/shared/IndustryServicePage";
import { extractFAQs } from "@/components/shared/IndustryServicePageUtils";
import { HeroHeader } from "@/components/shared/HeroHeader";
import { RelatedPages } from "@/components/shared/RelatedPages";
import { cmsMetadataOr, renderCmsPageOrNotFound } from "@/components/cms/CmsRoute";
import { withEditedSeo } from "@/lib/cms/metadata";
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
      services: segments[0] || "", // "ai-development"
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
  const cmsPath = `/resources/${services}/${slug.join("/")}`;

  // Join the segments back to match the URL pattern
  const fullSlug = `${services}/${slug.join("/")}`;

  const pageData = resourcesData.pages.find((page: any) => {
    const cleanUrl = page.url
      .replace(/^\/+|\/+$/g, "")
      .replace("resources/", "");
    return cleanUrl === fullSlug;
  });

  if (!pageData) {
    return cmsMetadataOr(cmsPath, {
      title: "Resource Not Found",
      description: "The requested resource page could not be found.",
    });
  }

  return withEditedSeo(cmsPath, {
    title: limitSeoText(pageData.meta.title, 60),
    description: limitSeoText(pageData.meta.description, 160),
    openGraph: {
      title: limitSeoText(pageData.meta.title, 60),
      description: limitSeoText(pageData.meta.description, 160),
      url: canonicalUrl(pageData.url),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: limitSeoText(pageData.meta.title, 60),
      description: limitSeoText(pageData.meta.description, 160),
    },
    alternates: {
      canonical: canonicalUrl(pageData.url),
    },
  });
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
    return renderCmsPageOrNotFound(`/resources/${services}/${slug.join("/")}`);
  }

  // Extract FAQs directly from pageData
  const faqs = extractFAQs(pageData);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white/20">
      <HeroHeader pageData={pageData} type="Resource" />
      <MainContent pageData={pageData} />
      <FAQSection pageData={pageData} />
      <CTASection pageData={pageData} />
      <RelatedPages url={pageData.url} />
      <StructuredData pageData={pageData} />
      <FAQSchema faqs={faqs} />
    </div>
  );
}
