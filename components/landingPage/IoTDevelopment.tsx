"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  Check,
  ChevronRight,
  Cloud,
  Cpu,
  Gauge,
  Layers,
  Network,
  Radio,
  Router,
  Shield,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

const SITE = "https://clickmastersapplicationdevelopment.com";

const introParagraphs = [
  "clickmasters provides end-to-end IoT development services in the USA for businesses building connected products, intelligent devices and data-driven digital systems. We develop the software layers that connect physical devices with cloud platforms, backend systems, mobile and web applications, analytics and existing business technology.",
  "As an IoT development company, clickmasters can support projects from early requirements and architecture through device integration, embedded software, application development, testing, deployment and ongoing maintenance.",
  "Our IoT capabilities form part of our broader custom application development services, allowing us to build connected applications around specific devices, workflows, users and operational requirements rather than generic software templates.",
  "Whether you are developing a new connected product, integrating existing hardware, creating an IoT monitoring platform or modernizing an existing system, our IoT development agency can help build the software ecosystem required to connect the physical and digital parts of your solution.",
];

const solutionAround = [
  "Sensors and smart devices",
  "Embedded systems",
  "Equipment and machinery",
  "Connected consumer products",
  "Remote monitoring",
  "Device control",
  "Asset tracking",
  "Data collection",
  "Operational dashboards",
  "Automated alerts",
  "IoT analytics",
  "Enterprise system integration",
];

const iotLayers = [
  "IoT consulting and architecture",
  "Device and sensor integration",
  "Embedded software development",
  "Connectivity implementation",
  "Edge and gateway development",
  "Cloud and backend engineering",
  "IoT API development",
  "Device management",
  "Mobile IoT applications",
  "Web dashboards",
  "Real-time data processing",
  "Analytics",
  "AI integration",
  "Security",
  "QA and testing",
  "Deployment",
  "Monitoring and maintenance",
];

