"use client";

import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import {
  AppWindow,
  ArrowRight,
  ArrowUpRight,
  Bluetooth,
  Check,
  ChevronRight,
  CircuitBoard,
  Code2,
  Layers,
  Layers3,
  Monitor,
  Package,
  Plug,
  Rocket,
  Settings,
  Shield,
  Terminal,
  Timer,
  Waypoints,
  Wifi,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";

const SITE = "https://clickmastersapplicationdevelopment.com";

const introParagraphs = [
  "clickmasters provides embedded software development services in the USA for businesses building connected devices, intelligent products and hardware-integrated software systems. We develop software that operates close to the hardware layer, including firmware, device drivers, board support packages, embedded operating systems, middleware and device-level applications.",
  "As an embedded software development company, clickmasters helps businesses connect physical hardware with reliable software built around performance, memory, power, connectivity, security and real-time requirements.",
  "Embedded engineering is a core part of our broader IoT development services. This connection allows us to support the complete device ecosystem—from software running directly on hardware through connectivity, cloud infrastructure, applications and IoT data processing.",
  "Whether you are developing a new connected product, integrating new hardware, modernizing legacy firmware or building software for an existing device, our embedded software development agency can support the project from architecture and prototyping through development, integration, testing and ongoing maintenance.",
];

const constraints = [
  "Processing power",
  "Memory",
  "Storage",
  "Energy consumption",
  "Real-time response",
  "Hardware interfaces",
  "Connectivity",
  "Reliability",
  "Security",
  "Operating conditions",
];

const embeddedRequirements = [
  "Connected IoT devices",
  "Smart products",
  "Industrial equipment",
  "Sensors",
  "Controllers",
  "Monitoring devices",
  "Consumer electronics",
  "Hardware-connected products",
  "Edge devices",
  "Technical equipment",
  "Embedded user interfaces",
  "Specialized business hardware",
];

const professionalServices = [
  "Embedded architecture",
  "Firmware development",
  "Bootloader development",
  "Board support packages",
  "Hardware abstraction layers",
  "Device driver development",
  "Board bring-up",
  "RTOS integration",
  "Embedded Linux development",
  "Middleware",
  "Communication protocols",
  "Embedded applications",
  "Hardware-software integration",
  "IoT connectivity",
  "Embedded security",
  "Testing and validation",
  "Performance optimization",
  "Maintenance and modernization",
];

const embeddedStack = [
  "Hardware",
  "Bootloader",
  "BSP / HAL",
  "Device Drivers",
  "RTOS or Embedded Linux",
  "Middleware",
  "Embedded Application",
  "Connectivity",
  "IoT Platform",
];

const serviceCards = [
  {
    icon: Settings,
    title: "Custom Embedded Software Development",
    paragraphs: [
      "Our custom embedded software development services are designed around specific hardware, device requirements and product objectives.",
      "Custom embedded software can control:",
    ],
    points: [
      "Sensors",
      "Displays",
      "Communication modules",
      "Motors",
      "Input devices",
      "Measurement equipment",
      "Controllers",
      "Storage",
      "Network interfaces",
      "Specialized peripherals",
    ],
    extra:
      "The software architecture is determined according to the hardware environment and required behavior rather than applying the same framework to every device.",
  },
  {
    icon: Code2,
    title: "Firmware Development Services",
    paragraphs: [
      "Firmware provides low-level instructions that control how hardware behaves.",
      "Our embedded development capabilities can support firmware requirements such as:",
    ],
    points: [
      "Hardware initialization",
      "Sensor communication",
      "Peripheral control",
      "Device configuration",
      "Data acquisition",
      "Connectivity management",
      "Power management",
      "Local processing",
      "Device state management",
      "Error handling",
      "Firmware updates",
    ],
    extra:
      "Firmware development requires careful understanding of both software logic and hardware behavior. For connected products, firmware also becomes the first software layer in the wider IoT ecosystem supported through our IoT development services.",
  },
  {
    icon: CircuitBoard,
    title: "Bare-Metal Embedded Development",
    paragraphs: [
      "Some embedded devices do not require a complete operating system.",
      "Bare-metal software can run directly on a microcontroller when the device requires:",
    ],
    points: [
      "Low overhead",
      "Fast startup",
      "Tight resource control",
      "Predictable execution",
      "Simple dedicated functionality",
      "Low power consumption",
    ],
    extra:
      "The decision between bare-metal development and an operating system depends on application complexity, timing requirements, hardware resources and future functionality.",
  },
  {
    icon: Rocket,
    title: "Bootloader Development",
    paragraphs: [
      "A bootloader prepares the embedded system to start its main software.",
      "Depending on the product, a bootloader can be responsible for:",
    ],
    points: [
      "Hardware initialization",
      "Firmware validation",
      "Memory setup",
      "Firmware loading",
      "Update handling",
      "Recovery processes",
      "Secure startup",
    ],
    extra:
      "Bootloader design becomes especially important for connected products that require secure or remote software updates.",
  },
  {
    icon: Layers,
    title: "Board Support Package Development",
    paragraphs: [
      "A Board Support Package, or BSP, enables operating-system and application software to work correctly with a specific hardware platform.",
      "BSP development can involve:",
    ],
    points: [
      "Bootloader configuration",
      "Board initialization",
      "Processor support",
      "Memory configuration",
      "Peripheral configuration",
      "Device drivers",
      "Hardware abstraction",
      "Operating-system integration",
    ],
    extra:
      "The relationship is generally: Hardware Board → BSP → Operating System → Embedded Application. A well-designed BSP helps separate hardware-specific implementation from higher-level application functionality.",
  },
  {
    icon: Plug,
    title: "Device Driver Development",
    paragraphs: [
      "Device drivers enable embedded software and operating systems to communicate with hardware components.",
      "Custom device driver development may be required for:",
    ],
    points: [
      "Sensors",
      "Displays",
      "Storage",
      "Cameras",
      "Network interfaces",
      "Communication modules",
      "Audio hardware",
      "USB devices",
      "Serial peripherals",
      "Custom electronics",
    ],
    extra:
      "Driver development requires understanding both the hardware interface and the software environment in which the driver operates.",
  },
  {
    icon: Layers3,
    title: "Hardware Abstraction Layer Development",
    paragraphs: [
      "A Hardware Abstraction Layer can separate application logic from hardware-specific implementation.",
      "This can help make embedded software:",
    ],
    points: [
      "Easier to maintain",
      "More portable",
      "Easier to test",
      "Simpler to migrate",
      "Less dependent on one hardware revision",
    ],
    extra:
      "A well-structured abstraction layer can also reduce the engineering effort required when a product later moves to different processors or hardware platforms.",
  },
  {
    icon: Workflow,
    title: "Board Bring-Up and Hardware Integration",
    paragraphs: [
      "When new hardware is developed, software engineers need to verify that the board and its major components operate correctly.",
      "Board bring-up can include validation of:",
    ],
    points: [
      "Processor startup",
      "Memory",
      "Storage",
      "Clock configuration",
      "Power systems",
      "Communication interfaces",
      "Sensors",
      "Peripherals",
      "Displays",
      "Network connectivity",
    ],
    extra:
      "Problems found during board bring-up may originate from either hardware or software. Our embedded engineering approach therefore considers the interaction between both layers rather than treating them independently.",
  },
  {
    icon: Timer,
    title: "RTOS Development and Integration",
    paragraphs: [
      "A real-time operating system can be useful when an embedded device needs predictable response to events.",
      "RTOS-based development can support applications with:",
    ],
    points: [
      "Real-time tasks",
      "Deterministic behavior",
      "Multiple concurrent processes",
      "Hardware interrupts",
      "Timing constraints",
      "Communication tasks",
      "Device-control logic",
    ],
    pointsTitle:
      "Depending on project requirements, embedded systems may use RTOS environments such as FreeRTOS, Zephyr or other appropriate platforms. The selection depends on:",
    points2: [
      "Hardware resources",
      "Timing requirements",
      "Application complexity",
      "Connectivity",
      "Security requirements",
      "Ecosystem support",
      "Long-term maintenance",
    ],
  },
  {
    icon: Terminal,
    title: "Embedded Linux Development",
    paragraphs: [
      "Embedded Linux can be suitable for devices requiring more complex software functionality, networking and application environments.",
      "Our embedded development approach can support requirements involving:",
    ],
    points: [
      "Linux kernel configuration",
      "Device drivers",
      "Board support packages",
      "Operating-system customization",
      "Boot configuration",
      "User-space applications",
      "Networking",
      "Security",
      "Update mechanisms",
      "System optimization",
    ],
    extra:
      "Embedded Linux is commonly suitable for systems with greater processing and memory resources than smaller microcontroller-based devices.",
  },
  {
    icon: Package,
    title: "Yocto and Buildroot-Based Embedded Systems",
    paragraphs: [
      "For custom Linux-based products, build systems such as Yocto or Buildroot can be considered where appropriate.",
      "These technologies can help create tailored Linux environments containing only the components required by the device.",
      "Potential benefits include:",
    ],
    points: [
      "Greater operating-system control",
      "Custom package selection",
      "Reproducible builds",
      "Smaller system images",
      "Hardware-specific configuration",
      "Controlled software dependencies",
    ],
    extra:
      "The correct Linux build strategy depends on product complexity, lifecycle requirements and internal engineering needs.",
  },
  {
    icon: Waypoints,
    title: "Embedded Middleware Development",
    paragraphs: [
      "Middleware connects lower-level system software with embedded applications.",
      "It can simplify communication between:",
    ],
    points: [
      "Hardware drivers",
      "Operating systems",
      "Communication services",
      "Data processing",
      "Application logic",
      "External systems",
    ],
    pointsTitle: "Embedded middleware can support functionality such as:",
    points2: [
      "Communication protocols",
      "Data exchange",
      "Device services",
      "Messaging",
      "Hardware abstraction",
      "Connectivity",
      "Application APIs",
    ],
    extra:
      "Good middleware architecture can make large embedded systems easier to extend and maintain.",
  },
  {
    icon: AppWindow,
    title: "Embedded Application Development",
    paragraphs: [
      "Higher-level applications can operate on top of the embedded software stack.",
      "Examples can include:",
    ],
    points: [
      "Device-control applications",
      "Monitoring interfaces",
      "Configuration software",
      "Local dashboards",
      "Human-machine interfaces",
      "Data-processing applications",
      "Connected product interfaces",
    ],
    extra:
      "The application layer needs to work reliably with the lower-level firmware, drivers and operating environment.",
  },
  {
    icon: Monitor,
    title: "Human-Machine Interface Development",
    paragraphs: [
      "Embedded products sometimes require local graphical or physical interfaces that allow users to interact directly with the device.",
      "HMI development can include:",
    ],
    points: [
      "Touchscreen interfaces",
      "Device dashboards",
      "Status displays",
      "Control panels",
      "Configuration interfaces",
      "Industrial interfaces",
      "Embedded GUI applications",
    ],
    extra:
      "The interface must account for hardware limitations, screen dimensions, performance and the context in which users operate the device.",
  },
  {
    icon: Wifi,
    title: "Embedded Software for IoT Devices",
    paragraphs: [
      "Embedded software is one of the core foundations of an IoT system.",
      "A typical connected architecture can look like:",
      "Sensor → Embedded Software → Connectivity → Gateway/Cloud → IoT Application → Analytics",
      "The embedded layer can:",
    ],
    points: [
      "Read sensor information",
      "Control the physical device",
      "Process information locally",
      "Manage connectivity",
      "Send telemetry",
      "Receive commands",
      "Handle local failures",
      "Apply device configuration",
    ],
    extra:
      "Our IoT development services extend beyond this embedded layer into device connectivity, cloud infrastructure, dashboards, mobile applications, device management, data analytics and enterprise integration. This makes the relationship between the two services clear: IoT Development → includes → Embedded Software Development",
  },
  {
    icon: Bluetooth,
    title: "Embedded Connectivity Development",
    paragraphs: [
      "Connected devices need reliable communication with nearby devices, gateways or remote infrastructure.",
      "Depending on requirements, embedded connectivity can involve technologies and interfaces such as:",
    ],
    points: [
      "Bluetooth Low Energy",
      "Wi-Fi",
      "Ethernet",
      "Cellular",
      "MQTT",
      "CAN",
      "UART",
      "SPI",
      "I²C",
      "USB",
      "Modbus",
      "Other device-specific communication methods",
    ],
    pointsTitle: "The right technology depends on:",
    points2: [
      "Distance",
      "Data volume",
      "Latency",
      "Power",
      "Hardware",
      "Environment",
      "Reliability",
      "Network architecture",
    ],
    extra:
      "Connectivity should be selected according to the device requirements rather than technology popularity.",
  },
  {
    icon: Zap,
    title: "Edge Computing and Embedded Systems",
    paragraphs: [
      "Some devices need to process information locally before sending it elsewhere.",
      "Edge processing can reduce dependence on cloud connectivity and support:",
    ],
    points: [
      "Lower latency",
      "Local decisions",
      "Offline behavior",
      "Reduced network usage",
      "Real-time processing",
      "Data filtering",
      "Local automation",
    ],
    extra:
      "For IoT systems, the relationship may become: Device → Embedded Processing → Edge → Cloud → Application. The amount of work performed locally versus in the cloud depends on the device and business requirements.",
  },
];

const rtosVsLinuxRows = [
  ["Deterministic real-time behavior", "Strong", "Requires additional consideration"],
  ["Very limited resources", "Strong", "Usually requires more resources"],
  ["Complex networking", "Moderate to strong", "Strong"],
  ["Rich application environment", "More limited", "Strong"],
  ["Fast boot requirements", "Strong", "Depends on configuration"],
  ["Complex user interface", "Possible", "Strong"],
  ["Extensive package ecosystem", "Limited", "Strong"],
  ["Small MCU-based device", "Strong", "Usually unsuitable"],
  ["MPU-based intelligent device", "Possible", "Strong"],
];

const securityItems = [
  ["Secure Boot", "Verify trusted software before allowing the device to run."],
  ["Firmware Integrity", "Protect software against unauthorized modification."],
  ["Device Authentication", "Ensure that connected devices can prove their identity."],
  ["Encryption", "Protect sensitive information in storage and during communication."],
  ["Access Control", "Restrict functions according to user, device or system permissions."],
  ["Secure Updates", "Protect firmware and software update processes against unauthorized changes."],
  ["Credential Protection", "Secure certificates, keys and other device credentials."],
  ["Vulnerability Management", "Monitor and address weaknesses throughout the product lifecycle."],
];

const updateItems = ["Security patches", "Bug fixes", "Configuration changes", "Performance improvements", "New features"];
const updateMechanismItems = ["Device authentication", "Firmware signing", "Update integrity", "Interrupted downloads", "Version management", "Rollback", "Deployment monitoring"];

const testingItems = [
  "Unit testing",
  "Functional testing",
  "Integration testing",
  "Hardware-software testing",
  "Driver testing",
  "Communication testing",
  "Performance testing",
  "Memory testing",
  "Stress testing",
  "Regression testing",
  "Security testing",
  "Device validation",
];

const hilItems = [
  "Timing",
  "Device responses",
  "Inputs",
  "Outputs",
  "Failure conditions",
  "Communication",
  "Control algorithms",
];

const performanceItems = [
  "Memory consumption",
  "CPU utilization",
  "Boot time",
  "Response latency",
  "Power consumption",
  "Storage",
  "Communication overhead",
  "Battery life",
];

const lowPowerItems = [
  "Processor sleep states",
  "Sensor polling",
  "Network usage",
  "Radio activity",
  "Wake cycles",
  "Background tasks",
  "Local processing",
  "Data transmission frequency",
];

const documentationItems = [
  "Software architecture",
  "Build instructions",
  "Hardware interfaces",
  "Driver interfaces",
  "APIs",
  "Communication protocols",
  "Configuration",
  "Testing procedures",
  "Deployment processes",
  "Release notes",
  "Maintenance information",
];

const legacyIssues = [
  "End-of-life processors",
  "Unsupported operating systems",
  "Obsolete libraries",
  "Old toolchains",
  "Security vulnerabilities",
  "Difficult maintenance",
  "Performance limitations",
  "New connectivity requirements",
];

const modernizationItems = [
  "Firmware refactoring",
  "Processor migration",
  "RTOS migration",
  "Linux/kernel upgrades",
  "Driver replacement",
  "BSP migration",
  "Architecture improvements",
  "Security improvements",
  "Communication upgrades",
];

const processSteps = [
  ["1. Requirements and Hardware Assessment", "We identify:", ["Hardware platform", "Processor or controller", "Memory", "Sensors", "Peripherals", "Communication interfaces", "Timing requirements", "Power requirements", "Connectivity", "Security", "Application functionality"]],
  ["2. Embedded Architecture", "We determine the required software layers and define how they interact. This can include:", ["Bootloader", "BSP", "Drivers", "RTOS or Linux", "Middleware", "Applications", "Connectivity", "Cloud communication"]],
  ["3. Prototype and Technical Validation", "High-risk technical assumptions can be tested before wider development."],
  ["4. Firmware and Low-Level Development", "Required firmware, drivers, BSPs and other low-level components are implemented."],
  ["5. Operating-System and Middleware Integration", "The operating environment and communication layers are integrated where required."],
  ["6. Application Development", "Higher-level embedded functionality is developed around the product requirements."],
  ["7. Hardware-Software Integration", "Software is integrated with the target hardware and validated under realistic conditions."],
  ["8. Testing and Optimization", "The system is tested for functionality, reliability, performance and other required quality attributes."],
  ["9. Deployment", "Production-ready builds, documentation and required deployment assets are prepared."],
  ["10. Maintenance", "The embedded software can continue receiving updates, optimization and security improvements throughout the product lifecycle."],
] as const;

const costFactorRows = [
  ["Hardware platform", "Different processors and boards require different engineering"],
  ["Firmware complexity", "More device behavior requires more development"],
  ["BSP requirements", "Custom board support increases low-level work"],
  ["Device drivers", "New peripherals may require custom drivers"],
  ["Operating system", "RTOS or Linux integration affects scope"],
  ["Connectivity", "Communication protocols add engineering and testing"],
  ["Security", "Secure boot, encryption and updates add complexity"],
  ["Hardware integration", "New boards require deeper validation"],
  ["Testing", "Hardware-software systems need broader QA"],
  ["Performance", "Real-time or low-power requirements require optimization"],
  ["Legacy migration", "Existing code and hardware dependencies increase analysis"],
  ["Documentation", "Product handoff and lifecycle documentation require effort"],
];

const usaNeeds = [
  "Startups building new hardware products",
  "Product companies developing connected devices",
  "IoT businesses requiring device-side software",
  "Enterprises modernizing embedded systems",
  "Manufacturers developing intelligent equipment",
  "Businesses integrating new sensors and hardware",
  "Teams requiring additional embedded engineering expertise",
];

const industries = [
  ["Industrial Systems", "Machine control, monitoring systems, industrial equipment and automation."],
  ["IoT and Connected Devices", "Sensors, gateways, smart products and remote-monitoring devices."],
  ["Healthcare Technology", "Connected medical and monitoring equipment where appropriate technical and regulatory requirements are addressed."],
  ["Automotive Technology", "Vehicle systems, diagnostics, connected components and other embedded applications."],
  ["Consumer Electronics", "Smart devices, appliances and connected products."],
  ["Energy", "Monitoring devices, controllers, metering and intelligent energy systems."],
  ["Telecommunications", "Networking, communications and connected equipment."],
  ["Robotics", "Controllers, sensors, motion systems and device-level intelligence."],
];

const whyChoose = [
  ["IoT-Connected Engineering", "Embedded development connects directly with our IoT development services, allowing device-level software to integrate with connectivity, cloud and application layers."],
  ["Hardware-Aware Development", "We approach embedded software according to the characteristics and limitations of the target hardware."],
  ["Low-Level Software Capabilities", "Projects can involve firmware, BSPs, device drivers, bootloaders, operating systems and middleware according to requirements."],
  ["RTOS and Embedded Linux Options", "Operating-system architecture is selected according to hardware resources, real-time needs and application complexity."],
  ["Security-Oriented Development", "Security considerations can be incorporated across boot, firmware, communications and update mechanisms."],
  ["Testing and Validation", "Software is validated in relation to the actual hardware environment rather than only through isolated software testing."],
  ["Long-Term Maintainability", "Architecture, documentation and update strategies can help make embedded products easier to maintain throughout their lifecycle."],
  ["Full Application Ecosystem", "For connected products, clickmasters can extend development beyond the embedded layer into IoT platforms, APIs, cloud infrastructure, web applications, mobile applications and analytics."],
];

type StepItem = readonly [string, string, (readonly string[])?];

const faqs = [
  ["What are embedded software development services?", "Embedded software development services involve designing, developing, integrating, testing and maintaining software that operates directly on or closely with physical hardware. Services can include firmware, drivers, BSPs, operating systems, middleware and embedded applications."],
  ["Is clickmasters an embedded software development company serving the USA?", "Yes. clickmasters provides embedded software development services for businesses across the USA, supporting connected devices, firmware, hardware integration, operating systems, IoT applications and related embedded engineering requirements."],
  ["What does an embedded software development agency do?", "An embedded software development agency creates software for hardware-based products and systems. This can include firmware, board support packages, device drivers, RTOS or Linux integration, middleware, hardware-software integration, testing and maintenance."],
  ["How does embedded software relate to IoT development?", "Embedded software operates on the device and controls how hardware collects data, performs actions and communicates. IoT development extends this environment by connecting devices with gateways, cloud platforms, web or mobile applications, analytics and business systems."],
  ["What is the difference between firmware and embedded software?", "Firmware is generally a low-level form of software that directly controls hardware. Embedded software is the broader category and can include firmware, drivers, operating systems, middleware and device-level applications."],
  ["What is a Board Support Package?", "A Board Support Package contains the software components needed to enable an operating system and higher-level software to work with a specific hardware platform. It can include initialization code, drivers, boot configuration and hardware-specific support."],
  ["What are device drivers in embedded systems?", "Device drivers allow operating systems or embedded software to communicate with hardware components such as sensors, displays, storage devices and communication modules."],
  ["What is an RTOS?", "A real-time operating system is designed to execute tasks with predictable timing. It is commonly used in embedded systems where events need to be processed within defined time constraints."],
  ["Should I use an RTOS or Embedded Linux?", "An RTOS is often suitable for resource-constrained and deterministic systems, while Embedded Linux can be more appropriate for devices requiring complex networking, richer software environments and more extensive application functionality. The right choice depends on hardware and product requirements."],
  ["Can clickmasters develop embedded software for IoT devices?", "Yes. Embedded software is a direct component of clickmasters' IoT development service cluster and can support device control, data collection, connectivity and communication with wider IoT infrastructure."],
  ["Can embedded software be updated remotely?", "Yes, where the hardware and system architecture support it. OTA update functionality can allow firmware patches, bug fixes and new functionality to be distributed to deployed devices."],
  ["How is embedded software secured?", "Security can include secure boot, firmware integrity, encrypted communications, device authentication, controlled updates, protected credentials and vulnerability management. Requirements depend on the device and deployment environment."],
  ["How much does embedded software development cost?", "Cost depends on hardware complexity, firmware, BSP and driver requirements, operating system, connectivity, security, testing, performance requirements and modernization needs. The target hardware needs to be assessed before an accurate estimate can be produced."],
  ["How long does embedded software development take?", "The timeline depends on hardware readiness, firmware complexity, drivers, operating systems, integrations, testing and any hardware revisions required during development."],
  ["Can clickmasters modernize existing embedded software?", "Yes. Existing embedded software can be assessed for firmware refactoring, processor migration, BSP changes, operating-system upgrades, security improvements and broader legacy modernization."],
  ["Does clickmasters provide embedded software maintenance?", "Yes. Ongoing support can include bug fixes, compatibility improvements, security updates, firmware changes, performance optimization and new functionality."],
];

const internalLinks: Record<string, string> = {
  "custom application development services": "/services/custom-application-development/",
  "IoT development services": "/services/iot-development/",
  "IoT Development": "/services/iot-development/",
  "API development services": "/services/api-development/",
  "QA and software testing services": "/services/qa-software-testing/",
  "legacy software modernization services": "/services/legacy-software-modernization/",
  "mobile app development services": "/services/mobile-app-development/",
  "web application development services": "/services/web-application-development/",
  "AI application development services": "/services/ai-application-development/",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE}/services/embedded-software-development#faq`,
  url: `${SITE}/services/embedded-software-development`,
  mainEntity: faqs.map(([question, answer]) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE}/services/embedded-software-development#service`,
  name: "Embedded Software Development Services USA",
  alternateName: [
    "Embedded Software Development Services",
    "Embedded Systems Development Services",
    "Custom Embedded Software Development",
    "Embedded Software Engineering Services",
    "Firmware Development Services",
  ],
  url: `${SITE}/services/embedded-software-development`,
  description:
    "clickmasters provides embedded software development services for businesses across the USA, including firmware, device drivers, BSP development, RTOS integration, Embedded Linux, hardware-software integration, IoT connectivity, testing and maintenance.",
  serviceType: "Embedded Software Development Services",
  category: "IoT Development",
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
      "Startups, product companies, IoT businesses and enterprises requiring embedded software development",
  },
  isPartOf: {
    "@type": "Service",
    "@id": `${SITE}/services/iot-development#service`,
    name: "IoT Development Services",
    url: `${SITE}/services/iot-development`,
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Embedded Software Development Capabilities",
    itemListElement: [
      "Custom Embedded Software Development",
      "Firmware Development",
      "Bootloader Development",
      "Board Support Package Development",
      "Device Driver Development",
      "RTOS Development and Integration",
      "Embedded Linux Development",
      "Embedded Middleware Development",
      "Hardware-Software Integration",
      "Embedded Software Security",
      "Embedded Software Testing and Validation",
      "Legacy Embedded Software Modernization",
    ].map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name },
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

