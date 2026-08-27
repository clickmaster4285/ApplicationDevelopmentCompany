"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  Smartphone,
  Globe,
  Palette,
  Cloud,
  Plug,
  Wrench,
  Cpu,
  Layers,
  Database,
  GitBranch,
  Users,
  Building2,
  Code,
  Rocket,
  Boxes,
  Shield,
  Sparkles,
  TrendingUp,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// EXACT CONTENT PROVIDED
// ============================================================

const introParagraphs = [
  "Clickmasters provides end-to-end application development services for businesses that need secure, scalable and reliable digital products. We plan, design, develop, test, deploy and support custom applications built around your users, workflows, technical requirements and long-term business goals.",
  "From web and mobile applications to enterprise platforms, AI-powered products and cloud-native systems, our application developers help businesses turn ideas, operational challenges and existing software into applications built for real-world use and future growth.",
  "Whether you are launching a new digital product, developing an internal business application, modernizing legacy software or expanding your development capacity, clickmasters can support the complete application lifecycle.",
];

const whatAre = [
  "Application development services help businesses plan, design, build, test, deploy, maintain and improve software applications. These applications may operate across web browsers, mobile devices, desktop environments, cloud infrastructure and enterprise systems.",
  "A complete application development engagement can include requirements analysis, software architecture, UI/UX design, frontend and backend engineering, API development, database development, quality assurance, integrations, cloud deployment, security and ongoing maintenance.",
  "At Clickmasters, an application development company goes beyond writing code. We focus on building applications that solve defined business problems, provide a reliable user experience, and remain adaptable as business and technical requirements evolve.",
];

const services = [
  {
    icon: Code,
    title: "Custom Application Development",
    paragraphs: [
      "Our custom application development services help businesses build applications around requirements that cannot be addressed effectively by generic off-the-shelf software.",
      "We develop custom applications around specific workflows, users, integrations, data requirements and operational goals. These solutions can range from internal business applications to customer-facing platforms and specialized digital systems.",
      "Related services include:",
    ],
    points: [
      "Desktop Application Development",
      "IoT Development",
      "Embedded Software Development",
      "AR/VR Development",
      "Blockchain Development",
    ],
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    paragraphs: [
      "Our mobile app development services help businesses build applications for smartphones, tablets, wearable devices and connected mobile experiences.",
      "We select the development approach according to target users, required device functionality, application complexity, performance expectations and long-term maintenance requirements.",
      "Our mobile application services include:",
    ],
    points: [
      "Android App Development",
      "iOS App Development",
      "Cross-Platform App Development",
      "Wearable App Development",
      "Progressive Web App Development",
    ],
    extra:
      "We build mobile applications with usability, performance, backend connectivity, security and future feature development in mind.",
  },
  {
    icon: Globe,
    title: "Web Application Development",
    paragraphs: [
      "Our web application development services help businesses create browser-based applications for customers, employees, partners and internal operations.",
      "We develop web applications ranging from business portals and dashboards to workflow platforms, SaaS applications, customer platforms and complex data-driven systems.",
      "Our web engineering capabilities include:",
    ],
    points: [
      "Web Development",
      "Frontend Development",
      "Backend Development",
      "Full Stack Development",
    ],
    pointsTitle: "Supporting backend capabilities include:",
    points2: [
      "API Development",
      "Database Development",
      "Microservices Development",
    ],
    extra:
      "We also provide CMS development and ecommerce development for businesses requiring specialized web platforms.",
  },
  {
    icon: Cpu,
    title: "AI Aptaplication Development",
    paragraphs: [
      "Our AI application development services help businesses introduce intelligent capabilities into new and existing software applications.",
      "AI-powered applications can support automation, decision-making, content generation, conversational experiences, intelligent search, predictive functionality and more efficient business processes.",
      "Our AI services include:",
    ],
    points: [
      "AI Agent Development",
      "Generative AI Development",
      "Machine Learning Development",
      "Chatbot Development",
    ],
    extra:
      "Our approach considers the entire AI application environment, including data, integrations, models, permissions, APIs, user experience, monitoring and human oversight.",
  },
  {
    icon: Building2,
    title: "Enterprise Application Development",
    paragraphs: [
      "Our enterprise application development services support organizations that require software capable of handling complex workflows, multiple users, system integrations, large datasets and evolving operational requirements.",
      "We develop enterprise applications designed to connect business processes, people, systems and data while creating a reliable foundation for automation and digital transformation.",
      "Related enterprise services include:",
    ],
    points: ["Enterprise Software Development", "ERP Software Development"],
    extra:
      "Our enterprise development approach considers scalability, security, reliability, system integration, maintainability and long-term architecture from the start.",
  },
  {
    icon: Rocket,
    title: "Software Product Development",
    paragraphs: [
      "Our software product development services support startups and established businesses developing software as a commercial product or as a core part of their business model.",
      "We can support the complete journey from early discovery and validation to architecture, design, engineering, release and continuous product improvement.",
      "Related capabilities include:",
    ],
    points: ["MVP Development", "SaaS Development", "Product Engineering", "Custom Software Development", "UI/UX Design"],
    extra:
      "For early-stage products, we focus on validating core functionality efficiently. For mature platforms, our focus can shift toward performance, scalability, product evolution and engineering efficiency.",
  },
  {
    icon: Cloud,
    title: "Cloud Application Development",
    paragraphs: [
      "Our cloud application development services help businesses build applications designed to operate efficiently in modern cloud environments.",
      "We design cloud applications around requirements such as scalability, availability, workload patterns, deployment frequency, integrations, security and infrastructure cost.",
      "For systems specifically designed around cloud-first architecture, explore our cloud-native development services.",
      "Cloud applications may use microservices, APIs, containers, serverless components, managed cloud services and automated deployment pipelines where these technologies provide genuine technical or operational benefits.",
    ],
  },
  {
    icon: Wrench,
    title: "Legacy Software Modernization",
    paragraphs: [
      "Existing software does not always need to be completely replaced.",
      "Our legacy software modernization services help organizations improve aging applications, reduce technical limitations and prepare existing systems for changing business requirements.",
      "Modernization services include:",
    ],
    points: [
      "Application Reengineering",
      "Cloud Migration",
      "Data Migration",
      "Software Maintenance and Support",
    ],
    extra:
      "We assess the existing system, dependencies, technical limitations and business-critical functionality before determining whether components should be retained, reengineered, migrated, modernized or replaced.",
  },
  {
    icon: Database,
    title: "Data Engineering and Analytics",
    paragraphs: [
      "Modern applications depend on reliable, structured and accessible data.",
      "Our data engineering services help businesses build the pipelines, integrations and infrastructure required to support modern digital applications.",
      "Our related capabilities include:",
    ],
    points: ["Data Analytics", "Business Intelligence Development"],
    extra:
      "Together, these services support dashboards, analytical platforms, AI applications, reporting systems and data-driven business processes.",
  },
  {
    icon: GitBranch,
    title: "DevOps Services",
    paragraphs: [
      "Our DevOps services help development and operations teams improve application delivery, deployment reliability and software release processes.",
      "We focus on repeatable environments, infrastructure practices, deployment automation, monitoring and efficient release workflows.",
      "Our CI/CD implementation services focus specifically on automating application build, testing and deployment processes.",
    ],
  },
  {
    icon: Plug,
    title: "QA and Software Testing",
    paragraphs: [
      "Application quality needs to be addressed throughout development rather than only before launch.",
      "Our QA and software testing services help identify functionality, usability, integration, compatibility, performance and other software issues before they affect users.",
      "For projects that require repeatable testing across frequent releases, we also provide automation testing services.",
      "Testing strategies are selected according to application complexity, supported platforms, release frequency and business risk.",
    ],
  },
  {
    icon: Layers,
    title: "IT Consulting and Software Architecture",
    paragraphs: [
      "The technology decisions made early in an application project can affect cost, scalability, security and maintainability for years.",
      "Our IT consulting services help businesses evaluate application requirements, technical approaches and development decisions before committing significant resources.",
      "For systems requiring deeper technical planning, our software architecture consulting services cover system architecture, technology selection, integrations, scalability and software design.",
      "We also provide cybersecurity services to help businesses strengthen application and infrastructure security.",
    ],
  },
  {
    icon: Users,
    title: "Dedicated Development Teams",
    paragraphs: [
      "Businesses do not always need to outsource an entire software project.",
      "Our dedicated development team services provide ongoing engineering capacity for organizations that need a consistent external development team aligned with their technology roadmap.",
      "Related engagement options include:",
    ],
    points: ["IT Staff Augmentation", "Software Development Outsourcing"],
    extra:
      "These models allow businesses to choose the level of external development support that best fits their internal capabilities and project requirements.",
  },
];

