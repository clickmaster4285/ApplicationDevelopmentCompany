"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Box,
  Building2,
  Check,
  ChevronRight,
  Compass,
  Cpu,
  Eye,
  Gauge,
  Globe,
  GraduationCap,
  Layers,
  Layers3,
  Lightbulb,
  MapPin,
  Monitor,
  Palette,
  Scan,
  Shield,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Video,
  type LucideIcon,
} from "lucide-react";

const SITE = "https://clickmastersapplicationdevelopment.com";

const introParagraphs = [
  "clickmasters provides AR VR development services in the USA for businesses that want to create interactive applications, immersive simulations, spatial experiences and 3D digital products. We design and develop augmented reality, virtual reality and extended reality applications around specific users, platforms and business requirements.",
  "As an AR VR app development company, clickmasters can support projects from concept validation and experience design through prototyping, application development, integrations, testing, deployment and ongoing improvement.",
  "AR and VR development forms part of our broader custom application development services, allowing immersive applications to connect with existing software, APIs, data, mobile platforms, web applications and other business systems where required.",
  "Whether you need an augmented reality mobile app, VR training application, interactive product visualization, spatial computing experience or custom immersive business application, our AR VR development agency can help define the right technology and development approach.",
];

const interactionWays = [
  "Physical environments",
  "3D objects",
  "Spatial interfaces",
  "Cameras",
  "Motion",
  "Device orientation",
  "Headsets",
  "Controllers",
  "Hand tracking",
  "Real-world surfaces",
];

const potentialApps = [
  "Product visualization",
  "Interactive product demonstrations",
  "Virtual try-on experiences",
  "Training simulations",
  "Safety training",
  "Virtual walkthroughs",
  "Remote assistance",
  "Immersive education",
  "Equipment visualization",
  "3D configurators",
  "Spatial applications",
  "Interactive marketing experiences",
];

const immersiveServices = [
  "AR/VR consulting",
  "Requirements analysis",
  "Technology selection",
  "Spatial UX design",
  "Mobile AR development",
  "VR application development",
  "Mixed reality development",
  "XR development",
  "WebAR development",
  "3D modeling",
  "Animation",
  "Interactive environments",
  "Backend development",
  "API integration",
  "Device integration",
  "QA and testing",
  "Performance optimization",
  "Deployment",
  "Maintenance and support",
];

type ServiceCardData = {
  icon: LucideIcon;
  title: string;
  paragraphs: string[];
  points?: string[];
  pointsTitle?: string;
  points2?: string[];
  extra?: string;
};

