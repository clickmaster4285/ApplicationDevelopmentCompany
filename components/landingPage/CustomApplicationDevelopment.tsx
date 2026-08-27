"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, ChevronRight, Code, Database, Link2, Monitor, Network, Palette, Rocket, Shield } from "lucide-react";

const SITE = "https://clickmastersapplicationdevelopment.com";

const introParagraphs = [
  "clickmasters provides custom application development services in the USA for startups, growing businesses and enterprises that need software designed around their specific users, workflows, data and operational requirements.",
  "As an experienced Custom application development company, we plan, design, develop, test, deploy and maintain custom applications instead of forcing businesses to adapt their processes to restrictive off-the-shelf platforms.",
  "Our custom application development agency supports projects ranging from custom business applications and internal systems to desktop software, connected IoT platforms and specialized digital products. Whether you are building a new application or replacing software that no longer meets your needs, clickmasters provides end-to-end app development services in the USA from initial discovery through long-term support.",
];

const buildAround = [
  "Business workflows",
  "Employee processes",
  "Customer experiences",
  "User roles and permissions",
  "Data management",
  "Reporting",
  "Process automation",
  "System integrations",
  "Industry-specific requirements",
  "Proprietary business processes",
];

const completeProject = [
  "Requirements discovery",
  "Business analysis",
  "UI/UX design",
  "Software architecture",
  "Frontend development",
  "Backend development",
  "API development",
  "Database engineering",
  "Third-party integrations",
  "QA and software testing",
  "Cloud deployment",
  "Security",
  "Maintenance and support",
];

const customServices = [
  {
    icon: Monitor,
    title: "Desktop Application Development",
    paragraphs: [
      "Our desktop application development services help organizations create purpose-built software for desktop environments.",
      "Desktop applications can support internal operations, specialized workflows, offline functionality, hardware interaction and applications that require deeper access to local computing resources.",
    ],
  },
  {
    icon: Network,
    title: "IoT Application Development",
    paragraphs: [
      "Our IoT development services connect custom applications with sensors, devices and connected infrastructure.",
      "IoT applications can support:",
    ],
    points: [
      "Asset monitoring",
      "Device management",
      "Remote control",
      "Real-time data",
      "Automated alerts",
      "Connected products",
      "Industrial operations",
    ],
    extra:
      "For software operating directly on hardware, clickmasters also provides embedded software development.",
  },
  {
    icon: Code,
    title: "Embedded Software Development",
    paragraphs: [
      "Our embedded software development services support applications that operate within connected devices, specialized equipment and hardware-based products.",
      "We consider hardware limitations, reliability, connectivity, performance and real-world operating conditions during development.",
    ],
  },
  {
    icon: Palette,
    title: "AR/VR Application Development",
    paragraphs: [
      "Our AR/VR development services help businesses build immersive applications for training, visualization, simulations, education and interactive digital experiences.",
      "We use augmented or virtual reality when it provides a practical benefit to the user experience or business process.",
    ],
  },
  {
    icon: Link2,
    title: "Blockchain Application Development",
    paragraphs: [
      "Our blockchain development services support applications where distributed ledgers, smart contracts or decentralized functionality provide genuine business value.",
      "The technology is selected according to the problem rather than added simply because blockchain is available.",
    ],
  },
];

const problemCards = [
  {
    title: "Disconnected Software Systems",
    paragraphs: [
      "Teams may rely on spreadsheets, CRM platforms, accounting software, and separate operational tools that do not communicate effectively.",
      "A custom application can connect these processes and create more consistent data flows.",
    ],
  },
  {
    title: "Software That Does Not Match Your Processes",
    paragraphs: [
      "Off-the-shelf software is designed for broad requirements.",
      "A custom application can instead mirror the workflows, approvals, users and operating rules specific to your organization.",
    ],
  },
  {
    title: "Manual Processes That Limit Growth",
    paragraphs: [
      "Repeated data entry, approvals, reporting and administrative work can become increasingly difficult as an organization scales.",
      "Custom applications can automate appropriate parts of these workflows.",
    ],
  },
  {
    title: "Difficult System Integrations",
    paragraphs: [
      "Businesses frequently need applications to work with CRM, ERP, accounting, payment and other platforms.",
      "Our application development company can design APIs and integration workflows to connect these systems.",
    ],
  },
  {
    title: "Legacy Technology",
    paragraphs: [
      "Older applications may become expensive to maintain or difficult to integrate with modern systems.",
      "Depending on the situation, our legacy software modernization capabilities can help improve or replace those systems.",
    ],
  },
];