const serviceCards = [
  {
    icon: Layers,
    title: "IoT Consulting and Architecture",
    paragraphs: [
      "Successful IoT development starts with understanding how the entire connected system needs to operate.",
      "Before engineering begins, we can help define:",
    ],
    points: [
      "Device requirements",
      "User requirements",
      "Data flows",
      "Connectivity needs",
      "Cloud requirements",
      "Backend architecture",
      "Application interfaces",
      "Integration points",
      "Security requirements",
      "Scalability expectations",
      "Deployment environments",
    ],
    extra:
      "The objective is to create a clear architecture before individual technologies are selected.",
  },
  {
    icon: Smartphone,
    title: "IoT Application Development",
    paragraphs: [
      "Our IoT application development services cover the user-facing and operational software required to interact with connected devices.",
      "Applications can provide functionality such as:",
    ],
    points: [
      "Device status",
      "Live telemetry",
      "Remote control",
      "User accounts",
      "Alerts",
      "Configuration",
      "Device onboarding",
      "Historical data",
      "Reports",
      "Analytics",
      "Location information",
      "Automation rules",
    ],
    extra:
      "IoT applications may be delivered through web, mobile or desktop environments according to the users and operational requirements involved.",
  },
  {
    icon: Cpu,
    title: "Embedded Software Development",
    paragraphs: [
      "Connected hardware often requires software operating directly on the device.",
      "Our embedded software development services support IoT products that need software tightly integrated with sensors, processors, controllers and other hardware components.",
      "Embedded development can support:",
    ],
    points: [
      "Device logic",
      "Sensor interaction",
      "Data acquisition",
      "Device communication",
      "Local processing",
      "Hardware control",
      "Power-conscious operation",
      "Connectivity management",
    ],
    extra:
      "Embedded software is an important link between the physical device and the wider IoT application ecosystem.",
  },
  {
    icon: Network,
    title: "IoT Device Integration",
    paragraphs: [
      "Existing devices do not automatically become useful IoT assets simply because they can produce data.",
      "Device integration establishes how physical equipment exchanges information with gateways, applications and backend systems.",
      "Depending on the technical environment, integration can involve:",
    ],
    points: [
      "Sensors",
      "Controllers",
      "Gateways",
      "Smart devices",
      "Industrial equipment",
      "Existing connected products",
      "Third-party hardware",
      "Specialized peripherals",
    ],
    extra:
      "The integration architecture should account for reliability, connectivity, device identification and the format of the data being exchanged.",
  },
  {
    icon: Radio,
    title: "IoT Connectivity Development",
    paragraphs: [
      "Connectivity determines how devices communicate with nearby systems, gateways, applications or cloud infrastructure.",
      "Different IoT environments can require different technologies.",
      "Potential connectivity approaches can include:",
    ],
    points: [
      "MQTT",
      "HTTP/HTTPS",
      "WebSockets",
      "Bluetooth Low Energy",
      "Wi-Fi",
      "Zigbee",
      "Matter",
      "LoRaWAN",
      "Cellular connectivity",
    ],
    pointsTitle: "Technology should be selected according to factors such as:",
    points2: [
      "Distance",
      "Power consumption",
      "Data volume",
      "Latency",
      "Network availability",
      "Device count",
      "Reliability",
      "Environment",
    ],
    extra:
      "A battery-powered sensor sending small telemetry messages has different connectivity requirements from industrial equipment continuously exchanging operational data.",
  },
  {
    icon: Router,
    title: "IoT Gateway and Edge Development",
    paragraphs: [
      "Not every IoT workload should send all raw data directly to the cloud.",
      "Gateways and edge systems can process information closer to where it is generated.",
      "Edge processing can be useful where a connected solution requires:",
    ],
    points: [
      "Lower latency",
      "Local decision-making",
      "Reduced bandwidth usage",
      "Offline functionality",
      "Data filtering",
      "Device aggregation",
      "Faster event response",
    ],
    extra:
      "A typical architecture may operate as: Device → Edge or Gateway → Cloud → Application. The amount of processing performed at each layer depends on the use case.",
  },
  {
    icon: Cloud,
    title: "IoT Cloud and Backend Development",
    paragraphs: [
      "Cloud and backend infrastructure provides the digital foundation for many connected-device ecosystems.",
      "The backend can be responsible for:",
    ],
    points: [
      "Device communication",
      "Data ingestion",
      "User accounts",
      "Authentication",
      "Device records",
      "Data storage",
      "Rules and automation",
      "Notifications",
      "APIs",
      "Reporting",
      "Analytics",
      "Integration with business systems",
    ],
    extra:
      "Depending on requirements, an IoT solution may use cloud services from platforms such as AWS or Microsoft Azure, custom cloud infrastructure or a combination of managed and purpose-built components. The cloud architecture should reflect expected device volume, message frequency, data retention, reliability and operating cost.",
  },
  {
    icon: Gauge,
    title: "IoT Device Management",
    paragraphs: [
      "Developing the first device connection is only part of the IoT lifecycle.",
      "Production systems may need to manage hundreds or thousands of connected devices over time.",
      "Device management can include:",
    ],
    points: [
      "Device registration",
      "Provisioning",
      "Authentication",
      "Device configuration",
      "Health monitoring",
      "Remote diagnostics",
      "Status tracking",
      "Software or firmware version management",
      "Alerts",
      "Remote updates",
      "Decommissioning",
    ],
    extra:
      "Device lifecycle management becomes increasingly important as the number of deployed devices grows.",
  },
  {
    icon: Smartphone,
    title: "IoT Mobile App Development",
    paragraphs: [
      "Mobile applications can give customers, employees and operators convenient access to connected devices.",
      "An IoT mobile application can support:",
    ],
    points: [
      "Device onboarding",
      "Bluetooth pairing",
      "Remote control",
      "Live telemetry",
      "Push notifications",
      "Settings",
      "Account management",
      "Location features",
      "Historical data",
      "Usage analytics",
    ],
    extra:
      "Where mobile access is central to the product, our mobile app development services can support the wider application requirements.",
  },
  {
    icon: BarChart3,
    title: "IoT Web Dashboard Development",
    paragraphs: [
      "Web dashboards provide centralized visibility into devices, users and IoT-generated data.",
      "A dashboard can include:",
    ],
    points: [
      "Device lists",
      "Device health",
      "Real-time telemetry",
      "Historical charts",
      "Maps",
      "Alerts",
      "Reports",
      "User management",
      "Remote configuration",
      "Business KPIs",
      "Fleet management",
    ],
    extra:
      "Web interfaces are particularly useful for operations teams managing larger groups of connected devices. Our web application development services can support more complex browser-based IoT platforms.",
  },
];