const serviceCards: ServiceCardData[] = [
  {
    icon: Sparkles,
    title: "Augmented Reality App Development",
    paragraphs: [
      "Our augmented reality app development services help businesses add interactive digital content to real-world environments.",
      "AR applications can use cameras, device sensors and spatial information to position digital content around physical objects or locations.",
      "Potential functionality includes:",
    ],
    points: [
      "Product placement",
      "3D visualization",
      "Interactive instructions",
      "Virtual try-on",
      "Object recognition",
      "Image recognition",
      "Surface detection",
      "Location-based experiences",
      "Interactive product information",
      "AR navigation",
      "Remote guidance",
      "Educational visualization",
    ],
    extra:
      "AR is particularly useful when users still need to see and interact with the physical environment.",
  },
  {
    icon: Scan,
    title: "Marker-Based AR Development",
    paragraphs: [
      "Marker-based augmented reality displays digital content when the application recognizes a predefined image, code or visual marker.",
      "It can be useful for:",
    ],
    points: [
      "Packaging",
      "Printed marketing materials",
      "Product demonstrations",
      "Exhibitions",
      "Education",
      "Interactive manuals",
      "Promotional experiences",
    ],
    extra:
      "The marker provides a defined reference point for positioning digital content.",
  },
  {
    icon: Compass,
    title: "Markerless AR Development",
    paragraphs: [
      "Markerless AR does not require a predefined printed marker.",
      "Instead, applications can use environmental understanding, motion tracking or surface detection to place content within the user's surroundings.",
      "Common applications include:",
    ],
    points: [
      "Furniture placement",
      "Interior visualization",
      "Product preview",
      "Equipment guidance",
      "Spatial interfaces",
      "Interactive environments",
    ],
    extra:
      "Markerless AR can create more natural experiences where users need digital objects to interact with physical space.",
  },
  {
    icon: MapPin,
    title: "Location-Based AR Applications",
    paragraphs: [
      "Location-based augmented reality can use geographic position and device information to present relevant digital content.",
      "Potential use cases include:",
    ],
    points: [
      "Tourism",
      "Location-based information",
      "Navigation",
      "Events",
      "Property information",
      "Outdoor experiences",
      "Location-driven promotions",
    ],
    extra:
      "The suitability of location-based AR depends on the accuracy and context required by the application.",
  },
  {
    icon: Monitor,
    title: "Virtual Reality App Development Services",
    paragraphs: [
      "Our virtual reality app development services focus on applications where users interact inside immersive digital environments.",
      "VR can be suitable where a business needs to:",
    ],
    points: [
      "Simulate an environment",
      "Reproduce equipment or processes",
      "Train users without physical risk",
      "Demonstrate products remotely",
      "Create interactive walkthroughs",
      "Build immersive learning",
      "Recreate inaccessible locations",
      "Visualize future environments",
    ],
    extra:
      "VR applications can combine 3D environments with sound, interaction, controllers and movement to create a stronger sense of presence.",
  },
  {
    icon: GraduationCap,
    title: "VR Training and Simulation Development",
    paragraphs: [
      "Training is one of the strongest business applications for virtual reality.",
      "A VR training application can recreate situations that may otherwise be:",
    ],
    points: [
      "Expensive",
      "Dangerous",
      "Difficult to reproduce",
      "Disruptive to real operations",
      "Dependent on physical equipment",
    ],
    pointsTitle: "Potential VR training applications include:",
    points2: [
      "Employee onboarding",
      "Equipment training",
      "Safety procedures",
      "Emergency response",
      "Technical processes",
      "Operational workflows",
      "Classroom simulations",
      "Scenario-based learning",
    ],
    extra:
      "Users can repeat simulated situations without consuming physical materials or interrupting real equipment.",
  },
  {
    icon: Layers,
    title: "Mixed Reality Development",
    paragraphs: [
      "Mixed reality combines characteristics of augmented and virtual reality by allowing digital content to interact more deeply with physical environments.",
      "MR applications can support:",
    ],
    points: [
      "Spatial interfaces",
      "Interactive 3D objects",
      "Equipment visualization",
      "Remote assistance",
      "Training",
      "Design collaboration",
      "Digital workspaces",
    ],
    extra:
      "Mixed reality can be useful where users need to maintain awareness of their physical surroundings while working with digital information.",
  },
  {
    icon: Layers3,
    title: "XR Development Services",
    paragraphs: [
      "Extended Reality, or XR, is an umbrella term covering technologies such as:",
    ],
    points: ["Augmented Reality", "Virtual Reality", "Mixed Reality", "Spatial computing"],
    pointsTitle:
      "Our XR development services can help businesses determine which immersive approach is appropriate instead of forcing every project into a single technology category. For example:",
    points2: [
      "Physical environment + digital overlay → AR",
      "Fully digital environment → VR",
      "Physical and digital spatial interaction → MR/XR",
    ],
  },
  {
    icon: Box,
    title: "Spatial Computing Application Development",
    paragraphs: [
      "Spatial computing applications allow digital interfaces and content to be positioned and interacted with in three-dimensional space.",
      "Potential applications include:",
    ],
    points: [
      "Spatial dashboards",
      "3D visualization",
      "Collaborative workspaces",
      "Training",
      "Interactive product demonstrations",
      "Design reviews",
      "Engineering visualization",
    ],
    extra:
      "Spatial applications are becoming increasingly relevant as new headset and wearable computing platforms expand beyond conventional VR experiences.",
  },
  {
    icon: Globe,
    title: "WebAR and Browser-Based AR Development",
    paragraphs: [
      "Not every augmented reality experience requires users to download a dedicated application.",
      "WebAR can allow users to access an AR experience through a compatible web browser.",
      "This can be useful for:",
    ],
    points: [
      "Marketing campaigns",
      "Product visualization",
      "Events",
      "Retail experiences",
      "Short-term interactive campaigns",
      "QR-driven experiences",
    ],
    extra:
      "Browser-based delivery can reduce installation friction, although native applications may provide greater access to certain device capabilities.",
  },
  {
    icon: Smartphone,
    title: "Mobile AR App Development",
    paragraphs: [
      "Smartphones and tablets provide one of the most accessible ways to deliver augmented reality.",
      "Mobile AR applications can use:",
    ],
    points: [
      "Cameras",
      "Device orientation",
      "Motion",
      "GPS",
      "Surface detection",
      "Object tracking",
      "Touch interactions",
    ],
    extra:
      "Depending on the project, mobile AR experiences can be delivered through iOS, Android or cross-platform application strategies. Our mobile app development services can support wider mobile application requirements surrounding an immersive experience.",
  },
  {
    icon: Eye,
    title: "AR VR Product Visualization Development",
    paragraphs: [
      "AR and VR can help users understand products before physically interacting with them.",
      "Potential applications include:",
    ],
    points: [
      "Furniture placement",
      "Product configuration",
      "Equipment visualization",
      "Interactive catalogs",
      "Product demonstrations",
      "Virtual showrooms",
      "Design previews",
    ],
    extra:
      "For example, an AR application can allow a customer to visualize an object inside an existing environment before purchase. A VR application can instead place users inside a completely digital showroom or product environment.",
  },
  {
    icon: ShoppingBag,
    title: "AR Ecommerce and Retail Applications",
    paragraphs: [
      "AR can create more interactive online and in-store shopping experiences.",
      "Applications can include:",
    ],
    points: [
      "Virtual Try-On — Allow customers to preview compatible products digitally.",
      "Product Placement — Visualize products inside the user's surroundings.",
      "Interactive Catalogs — Transform product information into interactive AR experiences.",
      "Virtual Showrooms — Present products within immersive digital spaces.",
      "Product Configurators — Allow users to adjust colors, models, options or configurations through 3D interfaces.",
    ],
    extra:
      "The objective should be to reduce uncertainty or improve product understanding rather than adding novelty without measurable value.",
  },
  {
    icon: Building2,
    title: "VR Real Estate and Virtual Tour Development",
    paragraphs: [
      "Virtual reality can allow users to explore a property or location remotely.",
      "Potential applications include:",
    ],
    points: [
      "Property walkthroughs",
      "Development previews",
      "Hotel tours",
      "Architectural visualization",
      "Interior design previews",
      "Construction visualization",
      "Destination experiences",
    ],
    extra:
      "Virtual tours can be particularly valuable when physical access is difficult or when an environment has not yet been built.",
  },
  {
    icon: Lightbulb,
    title: "AR VR Applications for Training and Education",
    paragraphs: [
      "Immersive environments can help learners interact with processes instead of only reading about them.",
      "Potential applications include:",
    ],
    points: [
      "Technical training",
      "Equipment operation",
      "Safety procedures",
      "Interactive lessons",
      "Visual demonstrations",
      "Scenario learning",
      "Employee onboarding",
    ],
    extra:
      "The application should be designed around learning objectives rather than immersion alone.",
  },
  {
    icon: Video,
    title: "AR Remote Assistance Applications",
    paragraphs: [
      "Augmented reality can provide contextual digital guidance while users continue looking at physical equipment or environments.",
      "Potential functionality can include:",
    ],
    points: [
      "Step-by-step overlays",
      "Equipment instructions",
      "Visual markers",
      "Real-time guidance",
      "Remote expert assistance",
      "Maintenance information",
    ],
    extra:
      "This can be particularly useful for field operations, technical support and equipment maintenance.",
  },
  {
    icon: Palette,
    title: "3D Modeling and Content Development",
    paragraphs: [
      "AR and VR applications rely heavily on high-quality digital assets.",
      "Depending on the project, immersive development can require:",
    ],
    points: [
      "3D models",
      "Environments",
      "Animations",
      "Textures",
      "Lighting",
      "Interactive objects",
      "Product representations",
    ],
    extra:
      "Models also need to be optimized according to the target platform. A highly detailed asset suitable for a workstation may need substantial optimization before it performs well on a mobile phone or standalone headset.",
  },
  {
    icon: Gauge,
    title: "3D Asset Optimization",
    paragraphs: [
      "Immersive applications need to balance visual quality with device performance.",
      "Optimization considerations can include:",
    ],
    points: [
      "Polygon count",
      "Textures",
      "Materials",
      "Lighting",
      "Animations",
      "Draw calls",
      "Asset size",
      "Memory usage",
      "Rendering performance",
    ],
    extra:
      "Efficient assets help applications maintain a smoother experience across target hardware.",
  },
];