const appTypes = [
  { icon: Globe, title: "Web Applications", text: "Browser-based applications for portals, dashboards, SaaS platforms, workflow systems, internal tools and customer-facing digital services." },
  { icon: Smartphone, title: "Mobile Applications", text: "Native and cross-platform mobile applications for iOS, Android, smartphones, tablets and connected mobile devices." },
  { icon: Palette, title: "Desktop Applications", text: "Applications designed for desktop operating environments where local processing, hardware access, offline functionality or specialized workflows are required." },
  { icon: Building2, title: "Enterprise Applications", text: "Business-critical applications designed around complex workflows, multiple systems, user roles, integrations and organizational data." },
  { icon: Cloud, title: "Cloud Applications", text: "Applications developed for scalable cloud environments using modern infrastructure and deployment approaches." },
  { icon: Boxes, title: "SaaS Applications", text: "Software platforms designed around centralized delivery, multiple users, subscription models and scalable product growth." },
  { icon: Cpu, title: "AI-Powered Applications", text: "Applications that combine software engineering with artificial intelligence, machine learning, generative AI, AI agents and intelligent automation." },
];

const processSteps = [
  { title: "1. Discovery and Requirements", text: "We identify users, business objectives, workflows, functional requirements, constraints, integrations and technical considerations." },
  { title: "2. Product and Technical Planning", text: "Requirements are converted into priorities, development milestones, architecture decisions and a practical delivery roadmap." },
  { title: "3. UI/UX Design", text: "We plan application workflows, user journeys, interface structure, wireframes, prototypes and visual experiences where required." },
  { title: "4. Software Architecture", text: "Our team defines how frontend systems, backend services, APIs, databases, infrastructure and integrations should work together." },
  { title: "5. Application Development", text: "Frontend and backend engineers build application features through planned development cycles." },
  { title: "6. Quality Assurance", text: "Testing is performed throughout development to identify issues related to functionality, compatibility, usability, performance, integrations and reliability." },
  { title: "7. Deployment", text: "The application is prepared and released into its production environment with the required infrastructure, configurations and deployment controls." },
  { title: "8. Maintenance and Continuous Improvement", text: "After launch, clickmasters can support monitoring, bug fixes, updates, security improvements, performance optimization and continued feature development." },
];

