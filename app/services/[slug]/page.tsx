// app/services/[slug]/page.tsx
import {
  servicesData,
  getServicesByUrl,
  type PageData as ServicePageData,
} from "../../../content/services";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  FAQSection,
  CTASection,
  RelatedServices,
  StructuredData,
  FAQSchema,
  MainContent,
} from "@/components/shared/IndustryServicePage";
import { extractFAQs } from "@/components/shared/IndustryServicePageUtils";
import { HeroHeader } from "@/components/shared/HeroHeader";
import CustomApplicationDevelopment from "@/components/landingPage/CustomApplicationDevelopment";
import DesktopApplicationDevelopment from "@/components/landingPage/DesktopApplicationDevelopment";
import IoTDevelopment from "@/components/landingPage/IoTDevelopment";
import EmbeddedSoftwareDevelopment from "@/components/landingPage/EmbeddedSoftwareDevelopment";
import ARVRDevelopment from "@/components/landingPage/ARVRDevelopment";
import BlockchainDevelopment from "@/components/landingPage/BlockchainDevelopment";

export async function generateStaticParams() {
  return servicesData.pages.map((page) => ({
    slug: page.url.replace(/^\/+|\/+$/g, "").replace(/^services\//, ""),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pageData = getServicesByUrl(`/services/${slug}/`);

  if (!pageData) {
    return {
      title: "Service Not Found",
      description: "The requested service page could not be found.",
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

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pageData = getServicesByUrl(`/services/${slug}/`);

  if (!pageData) {
    notFound();
  }

  const siblingServices = pageData.related.siblings
    .map((url) => getServicesByUrl(url))
    .filter(
      (data): data is ServicePageData => data !== undefined && data !== null,
    );

  // Fix: Handle undefined by converting to null
  const parentService = pageData.related.parent
    ? getServicesByUrl(pageData.related.parent) || null
    : null;

  const faqs = extractFAQs(pageData);

  if (slug === "custom-application-development") {
    return <CustomApplicationDevelopment />;
  }

  if (slug === "desktop-application-development") {
    return <DesktopApplicationDevelopment />;
  }

  if (slug === "iot-development") {
    return <IoTDevelopment />;
  }

  if (slug === "embedded-software-development") {
    return <EmbeddedSoftwareDevelopment />;
  }

  if (slug === "ar-vr-development") {
    return <ARVRDevelopment />;
  }

  if (slug === "blockchain-development") {
    return <BlockchainDevelopment />;
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white/20">
      <HeroHeader pageData={pageData} type="Service" />
      <MainContent pageData={pageData} />
      <FAQSection pageData={pageData} />
      <CTASection pageData={pageData} />
      <RelatedServices
        siblingServices={siblingServices}
        parentService={parentService}
      />
      <StructuredData pageData={pageData} />
      <FAQSchema faqs={faqs} />
    </div>
  );
}