const technologies = [
  ["Unity", "Unity can support real-time 3D and cross-platform AR/VR development across multiple device environments."],
  ["Unreal Engine", "Unreal Engine can be appropriate for immersive applications requiring high-fidelity real-time graphics and complex interactive environments."],
  ["ARKit", "ARKit supports augmented reality capabilities across compatible Apple devices."],
  ["ARCore", "ARCore provides augmented reality capabilities for supported Android environments."],
  ["WebXR", "WebXR can support immersive experiences delivered through compatible browsers."],
  ["OpenXR", "OpenXR can help standardize development across compatible immersive hardware and runtime environments."],
];

const targetDevices = [
  "iPhone",
  "iPad",
  "Android phones",
  "Android tablets",
  "Web browsers",
  "Meta Quest",
  "HTC Vive",
  "Apple Vision Pro",
  "Other compatible XR devices",
];

const platformConsiderations = [
  "User access",
  "Hardware cost",
  "Interaction model",
  "Required mobility",
  "Graphics requirements",
  "Distribution",
  "Deployment environment",
  "Business use case",
];

const questApps = [
  "Training",
  "Simulation",
  "Virtual showrooms",
  "Education",
  "Collaborative environments",
  "Visualization",
];

const visionProUseCases = [
  "3D visualization",
  "Interactive workspaces",
  "Design review",
  "Training",
  "Product demonstrations",
  "Spatial collaboration",
];

const integrationTargets = [
  "APIs",
  "Product catalogs",
  "Ecommerce systems",
  "CRM platforms",
  "ERP systems",
  "Learning management systems",
  "Databases",
  "Content management systems",
  "Cloud platforms",
  "Analytics systems",
  "IoT platforms",
];

const integrationExamples = [
  "Product Catalog → API → AR Application → 3D Product Visualization",
  "LMS → VR Training Application → Completion Data → Reporting System",
];

const uiInteractionMethods = [
  "Touch",
  "Motion",
  "Head movement",
  "Controllers",
  "Hand tracking",
  "Gaze",
  "Spatial positioning",
];

