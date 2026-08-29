// app/cost/[slug]/page.tsx
import costData from "@/content/cost";
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
  return costData.pages.map((page: any) => ({
    slug: page.url
      .replace(/^\/+|\/+$/g, "") // Remove leading/trailing slashes
      .replace("cost/", ""), // Remove the cost/ prefix
  }));
}

// Generate metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const pageData = costData.pages.find((page: any) => {
    const cleanUrl = page.url.replace(/^\/+|\/+$/g, "").replace("cost/", "");
    return cleanUrl === slug;
  });

  if (!pageData) {
    return {
      title: "Cost Guide Not Found",
      description: "The requested cost guide page could not be found.",
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
export default async function CostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const pageData = costData.pages.find((page: any) => {
    const cleanUrl = page.url.replace(/^\/+|\/+$/g, "").replace("cost/", "");
    return cleanUrl === slug;
  });

  if (!pageData) {
    notFound();
  }

  // Extract FAQs directly from pageData
  const faqs = extractFAQs(pageData);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white/20">
      <HeroHeader pageData={pageData} type="Cost" />
      <MainContent pageData={pageData} />
      <FAQSection pageData={pageData} />
      <CTASection pageData={pageData} />
      <StructuredData pageData={pageData} />
      <FAQSchema faqs={faqs} />
    </div>
  );
}