const architectureCapabilities = [
  "Modular application architectures",
  "API-first architectures",
  "Microservices",
  "Cloud-native architectures",
  "Serverless components",
  "Event-driven systems",
  "Multi-tenant SaaS architecture",
  "Third-party integrations",
  "Real-time application functionality",
  "Scalable database architectures",
];

const techGroups = [
  { icon: Globe, title: "Frontend Technologies", text: "Modern frontend frameworks and technologies can be used to create responsive and maintainable user interfaces for web applications." },
  { icon: Cpu, title: "Backend Technologies", text: "Backend technologies are selected according to application logic, data processing, integrations, scalability and performance requirements." },
  { icon: Smartphone, title: "Mobile Technologies", text: "Depending on the project, mobile applications may use native iOS and Android technologies or cross-platform frameworks such as Flutter and React Native." },
  { icon: Database, title: "Databases", text: "Relational and non-relational database technologies are selected according to the structure, volume and access patterns of application data." },
  { icon: Cloud, title: "Cloud Infrastructure", text: "Modern cloud platforms, containers, serverless services and managed infrastructure can be used where they support application requirements." },
  { icon: Shield, title: "AI Technologies", text: "AI applications may use large language models, machine learning frameworks, AI APIs, retrieval systems and agent-based technologies depending on the business use case." },
];

const securityCapabilities = [
  "Authentication",
  "Authorization",
  "Role-based access",
  "API security",
  "Data protection",
  "Secure data transfer",
  "Secrets management",
  "Input validation",
  "Dependency management",
  "Logging and monitoring",
  "Secure development practices",
];

const industries = [
  "Healthcare",
  "FinTech",
  "Banking and financial services",
  "Retail and ecommerce",
  "Logistics and transportation",
  "Manufacturing",
  "Education and eLearning",
  "Real estate",
  "Insurance",
  "Hospitality and travel",
  "Telecommunications",
  "Professional services",
  "Startups and software product companies",
];

const recommendations = [
  { req: "Build a browser-based software application", rec: "Web Application Development" },
  { req: "Develop an application for smartphones", rec: "Mobile App Development" },
  { req: "Build specifically for Android devices", rec: "Android App Development" },
  { req: "Build specifically for Apple devices", rec: "iOS App Development" },
  { req: "Build one application across mobile platforms", rec: "Cross-Platform App Development" },
  { req: "Develop software around unique business processes", rec: "Custom Application Development" },
  { req: "Build complex organization-wide software", rec: "Enterprise Application Development" },
  { req: "Validate a software idea before full investment", rec: "MVP Development" },
  { req: "Build a subscription software product", rec: "SaaS Development" },
  { req: "Add AI capabilities to software", rec: "AI Application Development" },
  { req: "Improve aging software", rec: "Legacy Software Modernization" },
  { req: "Move an existing application to cloud infrastructure", rec: "Cloud Migration" },
  { req: "Expand an existing engineering team", rec: "IT Staff Augmentation" },
  { req: "Outsource development delivery", rec: "Software Development Outsourcing" },
];