function SectionHeading({
  kicker,
  title,
  text,
}: {
  kicker?: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="mb-10 grid gap-5 md:mb-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
      <div>
        {kicker && (
          <p className="eyebrow flex items-center gap-3 text-white/40">
            <span className="h-px w-8 bg-gradient-to-r from-chrome/80 to-transparent" />
            {kicker}
          </p>
        )}
        <h2 className="text-chrome mt-5 max-w-3xl text-3xl font-medium leading-[1.02] tracking-normal md:text-5xl">
          {title}
        </h2>
      </div>
      {text && (
        <p className="max-w-2xl text-[15px] leading-relaxed text-white/58 lg:justify-self-end">
          {renderLinkedText(text)}
        </p>
      )}
    </div>
  );
}

function PremiumCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`group relative overflow-hidden rounded-lg border border-white/[0.07] bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.018))] shadow-2xl shadow-black/20 transition-all duration-500 hover:-translate-y-0.5 hover:border-white/16 hover:shadow-[0_28px_80px_-24px_rgba(232,237,242,0.16)] ${className}`}
    >
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
      <div className="noise pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 bg-white/[0.045] blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_80%_0%,rgba(255,255,255,0.06),transparent_55%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
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

function IconTile({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-md border border-white/10 bg-white/[0.045]">
      <div className="absolute inset-x-1 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <Icon className="h-5 w-5 text-chrome" />
    </div>
  );
}