const benefits = [
  ["Built for Your Business", "Functionality is designed around actual business requirements rather than generic market assumptions."],
  ["Better Integration", "Custom applications can connect with existing APIs, databases, ERP systems, CRM platforms and third-party services."],
  ["Greater Scalability", "Architecture can be planned around future users, transactions, data and functionality."],
  ["Better Process Automation", "Applications can reduce repetitive manual work and support more consistent digital workflows."],
  ["Greater Development Control", "Organizations have greater influence over features, priorities and future development."],
  ["Purpose-Built User Experience", "Application interfaces can be designed specifically around customers, employees or other intended users."],
  ["Long-Term Adaptability", "New functionality and integrations can be introduced as business requirements change."],
];

const processSteps = [
  {
    title: "1. Discovery and Business Analysis",
    intro: "We identify:",
    points: [
      "Business objectives",
      "User requirements",
      "Existing processes",
      "Application functionality",
      "Current software systems",
      "Integrations",
      "Data requirements",
      "Security considerations",
    ],
    outro: "This creates the foundation for the development scope.",
  },
  {
    title: "2. Requirements and Planning",
    text: "We translate business needs into defined features, workflows, user roles, integrations and development priorities.",
  },
  {
    title: "3. UI/UX Design",
    text: "Our UI/UX design services can include user journeys, wireframes, prototypes, interfaces and application design systems.",
  },
  {
    title: "4. Application Architecture",
    text: "We define how the application's frontend, backend, database, APIs, infrastructure and external services should work together.",
  },
  {
    title: "5. Application Development",
    text: "Our developers build the application's functionality through structured development cycles.",
    intro: "Development can include:",
    points: [
      "Frontend engineering",
      "Backend engineering",
      "Business logic",
      "Database development",
      "APIs",
      "Integrations",
      "Authentication",
      "Automation",
      "Reporting",
    ],
  },
  {
    title: "6. QA and Testing",
    text: "Our QA and software testing services help validate functionality, integrations, usability, compatibility, performance and reliability.",
  },
  {
    title: "7. Deployment",
    text: "Applications are prepared for production with the required infrastructure, environment configuration and deployment processes.",
  },
  {
    title: "8. Maintenance and Improvement",
    text: "Our software maintenance and support services can provide bug fixes, monitoring, security updates, optimization and continued feature development.",
  },
];

const integrations = [
  "CRM systems",
  "ERP systems",
  "Payment gateways",
  "Accounting software",
  "Third-party APIs",
  "Cloud services",
  "Authentication systems",
  "Logistics platforms",
  "Communication services",
  "Existing databases",
  "Legacy applications",
];

const securityItems = [
  "Authentication",
  "Role-based authorization",
  "API security",
  "Data protection",
  "Secure data transfer",
  "Input validation",
  "Scalable infrastructure",
  "Application monitoring",
  "Logging",
  "Maintainable code architecture",
  "Dependency management",
];

const techGroups = [
  ["Frontend Development", "Modern frameworks for responsive and interactive application interfaces."],
  ["Backend Development", "Server-side technologies supporting business logic, processing and integrations."],
  ["Mobile Development", "Native iOS and Android development or cross-platform approaches such as Flutter and React Native."],
  ["Databases", "Relational and non-relational technologies selected according to application data requirements."],
  ["APIs", "REST, GraphQL and other integration approaches where appropriate."],
  ["Cloud", "Cloud infrastructure, managed services, containers and serverless technologies according to application needs."],
  ["DevOps", "Automated build, testing and deployment workflows for applications requiring frequent and reliable releases."],
];

const timelineFactors = [
  "Scope",
  "Feature complexity",
  "Number of platforms",
  "Integrations",
  "Architecture",
  "UI/UX requirements",
  "Data migration",
  "Testing requirements",
  "Security requirements",
  "Stakeholder approvals",
];

