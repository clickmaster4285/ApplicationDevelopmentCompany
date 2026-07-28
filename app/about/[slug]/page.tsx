// app/about/[slug]/page.tsx
import aboutData from '@/content/about';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import {
  HeroHeader,
  MainContent,
  FAQSection,
  CTASection,
  StructuredData,
  FAQSchema,
  extractFAQs,
  cleanPageContent,
  type PageData,
  type FAQ,
} from '@/components/shared/IndustryServicePage';

// Generate static params
export async function generateStaticParams() {
  const params = aboutData.pages.map((page) => {
    const slug = page.url
      .replace(/^\/+/, '')
      .replace(/\/+$/, '')
      .replace('about/', '');
    return { slug };
  });
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  
  const pageData = aboutData.pages.find(page => {
    const pageSlug = page.url
      .replace(/^\/+/, '')
      .replace(/\/+$/, '')
      .replace('about/', '');
    return pageSlug === slug;
  });

  if (!pageData) {
    return {
      title: 'Industry Not Found',
      description: 'The requested industry page could not be found.',
    };
  }

  return {
    title: pageData.meta.title,
    description: pageData.meta.description,
    openGraph: {
      title: pageData.meta.title,
      description: pageData.meta.description,
      url: `https://clickmasters.com${pageData.url}`,
      type: 'website',
    },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const pageData = aboutData.pages.find(page => {
    const pageSlug = page.url
      .replace(/^\/+/, '')
      .replace(/\/+$/, '')
      .replace('about/', '');
    return pageSlug === slug;
  });

  if (!pageData) {
    notFound();
  }

  // Clean content
  const cleaned = cleanPageContent(pageData.content);
  
  // Extract FAQs
  const faqs = extractFAQs(cleaned);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white/20">
      <HeroHeader pageData={pageData} type="Industry" />
      <MainContent content={cleaned} />
      {faqs.length > 0 && <FAQSection faqs={faqs} />}
      <CTASection pageData={pageData} />
      <StructuredData pageData={pageData} />
      <FAQSchema faqs={faqs} />
    </div>
  );
}