const howItWorks = [
  ["1. Device or Sensor", "A physical device detects an event, measurement or operational condition.", ["Temperature", "Location", "Pressure", "Movement", "Battery level", "Equipment status"]],
  ["2. Embedded Software", "Software running on the device interprets hardware input and determines what information needs to be transmitted."],
  ["3. Connectivity", "The device communicates through an appropriate protocol or network."],
  ["4. Gateway or Edge Layer", "Where required, a gateway can aggregate, filter or process device information locally."],
  ["5. Cloud and Backend", "Backend services receive and process device data, apply business logic and store required information."],
  ["6. Application", "A web, mobile or desktop application allows users to monitor or control the system."],
  ["7. Analytics and Automation", "IoT data can be used to create reports, trigger alerts, automate actions or support analytical models."],
  ["8. Business Integration", "Information can then flow into CRM, ERP, maintenance, logistics or other enterprise systems."],
] as const;

const apiIntegrationItems = [
  "ERP platforms",
  "CRM systems",
  "Business applications",
  "Mobile applications",
  "Web applications",
  "Cloud services",
  "Analytics platforms",
  "Maintenance systems",
  "Logistics software",
  "Third-party APIs",
];

const realtimeItems = [
  "Operational monitoring",
  "Equipment alerts",
  "Location tracking",
  "Automated responses",
  "Safety notifications",
  "Device-status changes",
  "Anomaly detection",
];

const analyticsItems = [
  "Usage patterns",
  "Equipment behavior",
  "Operational anomalies",
  "Resource consumption",
  "Performance trends",
  "Maintenance needs",
  "Location patterns",
  "Device reliability",
];

const aiItems = [
  "Predictive maintenance",
  "Anomaly detection",
  "Intelligent alerts",
  "Usage forecasting",
  "Automated optimization",
  "Computer vision",
  "Equipment health analysis",
];

const securityGroups = [
  ["Device Security", ["Device identity", "Authentication", "Secure configuration", "Protected firmware", "Controlled updates"]],
  ["Communication Security", ["Encrypted communication", "Secure protocols", "Certificate management"]],
  ["Cloud Security", ["Access controls", "Identity management", "Data protection", "Environment security"]],
  ["API Security", ["Authentication", "Authorization", "Input validation", "Rate controls"]],
  ["Application Security", ["User authentication", "Role-based access", "Secure sessions", "Data protection"]],
] as const;

const updateItems = ["Security patches", "Bug fixes", "Configuration changes", "Performance improvements", "New functionality"];
const updateMechanismItems = ["Device identity", "Version control", "Update integrity", "Connectivity interruptions", "Rollback", "Deployment monitoring"];

const qaItems = [
  "Device behavior",
  "Embedded software",
  "Connectivity",
  "APIs",
  "Backend systems",
  "Mobile applications",
  "Web dashboards",
  "Cloud infrastructure",
  "Data flows",
  "Security",
  "Performance",
  "Failure conditions",
];

const realWorldQaItems = [
  "Connectivity loss",
  "Delayed messages",
  "Device failure",
  "Duplicate data",
  "Unexpected input",
  "Large device volumes",
];

const scaleItems = [
  "Number of devices",
  "Message frequency",
  "Data volume",
  "Concurrent connections",
  "Storage",
  "Processing",
  "Availability",
  "Monitoring",
  "Device lifecycle",
  "Cloud costs",
];

const technologyLayers = [
  ["Device and Embedded Layer", "Technologies can include C, C++ and embedded development environments where suitable."],
  ["Connectivity Layer", "Potential technologies include MQTT, HTTP, WebSockets, BLE, Zigbee, Matter and other protocols according to device requirements."],
  ["Backend Layer", "Backend development can involve technologies such as Python, JavaScript, Java and appropriate frameworks."],
  ["Cloud Layer", "Projects can use suitable cloud and IoT infrastructure, including managed services available through platforms such as AWS and Azure."],
  ["Application Layer", "Web, mobile and desktop technologies are selected according to how users need to interact with the IoT ecosystem."],
];

const solutionExamples = [
  ["Remote Monitoring Systems", "Track device, equipment or environmental information without requiring continuous physical inspection."],
  ["Asset Tracking Applications", "Monitor the location or condition of valuable equipment and inventory."],
  ["Connected Product Applications", "Give customers mobile or web interfaces for interacting with physical products."],
  ["Equipment Monitoring", "Collect operational data that helps teams understand equipment status and performance."],
  ["Smart Building Applications", "Connect environmental, access, energy and facility systems through centralized software."],
  ["Fleet and Logistics Monitoring", "Collect vehicle, asset or shipment information for operational visibility."],
  ["Energy Monitoring", "Track consumption, device performance or environmental information."],
  ["Industrial IoT Applications", "Connect equipment and operational systems for monitoring, automation and process improvement."],
];