const modelRows = [
  ["Application development agency", "Complex or strategic applications requiring multiple technical disciplines"],
  ["Freelancer", "Smaller and clearly defined development requirements"],
  ["Internal team", "Organizations requiring continuous internal engineering capacity"],
  ["Low-code/no-code", "Simpler applications where platform restrictions are acceptable"],
];

const usaSupport = [
  "Startups developing new applications",
  "SMBs digitizing business processes",
  "Enterprises building complex internal systems",
  "Product companies developing proprietary applications",
  "Businesses replacing outdated software",
  "Organizations integrating disconnected systems",
];

const whyChoose = [
  ["Custom Development Expertise", "We build applications around specific requirements instead of relying on generic software templates."],
  ["End-to-End Application Development", "Our capabilities span discovery, UI/UX, architecture, engineering, integration, testing, deployment and maintenance."],
  ["Application Development Services Across Platforms", "clickmasters supports web, mobile, desktop, enterprise and specialized application environments."],
  ["Business-First Approach", "We start with the problem and intended users before selecting the technology."],
  ["Integration Capabilities", "Custom applications can be connected with existing business systems, APIs and data platforms."],
  ["Flexible Engagement Models", "Businesses can choose end-to-end delivery, dedicated development teams, staff augmentation or software development outsourcing."],
  ["Continued Support", "Our application development company can remain involved after launch to maintain, improve and expand the application."],
];

const faqs = [
  ["What are custom application development services?", "Custom application development services involve designing, developing, testing, deploying and maintaining software built specifically around an organization's workflows, users, integrations and business requirements."],
  ["Is clickmasters a custom application development company serving the USA?", "Yes. clickmasters is an application development company serving businesses across the USA with custom application design, development, testing, deployment and ongoing support services."],
  ["What does an application development agency do?", "An application development agency provides the technical disciplines required to turn a business requirement or software idea into a working application. This can include strategy, UI/UX, architecture, frontend and backend engineering, QA, deployment and maintenance."],
  ["What custom applications can clickmasters build?", "clickmasters can develop custom web, mobile, desktop, enterprise, IoT, embedded, AR/VR and blockchain-based applications depending on business and technical requirements."],
  ["How much does custom application development cost in the USA?", "The cost depends on features, application complexity, platforms, integrations, architecture, design, security, testing and development resources. A defined discovery phase provides a more reliable project estimate."],
  ["How long does custom application development take?", "Timelines vary according to application scope, functionality, integrations and technical complexity. Smaller applications generally require less time than enterprise platforms involving multiple systems and user groups."],
  ["Can custom applications integrate with existing business software?", "Yes. Custom applications can integrate with CRM platforms, ERP systems, payment gateways, databases, cloud services and other business technology where suitable integration methods are available."],
  ["Does clickmasters provide application maintenance?", "Yes. Post-launch application support can include monitoring, bug fixes, security updates, performance improvements and continued feature development."],
  ["What is the difference between custom application development and standard application development?", "Application development is the broader process of building applications. Custom application development specifically focuses on applications created around the unique requirements of an individual organization."],
  ["Why hire an application development company?", "An application development company can provide a complete team covering software architecture, design, frontend and backend engineering, databases, integrations, QA, DevOps and ongoing maintenance."],
  ["Does clickmasters provide app development services across the USA?", "Yes. clickmasters provides app development services for businesses across the USA, supporting custom application projects through remote development and delivery."],
  ["Can clickmasters work with an existing development team?", "Yes. Organizations can use clickmasters through dedicated development teams or IT staff augmentation when additional technical capacity or specialist expertise is required."],
];