const processSteps = [
  ["1. Discovery", "We identify:", ["Business objective", "User", "Use case", "Environment", "Target devices", "Required integrations", "Content requirements", "Performance expectations"]],
  ["2. Technology and Platform Selection", "We determine whether the project is better suited to:", ["AR", "VR", "MR/XR", "Mobile", "Browser", "Headset", "Spatial computing"]],
  ["3. Experience and UX Design", "We define how users move through and interact with the immersive application."],
  ["4. Prototype", "A prototype can validate the most important interaction or technology assumptions before full development."],
  ["5. 3D Content Preparation", "Required models, environments and visual assets are created or optimized."],
  ["6. Application Development", "The immersive experience, business logic, interfaces and required functionality are developed."],
  ["7. Backend and Integrations", "APIs, databases and business-system integrations are added where required."],
  ["8. Device Testing", "The application is tested on its intended target devices and environments."],
  ["9. Performance Optimization", "Graphics, interactions and assets are optimized for the required hardware."],
  ["10. Deployment", "The application is prepared for its relevant distribution environment."],
  ["11. Maintenance", "clickmasters can support updates, platform changes, new functionality and performance improvements after launch."],
] as const;

const pocTestItems = [
  "Tracking",
  "User interaction",
  "Hardware compatibility",
  "3D visualization",
  "Platform performance",
  "Technical feasibility",
];

const progressPath = "Concept → Prototype → Validation → MVP → Production Application";

const testingConsiderations = [
  "Application functionality",
  "Device compatibility",
  "Tracking accuracy",
  "Motion",
  "Interaction",
  "Rendering",
  "Frame performance",
  "3D assets",
  "User comfort",
  "Integrations",
  "Connectivity",
  "Application stability",
];

const optimizationTopics = [
  "Frame rate",
  "Rendering",
  "Memory",
  "Asset complexity",
  "Loading",
  "Tracking",
  "Network communication",
  "Device temperature",
  "Battery usage",
];

const usaProjects = [
  "New AR mobile applications",
  "VR training platforms",
  "Product visualization tools",
  "Interactive sales demonstrations",
  "Immersive educational applications",
  "Virtual property experiences",
  "Spatial applications",
  "Existing AR/VR app modernization",
  "Enterprise immersive applications",
];

const industries = [
  ["Retail and Ecommerce", "Virtual try-ons, product placement, interactive catalogs and immersive shopping."],
  ["Real Estate and Architecture", "Virtual property tours, spatial visualization and future-environment previews."],
  ["Manufacturing", "Training, equipment visualization, remote assistance and operational guidance."],
  ["Healthcare", "Training, education and visualization applications where appropriate technical and regulatory requirements are addressed."],
  ["Education", "Interactive learning, simulations and visualization."],
  ["Automotive", "Product visualization, training and interactive demonstrations."],
  ["Hospitality and Travel", "Virtual tours and destination experiences."],
  ["Entertainment", "Interactive AR experiences, immersive environments and virtual experiences."],
];

const whyChoose = [
  ["Custom Application Development Approach", "AR/VR sits directly within our custom application development services, so immersive projects can be designed around specific business and user requirements."],
  ["AR, VR and XR Capabilities", "We approach the technology according to the required experience rather than treating all immersive applications as the same."],
  ["Mobile, Web and Headset Environments", "Projects can be planned around the platforms users actually need to access."],
  ["3D and Spatial Experience Planning", "Immersive applications consider 3D content, interaction, performance and spatial UX from the beginning."],
  ["Integration Capabilities", "AR/VR applications can connect with APIs, databases, cloud systems and existing business software."],
  ["Prototype-First Options", "Complex interaction concepts can be validated before committing to full production."],
  ["Testing and Optimization", "Applications can be validated around devices, interactions, rendering and overall performance."],
  ["Full Application Lifecycle", "Our AR VR development agency can support concept, design, development, integration, testing, deployment and continued maintenance."],
];

type StepItem = readonly [string, string, (readonly string[])?];

const faqs = [
  ["What are AR VR development services?", "AR VR development services involve designing, building, testing and deploying augmented reality, virtual reality and related immersive applications for mobile devices, browsers, headsets and spatial computing platforms."],
  ["Is clickmasters an AR VR app development company serving the USA?", "Yes. clickmasters provides AR VR app development services for businesses across the USA, supporting custom augmented reality, virtual reality and XR applications."],
  ["What does an AR VR development agency do?", "An AR VR development agency combines software development, immersive UX, 3D content, real-time interaction, device integration, testing and deployment to build augmented and virtual reality applications."],
  ["What is the difference between AR and VR?", "Augmented reality adds digital content to a user's view of the physical world. Virtual reality replaces the user's surroundings with an immersive digital environment."],
  ["What is the difference between AR, VR, MR and XR?", "AR overlays digital information onto physical environments. VR creates fully virtual environments. Mixed reality allows physical and digital elements to interact more deeply, while XR is an umbrella term covering immersive technologies such as AR, VR and MR."],
  ["What types of AR applications can clickmasters develop?", "AR applications can include product visualization, interactive instructions, virtual try-on experiences, location-based applications, remote guidance and other business-specific augmented reality experiences."],
  ["What types of VR applications can clickmasters develop?", "VR applications can include training simulations, virtual tours, immersive learning, product demonstrations, visualization and other interactive virtual environments."],
  ["Which technologies are used for AR VR development?", "Depending on project requirements, immersive applications can use technologies such as Unity, Unreal Engine, ARKit, ARCore, WebXR and OpenXR."],
  ["Can AR VR applications run on smartphones?", "Yes. Augmented reality applications can run on compatible iOS and Android smartphones and tablets. Some immersive experiences can also be delivered through browsers."],
  ["Can clickmasters develop applications for Meta Quest?", "Projects can be designed for compatible VR headset environments such as Meta Quest where the platform matches the application's requirements."],
  ["Can clickmasters develop Apple Vision Pro applications?", "Spatial applications can be planned for Apple Vision Pro where the device and platform suit the intended users and business use case."],
  ["Can AR VR applications integrate with existing software?", "Yes. Immersive applications can integrate with APIs, databases, ecommerce systems, CRM, ERP, LMS platforms and other compatible business software."],
  ["How much does AR VR application development cost?", "Cost depends on the type of experience, target platforms, 3D content, interactions, backend functionality, integrations, hardware, testing and maintenance requirements."],
  ["How long does AR VR app development take?", "The timeline depends on application complexity, target devices, number of 3D assets, interactions, integrations and testing requirements. A proof of concept generally requires less development than a large production immersive platform."],
  ["Should my business choose AR or VR?", "Choose AR when users need digital information while remaining aware of their physical surroundings. VR is more suitable when the user should be fully immersed in a simulated environment."],
  ["Can AR VR applications connect with IoT devices?", "Yes. Immersive applications can display or interact with information from connected devices where suitable APIs and communication systems are available."],
  ["Does clickmasters provide AR VR application maintenance?", "Yes. Ongoing support can include bug fixes, platform updates, performance improvements, application enhancements and integration changes."],
];