const industries = [
  "Manufacturing",
  "Healthcare",
  "Logistics",
  "Transportation",
  "Energy",
  "Automotive",
  "Retail",
  "Agriculture",
  "Smart buildings",
  "Consumer technology",
  "Telecommunications",
];

const processSteps = [
  ["1. Discovery", "We identify:", ["Business problem", "Users", "Devices", "Hardware environment", "Data requirements", "Connectivity", "Integrations", "Security requirements", "Expected scale"]],
  ["2. IoT Architecture", "We define how the device, connectivity, edge, cloud, backend and application components should interact."],
  ["3. Proof of Concept", "Where appropriate, an IoT proof of concept can validate key technical assumptions before wider development.", ["Device connectivity", "Sensor data", "Cloud communication", "Application interaction", "Technical feasibility"]],
  ["4. Embedded and Device Integration", "Connected-device software and communication layers are implemented according to the hardware environment."],
  ["5. Cloud and Backend Development", "Backend systems are developed to receive, process, manage and expose IoT-generated information."],
  ["6. Application Development", "Mobile applications, dashboards or other user interfaces are developed around the required workflows."],
  ["7. Integration", "The IoT platform is connected with relevant business systems and third-party services."],
  ["8. Security and Testing", "Each important layer is validated according to project requirements."],
  ["9. Deployment", "The complete IoT ecosystem is prepared for production use."],
  ["10. Monitoring and Maintenance", "clickmasters can continue supporting applications, integrations and connected software after launch."],
] as const;

const pocQuestions = [
  "Can the hardware communicate reliably?",
  "Does the selected protocol work in the intended environment?",
  "Can device data reach the backend?",
  "Can the application control or monitor the device?",
  "Is the proposed architecture technically feasible?",
];

const timelineFactors = [
  "Hardware readiness",
  "Embedded software requirements",
  "Connectivity",
  "Number of application layers",
  "Cloud architecture",
  "Integrations",
  "Security",
  "Device management",
  "Testing",
  "Regulatory requirements",
  "Deployment scale",
];

const usaNeeds = [
  "Launch a connected product",
  "Add software to existing hardware",
  "Build an IoT monitoring system",
  "Develop a device-control application",
  "Connect equipment to cloud infrastructure",
  "Integrate IoT data with business systems",
  "Scale an existing IoT platform",
  "Modernize connected software",
];

const whyChoose = [
  ["End-to-End IoT Development", "We consider the complete connected system rather than focusing only on the mobile or web interface."],
  ["Custom Application Expertise", "IoT development is connected directly with our custom application development services, allowing applications to be designed around specific device and business requirements."],
  ["Embedded Software Capabilities", "Our related embedded software development services support software operating closer to the hardware layer."],
  ["Application Development Across Platforms", "clickmasters can support the mobile, web and desktop interfaces used to monitor and control connected systems."],
  ["Integration-Focused Engineering", "IoT applications can connect with APIs, databases, ERP systems, CRM platforms and other technology environments."],
  ["Data and AI Capabilities", "Connected-device information can be combined with analytics or AI where those technologies create practical value."],
  ["Full Development Lifecycle", "Our IoT development agency can support architecture, development, testing, deployment and continued maintenance."],
  ["Scalable Approach", "We consider future device counts, data volumes and operational requirements when planning the architecture."],
];

