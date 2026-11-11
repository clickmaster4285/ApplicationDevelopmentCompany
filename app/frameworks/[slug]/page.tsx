// app/frameworks/[slug]/page.tsx
import frameworksData from "@/content/frameworks";
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
  return frameworksData.pages.map((page: PageData) => ({
    slug: page.url
      .replace(/^\/+|\/+$/g, "") // Remove leading/trailing slashes
      .replace("frameworks/", ""), // Remove the frameworks/ prefix
  }));
}

// Generate metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cmsPath = `/frameworks/${slug}`;

  const pageData = frameworksData.pages.find((page: PageData) => {
    const cleanUrl = page.url
      .replace(/^\/+|\/+$/g, "")
      .replace("frameworks/", "");
    return cleanUrl === slug;
  });

  if (!pageData) {
    return cmsMetadataOr(cmsPath, {
      title: "Framework Not Found",
      description: "The requested framework page could not be found.",
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
export default async function FrameworksPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const pageData = frameworksData.pages.find((page: PageData) => {
    const cleanUrl = page.url
      .replace(/^\/+|\/+$/g, "")
      .replace("frameworks/", "");
    return cleanUrl === slug;
  });

  if (!pageData) {
    return renderCmsPageOrNotFound(`/frameworks/${slug}`);
  }

  // Extract FAQs directly from pageData
  const faqs = extractFAQs(pageData);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white/20">
      <HeroHeader pageData={pageData} type="Framework" />
      <MainContent pageData={pageData} />
      <FAQSection pageData={pageData} />
      <CTASection pageData={pageData} />
      <StructuredData pageData={pageData} />
      <FAQSchema faqs={faqs} />
    </div>
  );
}
