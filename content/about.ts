// Auto-generated about pages data
// Generated: 2026-07-28T10:29:45.848680
// Total about pages: 1

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

export interface PageData {
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
}

export interface AboutData {
  totalPages: number;
  generatedAt: string;
  pages: PageData[];
}

export const aboutData: AboutData = {
  totalPages: 1,
  generatedAt: "2026-07-28T10:29:45.848700",
  pages: [
    {
      url: "/about/security/",
      meta: {
        title:
          "Security Practices | How We Protect Your Code & Data | Clickmasters",
        description:
          "How Clickmasters protects client code, data, and IP — access controls, secrets handling, device policy, and the contractual commitments behind them.",
      },
      content:
        "# Security & Data Protection at Clickmasters\n\n**When you hire a development partner, you extend your attack surface to their laptops, their accounts, and their offboarding process — so here is exactly how we handle yours, in the detail a security questionnaire actually asks for.**\n\n## Access control\n\nLeast-privilege access per project, granted on assignment and revoked within [PLACEHOLDER — state your actual SLA, e.g. 4 business hours] of roster change. SSO with enforced MFA on every internal system. Quarterly access reviews with records retained. Client production access is exception-based, time-boxed, and logged — not standing.\n\n## Code and secrets handling\n\nClient code lives in client-owned repositories wherever possible; where we host, repositories are private with branch protection and mandatory review. Secrets live in managed vaults, never in code, tickets, or chat — with automated secret scanning in CI and a documented revocation runbook. See [our secrets guidance](/resources/cloud-devops/managing-secrets/) for the same standard we apply internally.\n\n## Devices and environments\n\nCompany-managed, disk-encrypted devices with screen-lock and endpoint protection enforced. Production data never lands on developer machines; test environments use masked or synthesized data per [our test-data standard](/resources/qa-testing/test-data-management/). Client environments are separated — no shared credentials or cross-client infrastructure.\n\n## Development security practices\n\nDependency, static, and secret scanning gate every merge ([shift-left discipline](/resources/cloud-devops/devsecops-shift-left/)). Threat modeling on auth, payment, and upload features. [OWASP Top 10](/resources/security-compliance/owasp-top-10-business-applications/) classes tested as part of QA, not left to an annual pentest.\n\n## Contractual commitments\n\nIP assignment on payment, flowing down to every contributor including subcontractors. Mutual NDAs, security obligations in the MSA, and defined breach-notification timelines. [PLACEHOLDER — list only verifiable certifications, e.g. ISO 27001, SOC 2 status; delete this line rather than imply.] Full detail in [the contract stack](/resources/hiring-developers/nda-msa-sow-contract-stack/).\n\n## Incident response\n\nA documented response runbook with named owners, client notification commitments, and post-incident reporting. [PLACEHOLDER — disclosure history statement: state honestly, including 'no reportable incidents to date' only if true and verifiable.]\n\nYes — we complete client security questionnaires, support vendor assessments, and will walk your security team through any control above. Ask for it during evaluation, not after signing.\n\n**Who owns the code and IP?**\nYou do, from day one, assigned on payment and reaching every contributor. Repositories and cloud accounts should be yours with our access granted — see [IP protection](/resources/hiring-developers/ip-protection-outsourced-teams/).\n\n**What happens to access when the engagement ends?**\nAccess revoked on the final day, credentials rotated, and any copies of client data destroyed with written confirmation — the offboarding checklist runs whether the parting is happy or not.\n\n[Form] [Calendar embed]",
      metadata: {
        primaryKeyword: "development company security practices",
        secondaryKeywords: [],
        intent: "",
        funnel: "",
        schema: ["Service", "FAQPage", "BreadcrumbList"],
        cta: "Send Us Your Security Questionnaire\nTell us what you're building — honest read, fixed number, no pitch attached.",
        wordCount: 0,
        tier: 1,
        searchVolume: "",
        productionNote:
          "EEAT and enterprise-sales critical. Every [PLACEHOLDER] must be filled with verified truth or the line deleted — a fabricated security claim is the single most damaging possible content error on this site.",
      },
      internalLinks: [],
      related: {
        services: [],
        solutions: [],
        platforms: [],
        technologies: [],
        industries: [],
        compare: [],
        resources: [],
        parent: "",
        siblings: [],
        children: [],
      },
      structured: {
        faqs: [
          {
            question: "Can we run our own security review?",
            answer:
              "Yes — we complete client security questionnaires, support vendor assessments, and will walk your security team through any control above. Ask for it during evaluation, not after signing.",
          },
          {
            question: "Who owns the code and IP?",
            answer:
              "You do, from day one, assigned on payment and reaching every contributor. Repositories and cloud accounts should be yours with our access granted — see [IP protection](/resources/hiring-developers/ip-protection-outsourced-teams/).",
          },
          {
            question: "What happens to access when the engagement ends?",
            answer:
              "Access revoked on the final day, credentials rotated, and any copies of client data destroyed with written confirmation — the offboarding checklist runs whether the parting is happy or not.",
          },
        ],
        tables: [],
        cta: "Send Us Your Security Questionnaire\nTell us what you're building — honest read, fixed number, no pitch attached.",
        sourceFile: "wave2-core/gap-pages/about-security.md",
      },
    },
  ],
};

// Helper functions
export function getAboutByUrl(url: string): PageData | undefined {
  const cleanUrl = url.replace(/^\/+|\/+$/g, "");
  return aboutData.pages.find(
    (page) =>
      page.url === url ||
      page.url === `/${url}` ||
      page.url.replace(/^\/+|\/+$/g, "") === cleanUrl,
  );
}

export function getAboutByKeyword(keyword: string): PageData[] {
  return aboutData.pages.filter(
    (page) =>
      page.metadata.primaryKeyword === keyword ||
      page.metadata.secondaryKeywords.includes(keyword),
  );
}

export default aboutData;