const faqs = [
  ["What are IoT development services?", "IoT development services cover the design, engineering, integration, deployment and maintenance of systems that connect physical devices with embedded software, connectivity, cloud infrastructure, backend services and mobile or web applications."],
  ["Is clickmasters an IoT development company serving the USA?", "Yes. clickmasters provides IoT development services for businesses across the USA, supporting connected applications, device integration, embedded software, cloud systems, dashboards, mobile applications and related development requirements."],
  ["What does an IoT development agency do?", "An IoT development agency helps design and build the software ecosystem required to connect physical devices with applications and digital infrastructure. Services can include architecture, embedded development, connectivity, cloud engineering, application development, integration, testing and maintenance."],
  ["What is IoT application development?", "IoT application development is the process of building software that allows users and business systems to interact with connected devices. These applications can provide monitoring, control, configuration, alerts, analytics and other device-related functionality."],
  ["Can clickmasters develop embedded software for IoT devices?", "Yes. Embedded software requirements can be supported through clickmasters' dedicated embedded software development capabilities where the project requires software operating directly on connected hardware."],
  ["Can an IoT application connect to existing hardware?", "Yes, where the device provides suitable technical interfaces. The integration approach depends on the hardware, firmware, connectivity and communication methods supported by the device."],
  ["Which communication technologies are used in IoT?", "IoT systems can use technologies such as MQTT, HTTP, WebSockets, Bluetooth Low Energy, Wi-Fi, Zigbee, Matter, LoRaWAN and cellular connectivity. The correct option depends on power, range, data volume, latency and environment."],
  ["Can IoT applications use cloud platforms?", "Yes. IoT applications commonly use cloud infrastructure for device communication, data storage, processing, APIs, device management and application services."],
  ["How much does IoT development cost in the USA?", "Cost depends on hardware, embedded software, connectivity, cloud infrastructure, applications, integrations, analytics, security, testing and the expected scale of the device fleet. Defining the IoT architecture is necessary before producing a reliable estimate."],
  ["How long does IoT development take?", "The timeline depends on hardware readiness, software complexity, connectivity, integrations, application requirements and testing. Projects involving new hardware and embedded software usually have different timelines from applications using established connected devices."],
  ["How do IoT and AI work together?", "IoT devices collect and exchange physical-world data, while AI can analyze that information to identify patterns, make predictions or automate decisions. AI complements IoT rather than replacing it."],
  ["Can an IoT system work without constant internet connectivity?", "Yes. Depending on the architecture, devices or gateways can process and store information locally and synchronize with cloud infrastructure when connectivity becomes available."],
  ["How do you secure an IoT application?", "IoT security can involve device authentication, encrypted communications, secure APIs, access controls, protected data, controlled firmware updates and cloud security. The required controls depend on the device, data and operating environment."],
  ["Can IoT data integrate with ERP or CRM software?", "Yes. APIs and integration services can connect IoT platforms with ERP, CRM, analytics and other business systems where appropriate interfaces are available."],
  ["Does clickmasters provide ongoing IoT application support?", "Yes. Ongoing support can include software maintenance, application updates, integration changes, performance improvements, security updates and additional functionality."],
];

const internalLinks: Record<string, string> = {
  "custom application development services": "/services/custom-application-development/",
  "embedded software development services": "/services/embedded-software-development/",
  "mobile app development services": "/services/mobile-app-development/",
  "web application development services": "/services/web-application-development/",
  "API development services": "/services/api-development/",
  "data analytics services": "/services/data-analytics/",
  "AI application development services": "/services/ai-application-development/",
};

type StepItem = readonly [string, string, (readonly string[])?];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE}/services/iot-development#faq`,
  url: `${SITE}/services/iot-development`,
  mainEntity: faqs.map(([question, answer]) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE}/services/iot-development#service`,
  name: "IoT Development Services USA",
  alternateName: [
    "IoT Development Services",
    "IoT Application Development Services",
    "IoT Software Development",
    "Custom IoT Development",
    "IoT App Development Services USA",
  ],
  url: `${SITE}/services/iot-development`,
  description:
    "clickmasters provides IoT development services for businesses across the USA, including connected-device applications, embedded software, device integration, cloud and backend development, IoT dashboards, mobile applications, analytics, security, testing and maintenance.",
  serviceType: "IoT Development Services",
  category: "Custom Application Development",
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
      "Startups, SMBs, product companies and enterprises requiring IoT development services",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "IoT Development Services",
    itemListElement: [
      { name: "IoT Consulting and Architecture" },
      { name: "IoT Application Development" },
      { name: "Embedded Software Development", url: `${SITE}/services/embedded-software-development` },
      { name: "IoT Device Integration" },
      { name: "IoT Connectivity Development" },
      { name: "IoT Gateway and Edge Development" },
      { name: "IoT Cloud and Backend Development" },
      { name: "IoT Device Management" },
      { name: "IoT Mobile App Development", url: `${SITE}/services/mobile-app-development` },
      { name: "IoT Web Application Development", url: `${SITE}/services/web-application-development` },
      { name: "IoT API Integration", url: `${SITE}/services/api-development` },
      { name: "IoT Analytics", url: `${SITE}/services/data-analytics` },
      { name: "IoT Security and Testing" },
      { name: "IoT Maintenance and Support" },
    ].map((item) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        ...item,
      },
    })),
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

