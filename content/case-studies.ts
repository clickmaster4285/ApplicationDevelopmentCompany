// content/case-studies.ts

// Auto-generated case studies pages data
// Generated: 2026-07-28T10:29:45.982245
// Total case studies pages: 3

export interface PageMetadata {
  primaryKeyword: string;
  secondaryKeywords: string[];
  intent: string;
  funnel: string;
  schema: string[];
  cta: string;
  wordCount: number;
  tier: string | number;
  searchVolume?: string;
  productionNote?: string;
}

export interface CaseStudyData {
  url: string;
  meta: {
    title: string;
    description: string;
  };
  content: string;
  metadata: PageMetadata;
  internalLinks: string[];
  related: {
    services: string[];
    solutions: string[];
    platforms: string[];
    technologies: string[];
    industries: string[];
    compare: string[];
    resources: string[];
    parent: string;
    siblings: string[];
    children: string[];
  };
  structured: {
    faqs: Array<{ question: string; answer: string }>;
    tables: Array<{ headers: string[]; rows: Record<string, string>[] }>;
    cta: string | null;
    sourceFile: string | null;
  };
  // Case study specific fields
  caseStudy: {
    client: string;
    industry: string;
    challenge: string;
    solution: string;
    results: string[];
    technologies: string[];
    timeline: string;
    testimonial?: {
      quote: string;
      author: string;
      title: string;
    };
  };
}

export interface CaseStudiesData {
  totalPages: number;
  generatedAt: string;
  pages: CaseStudyData[];
}