const internalLinks: Record<string, string> = {
  "Custom Application Development": "/services/custom-application-development/",
  "Desktop Application Development": "/services/desktop-application-development/",
  "IoT Development": "/services/iot-development/",
  "Embedded Software Development": "/services/embedded-software-development/",
  "AR/VR Development": "/services/ar-vr-development/",
  "Blockchain Development": "/services/blockchain-development/",
  "Mobile App Development": "/services/mobile-app-development/",
  "Android App Development": "/services/android-app-development/",
  "iOS App Development": "/services/ios-app-development/",
  "Cross-Platform App Development": "/services/cross-platform-app-development/",
  "Wearable App Development": "/services/wearable-app-development/",
  "Progressive Web App Development": "/services/progressive-web-app-development/",
  "Web Application Development": "/services/web-application-development/",
  "Web Development": "/services/web-development/",
  "Frontend Development": "/services/frontend-development/",
  "Backend Development": "/services/backend-development/",
  "Full Stack Development": "/services/full-stack-development/",
  "API Development": "/services/api-development/",
  "Database Development": "/services/database-development/",
  "Microservices Development": "/services/microservices-development/",
  "CMS development": "/services/cms-development/",
  "ecommerce development": "/services/ecommerce-development/",
  "AI Aptaplication Development": "/services/ai-application-development/",
  "AI Application Development": "/services/ai-application-development/",
  "AI Agent Development": "/services/ai-agent-development/",
  "Generative AI Development": "/services/generative-ai-development/",
  "Machine Learning Development": "/services/machine-learning-development/",
  "Chatbot Development": "/services/chatbot-development/",
  "Enterprise Application Development": "/services/enterprise-application-development/",
  "Enterprise Software Development": "/services/enterprise-software-development/",
  "ERP Software Development": "/services/erp-software-development/",
  "Software Product Development": "/services/software-product-development/",
  "MVP Development": "/services/mvp-development/",
  "SaaS Development": "/services/saas-development/",
  "Product Engineering": "/services/product-engineering/",
  "Custom Software Development": "/services/custom-software-development/",
  "UI/UX Design": "/services/ui-ux-design/",
  "Cloud Application Development": "/services/cloud-application-development/",
  "cloud-native development services": "/services/cloud-native-development/",
  "Legacy Software Modernization": "/services/legacy-software-modernization/",
  "Application Reengineering": "/services/application-reengineering/",
  "Cloud Migration": "/services/cloud-migration/",
  "Data Migration": "/services/data-migration/",
  "Software Maintenance and Support": "/services/software-maintenance-support/",
  "Data Engineering and Analytics": "/services/data-engineering/",
  "Data Analytics": "/services/data-analytics/",
  "Business Intelligence Development": "/services/business-intelligence-development/",
  "DevOps Services": "/services/devops-services/",
  "CI/CD implementation services": "/services/ci-cd-implementation/",
  "QA and Software Testing": "/services/qa-software-testing/",
  "automation testing services": "/services/automation-testing/",
  "IT Consulting and Software Architecture": "/services/it-consulting/",
  "IT consulting services": "/services/it-consulting/",
  "software architecture consulting services": "/services/software-architecture-consulting/",
  "cybersecurity services": "/services/cybersecurity-services/",
  "Dedicated Development Teams": "/services/dedicated-development-teams/",
  "Dedicated Development Team": "/services/dedicated-development-teams/",
  "IT Staff Augmentation": "/services/it-staff-augmentation/",
  "Software Development Outsourcing": "/services/software-development-outsourcing/",
  "Web Applications": "/services/web-application-development/",
  "Mobile Applications": "/services/mobile-app-development/",
  "Desktop Applications": "/services/desktop-application-development/",
  "Enterprise Applications": "/services/enterprise-application-development/",
  "Cloud Applications": "/services/cloud-application-development/",
  "SaaS Applications": "/services/saas-development/",
  "AI-Powered Applications": "/services/ai-application-development/",
  Healthcare: "/industries/healthcare/",
  FinTech: "/industries/fintech/",
  "Banking and financial services": "/industries/banking/",
  "Retail and ecommerce": "/industries/retail/",
  "Logistics and transportation": "/industries/logistics/",
  Manufacturing: "/industries/manufacturing/",
  "Education and eLearning": "/industries/elearning/",
  "Real estate": "/industries/real-estate/",
  Insurance: "/industries/insurance/",
  "Hospitality and travel": "/industries/hospitality/",
  Telecommunications: "/industries/telecommunications/",
  "Professional services": "/industries/professional-services/",
  "Startups and software product companies": "/industries/startups/",
};

const costFactors = [
  "Number of features",
  "Application complexity",
  "Web, mobile or desktop platforms",
  "UI/UX requirements",
  "Backend architecture",
  "APIs and integrations",
  "Database requirements",
  "AI functionality",
  "Data migration",
  "Security requirements",
  "Testing requirements",
  "Cloud infrastructure",
  "Development team size",
  "Project timeline",
  "Post-launch maintenance",
];

const timelineText =
  "Application development timelines depend on the size, complexity and requirements of the application.";

const engagementModels = [
  { icon: Layers, title: "End-to-End Application Development", text: "Suitable for businesses that need one development partner to support discovery, design, architecture, engineering, testing and launch." },
  { icon: Users, title: "Dedicated Development Team", text: "Suitable for long-term products and businesses that need an ongoing external engineering team." },
  { icon: Code, title: "IT Staff Augmentation", text: "Suitable when an internal technology team needs additional developers or specialized engineering expertise." },
  { icon: Boxes, title: "Software Development Outsourcing", text: "Suitable when a business wants an external team to take responsibility for a defined development workstream or wider software delivery." },
];

const whyChoose = [
  { icon: Layers, title: "End-to-End Development Capabilities", text: "clickmasters can support application discovery, design, architecture, engineering, testing, deployment, modernization and ongoing maintenance." },
  { icon: TrendingUp, title: "Business Requirements First", text: "We select application technologies and architecture around business goals, users and operational requirements." },
  { icon: Sparkles, title: "Broad Engineering Expertise", text: "Our services cover mobile, web, enterprise, cloud, AI, data, APIs, DevOps and specialized software development." },
  { icon: Building2, title: "Scalable Application Architecture", text: "Applications can be designed around future users, data, integrations and functionality without introducing unnecessary technical complexity." },
  { icon: Shield, title: "Flexible Engagement Models", text: "Businesses can work with clickmasters through end-to-end project delivery, dedicated development teams, staff augmentation or software development outsourcing." },
  { icon: Globe, title: "Long-Term Maintainability", text: "We consider code quality, architecture, testing, security and future development when building applications expected to evolve after launch." },
];

