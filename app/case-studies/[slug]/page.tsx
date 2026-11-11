// app/case-studies/[slug]/page.tsx
import caseStudiesData from "@/content/case-studies";
import { Metadata } from "next";
import { canonicalUrl } from "@/lib/site";
import { limitSeoText } from "@/lib/seo";
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
import { cmsMetadataOr, renderCmsPageOrNotFound } from "@/components/cms/CmsRoute";
import { withEditedSeo } from "@/lib/cms/metadata";

// Generate static params
export async function generateStaticParams() {
  return caseStudiesData.pages.map((page: PageData) => ({
    slug: page.url
      .replace(/^\/+|\/+$/g, "") // Remove leading/trailing slashes
      .replace("case-studies/", ""), // Remove the case-studies/ prefix
  }));
}

// Generate metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cmsPath = `/case-studies/${slug}`;

  const pageData = caseStudiesData.pages.find((page: PageData) => {
    const cleanUrl = page.url
      .replace(/^\/+|\/+$/g, "")
      .replace("case-studies/", "");
    return cleanUrl === slug;
  });

  if (!pageData) {
    return cmsMetadataOr(cmsPath, {
      title: "Case Study Not Found",
      description: "The requested case study could not be found.",
    });
  }

  return withEditedSeo(cmsPath, {
    title: limitSeoText(pageData.meta.title, 60),
    description: limitSeoText(pageData.meta.description, 160),
    openGraph: {
      title: limitSeoText(pageData.meta.title, 60),
      description: limitSeoText(pageData.meta.description, 160),
      url: canonicalUrl(pageData.url),
      type: "article",
      publishedTime: pageData.caseStudy?.timeline || undefined,
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
export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const pageData = caseStudiesData.pages.find((page: PageData) => {
    const cleanUrl = page.url
      .replace(/^\/+|\/+$/g, "")
      .replace("case-studies/", "");
    return cleanUrl === slug;
  });

  if (!pageData) {
    return renderCmsPageOrNotFound(`/case-studies/${slug}`);
  }

  // Extract FAQs directly from pageData
  const faqs = extractFAQs(pageData);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white/20">
      <HeroHeader pageData={pageData} type="Case Study" />
      <MainContent pageData={pageData} />
      <FAQSection pageData={pageData} />
      <CTASection pageData={pageData} />
      <StructuredData pageData={pageData} />
      <FAQSchema faqs={faqs} />
    </div>
  );
}
