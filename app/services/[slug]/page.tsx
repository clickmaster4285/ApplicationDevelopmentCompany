// app/services/[slug]/page.tsx
import { servicesData, getServicesByUrl, type PageData as ServicePageData } from '../../../content/services';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import {
  HeroHeader,
  MainContent,
  FAQSection,
  CTASection,
  RelatedServices,
  StructuredData,
  FAQSchema,
  extractFAQs,
  cleanPageContent,
} from '@/components/shared/IndustryServicePage';

export async function generateStaticParams() {
  return servicesData.pages.map((page) => ({
    slug: page.url.replace(/^\/+|\/+$/g, '').replace('/services/', ''),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const pageData = getServicesByUrl(`/services/${slug}/`);

  if (!pageData) {
    return {
      title: 'Service Not Found',
      description: 'The requested service page could not be found.',
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
    twitter: {
      card: 'summary_large_image',
      title: pageData.meta.title,
      description: pageData.meta.description,
    },
    alternates: {
      canonical: `https://clickmasters.com${pageData.url}`,
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pageData = getServicesByUrl(`/services/${slug}/`);

  if (!pageData) {
    notFound();
  }

  const siblingServices = pageData.related.siblings
    .map((url) => getServicesByUrl(url))
    .filter((data): data is ServicePageData => data !== undefined);

  const parentService = pageData.related.parent
    ? getServicesByUrl(pageData.related.parent)
    : null;

  // Clean content
  const cleaned = cleanPageContent(pageData.content);
  
  // Extract FAQs
  const faqs = extractFAQs(cleaned);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white/20">
      <HeroHeader pageData={pageData} type="Service" />
      <MainContent content={cleaned} />
      {faqs.length > 0 && <FAQSection faqs={faqs} />}
      <CTASection pageData={pageData} />
      <RelatedServices siblingServices={siblingServices} parentService={parentService} />
      <StructuredData pageData={pageData} />
      <FAQSchema faqs={faqs} />
    </div>
  );
}