const internalLinks: Record<string, string> = {
  "Desktop Application Development": "/services/desktop-application-development/",
  "IoT Development": "/services/iot-development/",
  "IoT Application Development": "/services/iot-development/",
  "IoT development services": "/services/iot-development/",
  "embedded software development": "/services/embedded-software-development/",
  "Embedded Software Development": "/services/embedded-software-development/",
  "AR/VR Application Development": "/services/ar-vr-development/",
  "AR/VR development services": "/services/ar-vr-development/",
  "Blockchain Application Development": "/services/blockchain-development/",
  "blockchain development services": "/services/blockchain-development/",
  "web application development services": "/services/web-application-development/",
  "Web Application Development": "/services/web-application-development/",
  "mobile app development services": "/services/mobile-app-development/",
  "Mobile App Development": "/services/mobile-app-development/",
  "enterprise application development services": "/services/enterprise-application-development/",
  "Enterprise Application Development": "/services/enterprise-application-development/",
  "application development services": "/services/",
  "legacy software modernization capabilities": "/services/legacy-software-modernization/",
  "UI/UX design services": "/services/ui-ux-design/",
  "QA and software testing services": "/services/qa-software-testing/",
  "software maintenance and support services": "/services/software-maintenance-support/",
  "API development services": "/services/api-development/",
  "dedicated development teams": "/services/dedicated-development-teams/",
  "IT staff augmentation": "/services/it-staff-augmentation/",
  "software development outsourcing": "/services/software-development-outsourcing/",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE}/services/custom-application-development#faq`,
  url: `${SITE}/services/custom-application-development`,
  mainEntity: faqs.map(([question, answer]) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE}/services/custom-application-development#service`,
  name: "Custom Application Development Services USA",
  alternateName: [
    "Custom Application Development",
    "Custom App Development Services",
    "Application Development Services",
    "App Development Services USA",
  ],
  url: `${SITE}/services/custom-application-development`,
  description:
    "clickmasters provides custom application development services for businesses across the USA, including custom web, mobile, desktop, enterprise, IoT, embedded, AR/VR and blockchain applications from discovery and design through development, testing, deployment and maintenance.",
  serviceType: "Custom Application Development Services",
  category: "Application Development",
  provider: {
    "@type": "Organization",
    "@id": `${SITE}/#organization`,
    name: "clickmasters",
    url: `${SITE}/`,
  },
  areaServed: { "@type": "Country", name: "United States" },
  audience: {
    "@type": "BusinessAudience",
    audienceType:
      "Startups, growing businesses and enterprises requiring custom application development services",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Custom Application Development Services",
    itemListElement: [
      "Desktop Application Development",
      "IoT Development",
      "Embedded Software Development",
      "AR/VR Development",
      "Blockchain Development",
      "Web Application Development",
      "Mobile App Development",
      "Enterprise Application Development",
    ].map((name) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name,
        url: `${SITE}${internalLinks[name] || "/services/custom-application-development/"}`,
      },
    })),
  },
};

function SectionHeading({ title, text }: { title: string; text?: string }) {
  return (
    <div className="mb-10 grid gap-5 md:mb-12 lg:grid-cols-[0.95fr_1fr] lg:items-end">
      <h2 className="text-chrome max-w-3xl text-3xl font-medium leading-[1.02] tracking-normal md:text-5xl">
        {title}
      </h2>
      {text && (
        <p className="max-w-2xl text-[15px] leading-relaxed text-white/58 lg:justify-self-end">
          {renderLinkedText(text)}
        </p>
      )}
    </div>
  );
}

function PremiumCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`group relative overflow-hidden rounded-lg border border-white/[0.07] bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.018))] shadow-2xl shadow-black/20 transition-colors duration-300 hover:border-white/16 ${className}`}>
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 bg-white/[0.035] blur-3xl" />
      <div className="relative">{children}</div>
    </div>
  );
}

function CTASolid({ children }: { children: React.ReactNode }) {
  return (
    <Link href="/contact" className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-medium text-[#050505] shadow-lg shadow-white/10 transition-all hover:bg-white/90 active:scale-[0.98]">
      {children}
      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}

function TextLink({ children, href }: { children: React.ReactNode; href?: string }) {
  if (!href) return <>{children}</>;
  return (
    <Link href={href} className="text-[#e8edf2] underline decoration-white/28 underline-offset-4 transition-colors hover:text-white hover:decoration-white/70">
      {children}
    </Link>
  );
}

function renderLinkedText(text: string) {
  const phrase = Object.keys(internalLinks).find((item) => text.includes(item));
  if (!phrase) return text;
  const [before, after] = text.split(phrase);
  return (
    <>
      {before}
      <TextLink href={internalLinks[phrase]}>{phrase}</TextLink>
      {after}
    </>
  );
}

function Chip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.035] px-3 py-2 text-sm text-white/72">
      <Check className="h-3.5 w-3.5 shrink-0 text-chrome/70" />
      {renderLinkedText(label)}
    </span>
  );
}

