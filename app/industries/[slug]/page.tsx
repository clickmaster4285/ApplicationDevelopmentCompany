// app/industries/[slug]/page.tsx
import industriesData from "@/content/industries";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  FAQSection,
  CTASection,
  StructuredData,
  FAQSchema,
  MainContent,
  type PageData,
} from "@/components/shared/IndustryServicePage";
import { extractFAQs } from "@/components/shared/IndustryServicePageUtils";
import { HeroHeader } from "@/components/shared/HeroHeader";
// Generate static params
export async function generateStaticParams() {
  return industriesData.pages.map((page: PageData) => ({
    slug: page.url
      .replace(/^\/+|\/+$/g, "") // Remove leading/trailing slashes
      .replace("industries/", ""), // Remove the industries/ prefix
  }));
}

// Generate metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const pageData = industriesData.pages.find((page: PageData) => {
    const cleanUrl = page.url
      .replace(/^\/+|\/+$/g, "")
      .replace("industries/", "");
    return cleanUrl === slug;
  });

  if (!pageData) {
    return {
      title: "Industry Not Found",
      description: "The requested industry page could not be found.",
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
export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const pageData = industriesData.pages.find((page: PageData) => {
    const cleanUrl = page.url
      .replace(/^\/+|\/+$/g, "")
      .replace("industries/", "");
    return cleanUrl === slug;
  });

  if (!pageData) {
    notFound();
  }

  // Extract FAQs directly from pageData
  const faqs = extractFAQs(pageData);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white/20">
      <HeroHeader pageData={pageData} type="Industry" />
      <MainContent pageData={pageData} />
      <FAQSection pageData={pageData} />
      <CTASection pageData={pageData} />
      <StructuredData pageData={pageData} />
      <FAQSchema faqs={faqs} />
    </div>
  );
}
