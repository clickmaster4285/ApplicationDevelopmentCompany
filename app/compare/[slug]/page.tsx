// app/compare/[slug]/page.tsx
import compareData from "@/content/compare";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  FAQSection,
  CTASection,
  StructuredData,
  FAQSchema,
  extractFAQs,
  MainContent,
  type PageData,
} from "@/components/shared/IndustryServicePage";
import { HeroHeader } from "@/components/shared/HeroHeader";

// Generate static params
export async function generateStaticParams() {
  return compareData.pages.map((page: PageData) => ({
    slug: page.url
      .replace(/^\/+|\/+$/g, "") // Remove leading/trailing slashes
      .replace("compare/", ""), // Remove the compare/ prefix
  }));
}

// Generate metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const pageData = compareData.pages.find((page: PageData) => {
    const cleanUrl = page.url.replace(/^\/+|\/+$/g, "").replace("compare/", "");
    return cleanUrl === slug;
  });

  if (!pageData) {
    return {
      title: "Comparison Not Found",
      description: "The requested comparison page could not be found.",
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
export default async function ComparePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const pageData = compareData.pages.find((page: PageData) => {
    const cleanUrl = page.url.replace(/^\/+|\/+$/g, "").replace("compare/", "");
    return cleanUrl === slug;
  });

  if (!pageData) {
    notFound();
  }

  // Extract FAQs directly from pageData
  const faqs = extractFAQs(pageData);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white/20">
      <HeroHeader pageData={pageData} type="Compare" />
      <MainContent pageData={pageData} />
      <FAQSection pageData={pageData} />
      <CTASection pageData={pageData} />
      <StructuredData pageData={pageData} />
      <FAQSchema faqs={faqs} />
    </div>
  );
}