function ServiceCard({ card }: { card: (typeof serviceCards)[number] }) {
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

export default function IoTDevelopment() {
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
                IoT Development Services USA
              </div>
              <h1 className="text-chrome mt-7 max-w-4xl text-[clamp(2.35rem,6.5vw,6.2rem)] font-medium leading-[0.94] tracking-normal">
                IoT Development Services USA
              </h1>
              <div className="mt-7 max-w-2xl space-y-4 text-lg leading-relaxed text-white/68">
                {introParagraphs.map((paragraph) => (
                  <p key={paragraph}>{renderLinkedText(paragraph)}</p>
                ))}
              </div>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <CTASolid>Discuss Your IoT Project</CTASolid>
              </div>
            </div>

            <PremiumCard className="min-h-[520px] p-3">
              <div className="relative h-[496px] overflow-hidden rounded-md">
                <Image
                  src="/images/api.jpeg"
                  alt="IoT development"
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

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1120px)] px-4">
          <SectionHeading title="IoT Development Company for USA Businesses" />
          <div className="grid gap-4 md:grid-cols-2">
            <PremiumCard className="p-6">
              <p className="text-[15px] leading-relaxed text-white/62">IoT development brings physical devices and software together so businesses can collect data, monitor equipment, automate processes and remotely interact with connected products.</p>
            </PremiumCard>
          </div>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-white/55">As an IoT development company serving businesses across the USA, clickmasters helps organizations build connected solutions around:</p>
          <div className="mt-6"><ItemGrid items={solutionAround} /></div>
          <PremiumCard className="mt-6 p-6">
            <p className="text-[15px] leading-relaxed text-white/62">The correct IoT architecture depends on the device, connectivity requirements, data volumes, operating environment, security requirements and the applications that will consume or act on the information.</p>
          </PremiumCard>
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <SectionHeading title="What Are IoT Development Services?" />
          <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
            <PremiumCard className="p-6 md:p-8">
              <div className="space-y-4 text-[15px] leading-relaxed text-white/62">
                <p>IoT development services cover the design, engineering, integration, deployment and maintenance of software systems that connect physical devices with digital applications and infrastructure.</p>
                <p>A typical IoT system can include several interconnected layers:</p>
                <p>Physical Device → Embedded Software → Connectivity → Gateway or Edge → Cloud → Backend → Application → Analytics → Business System</p>
                <p>Professional IoT development can therefore involve much more than building a mobile interface.</p>
              </div>
            </PremiumCard>
            <PremiumCard className="p-6 md:p-8">
              <p className="mb-5 text-sm leading-relaxed text-white/60">Depending on project requirements, IoT development may include:</p>
              <ItemGrid items={iotLayers} />
            </PremiumCard>
          </div>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-white/55">clickmasters brings these components together through a coordinated IoT development agency approach.</p>
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <SectionHeading title="Our IoT Development Services" />
          <div className="grid gap-5 lg:grid-cols-2">
            {serviceCards.map((card) => (
              <ServiceCard key={card.title} card={card} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <SectionHeading title="How an IoT Application Works" text="A useful way to understand IoT architecture is to follow the flow of information." />
          <StepCards items={howItWorks} />
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-white/55">This creates the complete relationship:</p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/70">Physical World → Connected Device → Software → Data → Business Action</p>
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <SectionHeading title="IoT API and System Integration" text="IoT solutions become more valuable when connected-device data can be used by the rest of the organization." />
          <PremiumCard className="p-6 md:p-8">
            <p className="mb-5 text-sm leading-relaxed text-white/60">Our {renderLinkedText("API development services")} can support integration between IoT systems and:</p>
            <ItemGrid items={apiIntegrationItems} />
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-white/55">The objective is to prevent valuable IoT information from becoming isolated inside a separate platform.</p>
          </PremiumCard>
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <SectionHeading title="Real-Time IoT Data Processing" text="Many IoT use cases depend on information being processed soon after it is generated." />
          <PremiumCard className="p-6 md:p-8">
            <p className="mb-5 text-sm leading-relaxed text-white/60">Real-time or near-real-time processing can support:</p>
            <ItemGrid items={realtimeItems} />
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-white/55">The appropriate architecture depends on the volume of incoming information, required response time and the actions the system needs to perform.</p>
          </PremiumCard>
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <SectionHeading title="IoT Analytics and Business Intelligence" />
          <PremiumCard className="p-6 md:p-8">
            <div className="mb-5 space-y-4 text-[15px] leading-relaxed text-white/62">
              <p>Collecting device data alone does not create business value.</p>
              <p>Information needs to be processed and presented in a form that supports decisions or automation.</p>
              <p>IoT analytics can help organizations identify:</p>
            </div>
            <ItemGrid items={analyticsItems} />
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-white/55">Our {renderLinkedText("data analytics services")} can support projects where connected-device data needs deeper analysis.</p>
          </PremiumCard>
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <SectionHeading title="AI and IoT Development" />
          <PremiumCard className="p-6 md:p-8">
            <div className="mb-5 space-y-4 text-[15px] leading-relaxed text-white/62">
              <p>Artificial intelligence and IoT solve different parts of a connected system.</p>
              <p>IoT connects devices and collects information from the physical world.</p>
              <p>AI can analyze that information and support predictions, classifications or automated decisions.</p>
              <p>Together, AI and IoT can support use cases such as:</p>
            </div>
            <ItemGrid items={aiItems} />
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-white/55">For solutions requiring more advanced intelligence, our {renderLinkedText("AI application development services")} can support the AI layer of the system.</p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/55">AI does not replace IoT. It can increase the value of the data generated by connected devices.</p>
          </PremiumCard>
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <SectionHeading title="IoT Security Development" />
          <div className="mb-8 max-w-4xl space-y-4 text-[15px] leading-relaxed text-white/62">
            <p>IoT security needs to protect multiple parts of the system.</p>
            <p>Unlike a conventional application, an IoT ecosystem can include physical devices, communications, cloud infrastructure, APIs, applications and business data.</p>
            <p>Security considerations can include:</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {securityGroups.map(([title, items]) => (
              <PremiumCard key={title} className="p-6">
                <Shield className="mb-5 h-6 w-6 text-chrome" />
                <h3 className="text-lg font-medium tracking-normal text-white">{title}</h3>
                <div className="mt-4"><ItemGrid items={items} /></div>
              </PremiumCard>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-white/55">Security requirements should be defined according to the devices, data, users, industry and deployment environment involved.</p>
        </div>
      </section>

      {[
        ["Over-the-Air Updates and Device Lifecycle", "Connected devices can remain deployed for years. The software and firmware operating those devices may need to evolve throughout that period.", "Where technically appropriate, update capabilities can support:", updateItems, "The update mechanism should account for:", updateMechanismItems, "Lifecycle planning is especially important for large IoT fleets because manually updating every device may not be practical."],
        ["IoT Testing and Quality Assurance", "IoT quality assurance extends beyond testing an application interface.", "The complete system may require validation across:", qaItems, "Testing should also consider real-world scenarios such as:", realWorldQaItems, ""],
        ["Scalable IoT Architecture", "A successful prototype may involve only a handful of devices. A production IoT platform can involve hundreds, thousands or significantly more connected endpoints.", "Architecture therefore needs to consider:", scaleItems, "", [], "Scalability should be planned around realistic growth rather than adding unnecessary infrastructure before it is required."],
      ].map(([title, text, listTitle, list, secondTitle, secondList, outro]) => (
        <section key={title as string} className="relative border-t border-white/5 py-16 md:py-24">
          <div className="mx-auto w-[min(92vw,1240px)] px-4">
            <SectionHeading title={title as string} text={text as string} />
            <PremiumCard className="p-6 md:p-8">
              <p className="mb-5 text-sm leading-relaxed text-white/60">{listTitle as string}</p>
              <ItemGrid items={list as string[]} />
              {secondTitle ? (
                <>
                  <p className="mt-6 mb-5 text-sm leading-relaxed text-white/60">{secondTitle as string}</p>
                  <ItemGrid items={secondList as string[]} />
                </>
              ) : null}
              {outro ? <p className="mt-6 max-w-3xl text-sm leading-relaxed text-white/55">{renderLinkedText(outro as string)}</p> : null}
            </PremiumCard>
          </div>
        </section>
      ))}

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <SectionHeading title="IoT Development Technologies" text="IoT systems usually involve several technology layers." />
          <div className="mb-8 max-w-4xl space-y-4 text-[15px] leading-relaxed text-white/62">
            <p>Rather than selecting technology from a generic stack, clickmasters evaluates what each part of the connected ecosystem needs to accomplish.</p>
          </div>
          <SimpleCards items={technologyLayers} icon={Cpu} />
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-white/55">The technology architecture should support the device and business requirements rather than dictate them.</p>
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <SectionHeading title="IoT Solutions We Can Develop" text="IoT technology can be used wherever connected devices provide meaningful operational or customer value." />
          <p className="mb-6 max-w-3xl text-sm leading-relaxed text-white/55">Examples include:</p>
          <SimpleCards items={solutionExamples} icon={Activity} />
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <SectionHeading title="IoT Development Across Industries" text="Our IoT development services can support connected-product and operational requirements across industries such as:" />
          <ItemGrid items={industries} />
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-white/55">The architecture should reflect the industry environment rather than applying one IoT template to every project.</p>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/55">Different industries can have significantly different requirements around connectivity, reliability, data, security and device lifecycle.</p>
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <SectionHeading title="Our IoT Development Process" text="As an IoT development agency, clickmasters follows a structured approach from concept through production." />
          <StepCards items={processSteps} />
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <SectionHeading title="IoT Proof of Concept to Production" text="IoT development often benefits from validating the highest-risk assumptions before committing to full-scale production." />
          <PremiumCard className="p-6 md:p-8">
            <p className="mb-5 text-sm leading-relaxed text-white/60">A typical path may look like:</p>
            <p className="mb-6 text-sm leading-relaxed text-white/70">Discovery → Architecture → Proof of Concept → MVP → Production → Scale</p>
            <p className="mb-5 text-sm leading-relaxed text-white/60">A PoC can help answer questions such as:</p>
            <ItemGrid items={pocQuestions} />
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-white/55">Once those assumptions have been validated, development can expand into a production-ready platform.</p>
          </PremiumCard>
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <SectionHeading title="How Long Does IoT Development Take?" />
          <PremiumCard className="p-6 md:p-8">
            <p className="mb-5 text-sm leading-relaxed text-white/60">IoT development timelines depend on:</p>
            <ItemGrid items={timelineFactors} />
            <div className="mt-6 max-w-4xl space-y-4 text-[15px] leading-relaxed text-white/62">
              <p>An application using established hardware can generally progress differently from a project that requires new device engineering and complex embedded development.</p>
              <p>For this reason, clickmasters structures IoT development into defined phases rather than treating the complete system as one undivided project.</p>
            </div>
          </PremiumCard>
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <SectionHeading title="IoT Development Services for USA Businesses" text="clickmasters provides IoT development services for businesses across the USA, supporting startups, product companies, SMBs and enterprises developing connected software and digital products." />
          <p className="mb-6 max-w-3xl text-sm leading-relaxed text-white/55">Our delivery model can support organizations that need to:</p>
          <ItemGrid items={usaNeeds} />
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-white/55">Our IoT development company approach combines application engineering with the wider software architecture required by connected devices.</p>
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <SectionHeading title="Why Choose clickmasters as Your IoT Development Company?" />
          <SimpleCards items={whyChoose} icon={Shield} />
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1040px)] px-4">
          <div className="relative overflow-hidden rounded-lg border border-white/[0.06] bg-gradient-to-br from-[#161616] via-[#0e0e0e] to-[#0a0a0a] px-6 py-12 text-center md:py-20">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#050505_90%)]" />
            <div className="relative">
              <h2 className="text-chrome text-[clamp(2rem,6vw,4.5rem)] font-medium leading-[1.0] tracking-normal">Start Your IoT Development Project</h2>
              <div className="mx-auto mt-8 max-w-2xl space-y-4 text-white/55 leading-relaxed text-[15px] md:text-base">
                <p>Whether you are developing a connected product, integrating existing devices, building a monitoring platform or creating an IoT ecosystem from the ground up, clickmasters can help define how the device, cloud, software and data layers should work together.</p>
                <p>Our IoT development services in the USA support projects from early architecture and proof of concept through application development, integration, testing, deployment and continued support.</p>
              </div>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <CTASolid>Discuss Your IoT Project</CTASolid>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,920px)] px-4">
          <SectionHeading title="Frequently Asked Questions About IoT Development" />
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
