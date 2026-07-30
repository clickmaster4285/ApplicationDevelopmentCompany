// app/blog/[slug]/page.tsx
import blogsData from "@/content/blogs";
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
  return blogsData.pages.map((page: any) => ({
    slug: page.url
      .replace(/^\/+|\/+$/g, "") // Remove leading/trailing slashes
      .replace("blog/", ""), // Remove the blog/ prefix
  }));
}

// Generate metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const pageData = blogsData.pages.find((page: any) => {
    const cleanUrl = page.url.replace(/^\/+|\/+$/g, "").replace("blog/", "");
    return cleanUrl === slug;
  });

  if (!pageData) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: pageData.meta.title,
    description: pageData.meta.description,
    openGraph: {
      title: pageData.meta.title,
      description: pageData.meta.description,
      url: `https://clickmasters.com${pageData.url}`,
      type: "article",
      publishedTime: pageData.blog.publishDate,
      authors: [pageData.blog.author],
      tags: pageData.blog.tags,
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
export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const pageData = blogsData.pages.find((page: any) => {
    const cleanUrl = page.url.replace(/^\/+|\/+$/g, "").replace("blog/", "");
    return cleanUrl === slug;
  });

  if (!pageData) {
    notFound();
  }

  // Extract FAQs directly from pageData
  const faqs = extractFAQs(pageData);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white/20">
      <HeroHeader pageData={pageData} type="Blog" />
      <MainContent pageData={pageData} />
      <FAQSection pageData={pageData} />
      <CTASection pageData={pageData} />
      <StructuredData pageData={pageData} />
      <FAQSchema faqs={faqs} />
    </div>
  );
}
