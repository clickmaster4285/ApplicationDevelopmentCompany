// app/solutions/[slug]/page.tsx
import solutionData from "@/content/solutions";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  FAQSection,
  CTASection,
  StructuredData,
  FAQSchema,
  extractFAQs,
  MainContent,
} from "@/components/shared/IndustryServicePage";
import { HeroHeader } from "@/components/shared/HeroHeader";

// Generate static params
export async function generateStaticParams() {
  return solutionData.pages.map((page: any) => ({
    slug: page.url
      .replace(/^\/+|\/+$/g, "") // Remove leading/trailing slashes
      .replace("solutions/", ""), // Remove the solutions/ prefix
  }));
}

// Generate metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  // Match by checking if the page URL ends with the slug (with or without trailing slash)
  const pageData = solutionData.pages.find((page: any) => {
    const cleanUrl = page.url
      .replace(/^\/+|\/+$/g, "")
      .replace("solutions/", "");
    return cleanUrl === slug;
  });

  if (!pageData) {
    return {
      title: "Solution Not Found",
      description: "The requested solution page could not be found.",
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
export default async function SolutionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Match by checking if the page URL ends with the slug (with or without trailing slash)
  const pageData = solutionData.pages.find((page: any) => {
    const cleanUrl = page.url
      .replace(/^\/+|\/+$/g, "")
      .replace("solutions/", "");
    return cleanUrl === slug;
  });

  if (!pageData) {
    notFound();
  }

  // Extract FAQs from pageData
  const faqs = extractFAQs(pageData);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white/20">
      <HeroHeader pageData={pageData} type="Solution" />
      <MainContent pageData={pageData} />
      <FAQSection pageData={pageData} />
      <CTASection pageData={pageData} />
      <StructuredData pageData={pageData} />
      <FAQSchema faqs={faqs} />
    </div>
  );
}
