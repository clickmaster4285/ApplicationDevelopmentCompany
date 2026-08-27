import { Metadata } from "next";
import AppServices from "@/components/landingPage/AppServices";

const SITE = "https://clickmastersapplicationdevelopment.com";

const faqs = [
  {
    question: "What are application development services?",
    answer:
      "Application development services include the professional activities required to plan, design, build, test, deploy and maintain software applications. They can cover web, mobile, desktop, enterprise, cloud, SaaS and AI applications as well as architecture, UI/UX, APIs, databases and ongoing support.",
  },
  {
    question: "What does an application development company do?",
    answer:
      "An application development company turns business requirements or product ideas into working software. Services can include requirements analysis, architecture, design, frontend and backend development, testing, integrations, deployment and maintenance.",
  },
  {
    question: "What types of applications does clickmasters develop?",
    answer:
      "clickmasters develops web, mobile, desktop, enterprise, cloud, SaaS, AI-powered and custom applications. We also support specialized technologies including IoT, embedded software, AR/VR and blockchain.",
  },
  {
    question: "Does clickmasters provide custom application development?",
    answer:
      "Yes. Our custom application development services are designed for organizations that need software built around unique workflows, integrations, users, data or business requirements.",
  },
  {
    question: "Does clickmasters develop both mobile and web applications?",
    answer:
      "Yes. clickmasters provides dedicated mobile and web application development services. Mobile capabilities include Android, iOS and cross-platform development, while web application services include frontend, backend, API, database and full-stack development.",
  },
  {
    question: "Can clickmasters modernize an existing application?",
    answer:
      "Yes. Existing applications can be evaluated for application reengineering, legacy modernization, cloud migration, data migration, architecture improvements and ongoing maintenance.",
  },
  {
    question: "How is the technology stack selected?",
    answer:
      "The technology stack is selected according to application functionality, scalability, integrations, performance requirements, security, existing infrastructure and long-term maintenance requirements.",
  },
  {
    question: "How much does application development cost?",
    answer:
      "The cost varies according to features, platforms, complexity, architecture, integrations, design, security, testing and development team requirements. A discovery and requirements phase provides a more reliable basis for estimation.",
  },
  {
    question: "How long does application development take?",
    answer:
      "Development timelines depend on scope and complexity. A focused MVP typically requires less development work than a large enterprise platform with numerous integrations, users and migration requirements.",
  },
  {
    question: "Does clickmasters provide application maintenance after launch?",
    answer:
      "Yes. Post-launch support can include bug fixes, monitoring, updates, security improvements, performance optimization and continued feature development.",
  },
  {
    question: "Can clickmasters work with an existing internal development team?",
    answer:
      "Yes. Businesses with internal technology teams can use dedicated development teams or IT staff augmentation to add development capacity and specialist expertise.",
  },
  {
    question: "What is the difference between application development and software development?",
    answer:
      "Software development is the broader discipline of creating software systems and products. Application development focuses specifically on applications created for users or business functions, including web applications, mobile apps, desktop applications and enterprise applications.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://clickmastersapplicationdevelopment.com/services#service",
  name: "Application Development Services",
  alternateName: [
    "Application Development",
    "Custom Application Development Services",
    "Software Application Development Services",
  ],
  url: "https://clickmastersapplicationdevelopment.com/services",
  description:
    "clickmasters provides end-to-end application development services including web, mobile, enterprise, AI, cloud and custom application development, from planning and UI/UX design to engineering, testing, deployment, modernization and maintenance.",
  serviceType: "Application Development Services",
  category: "Software and Application Development",
  provider: {
    "@type": "Organization",
    "@id": "https://clickmastersapplicationdevelopment.com/#organization",
    name: "clickmasters",
    url: "https://clickmastersapplicationdevelopment.com/",
  },
  areaServed: { "@type": "Country", name: "United States" },
  audience: {
    "@type": "BusinessAudience",
    audienceType:
      "Startups, small and medium-sized businesses, enterprises and organizations requiring custom application development",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Application Development Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom Application Development", url: `${SITE}/services/custom-application-development` } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mobile App Development", url: `${SITE}/services/mobile-app-development` } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Application Development", url: `${SITE}/services/web-application-development` } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Desktop Application Development", url: `${SITE}/services/desktop-application-development` } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Application Development", url: `${SITE}/services/ai-application-development` } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Enterprise Application Development", url: `${SITE}/services/enterprise-application-development` } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cloud Application Development", url: `${SITE}/services/cloud-application-development` } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Software Product Development", url: `${SITE}/services/software-product-development` } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Legacy Software Modernization", url: `${SITE}/services/legacy-software-modernization` } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Data Engineering", url: `${SITE}/services/data-engineering` } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "DevOps Services", url: `${SITE}/services/devops-services` } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "QA and Software Testing", url: `${SITE}/services/qa-software-testing` } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "IT Consulting", url: `${SITE}/services/it-consulting` } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Dedicated Development Teams", url: `${SITE}/services/dedicated-development-teams` } },
    ],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://clickmastersapplicationdevelopment.com/services#faq",
  url: "https://clickmastersapplicationdevelopment.com/services",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export const metadata: Metadata = {
  title: "Application Development Services USA | clickmasters",
  description:
    "clickmasters provides application development services for web, mobile, AI, cloud and enterprise apps, from strategy and design to development and support.",
  keywords: [
    "application development services",
    "application development services",
    "application development company",
    "software application development services",
    "application development services USA",
  ],
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Application Development Services USA | clickmasters",
    description:
      "clickmasters provides application development services for web, mobile, AI, cloud and enterprise apps, from strategy and design to development and support.",
    url: "https://clickmastersapplicationdevelopment.com/services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Application Development Services USA | clickmasters",
    description:
      "clickmasters provides application development services for web, mobile, AI, cloud and enterprise apps, from strategy and design to development and support.",
  },
};

export default function ServicesPage() {
  return (
    <>
      <AppServices />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