const faqs = [
  {
    question: "What are application development services?",
    answer: "Application development services include the professional activities required to plan, design, build, test, deploy and maintain software applications. They can cover web, mobile, desktop, enterprise, cloud, SaaS and AI applications as well as architecture, UI/UX, APIs, databases and ongoing support.",
  },
  {
    question: "What does an application development company do?",
    answer: "An application development company turns business requirements or product ideas into working software. Services can include requirements analysis, architecture, design, frontend and backend development, testing, integrations, deployment and maintenance.",
  },
  {
    question: "What types of applications does clickmasters develop?",
    answer: "clickmasters develops web, mobile, desktop, enterprise, cloud, SaaS, AI-powered and custom applications. We also support specialized technologies including IoT, embedded software, AR/VR and blockchain.",
  },
  {
    question: "Does clickmasters provide custom application development?",
    answer: "Yes. Our custom application development services are designed for organizations that need software built around unique workflows, integrations, users, data or business requirements.",
  },
  {
    question: "Does clickmasters develop both mobile and web applications?",
    answer: "Yes. clickmasters provides dedicated mobile and web application development services. Mobile capabilities include Android, iOS and cross-platform development, while web application services include frontend, backend, API, database and full-stack development.",
  },
  {
    question: "Can clickmasters modernize an existing application?",
    answer: "Yes. Existing applications can be evaluated for application reengineering, legacy modernization, cloud migration, data migration, architecture improvements and ongoing maintenance.",
  },
  {
    question: "How is the technology stack selected?",
    answer: "The technology stack is selected according to application functionality, scalability, integrations, performance requirements, security, existing infrastructure and long-term maintenance requirements.",
  },
  {
    question: "How much does application development cost?",
    answer: "The cost varies according to features, platforms, complexity, architecture, integrations, design, security, testing and development team requirements. A discovery and requirements phase provides a more reliable basis for estimation.",
  },
  {
    question: "How long does application development take?",
    answer: "Development timelines depend on scope and complexity. A focused MVP typically requires less development work than a large enterprise platform with numerous integrations, users and migration requirements.",
  },
  {
    question: "Does clickmasters provide application maintenance after launch?",
    answer: "Yes. Post-launch support can include bug fixes, monitoring, updates, security improvements, performance optimization and continued feature development.",
  },
  {
    question: "Can clickmasters work with an existing internal development team?",
    answer: "Yes. Businesses with internal technology teams can use dedicated development teams or IT staff augmentation to add development capacity and specialist expertise.",
  },
  {
    question: "What is the difference between application development and software development?",
    answer: "Software development is the broader discipline of creating software systems and products. Application development focuses specifically on applications created for users or business functions, including web applications, mobile apps, desktop applications and enterprise applications.",
  },
];

// ============================================================
// HELPERS
// ============================================================

function SectionHeading({
  eyebrow,
  title,
  text,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="mb-10 grid gap-5 md:mb-12 lg:grid-cols-[0.95fr_1fr] lg:items-end">
      <div>
        {eyebrow && (
          <div className="mb-4 text-[10px] uppercase tracking-normal text-white/45">
            {eyebrow}
          </div>
        )}
        <h2 className="text-chrome max-w-3xl text-3xl font-medium leading-[1.02] tracking-normal md:text-5xl">
          {title}
        </h2>
      </div>
      {text && (
        <p className="max-w-2xl text-[15px] leading-relaxed text-white/58 lg:justify-self-end">
          {text}
        </p>
      )}
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.035] px-3 py-2 text-sm text-white/72">
      <Check className="h-3.5 w-3.5 shrink-0 text-chrome/70" />
      {children}
    </span>
  );
}

function InternalTextLink({
  children,
  href,
  variant = "inline",
}: {
  children: React.ReactNode;
  href?: string;
  variant?: "inline" | "title" | "muted";
}) {
  if (!href) return <>{children}</>;

  const styles = {
    inline:
      "text-[#e8edf2] underline decoration-white/28 underline-offset-4 hover:decoration-white/70",
    title:
      "text-white decoration-white/0 hover:text-[#e8edf2] hover:underline hover:decoration-white/45 hover:underline-offset-4",
    muted:
      "text-[#d9dee4] underline decoration-white/18 underline-offset-4 hover:text-white hover:decoration-white/55",
  };

  return (
    <Link href={href} className={`transition-colors ${styles[variant]}`}>
      {children}
    </Link>
  );
}

function LinkedChip({ label }: { label: string }) {
  const href = internalLinks[label];

  if (!href) return <Chip>{label}</Chip>;

  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-md border border-white/12 bg-white/[0.04] px-3 py-2 text-sm text-[#d9dee4] transition-colors hover:border-white/28 hover:bg-white/[0.065] hover:text-white"
    >
      <Check className="h-3.5 w-3.5 shrink-0 text-chrome/70" />
      {label}
    </Link>
  );
}

const inlineLinkPhrases = [
  "cloud-native development services",
  "CI/CD implementation services",
  "automation testing services",
  "IT consulting services",
  "software architecture consulting services",
  "cybersecurity services",
  "CMS development",
  "ecommerce development",
];

function linkedText(text: string) {
  const phrase = inlineLinkPhrases.find((item) => text.includes(item));

  if (!phrase) return text;

  const [before, after] = text.split(phrase);

  return (
    <>
      {before}
      <InternalTextLink href={internalLinks[phrase]}>
        {phrase}
      </InternalTextLink>
      {after}
    </>
  );
}