function ServiceCard({ service }: { service: (typeof customServices)[number] }) {
  const Icon = service.icon;
  return (
    <PremiumCard className="p-6 md:p-7">
      <div className="grid h-11 w-11 place-items-center rounded-md border border-white/10 bg-white/[0.045]">
        <Icon className="h-5 w-5 text-chrome" />
      </div>
      <h3 className="mt-6 text-xl font-medium tracking-normal text-white md:text-2xl">
        <TextLink href={internalLinks[service.title]}>{service.title}</TextLink>
      </h3>
      <div className="mt-4 space-y-3 text-sm leading-relaxed text-white/60">
        {service.paragraphs.map((paragraph) => (
          <p key={paragraph}>{renderLinkedText(paragraph)}</p>
        ))}
      </div>
      {service.points && (
        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          {service.points.map((point) => (
            <div key={point} className="flex items-start gap-2.5 text-sm text-white/70">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-chrome/75" />
              {point}
            </div>
          ))}
        </div>
      )}
      {service.extra && <p className="mt-5 text-sm leading-relaxed text-white/58">{renderLinkedText(service.extra)}</p>}
    </PremiumCard>
  );
}

export default function CustomApplicationDevelopment() {
  return (
    <main className="relative overflow-hidden bg-[#050505] text-white antialiased">
      <div className="pointer-events-none fixed inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:80px_80px]" />

      <section className="relative overflow-hidden border-b border-white/6 pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[52rem] w-[52rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(232,237,242,0.13),transparent_62%)] blur-2xl" />
        <div className="relative mx-auto w-[min(92vw,1240px)] px-4">
          <div className="grid gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.035] px-3 py-2 text-[10px] uppercase tracking-normal text-white/70 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-chrome" />
                Custom Application Development Services USA
              </div>
              <h1 className="text-chrome mt-7 max-w-4xl text-[clamp(2.35rem,6.5vw,6.2rem)] font-medium leading-[0.94] tracking-normal">
                Custom Application Development Services USA
              </h1>
              <div className="mt-7 max-w-2xl space-y-4 text-lg leading-relaxed text-white/68">
                {introParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <CTASolid>Discuss Your Custom Application</CTASolid>
              </div>
            </div>

            <PremiumCard className="min-h-[520px] p-3">
              <div className="relative h-[496px] overflow-hidden rounded-md">
                <Image src="/images/application.jpeg" alt="Custom application development" fill priority sizes="(min-width: 1024px) 48vw, 92vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/45 to-transparent" />
              </div>
            </PremiumCard>
          </div>
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1120px)] px-4">
          <SectionHeading title="Custom Application Development Company for USA Businesses" />
          <div className="grid gap-4 md:grid-cols-3">
            {[
              "A custom application is developed specifically around the requirements of one business rather than designed for a broad market.",
              "As a custom application development company serving the USA, clickmasters works with organizations that need greater control over their software functionality, integrations, user experience and future development roadmap.",
              "Our goal is to translate your requirements into software that works the way your organization needs it to work.",
            ].map((paragraph) => (
              <PremiumCard key={paragraph} className="p-6">
                <p className="text-[15px] leading-relaxed text-white/62">{paragraph}</p>
              </PremiumCard>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-white/55">
            We can build applications around:
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {buildAround.map((item) => (
              <Chip key={item} label={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <SectionHeading title="What Are Custom Application Development Services?" />
          <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
            <PremiumCard className="p-6 md:p-8">
              <div className="space-y-4 text-[15px] leading-relaxed text-white/62">
                <p>Custom application development services cover the planning, design, engineering, testing, deployment and maintenance of software built specifically for an organization&apos;s requirements.</p>
                <p>Unlike standard software products, custom applications can be designed around particular users, workflows, integrations, security requirements and business objectives.</p>
                <p>clickmasters provides these capabilities through a coordinated application development agency model.</p>
              </div>
            </PremiumCard>
            <PremiumCard className="p-6 md:p-8">
              <p className="mb-5 text-sm leading-relaxed text-white/60">A complete custom application development project can include:</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {completeProject.map((item) => (
                  <Chip key={item} label={item} />
                ))}
              </div>
            </PremiumCard>
          </div>
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <SectionHeading title="Our Custom App Development Services" text="Our custom app development services cover different application environments and specialized business requirements." />
          <div className="grid gap-5 lg:grid-cols-2">
            {customServices.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <SectionHeading title="Custom Web, Mobile and Enterprise Applications" />
          <div className="grid gap-4 md:grid-cols-2">
            {[
              "Custom application requirements frequently extend across multiple platforms.",
              "For browser-based platforms, explore our web application development services.",
              "For smartphones and tablets, clickmasters provides dedicated mobile app development services.",
              "For larger organizations with complex workflows, integrations and data requirements, our enterprise application development services provide a more specialized approach.",
              "Our broader application development services cover the complete application ecosystem.",
            ].map((paragraph) => (
              <PremiumCard key={paragraph} className="p-6">
                <p className="text-[15px] leading-relaxed text-white/62">{renderLinkedText(paragraph)}</p>
              </PremiumCard>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <SectionHeading title="Business Problems Our Custom Application Development Agency Solves" />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {problemCards.map((card) => (
              <PremiumCard key={card.title} className="p-6">
                <h3 className="text-lg font-medium tracking-normal text-white">{card.title}</h3>
                <div className="mt-4 space-y-3 text-sm leading-relaxed text-white/60">
                  {card.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{renderLinkedText(paragraph)}</p>
                  ))}
                </div>
              </PremiumCard>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <SectionHeading title="Benefits of Custom Application Development" />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map(([title, text]) => (
              <PremiumCard key={title} className="p-6">
                <Rocket className="mb-5 h-6 w-6 text-chrome" />
                <h3 className="text-lg font-medium tracking-normal text-white">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{text}</p>
              </PremiumCard>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <SectionHeading title="Our Custom Application Development Process" text="As an end-to-end application development agency, clickmasters supports the complete application lifecycle." />
          <div className="grid gap-4 md:grid-cols-2">
            {processSteps.map((step) => (
              <PremiumCard key={step.title} className="p-6">
                <h3 className="text-lg font-medium tracking-normal text-white md:text-xl">{step.title}</h3>
                {step.text && <p className="mt-3 text-sm leading-relaxed text-white/60">{renderLinkedText(step.text)}</p>}
                {step.intro && <p className="mt-4 text-sm leading-relaxed text-white/60">{step.intro}</p>}
                {step.points && (
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {step.points.map((point) => (
                      <div key={point} className="flex items-start gap-2.5 text-sm text-white/70">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-chrome/75" />
                        {point}
                      </div>
                    ))}
                  </div>
                )}
                {step.outro && <p className="mt-4 text-sm leading-relaxed text-white/60">{step.outro}</p>}
              </PremiumCard>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <SectionHeading title="Custom Application Integration Services" />
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <PremiumCard className="p-6 md:p-8">
              <div className="space-y-4 text-[15px] leading-relaxed text-white/62">
                <p>Business applications rarely work independently.</p>
                <p>clickmasters can integrate applications with:</p>
                <p>Our API development services help create secure communication between custom applications and existing business systems.</p>
              </div>
            </PremiumCard>
            <div className="flex flex-wrap gap-3">
              {integrations.map((item) => (
                <Chip key={item} label={item} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <SectionHeading title="Secure and Scalable Custom Applications" text="A professional custom application development company should consider security, scalability and maintainability during architecture and development rather than after launch." />
          <PremiumCard className="p-6 md:p-8">
            <p className="mb-5 text-sm leading-relaxed text-white/60">Depending on application requirements, we can account for:</p>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {securityItems.map((item) => (
                <Chip key={item} label={item} />
              ))}
            </div>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-white/55">The exact controls depend on the application&apos;s users, data, industry and operational risks.</p>
          </PremiumCard>
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <SectionHeading title="Technologies for Custom Application Development" text="Our technology decisions are based on application requirements rather than a fixed technology stack." />
          <p className="mb-6 max-w-3xl text-sm leading-relaxed text-white/55">Projects can involve technologies across:</p>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {techGroups.map(([title, text]) => (
              <PremiumCard key={title} className="p-6">
                <Database className="mb-5 h-6 w-6 text-chrome" />
                <h3 className="text-lg font-medium tracking-normal text-white">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{text}</p>
              </PremiumCard>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-white/55">Our application development agency selects technology to support the product rather than designing the product around a preferred technology.</p>
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <SectionHeading title="How Long Does Custom App Development Take?" />
          <PremiumCard className="p-6 md:p-8">
            <p className="mb-5 text-sm leading-relaxed text-white/60">A custom application&apos;s development timeline depends on:</p>
            <div className="flex flex-wrap gap-3">
              {timelineFactors.map((item) => (
                <Chip key={item} label={item} />
              ))}
            </div>
            <div className="mt-6 max-w-4xl space-y-4 text-[15px] leading-relaxed text-white/62">
              <p>A focused application can typically move through development more quickly than a large enterprise platform involving numerous systems, integrations and user roles.</p>
              <p>Our app development services in the USA use phased delivery so working functionality and project progress can be reviewed throughout development.</p>
            </div>
          </PremiumCard>
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <SectionHeading title="Custom Application Development Agency vs Other Options" text="Businesses can build software using several different delivery models." />
          <div className="relative overflow-hidden rounded-lg border border-white/[0.08]">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-white/[0.06]">
                <thead className="bg-white/[0.04]">
                  <tr>
                    {["Development Model", "Best Fit"].map((header) => (
                      <th key={header} className="px-6 py-5 text-left text-xs font-medium uppercase tracking-normal text-white/50">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {modelRows.map(([model, bestFit]) => (
                    <tr key={model} className="transition-colors hover:bg-white/[0.02]">
                      <td className="px-6 py-4 text-sm font-medium text-chrome">{model}</td>
                      <td className="px-6 py-4 text-sm text-white/60">{bestFit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-white/55">An application development agency gives businesses access to capabilities such as software architecture, UI/UX, frontend development, backend development, QA and deployment through one coordinated team.</p>
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <SectionHeading title="Custom Application Development Services for USA Businesses" text="clickmasters provides app development services in the USA for organizations requiring software tailored to their operational or product requirements." />
          <div className="flex flex-wrap gap-3">
            {usaSupport.map((item) => (
              <Chip key={item} label={item} />
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-white/55">As an application development company serving USA businesses, clickmasters can support projects from early requirements analysis through deployment and continued application development.</p>
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <SectionHeading title="Why Choose clickmasters as Your Application Development Company?" />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {whyChoose.map(([title, text]) => (
              <PremiumCard key={title} className="p-6">
                <Shield className="mb-5 h-6 w-6 text-chrome" />
                <h3 className="text-lg font-medium tracking-normal text-white">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{renderLinkedText(text)}</p>
              </PremiumCard>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1040px)] px-4">
          <div className="relative overflow-hidden rounded-lg border border-white/[0.06] bg-gradient-to-br from-[#161616] via-[#0e0e0e] to-[#0a0a0a] px-6 py-12 text-center md:py-20">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#050505_90%)]" />
            <div className="relative">
              <h2 className="text-chrome text-[clamp(2rem,6vw,4.5rem)] font-medium leading-[1.0] tracking-normal">Choose clickmasters as Your Application Development Agency</h2>
              <div className="mx-auto mt-8 max-w-2xl space-y-4 text-white/55 leading-relaxed text-[15px] md:text-base">
                <p>If off-the-shelf software cannot support your workflows, integrations or future plans, clickmasters can help you create an application designed specifically around your organization.</p>
                <p>Our custom application development services in the USA combine planning, application architecture, design, engineering, testing and ongoing support to move software from an initial requirement to a production-ready application.</p>
              </div>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <CTASolid>Start Your Custom Application Project</CTASolid>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,920px)] px-4">
          <SectionHeading title="Frequently Asked Questions" />
          <div className="divide-y divide-white/5 border-y border-white/5">
            {faqs.map(([question, answer]) => (
              <div key={question} className="py-6">
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
                    <span className="text-base font-medium tracking-normal text-white md:text-lg">{question}</span>
                    <ChevronRight className="h-5 w-5 shrink-0 text-white/40 transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="pt-4 pr-10 text-[15px] leading-relaxed text-white/60">{answer}</p>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
    </main>
  );
}