const internalLinks: Record<string, string> = {
  "custom application development services": "/services/custom-application-development/",
  "mobile app development services": "/services/mobile-app-development/",
  "API development services": "/services/api-development/",
  "QA and software testing services": "/services/qa-software-testing/",
  "UI/UX design services": "/services/ui-ux-design/",
  "IoT development services": "/services/iot-development/",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE}/services/ar-vr-development#faq`,
  url: `${SITE}/services/ar-vr-development`,
  mainEntity: faqs.map(([question, answer]) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE}/services/ar-vr-development#service`,
  name: "AR VR Development Services USA",
  alternateName: [
    "AR VR Development Services",
    "AR VR App Development Services",
    "AR VR Application Development",
    "Augmented Reality Development Services",
    "Virtual Reality Development Services",
    "XR Development Services",
    "Custom AR VR Development",
  ],
  url: `${SITE}/services/ar-vr-development`,
  description:
    "clickmasters provides AR VR development services for businesses across the USA, including augmented reality applications, virtual reality applications, XR and mixed reality development, immersive simulations, product visualization, spatial applications, integrations, testing and maintenance.",
  serviceType: "AR VR Development Services",
  category: "Custom Application Development",
  provider: {
    "@type": "Organization",
    "@id": `${SITE}/#organization`,
    name: "clickmasters",
    url: `${SITE}/`,
  },
  areaServed: { "@type": "Country", name: "United States" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "AR VR Development Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Augmented Reality App Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Virtual Reality App Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mixed Reality Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "XR Development Services" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Spatial Computing Application Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "WebAR Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mobile AR App Development", url: `${SITE}/services/mobile-app-development` } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "VR Training and Simulation Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AR Product Visualization Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "3D Application Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AR VR Application Integration", url: `${SITE}/services/api-development` } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AR VR QA and Testing", url: `${SITE}/services/qa-software-testing` } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AR VR Application Maintenance" } },
    ],
  },
};