function CTASolid({ children, href = "/contact" }: { children: React.ReactNode; href?: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-medium text-[#050505] shadow-lg shadow-white/10 transition-all hover:bg-white/90 active:scale-[0.98]"
    >
      {children}
      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}

function PremiumCard({
  children,
  className = "",
  reveal = true,
}: {
  children: React.ReactNode;
  className?: string;
  reveal?: boolean;
}) {
  return (
    <div
      data-reveal={reveal ? true : undefined}
      className={`group relative overflow-hidden rounded-lg border border-white/[0.07] bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.018))] shadow-2xl shadow-black/20 transition-colors duration-300 hover:border-white/16 ${className}`}
    >
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 bg-white/[0.035] blur-3xl" />
      <div className="relative">{children}</div>
    </div>
  );
}

function ServiceCard({ s, index }: { s: (typeof services)[number]; index: number }) {
  const Icon = s.icon;

  return (
    <PremiumCard className="p-6 md:p-7">
      <div className="flex items-start justify-between gap-4">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md border border-white/10 bg-white/[0.045]">
          <Icon className="h-5 w-5 text-chrome" />
        </div>
        <span className="text-xs text-white/32">0{index + 1}</span>
      </div>
      <h3 className="mt-6 text-xl font-medium tracking-normal text-white md:text-2xl">
        <InternalTextLink href={internalLinks[s.title]} variant="title">
          {s.title}
        </InternalTextLink>
      </h3>
      <div className="mt-4 space-y-3 text-sm leading-relaxed text-white/60">
        {s.paragraphs.map((p, i) => (
          <p key={i}>{linkedText(p)}</p>
        ))}
      </div>
      {s.points && (
        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          {s.points.map((pt) => (
            <div key={pt} className="flex items-start gap-2.5 text-sm text-white/70">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-chrome/75" />
              <InternalTextLink href={internalLinks[pt]} variant="muted">
                {pt}
              </InternalTextLink>
            </div>
          ))}
        </div>
      )}
      {s.points2 && (
        <>
          <p className="mt-5 text-sm leading-relaxed text-white/60">
            {s.pointsTitle}
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {s.points2.map((pt) => (
              <div key={pt} className="flex items-start gap-2.5 text-sm text-white/70">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-chrome/75" />
                <InternalTextLink href={internalLinks[pt]} variant="muted">
                  {pt}
                </InternalTextLink>
              </div>
            ))}
          </div>
        </>
      )}
      {s.extra && <p className="mt-5 text-sm leading-relaxed text-white/58">{linkedText(s.extra)}</p>}
    </PremiumCard>
  );
}

const imageShowcase = [
  { src: "/images/mobile.jpeg", title: "Mobile Applications" },
  { src: "/images/web.jpeg", title: "Web Applications" },
  { src: "/images/ui-ux.jpeg", title: "UI/UX Design" },
  { src: "/images/saas.jpeg", title: "SaaS Applications" },
  { src: "/images/api.jpeg", title: "API Development" },
  { src: "/images/application.jpeg", title: "Application Development" },
];

// ============================================================
// PAGE
// ============================================================

export default function AppServices() {
  useEffect(() => {
    const els = gsap.utils.toArray<HTMLElement>("[data-reveal]");
    els.forEach((el) => {
      gsap.fromTo(
        el,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        },
      );
    });
  }, []);

  return (
    <main className="relative overflow-hidden bg-[#050505] text-white antialiased">
      <div className="pointer-events-none fixed inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:80px_80px]" />

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden border-b border-white/6 pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[52rem] w-[52rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(232,237,242,0.13),transparent_62%)] blur-2xl" />
        <div className="relative mx-auto w-[min(92vw,1240px)] px-4">
          <div className="grid gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
            <div data-reveal>
              <div className="inline-flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.035] px-3 py-2 text-[10px] uppercase tracking-normal text-white/70 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-chrome" />
                Application Development Services
              </div>
              <h1 className="text-chrome mt-7 max-w-4xl text-[clamp(2.6rem,7vw,6.6rem)] font-medium leading-[0.94] tracking-normal">
                Application Development Services
              </h1>
              <div className="mt-7 max-w-2xl space-y-4 text-lg leading-relaxed text-white/68">
                {introParagraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <CTASolid>Discuss Your Application Project</CTASolid>
              </div>
            </div>

            <PremiumCard className="min-h-[520px] p-3" reveal={false}>
              <div className="relative h-[496px] overflow-hidden rounded-md">
                <Image
                  src="/images/application.jpeg"
                  alt="Application development workspace"
                  fill
                  priority
                  sizes="(min-width: 1024px) 48vw, 92vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/45 to-transparent" />
              </div>
            </PremiumCard>
          </div>
        </div>
      </section>

      {/* ============ IMAGE SHOWCASE (old images) ============ */}
      <section className="relative py-10 md:py-14">
        <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-6">
            {imageShowcase.map((img) => (
              <div
                key={img.src}
                className="group relative h-28 overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.02] md:h-36"
              >
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  sizes="(min-width: 768px) 15vw, 46vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-sm font-medium text-white/82">
                  <InternalTextLink href={internalLinks[img.title]} variant="title">
                    {img.title}
                  </InternalTextLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHAT ARE SERVICES ============ */}
      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1120px)] px-4">
          <SectionHeading
            title="What Are Application Development Services?"
          />
          <div className="grid gap-4 md:grid-cols-3">
            {whatAre.map((p, i) => (
              <PremiumCard key={i} className="p-6">
                <p className="text-[15px] leading-relaxed text-white/62">{p}</p>
              </PremiumCard>
            ))}
          </div>
        </div>
      </section>

      {/* ============ OUR SERVICES ============ */}
      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <SectionHeading
            title="Our Application Development Services"
            text="Custom software, modern digital products, specialized applications, existing system modernization and the engineering capabilities required throughout the application lifecycle."
          />
          <div className="grid gap-5 lg:grid-cols-2">
            {services.map((s, index) => (
              <ServiceCard key={s.title} s={s} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ TYPES OF APPLICATIONS ============ */}
      <section className="relative py-16 md:py-24 border-t border-white/5">
          <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <SectionHeading
            title="Types of Applications We Develop"
            text="clickmasters develops applications across different platforms, architectures, business requirements and user environments."
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {appTypes.map((a) => {
              const Icon = a.icon;
              return (
                <PremiumCard key={a.title} className="p-6">
                  <Icon className="mb-5 h-6 w-6 text-chrome" />
                  <h3 className="text-lg font-medium text-white tracking-normal">
                    <InternalTextLink href={internalLinks[a.title]} variant="title">
                      {a.title}
                    </InternalTextLink>
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{a.text}</p>
                </PremiumCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section className="relative py-16 md:py-24 border-t border-white/5">
          <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <SectionHeading
            title="Our End-to-End Application Development Process"
            text="Our application development process takes projects from business requirements to reliable production applications through a structured and transparent delivery approach."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {processSteps.map((step) => (
              <PremiumCard key={step.title} className="p-6">
                <h3 className="text-lg font-medium text-white tracking-normal md:text-xl">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{step.text}</p>
              </PremiumCard>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ARCHITECTURE ============ */}
      <section className="relative py-16 md:py-24 border-t border-white/5">
          <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
            <div>
              <h2 className="text-chrome text-3xl md:text-5xl font-medium tracking-normal leading-[1.02]">
                Application Architecture Built Around Your Requirements
              </h2>
              <p className="mt-6 text-white/60 leading-relaxed text-[15px] md:text-base">
                There is no single architecture that works for every application.
              </p>
              <p className="mt-4 text-white/60 leading-relaxed text-[15px] md:text-base">
                A focused internal application may require a relatively simple architecture,
                while a high-volume platform with multiple services, integrations and
                user groups may require a more distributed system. Depending on
                application requirements, we can work with:
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {architectureCapabilities.map((cap) => (
                <Chip key={cap}>{cap}</Chip>
              ))}
              <p className="w-full mt-4 text-sm leading-relaxed text-white/60">
                The objective is not to use the most complicated technology available. It
                is to select an architecture that provides the right balance between
                performance, scalability, maintainability, delivery speed and operating
                cost.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TECHNOLOGIES ============ */}
      <section className="relative py-16 md:py-24 border-t border-white/5">
          <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <SectionHeading
            title="Application Development Technologies"
            text="Our technology choices are based on application requirements, existing infrastructure, business goals and the expected product lifecycle."
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {techGroups.map((t) => {
              const Icon = t.icon;
              return (
                <PremiumCard key={t.title} className="p-6">
                  <Icon className="mb-5 h-6 w-6 text-chrome" />
                  <h3 className="text-lg font-medium text-white tracking-normal">{t.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{t.text}</p>
                </PremiumCard>
              );
            })}
          </div>
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-white/55">
            The technology stack should support the application rather than dictate how it is
            built.
          </p>

          {/* SECURITY */}
          <PremiumCard className="mt-14 p-7 md:p-10">
            <div className="flex items-start gap-4">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md border border-white/10 bg-white/[0.04]">
                <Shield className="h-5 w-5 text-chrome" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-medium text-white tracking-normal">
                  Application Security Throughout Development
                </h3>
                <p className="mt-3 max-w-3xl text-sm md:text-base leading-relaxed text-white/60">
                  Security should be considered across the entire application development
                  lifecycle. Depending on the project, application security can include:
                </p>
              </div>
            </div>
            <div className="mt-7 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {securityCapabilities.map((s) => (
                <div key={s} className="flex items-center gap-2.5 text-sm text-white/65">
                  <Check className="h-4 w-4 shrink-0 text-chrome/70" />
                  {s}
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-white/55">
              Applications in regulated industries may require additional security and
              compliance controls based on the data, users and operational environment
              involved.
            </p>
          </PremiumCard>
        </div>
      </section>

      {/* ============ INDUSTRIES ============ */}
      <section className="relative py-16 md:py-24 border-t border-white/5">
          <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <SectionHeading
            title="Application Development Across Industries"
            text="clickmasters develops applications around the workflows, users, integrations and data requirements of different industries."
          />
          <p className="mb-6 max-w-3xl text-sm leading-relaxed text-white/55">
            Our application development capabilities can support businesses across:
          </p>
          <div className="flex flex-wrap gap-3">
            {industries.map((ind) => (
              <LinkedChip key={ind} label={ind} />
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-white/55">
            We avoid treating industry software as a one-size-fits-all product. Application
            requirements should reflect the specific workflows, users, risks and operational
            needs of each organization.
          </p>
        </div>
      </section>

      {/* ============ RECOMMENDATION TABLE ============ */}
      <section className="relative py-16 md:py-24 border-t border-white/5">
          <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <SectionHeading
            title="Choose the Right Application Development Service"
          />
          <div className="relative overflow-hidden rounded-lg border border-white/[0.08]">
            <div className="pointer-events-none absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-white/[0.05] blur-3xl" />
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-white/[0.06]">
                <thead className="bg-white/[0.04]">
                  <tr>
                    {["Your Requirement", "Recommended Service"].map((h) => (
                      <th
                        key={h}
                        className="px-6 py-5 text-left text-xs font-medium uppercase tracking-normal text-white/50"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {recommendations.map((r) => (
                    <tr key={r.req} className="transition-colors hover:bg-white/[0.02]">
                      <td className="px-6 py-4 text-sm text-white/60">{r.req}</td>
                      <td className="px-6 py-4 text-sm font-medium text-chrome">
                        <InternalTextLink href={internalLinks[r.rec]}>
                          {r.rec}
                        </InternalTextLink>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-white/55">
            If the right approach is not yet clear, clickmasters can begin with
            requirements discovery and technical planning before recommending a development
            direction.
          </p>
        </div>
      </section>

      {/* ============ ENGAGEMENT MODELS ============ */}
      <section className="relative py-16 md:py-24 border-t border-white/5">
          <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <SectionHeading
            title="Application Development Engagement Models"
            text="Different projects require different levels of development responsibility and collaboration."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {engagementModels.map((m) => {
              const Icon = m.icon;
              return (
                <PremiumCard key={m.title} className="p-6">
                  <Icon className="mb-5 h-6 w-6 text-chrome" />
                  <h3 className="text-lg md:text-xl font-medium text-white tracking-normal">{m.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{m.text}</p>
                </PremiumCard>
              );
            })}
          </div>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-white/55">
            The appropriate engagement model depends on project scope, internal
            capabilities, duration and desired level of control.
          </p>
        </div>
      </section>

      {/* ============ COST & TIMELINE ============ */}
      <section className="relative py-16 md:py-24 border-t border-white/5">
          <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <SectionHeading
            title="How Much Does Application Development Cost?"
            text="Application development costs depend on the complexity and scope of the project rather than a single standard price."
          />
          <PremiumCard className="p-6 md:p-8">
          <div className="max-w-4xl space-y-4 text-white/60 leading-relaxed text-[15px] md:text-base">
            <p>Major cost factors include:</p>
            <div className="flex flex-wrap gap-2">
              {costFactors.map((c) => (
                <span
                  key={c}
                  className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/65"
                >
                  {c}
                </span>
              ))}
            </div>
            <p>A focused MVP will have different requirements from a large enterprise platform involving numerous systems, user groups and integrations.</p>
            <p>A reliable estimate starts with clearly defining the project&apos;s requirements and identifying which functionality is essential for the first release.</p>
          </div>
          <div className="mt-10">
            <CTASolid>Request a Project Estimate</CTASolid>
          </div>
          </PremiumCard>

          <PremiumCard className="mt-6 p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-medium text-white tracking-normal">
              How Long Does Application Development Take?
            </h2>
            <div className="mt-4 max-w-3xl space-y-4 text-white/60 leading-relaxed text-[15px] md:text-base">
              <p>{timelineText}</p>
              <p>A focused MVP or internal business application can usually move through discovery, design and development faster than a complex enterprise platform involving multiple integrations, user groups, migration requirements and approval processes.</p>
              <p>clickmasters structures development into defined phases and releases so stakeholders can review progress throughout the project rather than waiting until the entire application is complete.</p>
            </div>
          </PremiumCard>
        </div>
      </section>

      {/* ============ WHY CHOOSE ============ */}
      <section className="relative py-16 md:py-24 border-t border-white/5">
        <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <SectionHeading
            title="Why Choose clickmasters for Application Development?"
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {whyChoose.map((w) => {
              const Icon = w.icon;
              return (
                <PremiumCard key={w.title} className="p-6">
                  <Icon className="mb-5 h-6 w-6 text-chrome" />
                  <h3 className="text-lg font-medium text-white tracking-normal">{w.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{w.text}</p>
                </PremiumCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ START PROJECT ============ */}
      <section className="relative py-16 md:py-24 border-t border-white/5">
        <div className="mx-auto w-[min(92vw,1040px)] px-4">
          <div className="relative overflow-hidden rounded-lg border border-white/[0.06] bg-gradient-to-br from-[#161616] via-[#0e0e0e] to-[#0a0a0a] px-6 py-12 text-center md:py-20">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#050505_90%)]" />
            <div className="pointer-events-none absolute -top-20 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(232,237,242,0.15),transparent_60%)] blur-2xl" />
            <div className="relative">
              <h2 className="text-chrome text-[clamp(2rem,6vw,4.5rem)] font-medium leading-[1.0] tracking-normal">
                Start Your Application Development Project
              </h2>
              <p className="mx-auto mt-8 max-w-2xl text-white/55 leading-relaxed text-[15px] md:text-base">
                Whether you are planning a new application, developing an MVP,
                modernizing existing software or adding new functionality to an
                established platform, clickmasters can help you define the right
                development approach and move your project from requirements to production.
                Tell us what you want to build, what problem the application needs to solve
                and where your project currently stands.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <CTASolid>Discuss Your Project</CTASolid>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="relative py-16 md:py-24 border-t border-white/5">
        <div className="mx-auto w-[min(92vw,920px)] px-4">
          <SectionHeading title="Frequently Asked Questions" />
          <div className="divide-y divide-white/5 border-y border-white/5">
            {faqs.map((f) => (
              <div key={f.question} className="py-6">
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
                    <span className="text-base md:text-lg text-white font-medium tracking-normal">
                      {f.question}
                    </span>
                    <ChevronRight className="h-5 w-5 shrink-0 text-white/40 transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="pt-4 pr-10 text-white/60 leading-relaxed text-[15px]">
                    {f.answer}
                  </p>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
