// app/technologies/[slug]/page.tsx
import techData from "@/content/technologies";
import { notFound } from "next/navigation";
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

// Generate static params
export async function generateStaticParams() {
  return techData.pages.map((page: any) => ({
    slug: page.url
      .replace(/^\/+|\/+$/g, "") // Remove leading/trailing slashes
      .replace("technologies/", ""), // Remove the technologies/ prefix
  }));
}

// Generate metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const pageData = techData.pages.find((page: any) => {
    const cleanUrl = page.url
      .replace(/^\/+|\/+$/g, "")
      .replace("technologies/", "");
    return cleanUrl === slug;
  });

  if (!pageData) {
    return {
      title: "Technology Not Found",
      description: "The requested technology page could not be found.",
    };
  }

  return {
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
  };
}

// Main page component
export default async function TechPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const pageData = techData.pages.find((page: any) => {
    const cleanUrl = page.url
      .replace(/^\/+|\/+$/g, "")
      .replace("technologies/", "");
    return cleanUrl === slug;
  });

  if (!pageData) {
    notFound();
  }

  // Extract FAQs directly from pageData
  const faqs = extractFAQs(pageData);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white/20">
      <HeroHeader pageData={pageData} type="Technology" />
      <MainContent pageData={pageData} />
      <FAQSection pageData={pageData} />
      <CTASection pageData={pageData} />
      <RelatedPages url={pageData.url} />
      <StructuredData pageData={pageData} />
      <FAQSchema faqs={faqs} />
    </div>
  );
}
