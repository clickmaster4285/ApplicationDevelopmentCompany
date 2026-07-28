// Auto-generated frameworks pages data
// Generated: 2026-07-28T10:29:45.818079
// Total frameworks pages: 1

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

export interface FrameworksData {
  totalPages: number;
  generatedAt: string;
  pages: PageData[];
}

export const frameworksData: FrameworksData = {
  totalPages: 1,
  generatedAt: "2026-07-28T10:29:45.818382",
  pages: [
    {
      url: "/frameworks/build-vs-buy/",
      meta: {
        title: "Build vs Buy Software: The Honest Framework | Clickmasters",
        description:
          "The build-vs-buy decision reduced to arithmetic — crossover math, the four honest tests, and when off-the-shelf genuinely wins. From a firm that profits either way it goes.",
      },
      content:
        "# FRAMEWORK — Build vs Buy\n\n# Build vs Buy: The Honest Framework\n\n**The build-vs-buy decision reduces to one comparison most vendors avoid writing down: the total cost of the off-the-shelf path over 4–5 years (subscriptions that scale with seats and usage, plus the workaround labor and error costs the tool doesn't remove) against the total cost of building (the build itself, plus 15–20% of build cost annually to run and evolve it). Where those curves cross — and whether your workflows are differentiated enough to care — is the whole decision.** Everything below is that sentence, expanded into something you can defend in a budget meeting.\n\nA disclosure that doubles as a credential: Clickmasters builds custom software *and* implements off-the-shelf platforms — [Shopify](/platforms/shopify/), [Salesforce](/platforms/salesforce/), [WordPress](/platforms/wordpress/), and more. We invoice either answer, which is precisely why we can afford to give you the honest one. Vendors who only build always say build; vendors who only resell licenses always say buy. Ask any advisor which answer they *can't* invoice — that's the pressure on their advice.\n\n## The Four Tests (in order — most decisions end early)\n\n**Test 1 — Is this workflow actually differentiated?**\nIf your process matches the industry template — standard CRM pipeline, standard payroll, standard help desk — buy. Mature products encode a thousand companies' lessons and cost less than rediscovering them. Custom software pays only where your operation genuinely differs: pricing logic competitors can't see, a workflow that *is* your competitive edge, an integration surface nothing on the market speaks. Most companies overestimate their uniqueness on 80% of workflows and underestimate it on the 20% that matters. Be ruthless here; it's the cheapest place in the whole decision to be wrong.\n\n**Test 2 — Does a mature product cover ≥80% of the need at sane economics?**\nIf yes: buy it, configure it, and spend your custom budget on [the integration layer](/services/api-development/) that makes it agree with the rest of your stack — that's where most \"the tool doesn't work\" pain actually lives. The trap in this test is the missing 20%: if it contains your revenue-critical workflow, the 80% coverage is a decoy. That's how companies end up paying subscriptions *and* running the real process in spreadsheets alongside — the most expensive possible outcome, and the most common one we're called in to fix.\n\n**Test 3 — The crossover math.**\nPut real numbers on both curves:\n\nPer-seat products with 25+ users and rising counts cross early. Ten-seat teams on a $49/month tool essentially never cross — keep the subscription and your money. Include the honest soft costs on both sides: the buy path's workaround hours are real labor; the build path's opportunity cost of a 4–6 month delivery is real time.\n\n**Test 4 — Can you operate what you own?**\nBuilt software is an asset that needs stewardship — a [support arrangement](/services/software-maintenance-support/) or internal ownership, roadmap discipline, and the organizational will to evolve it. If your company can't name who owns the system in year 2, that's an argument for buying, whatever the math says.\n\n## The Three Honest Outcomes\n\n1. **Buy** — undifferentiated workflow, good product coverage, sane economics. We'll say so in the first call and, where it's a platform we implement, help you deploy it well.\n2. **Build** — differentiated core, crossover inside ~4 years, ownership capacity in place. [Fixed-milestone quote](/services/custom-software-development/), both curves attached.\n3. **The hybrid that wins most often** — buy the commodity layers, build the differentiated core and [the integrations between them](/services/api-development/). Most mid-market stacks should be exactly this, and vendor incentives are why so few are.\n\nUp front, almost always. Over five years at 25+ seats with real workaround costs — frequently the opposite, which is why the math must be run rather than assumed. [The cost guides](/resources/software-cost-guides/) publish our real ranges so you can run it honestly.\n\n**What's the most common build-vs-buy mistake?**\nBuying for the demo, then paying subscriptions *and* spreadsheet labor forever because the missing 20% was the part that mattered. Second place: building something a $99/month product does fine, out of uniqueness vanity. The four tests exist to catch both.\n\n**Can we start with buy and switch to build later?**\nOften the right sequence — the product teaches you your real requirements cheaply. Design the exit: own your data, document your workflows, and avoid the deep-customization lock-in that turns \"switch later\" into \"rebuild everything.\" [Platform boundary reads](/platforms/) are how we price that exit before you need it.\n\n**Will you actually tell us not to build?**\nRoutinely — it's in the first call's deliverable either way, and it's why the recommendation is worth anything. Ask for the crossover sheet; we'll fill it with your numbers, not ours.\n\n[Form] [Calendar embed]",
      metadata: {
        primaryKeyword: "build vs buy software",
        secondaryKeywords: [
          "build vs buy analysis",
          "custom software vs off the shelf",
          "build vs buy framework",
          "when to build custom software",
        ],
        intent:
          "Informational/Commercial-Investigational (GEO priority — most-linked page on site, 149 internal references)",
        funnel: "",
        schema: ["Article", "FAQPage", "BreadcrumbList"],
        cta: "Run the Math With Us",
        wordCount: 0,
        tier: "",
        searchVolume: "",
        productionNote:
          "Publish early — nearly every solution, cost, and platform page links here. This page is deliberately vendor-honest; that is its ranking strategy and its conversion strategy.",
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
            question: "Isn't custom software always more expensive?",
            answer:
              "Up front, almost always. Over five years at 25+ seats with real workaround costs — frequently the opposite, which is why the math must be run rather than assumed. [The cost guides](/resources/software-cost-guides/) publish our real ranges so you can run it honestly.",
          },
          {
            question: "Can we start with buy and switch to build later?",
            answer:
              'Often the right sequence — the product teaches you your real requirements cheaply. Design the exit: own your data, document your workflows, and avoid the deep-customization lock-in that turns "switch later" into "rebuild everything." [Platform boundary reads](/platforms/) are how we price that exit before you need it.',
          },
          {
            question: "Will you actually tell us not to build?",
            answer:
              "Routinely — it's in the first call's deliverable either way, and it's why the recommendation is worth anything. Ask for the crossover sheet; we'll fill it with your numbers, not ours.",
          },
        ],
        tables: [
          {
            headers: ["", "Off-the-shelf path", "Build path"],
            rows: [
              {
                "": "Year 0",
                "Off-the-shelf path": "Implementation + licenses",
                "Build path":
                  "Build cost ([real ranges here](/resources/software-cost-guides/))",
              },
              {
                "": "Annually",
                "Off-the-shelf path":
                  "Licenses (× seat growth × price escalation) + workaround labor + error/limitation costs",
                "Build path": "15–20% of build for hosting, support, evolution",
              },
              {
                "": "Year 4–5",
                "Off-the-shelf path":
                  "The curves usually cross here for differentiated, seat-heavy workflows",
                "Build path": "Ownership: no per-seat tax, asset on your books",
              },
            ],
          },
        ],
        cta: "Run the Math With Us\nBring the tool's invoice, the seat count, and the workflow that doesn't fit — leave with both cost curves and a recommendation we'd defend to your CFO.",
        sourceFile: "wave2-core/frameworks-build-vs-buy.md",
      },
    },
  ],
};

// Helper functions
export function getFrameworksByUrl(url: string): PageData | undefined {
  const cleanUrl = url.replace(/^\/+|\/+$/g, "");
  return frameworksData.pages.find(
    (page) =>
      page.url === url ||
      page.url === `/${url}` ||
      page.url.replace(/^\/+|\/+$/g, "") === cleanUrl,
  );
}

export function getFrameworksByKeyword(keyword: string): PageData[] {
  return frameworksData.pages.filter(
    (page) =>
      page.metadata.primaryKeyword === keyword ||
      page.metadata.secondaryKeywords.includes(keyword),
  );
}

export default frameworksData;