export const caseStudiesData: CaseStudiesData = {
  totalPages: 3,
  generatedAt: "2026-07-28T10:29:45.982265",
  pages: [
    {
      url: "/case-studies/healthcare-telehealth-platform/",
      meta: {
        title: "Telehealth Platform Development Case Study | Clickmasters",
        description:
          "How we built a HIPAA-compliant telehealth platform connecting 50+ healthcare providers with 10,000+ patients across 12 states.",
      },
      content: `# Telehealth Platform: Scaling Virtual Care Across 12 States

## The Client

A growing telehealth startup connecting specialists with patients in rural and underserved areas. They had a basic video consultation product but were struggling with:
- State-by-state provider licensing compliance
- EHR integration for prescription management
- Patient retention and engagement
- Scalable infrastructure for growing patient volume

## The Challenge

The client's existing platform was built on a generic video conferencing API with minimal healthcare-specific features. They were facing:

**Compliance Nightmares:**
- No automated provider licensing verification by state
- Manual HIPAA compliance checks
- No audit trails for patient data access
- Missing consent management workflows

**Operational Friction:**
- Providers spent 15+ minutes per patient on documentation
- No integration with major EHR systems
- Patient scheduling required phone calls
- 40% no-show rate for appointments

**Scalability Issues:**
- Platform crashed during peak hours
- No offline capability for rural areas with poor connectivity
- Manual patient onboarding process

## Our Solution

We built a comprehensive telehealth platform with:

### 1. Multi-State Compliance Engine
- Automated provider licensing verification per patient location
- State-specific consent forms and regulatory requirements
- Real-time compliance checks before appointments
- Comprehensive audit trails for all patient data access

### 2. EHR Integration Layer
- FHIR-based integration with Epic, Cerner, and athenahealth
- Automatic visit documentation and coding
- E-prescription with pharmacy routing
- Patient record synchronization

### 3. Patient Experience
- Intuitive patient portal with appointment scheduling
- Automated reminders reducing no-shows by 60%
- Mobile-first design for rural patients
- Offline-capable symptom intake forms

### 4. Provider Tools
- AI-powered clinical documentation (reduced to 3 minutes)
- Dashboard showing patient history and medications
- Secure messaging for care coordination
- Analytics for practice management

## Technologies Used

- **Frontend:** Next.js, React Native (mobile), Tailwind CSS
- **Backend:** Node.js, Python (AI services)
- **Database:** PostgreSQL, Redis (caching)
- **Infrastructure:** AWS (EC2, RDS, S3, Lambda)
- **Video:** Vonage Video API (HIPAA-compliant)
- **AI/ML:** OpenAI API (documentation), Custom models (triage)
- **Integration:** FHIR APIs, HL7v2 for legacy systems

## The Results

### Metrics That Matter

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Provider Documentation Time | 15 minutes/visit | 3 minutes/visit | **80% reduction** |
| Patient No-Show Rate | 40% | 16% | **60% reduction** |
| Monthly Active Patients | 2,500 | 10,000+ | **300% growth** |
| Compliance Audit Time | 2 weeks | 2 days | **86% reduction** |
| System Uptime | 97.2% | 99.95% | **2.75% improvement** |

### Key Achievements

✅ **Scaled from 50 to 200+ providers** in 6 months
✅ **10,000+ patients** served across 12 states
✅ **HIPAA compliance** passed with zero findings
✅ **Integration with 5 major EHR systems**
✅ **$3M in cost savings** from reduced manual work
✅ **95% patient satisfaction** rating

> "This platform transformed our practice. We went from a scrappy startup to a legitimate healthcare provider in the eyes of patients and regulators. The compliance automation alone saved us months of headaches."

— **Dr. Sarah Chen**, Chief Medical Officer

## Timeline

- **Week 1-2:** Discovery and requirements gathering
- **Week 3-6:** Architecture design and compliance mapping
- **Week 7-12:** Core platform development
- **Week 13-16:** EHR integrations
- **Week 17-20:** AI documentation features
- **Week 21-24:** Testing, compliance validation, and deployment
- **Week 25:** Go-live

## Key Learnings

1. **Start with compliance:** Building compliance into architecture is cheaper than retrofitting
2. **Providers need speed:** Every second saved per patient multiplies across thousands of visits
3. **EHR integration is the make-or-break:** Patients stay where their doctors' data lives
4. **Offline matters:** Rural healthcare requires disconnected capabilities
5. **Measurement drives improvement:** What gets instrumented gets optimized

## Ready to Build Your Healthcare Platform?

[Contact us](/contact/) to discuss your healthcare software needs.
[View our healthcare services](/industries/healthcare/)`,
      metadata: {
        primaryKeyword: "telehealth platform case study",
        secondaryKeywords: [
          "healthcare software case study",
          "telehealth development",
          "hipaa compliant platform",
          "ehr integration case study",
        ],
        intent: "Commercial",
        funnel: "Consideration",
        schema: ["Article", "CaseStudy", "FAQPage", "BreadcrumbList"],
        cta: "Contact us to build your healthcare platform",
        wordCount: 0,
        tier: 1,
        searchVolume: "",
        productionNote: "Published case study with verified metrics.",
      },
      internalLinks: [
        "/industries/healthcare/",
        "/services/custom-software-development/",
        "/services/ai-application-development/",
        "/services/api-development/",
      ],
      related: {
        services: [
          "/services/custom-software-development/",
          "/services/ai-application-development/",
          "/services/api-development/",
          "/services/mobile-app-development/",
        ],
        solutions: [
          "/solutions/telehealth-platform/",
          "/solutions/patient-portal/",
          "/solutions/ehr-emr-software/",
        ],
        platforms: [],
        technologies: ["Next.js", "Node.js", "Python", "PostgreSQL", "AWS"],
        industries: ["/industries/healthcare/", "/industries/telemedicine/"],
        compare: [],
        resources: [
          "/resources/security-compliance/hipaa-software-development-checklist/",
          "/resources/industry-insights/telehealth-regulations-by-state/",
        ],
        parent: "",
        siblings: [],
        children: [],
      },
      structured: {
        faqs: [
          {
            question: "How long did the platform take to build?",
            answer:
              "The core platform was built in 24 weeks, with ongoing enhancements added post-launch.",
          },
          {
            question: "Is the platform HIPAA compliant?",
            answer:
              "Yes, the platform passed HIPAA compliance with zero findings and is used by healthcare providers across 12 states.",
          },
          {
            question: "What EHR systems does it integrate with?",
            answer:
              "The platform integrates with Epic, Cerner, athenahealth, and other major EHR systems via FHIR and HL7v2.",
          },
        ],
        tables: [
          {
            headers: ["Metric", "Before", "After", "Improvement"],
            rows: [
              {
                Metric: "Provider Documentation Time",
                Before: "15 minutes/visit",
                After: "3 minutes/visit",
                Improvement: "80% reduction",
              },
              {
                Metric: "Patient No-Show Rate",
                Before: "40%",
                After: "16%",
                Improvement: "60% reduction",
              },
              {
                Metric: "Monthly Active Patients",
                Before: "2,500",
                After: "10,000+",
                Improvement: "300% growth",
              },
              {
                Metric: "Compliance Audit Time",
                Before: "2 weeks",
                After: "2 days",
                Improvement: "86% reduction",
              },
              {
                Metric: "System Uptime",
                Before: "97.2%",
                After: "99.95%",
                Improvement: "2.75% improvement",
              },
            ],
          },
        ],
        cta: "Ready to build your healthcare platform? Contact our team.",
        sourceFile: "case-studies/healthcare-telehealth-platform.md",
      },
      caseStudy: {
        client: "A Telehealth Startup",
        industry: "Healthcare / Telemedicine",
        challenge:
          "The client's existing platform lacked compliance features, EHR integration, and scalable infrastructure for growing patient volume.",
        solution:
          "We built a comprehensive telehealth platform with automated multi-state compliance, FHIR-based EHR integration, AI-powered documentation, and patient engagement tools.",
        results: [
          "80% reduction in provider documentation time",
          "60% reduction in patient no-shows",
          "300% growth in monthly active patients",
          "99.95% system uptime",
          "Zero HIPAA compliance findings",
        ],
        technologies: [
          "Next.js",
          "React Native",
          "Node.js",
          "Python",
          "PostgreSQL",
          "AWS",
          "Vonage Video API",
          "OpenAI API",
          "FHIR",
          "HL7v2",
        ],
        timeline: "24 weeks (6 months)",
        testimonial: {
          quote:
            "This platform transformed our practice. We went from a scrappy startup to a legitimate healthcare provider in the eyes of patients and regulators. The compliance automation alone saved us months of headaches.",
          author: "Dr. Sarah Chen",
          title: "Chief Medical Officer",
        },
      },
    },
    {
      url: "/case-studies/logistics-fleet-management-platform/",
      meta: {
        title: "Fleet Management Platform Case Study | Clickmasters",
        description:
          "How we built a real-time fleet management platform reducing fuel costs by 25% and improving dispatch efficiency by 45% for a regional logistics company.",
      },
      content: `# Fleet Management Platform: Real-Time Visibility Across 200+ Vehicles

## The Client

A regional logistics company operating 200+ vehicles across 15 states. They managed freight, last-mile delivery, and warehousing for retail and ecommerce clients.

## The Challenge

**Operational Chaos:**
- Dispatchers used whiteboards and spreadsheets to track 200+ vehicles
- No real-time visibility into driver locations
- Manual route planning leading to 20% empty miles
- Paper-based proof of delivery (POD) causing billing delays

**Technology Gaps:**
- No integration between dispatch, telematics, and customer portals
- Drivers used separate apps for ELD, navigation, and communication
- No real-time tracking for customers
- Manual settlement process taking 2+ weeks

**Cost Pressure:**
- Fuel costs increasing 15% year over year
- Vehicle maintenance was reactive, not predictive
- Driver retention issues from inefficient routing

## Our Solution

### 1. Real-Time Fleet Management System

- **Dispatch Dashboard:** Live view of all vehicles with status, location, and ETA
- **Route Optimization:** AI-powered routing reducing miles and fuel usage
- **Telematics Integration:** Live data from ELD devices with alerts for idling, speeding, and harsh braking
- **Driver App:** Unified app for routing, ELD, delivery confirmations, and communication

### 2. Customer Visibility Portal

- **Real-Time Tracking:** Customers see their shipments with ETAs and alerts
- **Document Access:** Instant access to POD, invoices, and delivery reports
- **Self-Service:** Customers can reschedule or modify deliveries
- **Proactive Notifications:** Automated alerts for delays or issues

### 3. Analytics & Reporting

- **Fuel Efficiency Dashboard:** Track MPG by driver, vehicle, and route
- **Maintenance Predictions:** Predictive maintenance reducing breakdowns by 40%
- **Driver Scorecards:** Performance tracking for safety and efficiency
- **Financial Analytics:** Real-time profit per load and route

## Technologies Used

- **Frontend:** React, React Native (driver app), Next.js
- **Backend:** Node.js, Python (route optimization)
- **Database:** PostgreSQL, MongoDB, Redis
- **Infrastructure:** AWS, Kubernetes
- **Integration:** Samsara API, Google Maps API, ELD APIs
- **AI/ML:** Custom route optimization models

## The Results

### Key Metrics

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Dispatch Efficiency | Manual, slow | Automated | **45% improvement** |
| Empty Miles | 20% | 12% | **40% reduction** |
| Fuel Costs | Baseline | Reduced | **25% reduction** |
| On-Time Delivery | 82% | 96% | **14% improvement** |
| Settlement Time | 14 days | 3 days | **79% reduction** |
| Vehicle Breakdowns | Baseline | Reduced | **40% reduction** |

### Key Achievements

✅ **$1.2M annual fuel savings** from optimized routing
✅ **45% improvement** in dispatch efficiency
✅ **96% on-time delivery rate**
✅ **40% reduction** in vehicle breakdowns
✅ **79% faster** driver settlement process
✅ **98% driver satisfaction** with the new app

> "This platform changed how we run our business. We went from whiteboards and spreadsheets to real-time visibility across our entire fleet. The fuel savings alone paid for the project in 8 months."

— **Mike Johnson**, VP of Operations

## Timeline

- **Week 1-3:** Discovery and telematics integration planning
- **Week 4-8:** Core platform development
- **Week 9-12:** Driver app and route optimization
- **Week 13-16:** Customer portal and analytics
- **Week 17-20:** Testing and driver training
- **Week 21:** Phased rollout across fleet

## Key Learnings

1. **Driver adoption is critical:** The best system fails if drivers reject it
2. **Real-time data enables proactive decisions:** Stop reacting, start predicting
3. **Customer visibility builds trust:** Give customers what they want—visibility
4. **Integration complexity is the real challenge:** Telematics, ELD, and fleet systems don't always play nice
5. **Optimization pays for itself:** Route optimization had ROI in 4 months

## Ready to Optimize Your Fleet?

[Contact us](/contact/) for a consultation.
[View our logistics services](/industries/logistics/)`,
      metadata: {
        primaryKeyword: "fleet management platform case study",
        secondaryKeywords: [
          "logistics software case study",
          "fleet management",
          "route optimization",
          "transportation software",
        ],
        intent: "Commercial",
        funnel: "Consideration",
        schema: ["Article", "CaseStudy", "FAQPage", "BreadcrumbList"],
        cta: "Contact us for fleet management solutions",
        wordCount: 0,
        tier: 1,
        searchVolume: "",
        productionNote: "Published case study with verified metrics.",
      },
      internalLinks: [
        "/industries/logistics/",
        "/services/custom-software-development/",
        "/services/api-development/",
        "/services/mobile-app-development/",
      ],
      related: {
        services: [
          "/services/custom-software-development/",
          "/services/api-development/",
          "/services/mobile-app-development/",
          "/services/iot-development/",
        ],
        solutions: [
          "/solutions/fleet-management-software/",
          "/solutions/warehouse-management-system/",
          "/solutions/delivery-management/",
        ],
        platforms: [],
        technologies: [
          "React",
          "React Native",
          "Node.js",
          "Python",
          "PostgreSQL",
          "MongoDB",
          "AWS",
          "Kubernetes",
        ],
        industries: ["/industries/logistics/", "/industries/transportation/"],
        compare: [],
        resources: [
          "/resources/architecture/logistics-tracking-reference-architecture/",
          "/resources/industry-insights/warehouse-automation-wms-wes-wcs/",
        ],
        parent: "",
        siblings: [],
        children: [],
      },
      structured: {
        faqs: [
          {
            question: "How long did the platform take to build?",
            answer:
              "The core platform was built in 21 weeks, with phased rollout across the fleet.",
          },
          {
            question: "What telematics systems does it integrate with?",
            answer:
              "It integrates with Samsara, ELD systems, and other major telematics providers.",
          },
          {
            question: "How much did fuel costs decrease?",
            answer:
              "Fuel costs decreased by 25% through optimized routing and reduced idling.",
          },
        ],
        tables: [
          {
            headers: ["Metric", "Before", "After", "Improvement"],
            rows: [
              {
                Metric: "Dispatch Efficiency",
                Before: "Manual, slow",
                After: "Automated",
                Improvement: "45% improvement",
              },
              {
                Metric: "Empty Miles",
                Before: "20%",
                After: "12%",
                Improvement: "40% reduction",
              },
              {
                Metric: "Fuel Costs",
                Before: "Baseline",
                After: "Reduced",
                Improvement: "25% reduction",
              },
              {
                Metric: "On-Time Delivery",
                Before: "82%",
                After: "96%",
                Improvement: "14% improvement",
              },
              {
                Metric: "Settlement Time",
                Before: "14 days",
                After: "3 days",
                Improvement: "79% reduction",
              },
              {
                Metric: "Vehicle Breakdowns",
                Before: "Baseline",
                After: "Reduced",
                Improvement: "40% reduction",
              },
            ],
          },
        ],
        cta: "Ready to transform your fleet operations? Contact us.",
        sourceFile: "case-studies/logistics-fleet-management-platform.md",
      },
      caseStudy: {
        client: "Regional Logistics Company",
        industry: "Logistics / Transportation",
        challenge:
          "The company operated with manual processes, no real-time visibility, 20% empty miles, and 2-week settlement cycles.",
        solution:
          "We built a comprehensive fleet management platform with real-time dispatch, AI-powered route optimization, driver app, customer portal, and predictive maintenance analytics.",
        results: [
          "45% improvement in dispatch efficiency",
          "25% reduction in fuel costs",
          "40% reduction in empty miles",
          "96% on-time delivery rate",
          "79% faster driver settlement",
        ],
        technologies: [
          "React",
          "React Native",
          "Node.js",
          "Python",
          "PostgreSQL",
          "MongoDB",
          "AWS",
          "Kubernetes",
          "Samsara API",
          "Google Maps API",
        ],
        timeline: "21 weeks (5 months)",
        testimonial: {
          quote:
            "This platform changed how we run our business. We went from whiteboards and spreadsheets to real-time visibility across our entire fleet. The fuel savings alone paid for the project in 8 months.",
          author: "Mike Johnson",
          title: "VP of Operations",
        },
      },
    },
    {
      url: "/case-studies/ecommerce-ops-platform/",
      meta: {
        title: "Ecommerce Operations Platform Case Study | Clickmasters",
        description:
          "How we built a custom ecommerce operations platform helping a D2C brand scale from $2M to $15M GMV with 35% operational cost savings.",
      },
      content: `# Ecommerce Ops Platform: Scaling D2C Brand from $2M to $15M GMV

## The Client

A D2C consumer goods brand selling through their Shopify store, Amazon, and retail partnerships. They grew from $2M to $5M GMV in 18 months but operations couldn't keep up.

## The Challenge

**The App Stack Nightmare:**
- 14 different apps costing $4,200/month
- No integration between systems
- Manual order reconciliation across channels
- Customer service reps juggling 6 screens
- Inventory discrepancies causing oversells

**Operational Bottlenecks:**
- 4 hours/day spent on inventory reconciliation
- 3 days to fulfill orders during peak
- 15% oversell rate during sales events
- Returns took 10+ days to process
- Finance team spent 5 days/month reconciling

**Growth Barriers:**
- Adding new channels meant 2 weeks of manual setup
- No single source of truth for inventory
- Customer service scaling meant hiring linearly
- Marketing had no real-time LTV data

## Our Solution

### 1. Unified Operations Platform

- **Inventory Truth:** Single source across Shopify, Amazon, and warehouses
- **Order Management:** Automated routing to fulfillment centers
- **Fulfillment Optimization:** Intelligent split shipping
- **Returns Portal:** Self-service returns with automated processing

### 2. Customer Service Console

- **360° Customer View:** Order history, support tickets, returns
- **AI Support Agent:** Handled 60% of inquiries automatically
- **Fulfillment Visibility:** Real-time order status
- **One-Click Actions:** Refunds, replacements, expedited shipping

### 3. Finance & Analytics

- **Real-Time P&L:** Per-order contribution margin
- **Channel Performance:** LTV by acquisition channel
- **Inventory Velocity:** Sell-through rates by SKU
- **Automated Reconciliation:** Bank vs. platform matching

### 4. Automation & Workflows

- **Peak Season Readiness:** Automated scaling
- **Returns Automation:** QR codes, auto-generated labels, 3-day processing
- **Inventory Alerts:** Proactive reorder notifications
- **Customer Communications:** Automated order and shipping updates

## Technologies Used

- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Node.js, Python (AI services)
- **Database:** PostgreSQL, Redis
- **Infrastructure:** AWS (ECS, RDS, Lambda, SQS)
- **Integrations:** Shopify API, Amazon SP-API, Stripe, ShipStation
- **AI/ML:** Custom classifiers, OpenAI API

## The Results

### Key Metrics

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Inventory Reconciliation | 4 hours/day | Real-time | **100% reduction** |
| Order Fulfillment Time | 3 days | 12 hours | **83% improvement** |
| Oversell Rate | 15% | 0.2% | **98.7% reduction** |
| Return Processing Time | 10 days | 2 days | **80% reduction** |
| Customer Support Efficiency | 1.5 hours/ticket | 0.3 hours/ticket | **80% improvement** |
| Finance Close Time | 5 days | 1 day | **80% reduction** |

### Key Achievements

✅ **Scaled from $2M to $15M GMV** in 24 months
✅ **$500K annual operational savings**
✅ **35% reduction** in total operational costs
✅ **98.7% reduction** in oversells
✅ **60% of customer inquiries** handled by AI
✅ **5x improvement** in fulfillment speed

> "This platform was the missing piece in our growth strategy. We went from 14 disjointed apps to one operations system. The efficiency gains paid for the entire project in 6 months."

— **Emily Davis**, CEO

## Timeline

- **Week 1-2:** Operations audit and discovery
- **Week 3-6:** Architecture and integration design
- **Week 7-14:** Core platform development
- **Week 15-18:** AI and automation features
- **Week 19-22:** Testing and optimization
- **Week 23:** Go-live and training
- **Month 6-12:** Continuous improvement and new channels

## Key Learnings

1. **Integration is the foundation:** Without systems talking, you're just shifting bottlenecks
2. **Automate the 80%:** AI handles the routine; humans handle the exceptions
3. **Data drives decisions:** Real-time analytics changes how you operate
4. **Remove friction:** Customer self-service reduces support costs
5. **Scalability is designed, not discovered:** Build for 10x from day one

## Ready to Build Your Ops Platform?

[Contact us](/contact/) for a consultation.
[View our ecommerce services](/industries/ecommerce/)`,
      metadata: {
        primaryKeyword: "ecommerce operations platform case study",
        secondaryKeywords: [
          "ecommerce software case study",
          "d2c platform",
          "operations automation",
          "inventory management case study",
        ],
        intent: "Commercial",
        funnel: "Consideration",
        schema: ["Article", "CaseStudy", "FAQPage", "BreadcrumbList"],
        cta: "Contact us to build your operations platform",
        wordCount: 0,
        tier: 1,
        searchVolume: "",
        productionNote: "Published case study with verified metrics.",
      },
      internalLinks: [
        "/industries/ecommerce/",
        "/services/custom-software-development/",
        "/services/ai-application-development/",
        "/services/api-development/",
      ],
      related: {
        services: [
          "/services/custom-software-development/",
          "/services/ai-application-development/",
          "/services/api-development/",
          "/services/ecommerce-development/",
        ],
        solutions: [
          "/solutions/inventory-management-system/",
          "/solutions/warehouse-management-system/",
          "/solutions/analytics-dashboards/",
        ],
        platforms: ["/platforms/shopify/"],
        technologies: [
          "Next.js",
          "React",
          "Node.js",
          "Python",
          "PostgreSQL",
          "Redis",
          "AWS",
          "Shopify API",
          "Amazon SP-API",
        ],
        industries: ["/industries/ecommerce/", "/industries/retail/"],
        compare: [],
        resources: [
          "/resources/checklists/ecommerce-peak-season-readiness/",
          "/resources/how-to/how-to-migrate-from-spreadsheets-to-custom-software/",
        ],
        parent: "",
        siblings: [],
        children: [],
      },
      structured: {
        faqs: [
          {
            question: "How long did the platform take to build?",
            answer:
              "The core platform was built in 23 weeks, with ongoing enhancements added.",
          },
          {
            question: "What ecommerce platforms does it integrate with?",
            answer:
              "It integrates with Shopify, Amazon, and other major sales channels.",
          },
          {
            question: "How much did operational costs decrease?",
            answer:
              "Operational costs decreased by 35%, saving approximately $500,000 annually.",
          },
        ],
        tables: [
          {
            headers: ["Metric", "Before", "After", "Improvement"],
            rows: [
              {
                Metric: "Inventory Reconciliation",
                Before: "4 hours/day",
                After: "Real-time",
                Improvement: "100% reduction",
              },
              {
                Metric: "Order Fulfillment Time",
                Before: "3 days",
                After: "12 hours",
                Improvement: "83% improvement",
              },
              {
                Metric: "Oversell Rate",
                Before: "15%",
                After: "0.2%",
                Improvement: "98.7% reduction",
              },
              {
                Metric: "Return Processing Time",
                Before: "10 days",
                After: "2 days",
                Improvement: "80% reduction",
              },
              {
                Metric: "Customer Support Efficiency",
                Before: "1.5 hours/ticket",
                After: "0.3 hours/ticket",
                Improvement: "80% improvement",
              },
              {
                Metric: "Finance Close Time",
                Before: "5 days",
                After: "1 day",
                Improvement: "80% reduction",
              },
            ],
          },
        ],
        cta: "Ready to transform your ecommerce operations? Contact us.",
        sourceFile: "case-studies/ecommerce-ops-platform.md",
      },
      caseStudy: {
        client: "D2C Consumer Goods Brand",
        industry: "Ecommerce / D2C Retail",
        challenge:
          "The brand had 14 disjointed apps, manual inventory reconciliation, 15% oversell rates, and no single source of truth for operations.",
        solution:
          "We built a unified operations platform with inventory truth, order management, AI customer service, finance analytics, and automation workflows.",
        results: [
          "Scaled from $2M to $15M GMV",
          "35% reduction in operational costs",
          "98.7% reduction in oversells",
          "60% of inquiries handled by AI",
          "83% faster fulfillment time",
        ],
        technologies: [
          "Next.js",
          "React",
          "Node.js",
          "Python",
          "PostgreSQL",
          "Redis",
          "AWS",
          "Shopify API",
          "Amazon SP-API",
          "Stripe",
          "ShipStation",
        ],
        timeline: "23 weeks (5.5 months)",
        testimonial: {
          quote:
            "This platform was the missing piece in our growth strategy. We went from 14 disjointed apps to one operations system. The efficiency gains paid for the entire project in 6 months.",
          author: "Emily Davis",
          title: "CEO",
        },
      },
    },
  ],
};

// Helper functions
export function getCaseStudyByUrl(url: string): CaseStudyData | undefined {
  const cleanUrl = url.replace(/^\/+|\/+$/g, "");
  return caseStudiesData.pages.find(
    (page) =>
      page.url === url ||
      page.url === `/${url}` ||
      page.url.replace(/^\/+|\/+$/g, "") === cleanUrl,
  );
}

export function getCaseStudiesByIndustry(industry: string): CaseStudyData[] {
  return caseStudiesData.pages.filter((page) =>
    page.related.industries.some((i) => i.includes(industry)),
  );
}

export function getCaseStudiesByTechnology(technology: string): CaseStudyData[] {
  return caseStudiesData.pages.filter((page) =>
    page.caseStudy.technologies.some((tech) =>
      tech.toLowerCase().includes(technology.toLowerCase()),
    ),
  );
}

export default caseStudiesData;