function FlowPath({ steps }: { steps: readonly string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {steps.map((step, index) => (
        <Fragment key={step}>
          <span className="inline-flex items-center rounded-md border border-white/12 bg-white/[0.06] px-4 py-2.5 text-sm text-white/82">
            {step}
          </span>
          {index < steps.length - 1 && <ArrowRight className="h-4 w-4 shrink-0 text-white/35" />}
        </Fragment>
      ))}
    </div>
  );
}

function ServiceCard({ card, index }: { card: (typeof serviceCards)[number]; index: number }) {
  const Icon = card.icon;
  return (
    <Reveal className="h-full" delay={Math.min(index % 6, 5) * 0.07}>
      <PremiumCard className="h-full p-6 md:p-7">
        <div className="flex items-start justify-between gap-4">
          <IconTile icon={Icon} />
          <span className="bg-chrome bg-clip-text text-2xl font-semibold tabular-nums text-transparent opacity-25 transition-opacity duration-300 group-hover:opacity-60">
            {String(index + 1).padStart(2, "0")}
          </span>
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
    </Reveal>
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
      {items.map(([title, text], index) => (
        <Reveal key={title} className="h-full" delay={Math.min(index % 3, 2) * 0.08}>
          <PremiumCard className="h-full p-6">
            <IconTile icon={Icon} />
            <h3 className="mt-5 text-lg font-medium tracking-normal text-white">{title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/60">{renderLinkedText(text)}</p>
          </PremiumCard>
        </Reveal>
      ))}
    </div>
  );
}

function StepCards({ items }: { items: readonly StepItem[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {items.map(([title, text, points], index) => (
        <Reveal key={title} className="h-full" delay={Math.min(index % 4, 3) * 0.07}>
          <PremiumCard className="h-full p-6">
            <div className="flex items-center gap-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-white/10 bg-gradient-to-b from-white/[0.1] to-white/[0.02]">
                <span className="bg-chrome bg-clip-text text-sm font-semibold tabular-nums text-transparent">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </span>
              <h3 className="text-lg font-medium tracking-normal text-white md:text-xl">
                {title.replace(/^\d+\.\s*/, "")}
              </h3>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/60">{text}</p>
            {points && (
              <div className="mt-4">
                <ItemGrid items={points} />
              </div>
            )}
          </PremiumCard>
        </Reveal>
      ))}
    </div>
  );
}

function DataTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <Reveal>
      <div className="relative overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.02] shadow-2xl shadow-black/30">
        <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/[0.06]">
            <thead>
              <tr className="bg-gradient-to-b from-white/[0.06] to-white/[0.02]">
                {headers.map((header) => (
                  <th
                    key={header}
                    className="py-5 pl-6 pr-4 text-left text-[10px] font-medium uppercase tracking-[0.18em] text-white/50"
                  >
                    <span className="inline-flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-chrome/70" />
                      {header}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {rows.map((row) => (
                <tr key={row.join("-")} className="transition-colors duration-300 hover:bg-white/[0.035]">
                  {row.map((cell, index) => (
                    <td
                      key={`${cell}-${index}`}
                      className={`py-4 pl-6 pr-4 text-sm ${index === 0 ? "font-medium text-chrome" : "text-white/60"}`}
                    >
                      {renderLinkedText(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Reveal>
  );
}

function HeroVisual() {
  return (
    <div className="relative h-[496px] overflow-hidden rounded-md bg-[#0a0a0a]">
      <div className="pointer-events-none absolute inset-0 opacity-[0.5] [background-image:linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.06)_1px,transparent_1px)] [background-size:40px_40px]" />
      <div className="animate-float pointer-events-none absolute right-5 top-4 z-10 rounded-md border border-white/12 bg-[#0e0e0e] px-3 py-2 text-[10px] uppercase tracking-[0.14em] text-white/60">
        firmware · boot verified
      </div>
      <svg viewBox="0 0 520 496" className="relative h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="emBoard" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="emChip" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e8edf2" stopOpacity="0.6" />
            <stop offset="55%" stopColor="#c9cdd2" stopOpacity="0.24" />
            <stop offset="100%" stopColor="#8a8f98" stopOpacity="0.1" />
          </linearGradient>
          <radialGradient id="emGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e8edf2" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#e8edf2" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="260" cy="248" r="180" fill="url(#emGlow)" />

        <g stroke="rgba(255,255,255,0.16)" strokeWidth="1" fill="none">
          <path d="M216 206 L150 150" strokeDasharray="4 4" />
          <path d="M304 206 L380 150" strokeDasharray="4 4" />
          <path d="M236 290 L150 360" strokeDasharray="4 4" />
          <path d="M284 290 L380 360" strokeDasharray="4 4" />
          <path d="M216 248 L120 248" strokeDasharray="4 4" />
          <path d="M304 248 L410 248" strokeDasharray="4 4" />
          <path d="M260 206 L260 90" strokeDasharray="4 4" />
          <path d="M260 290 L260 420" strokeDasharray="4 4" />
        </g>

        <rect x="192" y="184" width="136" height="128" rx="14" fill="url(#emBoard)" stroke="rgba(255,255,255,0.35)" strokeWidth="1.25" />
        <rect x="200" y="192" width="120" height="112" rx="10" fill="url(#emChip)" />
        <rect x="206" y="198" width="3" height="3" fill="rgba(255,255,255,0.5)" />
        <rect x="311" y="198" width="3" height="3" fill="rgba(255,255,255,0.5)" />
        <rect x="206" y="297" width="3" height="3" fill="rgba(255,255,255,0.5)" />
        <rect x="311" y="297" width="3" height="3" fill="rgba(255,255,255,0.5)" />

        <g fill="rgba(255,255,255,0.4)">
          {[216, 232, 248, 264, 280, 296].map((x, i) => (
            <rect key={`t${i}`} x={x} y="176" width="5" height="12" rx="1" />
          ))}
          {[216, 232, 248, 264, 280, 296].map((x, i) => (
            <rect key={`b${i}`} x={x} y="308" width="5" height="12" rx="1" />
          ))}
          {[204, 217, 230, 243, 256, 269].map((y, i) => (
            <rect key={`l${i}`} x="182" y={y} width="12" height="5" rx="1" />
          ))}
          {[204, 217, 230, 243, 256, 269].map((y, i) => (
            <rect key={`r${i}`} x="326" y={y} width="12" height="5" rx="1" />
          ))}
        </g>

        <rect x="230" y="216" width="60" height="26" rx="6" fill="rgba(255,255,255,0.12)" />
        <text x="260" y="233" textAnchor="middle" fontSize="13" fontWeight="600" letterSpacing="2" fill="#ffffff" opacity="0.95">MCU</text>
        <rect x="230" y="250" width="80" height="8" rx="4" fill="rgba(255,255,255,0.22)" />
        <rect x="230" y="264" width="62" height="8" rx="4" fill="rgba(255,255,255,0.14)" />
        <rect x="230" y="278" width="70" height="8" rx="4" fill="rgba(255,255,255,0.18)" />
        <text x="230" y="303" fontFamily="ui-monospace,monospace" fontSize="10" fill="rgba(255,255,255,0.55)">arm cortex · rtos ready</text>

        <g fontFamily="ui-sans-serif, system-ui, sans-serif" fontSize="11" fill="rgba(255,255,255,0.5)">
          <text x="120" y="242" textAnchor="middle">DRIVERS</text>
          <text x="396" y="242" textAnchor="middle">FIRMWARE</text>
          <text x="260" y="80" textAnchor="middle">BOOTLOADER</text>
          <text x="260" y="440" textAnchor="middle">RTOS · LINUX</text>
          <text x="132" y="144" textAnchor="middle">BLE / WI-FI</text>
          <text x="384" y="144" textAnchor="middle">SENSORS</text>
          <text x="132" y="376" textAnchor="middle">HAL / BSP</text>
          <text x="384" y="376" textAnchor="middle">IoT CLOUD</text>
        </g>
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
    </div>
  );
}

export default function EmbeddedSoftwareDevelopment() {
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
                Embedded Software Development Services USA
              </div>
              <h1 className="text-chrome-shine mt-7 max-w-4xl text-[clamp(2.35rem,6.5vw,6.2rem)] font-medium leading-[0.94] tracking-normal">
                Embedded Software Development Services USA
              </h1>
              <div className="mt-7 max-w-2xl space-y-4 text-lg leading-relaxed text-white/68">
                {introParagraphs.map((paragraph) => (
                  <p key={paragraph}>{renderLinkedText(paragraph)}</p>
                ))}
              </div>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <CTASolid>Discuss Your Embedded Software Project</CTASolid>
              </div>
            </div>

            <Reveal delay={0.1}>
              <PremiumCard className="min-h-[520px] p-3">
                <HeroVisual />
              </PremiumCard>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1120px)] px-4">
          <SectionHeading kicker="Company Fit" title="Embedded Software Development Company for USA Businesses" />
          <div className="grid gap-4 md:grid-cols-2">
            <PremiumCard className="p-6">
              <p className="text-[15px] leading-relaxed text-white/62">Embedded software sits between physical hardware and the higher-level applications that depend on it.</p>
            </PremiumCard>
            <PremiumCard className="p-6">
              <p className="text-[15px] leading-relaxed text-white/62">Unlike conventional web or mobile software, embedded applications often operate within strict technical constraints involving:</p>
            </PremiumCard>
          </div>
          <div className="mt-6"><ItemGrid items={constraints} /></div>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-white/55">As an embedded software development company serving businesses across the USA, clickmasters develops software around the actual capabilities and limitations of the target hardware.</p>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/55">We can support embedded requirements for:</p>
          <div className="mt-6"><ItemGrid items={embeddedRequirements} /></div>
          <PremiumCard className="mt-6 p-6">
            <p className="text-[15px] leading-relaxed text-white/62">The objective is not simply to write code that runs on a device. It is to create software that communicates reliably with the hardware and performs consistently in the environment where the product will actually operate.</p>
          </PremiumCard>
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <SectionHeading kicker="Overview" title="What Are Embedded Software Development Services?" />
          <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
            <PremiumCard className="p-6 md:p-8">
              <div className="space-y-4 text-[15px] leading-relaxed text-white/62">
                <p>Embedded software development services involve creating software designed specifically to control, communicate with or operate within physical hardware.</p>
                <p>A typical embedded software stack may include:</p>
                <FlowPath steps={embeddedStack} />
                <p>Professional embedded software development combines these layers through a structured engineering approach.</p>
              </div>
            </PremiumCard>
            <PremiumCard className="p-6 md:p-8">
              <p className="mb-5 text-sm leading-relaxed text-white/60">Depending on the project, professional embedded software development may include:</p>
              <ItemGrid items={professionalServices} />
            </PremiumCard>
          </div>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-white/55">clickmasters combines these capabilities through a structured embedded software development agency approach.</p>
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <SectionHeading kicker="Services" title="Our Embedded Software Development Services" />
          <div className="grid gap-5 lg:grid-cols-2">
            {serviceCards.map((card, index) => (
              <ServiceCard key={card.title} card={card} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <SectionHeading kicker="Architecture" title="RTOS vs Embedded Linux" text="Choosing the correct operating environment is an important architecture decision." />
          <DataTable headers={["Requirement", "RTOS", "Embedded Linux"]} rows={rtosVsLinuxRows} />
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-white/55">Neither is universally better.</p>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/55">The right platform depends on hardware resources, timing requirements, connectivity, application complexity and long-term product plans.</p>
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <SectionHeading kicker="Security" title="Embedded Software Security" text="Security should be considered at the architecture stage rather than added only before launch." />
          <p className="mb-8 max-w-3xl text-sm leading-relaxed text-white/55">Depending on product requirements, embedded security can involve:</p>
          <SimpleCards items={securityItems} icon={Shield} />
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-white/55">Security requirements vary significantly depending on the device, environment, data and industry.</p>
        </div>
      </section>

      {[
        ["Over-the-Air Firmware Updates", "Connected products often require software updates after they have been deployed.", "Over-the-air update capabilities can help distribute:", updateItems, "An update system needs to consider:", updateMechanismItems, "OTA architecture becomes particularly important when businesses operate large fleets of connected devices."],
        ["Embedded Software Testing and Validation", "Embedded testing needs to validate both software behavior and its interaction with physical hardware.", "Testing may include:", testingItems, "", [], "For larger projects, automation can help maintain repeatable validation throughout continued development. Our QA and software testing services can support wider application and system testing requirements."],
        ["Hardware-in-the-Loop Testing", "Hardware-in-the-loop approaches can be useful when software needs to be tested against realistic hardware behavior without depending entirely on manual physical testing.", "Depending on the system, this can help validate:", hilItems, "", [], "Testing approaches should be selected according to device complexity and business risk."],
        ["Embedded Software Performance Optimization", "Embedded environments often operate under tighter technical constraints than conventional applications.", "Optimization may address:", performanceItems, "", [], "Performance should be considered during architecture rather than relying entirely on optimization after development."],
        ["Low-Power Embedded Development", "Battery-powered and remote devices can require careful energy management.", "Software decisions can influence:", lowPowerItems, "", [], "Reducing unnecessary software activity can help increase operating time between charges or battery replacements."],
        ["Embedded Software Documentation", "Documentation is particularly important for embedded systems because products may remain in operation for many years.", "Depending on the project, useful documentation can include:", documentationItems, "", [], "Good documentation helps future engineers understand, maintain and extend the software after the initial development phase."],
        ["Legacy Embedded Software Modernization", "Embedded products can outlive the technology originally used to build them.", "Organizations may eventually face:", legacyIssues, "Modernization can involve:", modernizationItems, "Our legacy software modernization services can support broader software modernization requirements."],
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
          <SectionHeading kicker="Process" title="Embedded Software Development Process" text="As an embedded software development agency, clickmasters uses a structured engineering process." />
          <StepCards items={processSteps} />
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <SectionHeading kicker="Pricing" title="Embedded Software Development Cost in the USA" text="The cost of embedded development depends heavily on hardware and system complexity." />
          <p className="mb-6 max-w-3xl text-sm leading-relaxed text-white/55">Important cost factors include:</p>
          <DataTable headers={["Cost Factor", "Why It Matters"]} rows={costFactorRows} />
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-white/55">A reliable estimate requires understanding both the software requirements and the target hardware.</p>
          <div className="mt-10">
            <CTASolid>Request an Embedded Software Estimate</CTASolid>
          </div>
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <SectionHeading kicker="USA" title="Embedded Software Development Services for USA Businesses" text="clickmasters provides embedded software development services for businesses across the USA, helping organizations build software for connected devices, intelligent products and specialized hardware environments." />
          <p className="mb-6 max-w-3xl text-sm leading-relaxed text-white/55">We can support:</p>
          <ItemGrid items={usaNeeds} />
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-white/55">Our remote delivery model enables organizations across the USA to work with an embedded software development company without limiting engineering resources to one physical market.</p>
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <SectionHeading kicker="Industries" title="Industries Using Embedded Software" text="Embedded systems are used wherever software needs to operate closely with physical equipment." />
          <p className="mb-6 max-w-3xl text-sm leading-relaxed text-white/55">Potential applications include:</p>
          <SimpleCards items={industries} icon={CircuitBoard} />
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-white/55">Industry-specific claims should always be supported by the requirements and experience relevant to the actual project.</p>
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1240px)] px-4">
          <SectionHeading kicker="Why clickmasters" title="Why Choose clickmasters as Your Embedded Software Development Company?" />
          <SimpleCards items={whyChoose} icon={Shield} />
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,1040px)] px-4">
          <Reveal>
          <div className="relative overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-[#161616] via-[#0e0e0e] to-[#0a0a0a] px-6 py-12 text-center md:py-20">
            <div className="noise pointer-events-none absolute inset-0" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#050505_90%)]" />
            <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-chrome/10 blur-3xl" />
            <div className="relative">
              <p className="eyebrow flex items-center justify-center gap-3 text-white/40">
                <span className="h-px w-8 bg-gradient-to-r from-transparent to-chrome/80" />
                Get Started
                <span className="h-px w-8 bg-gradient-to-l from-transparent to-chrome/80" />
              </p>
              <h2 className="text-chrome mt-6 text-[clamp(2rem,6vw,4.5rem)] font-medium leading-[1.0] tracking-normal">Start Your Embedded Software Development Project</h2>
              <div className="mx-auto mt-8 max-w-2xl space-y-4 text-white/55 leading-relaxed text-[15px] md:text-base">
                <p>Whether you need new firmware, custom device drivers, BSP development, RTOS integration, Embedded Linux software or a complete embedded stack for an IoT product, clickmasters can help define and implement the engineering approach.</p>
                <p>Our embedded software development services in the USA cover the journey from hardware assessment and architecture through development, integration, testing, deployment and continued support.</p>
              </div>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <CTASolid>Discuss Your Embedded Software Project</CTASolid>
              </div>
            </div>
          </div>
          </Reveal>
        </div>
      </section>

      <section className="relative border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto w-[min(92vw,920px)] px-4">
          <SectionHeading kicker="FAQ" title="Frequently Asked Questions About Embedded Software Development" />
          <div className="divide-y divide-white/5 border-y border-white/5">
            {faqs.map(([question, answer]) => (
              <details key={question} className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 transition-colors hover:opacity-90">
                  <span className="text-base font-medium tracking-normal text-white md:text-lg">{question}</span>
                  <ChevronRight className="h-5 w-5 shrink-0 text-white/40 transition-transform group-open:rotate-90" />
                </summary>
                <p className="pt-4 pr-10 text-[15px] leading-relaxed text-white/60">{answer}</p>
              </details>
            ))}
          </div>
          <a
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
          >
            Have a specific device or system in mind? Talk to us about your embedded software requirements.
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
    </main>
  );
}