function TextLink({ children, href }: { children: React.ReactNode; href?: string }) {
  if (!href) return <>{children}</>;
  return (
    <Link
      href={href}
      className="text-[#e8edf2] underline decoration-white/28 underline-offset-4 transition-colors hover:text-white hover:decoration-white/70"
    >
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

function PremiumCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-lg border border-white/[0.07] bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.018))] shadow-2xl shadow-black/20 transition-colors duration-300 hover:border-white/16 ${className}`}
    >
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 bg-white/[0.035] blur-3xl" />
      <div className="relative">{children}</div>
    </div>
  );
}

function CTASolid({ children }: { children: React.ReactNode }) {
  return (
    <Link
      href="/contact"
      className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-medium text-[#050505] shadow-lg shadow-white/10 transition-all hover:bg-white/90 active:scale-[0.98]"
    >
      {children}
      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
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

function ItemGrid({ items }: { items: readonly string[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((item) => (
        <Chip key={item} label={item} />
      ))}
    </div>
  );
}

function ServiceCard({ card }: { card: ServiceCardData }) {
  const Icon = card.icon;
  return (
    <PremiumCard className="p-6 md:p-7">
      <div className="grid h-11 w-11 place-items-center rounded-md border border-white/10 bg-white/[0.045]">
        <Icon className="h-5 w-5 text-chrome" />
      </div>
      <h3 className="mt-6 text-xl font-medium tracking-normal text-white md:text-2xl">
        {card.title}
      </h3>
      <div className="mt-4 space-y-3 text-sm leading-relaxed text-white/60">
        {card.paragraphs.map((paragraph) => (
          <p key={paragraph}>{renderLinkedText(paragraph)}</p>
        ))}
      </div>
      {card.points && (
        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          {card.points.map((point) => (
            <div key={point} className="flex items-start gap-2.5 text-sm text-white/70">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-chrome/75" />
              {point}
            </div>
          ))}
        </div>
      )}
      {card.pointsTitle && <p className="mt-5 text-sm leading-relaxed text-white/60">{card.pointsTitle}</p>}
      {card.points2 && <div className="mt-3"><ItemGrid items={card.points2} /></div>}
      {card.extra && <p className="mt-5 text-sm leading-relaxed text-white/58">{renderLinkedText(card.extra)}</p>}
    </PremiumCard>
  );
}

function SimpleCards({
  items,
  icon: Icon = Shield,
}: {
  items: string[][];
  icon?: LucideIcon;
}) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {items.map(([title, text]) => (
        <PremiumCard key={title} className="p-6">
          <Icon className="mb-5 h-6 w-6 text-chrome" />
          <h3 className="text-lg font-medium tracking-normal text-white">{title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/60">{renderLinkedText(text)}</p>
        </PremiumCard>
      ))}
    </div>
  );
}

function StepCards({ items }: { items: readonly StepItem[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map(([title, text, points]) => (
        <PremiumCard key={title} className="p-6">
          <h3 className="text-lg font-medium tracking-normal text-white md:text-xl">{title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/60">{text}</p>
          {points && (
            <div className="mt-4">
              <ItemGrid items={points} />
            </div>
          )}
        </PremiumCard>
      ))}
    </div>
  );
}

function HeroVisual() {
  return (
    <div className="relative h-[496px] overflow-hidden rounded-md bg-[#0a0a0a]">
      <div className="pointer-events-none absolute inset-0 opacity-[0.5] [background-image:linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.06)_1px,transparent_1px)] [background-size:40px_40px]" />
      <svg viewBox="0 0 520 496" className="relative h-full w-full" aria-hidden="true">
        <g fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="1">
          <path d="M260 64 L260 40" />
          <path d="M60 248 L20 248" />
          <path d="M460 248 L500 248" />
          <path d="M260 432 L260 456" />
          <path d="M80 90 L180 90 L180 190" />
          <path d="M440 90 L340 90 L340 190" />
          <path d="M80 406 L180 406 L180 288" />
          <path d="M440 406 L340 406 L340 288" />
          <path d="M260 90 L260 190" />
          <path d="M260 406 L260 288" />
          <path d="M180 190 L340 190 L340 288 L180 288 L180 190" />
        </g>
        {["L", "R", "T", "B"].map((side) =>
          Array.from({ length: 6 }).map((_, i) => {
            const y = 210 + i * 16;
            const x = 256 + i * 6;
            return side === "T" ? (
              <rect key={`T${i}`} x={x} y={66} width="3" height="14" fill="rgba(255,255,255,0.25)" />
            ) : side === "B" ? (
              <rect key={`B${i}`} x={x} y={416} width="3" height="14" fill="rgba(255,255,255,0.25)" />
            ) : side === "L" ? (
              <rect key={`L${i}`} x="66" y={y} width="14" height="3" fill="rgba(255,255,255,0.25)" />
            ) : (
              <rect key={`R${i}`} x="440" y={y} width="14" height="3" fill="rgba(255,255,255,0.25)" />
            );
          }),
        )}
        <g fontFamily="ui-sans-serif, system-ui, sans-serif" fontSize="12" fill="rgba(255,255,255,0.42)">
          <text x="72" y="80" textAnchor="start">3D Assets</text>
          <text x="370" y="80" textAnchor="start">Spatial UX</text>
          <text x="261" y="52" textAnchor="middle">AR / VR · XR</text>
          <text x="261" y="476" textAnchor="middle">Hand Tracking</text>
          <text x="28" y="244" textAnchor="start">Headsets</text>
          <text x="468" y="244" textAnchor="start">Mobile AR</text>
          <text x="192" y="396" textAnchor="middle">Unity · Unreal</text>
          <text x="330" y="396" textAnchor="middle">ARKit · WebXR</text>
        </g>
        <g>
          <rect x="200" y="198" width="120" height="100" rx="10" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.25" />
          <line x1="234" y1="248" x2="286" y2="248" stroke="rgba(255,255,255,0.3)" strokeWidth="1.25" />
          <rect x="214" y="232" width="48" height="32" rx="10" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
          <rect x="262" y="232" width="48" height="32" rx="10" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
          <rect x="236" y="274" width="52" height="8" rx="4" fill="rgba(255,255,255,0.14)" />
        </g>
        <g fontFamily="ui-sans-serif, system-ui, sans-serif" textAnchor="middle">
          <text x="260" y="220" fontSize="13" fill="rgba(255,255,255,0.82)">IMMERSIVE</text>
          <text x="260" y="312" fontSize="11" fill="rgba(255,255,255,0.5)">Spatial · 3D · XR</text>
        </g>
        <g fill="rgba(255,255,255,0.3)">
          <rect x="222" y="196" width="3" height="3" />
          <rect x="296" y="196" width="3" height="3" />
          <rect x="222" y="299" width="3" height="3" />
          <rect x="296" y="299" width="3" height="3" />
        </g>
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
    </div>
  );
}

export default function ARVRDevelopment() {
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
                AR VR Development Services USA
              </div>
              <h1 className="text-chrome mt-7 max-w-4xl text-[clamp(2.35rem,6.5vw,6.2rem)] font-medium leading-[0.94] tracking-normal">
                AR VR Development Services USA
              </h1>
              <div className="mt-7 max-w-2xl space-y-4 text-lg leading-relaxed text-white/68">
                {introParagraphs.map((paragraph) => (
                  <p key={paragraph}>{renderLinkedText(paragraph)}</p>
                ))}
              </div>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <CTASolid>Discuss Your AR/VR Project</CTASolid>
              </div>
            </div>

            <PremiumCard className="min-h-[520px] p-3">
              <HeroVisual />
            </PremiumCard>
          </div>
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1120px)] px-4">
          <SectionHeading title="AR VR App Development Company for USA Businesses" />
          <div className="grid gap-4 md:grid-cols-2">
            <PremiumCard className="p-6">
              <p className="text-[15px] leading-relaxed text-white/62">AR and VR can provide new ways for customers, employees and other users to interact with digital information.</p>
            </PremiumCard>
            <PremiumCard className="p-6">
              <p className="text-[15px] leading-relaxed text-white/62">Unlike conventional applications that primarily use screens, menus and forms, immersive applications can use:</p>
            </PremiumCard>
          </div>
          <div className="mt-6"><ItemGrid items={interactionWays} /></div>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-white/55">As an AR VR development company serving businesses across the USA, clickmasters develops immersive applications around practical business and user requirements rather than adding AR or VR simply because the technology is available.</p>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/55">Potential applications include:</p>
          <div className="mt-6"><ItemGrid items={potentialApps} /></div>
          <PremiumCard className="mt-6 p-6">
            <p className="text-[15px] leading-relaxed text-white/62">The most appropriate technology depends on what the user needs to accomplish and which devices will be used.</p>
          </PremiumCard>
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <SectionHeading title="What Are AR VR Development Services?" />
          <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
            <PremiumCard className="p-6 md:p-8">
              <div className="space-y-4 text-[15px] leading-relaxed text-white/62">
                <p>AR VR development services cover the planning, design, engineering, testing, deployment and maintenance of applications that use augmented reality, virtual reality, mixed reality or related spatial technologies.</p>
                <p>Augmented reality adds digital content to a user&apos;s view of the physical world, while virtual reality places the user inside a digitally created environment.</p>
                <p>Rather than treating immersive work as a single template, clickmasters selects the approach according to the experience the business actually needs.</p>
              </div>
            </PremiumCard>
            <PremiumCard className="p-6 md:p-8">
              <p className="mb-5 text-sm leading-relaxed text-white/60">A complete immersive application project can include:</p>
              <ItemGrid items={immersiveServices} />
            </PremiumCard>
          </div>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-white/55">clickmasters brings these capabilities together through an end-to-end AR VR development agency approach.</p>
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <SectionHeading title="Our AR VR App Development Services" />
          <div className="grid gap-5 lg:grid-cols-2">
            {serviceCards.map((card) => (
              <ServiceCard key={card.title} card={card} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <SectionHeading title="AR VR Technologies" text="Technology selection should follow the requirements of the application." />
          <p className="mb-8 max-w-3xl text-sm leading-relaxed text-white/55">Depending on platform and functionality, immersive development can involve technologies such as:</p>
          <SimpleCards items={technologies} icon={Cpu} />
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-white/55">The correct technology is selected according to platform, performance, functionality and maintenance requirements.</p>
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <SectionHeading title="AR VR Platforms and Devices" text="An immersive application's target platform affects both user experience and technical architecture." />
          <PremiumCard className="p-6 md:p-8">
            <p className="mb-5 text-sm leading-relaxed text-white/60">Projects may target:</p>
            <ItemGrid items={targetDevices} />
          </PremiumCard>
          <PremiumCard className="mt-5 p-6 md:p-8">
            <p className="mb-5 text-sm leading-relaxed text-white/60">Platform selection should consider:</p>
            <ItemGrid items={platformConsiderations} />
          </PremiumCard>
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <SectionHeading title="Meta Quest Application Development" text="Meta Quest and similar standalone VR devices can support immersive applications without requiring a conventional desktop computer during normal use." />
          <PremiumCard className="p-6 md:p-8">
            <p className="mb-5 text-sm leading-relaxed text-white/60">Potential applications include:</p>
            <ItemGrid items={questApps} />
          </PremiumCard>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-white/55">The application architecture should consider headset performance, input methods and intended usage environment.</p>
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <SectionHeading title="Apple Vision Pro and Spatial Application Development" text="Spatial computing platforms such as Apple Vision Pro introduce new ways for applications to combine digital content with the user's surroundings." />
          <PremiumCard className="p-6 md:p-8">
            <p className="mb-5 text-sm leading-relaxed text-white/60">Potential use cases include:</p>
            <ItemGrid items={visionProUseCases} />
          </PremiumCard>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-white/55">The decision to target a spatial platform should depend on the intended users and business value rather than platform novelty.</p>
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <SectionHeading title="AR VR Application Integrations" text="Immersive applications often need to work with existing software rather than operate independently." />
          <PremiumCard className="p-6 md:p-8">
            <p className="mb-5 text-sm leading-relaxed text-white/60">clickmasters can design integrations with:</p>
            <ItemGrid items={integrationTargets} />
          </PremiumCard>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-white/55">Our API development services can support application-to-system communication where appropriate.</p>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/55">For example:</p>
          <div className="mt-6 flex flex-col items-start gap-3">
            {integrationExamples.map((example) => (
              <Chip key={example} label={example} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1120px)] px-4">
          <SectionHeading title="AR VR and IoT Integration" />
          <PremiumCard className="p-6 md:p-8">
            <div className="space-y-4 text-[15px] leading-relaxed text-white/62">
              <p>Immersive applications can also interact with connected devices and physical equipment.</p>
              <p>An AR application could display information generated by sensors or equipment, while a VR environment could use operational data to simulate physical processes.</p>
            </div>
          </PremiumCard>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-white/55">Where immersive software connects with connected devices, our IoT development services can support the wider device and data architecture.</p>
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <SectionHeading title="AR VR UI UX Design" text="Immersive interface design differs from conventional screen-based UI." />
          <PremiumCard className="p-6 md:p-8">
            <p className="mb-5 text-sm leading-relaxed text-white/60">Users may interact through:</p>
            <ItemGrid items={uiInteractionMethods} />
          </PremiumCard>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-white/55">Our UI/UX design services can support user flows, interaction design, prototyping and interface planning.</p>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/55">The goal is to make immersive interactions understandable rather than overwhelming users with unnecessary 3D controls.</p>
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <SectionHeading title="AR VR App Development Process" text="As an AR VR development agency, clickmasters uses a structured process from concept through deployment." />
          <StepCards items={processSteps} />
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <SectionHeading title="AR VR Prototype and Proof of Concept Development" text="A prototype can be particularly useful for immersive applications because user interaction and hardware performance can be difficult to validate from wireframes alone." />
          <PremiumCard className="p-6 md:p-8">
            <p className="mb-5 text-sm leading-relaxed text-white/60">An AR/VR proof of concept can test:</p>
            <ItemGrid items={pocTestItems} />
          </PremiumCard>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-white/55">The progression can be:</p>
          <div className="mt-4"><Chip label={progressPath} /></div>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-white/55">This can reduce technical uncertainty before larger development investment.</p>
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <SectionHeading title="AR VR Testing and Quality Assurance" text="Immersive application testing can involve more than conventional functional QA." />
          <PremiumCard className="p-6 md:p-8">
            <p className="mb-5 text-sm leading-relaxed text-white/60">Testing can consider:</p>
            <ItemGrid items={testingConsiderations} />
          </PremiumCard>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-white/55">Our QA and software testing services can support broader testing requirements.</p>
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <SectionHeading title="AR VR Performance Optimization" text="Performance is particularly important in immersive applications because low frame rates, tracking problems or excessive latency can directly affect usability." />
          <PremiumCard className="p-6 md:p-8">
            <p className="mb-5 text-sm leading-relaxed text-white/60">Optimization can address:</p>
            <ItemGrid items={optimizationTopics} />
          </PremiumCard>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-white/55">Performance should be considered during development rather than treated as a final-stage adjustment.</p>
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <SectionHeading title="AR VR Development Services for USA Businesses" text="clickmasters provides AR VR development services for businesses across the USA, supporting startups, product companies and enterprises developing immersive digital applications." />
          <p className="mb-6 max-w-3xl text-sm leading-relaxed text-white/55">Projects can include:</p>
          <ItemGrid items={usaProjects} />
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-white/55">Our remote delivery model allows businesses across the USA to work with an AR VR development company through discovery, design, prototyping, development, testing and deployment.</p>
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <SectionHeading title="Industries Using AR and VR" text="AR and VR are applied across industries where immersive interaction adds practical value." />
          <SimpleCards items={industries} icon={Layers3} />
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-white/55">Each industry requires different workflows, devices and business objectives, so the development approach should be based on the actual use case.</p>
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <SectionHeading title="Why Choose clickmasters as Your AR VR App Development Company?" />
          <SimpleCards items={whyChoose} icon={Shield} />
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1040px)] px-4">
          <div className="relative overflow-hidden rounded-lg border border-white/[0.06] bg-gradient-to-br from-[#161616] via-[#0e0e0e] to-[#0a0a0a] px-6 py-12 text-center md:py-20">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#050505_90%)]" />
            <div className="relative">
              <h2 className="text-chrome text-[clamp(2rem,6vw,4.5rem)] font-medium leading-[1.0] tracking-normal">Start Your AR VR Application Development Project</h2>
              <div className="mx-auto mt-8 max-w-2xl space-y-4 text-white/55 leading-relaxed text-[15px] md:text-base">
                <p>Whether you need an augmented reality product visualization app, virtual reality training platform, spatial experience or custom XR application, clickmasters can help determine the appropriate platform, development approach and application architecture.</p>
                <p>Our AR VR development services in the USA cover the journey from initial concept and prototype through immersive application development, integrations, testing, deployment and ongoing support.</p>
              </div>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <CTASolid>Discuss Your AR/VR Project</CTASolid>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,920px)] px-4">
          <SectionHeading title="Frequently Asked Questions About AR VR Development" />
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