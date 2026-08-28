// app/components/shared/IndustryServicePageUtils.ts

// ============================================================
// TYPES
// ============================================================

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

export interface FAQ {
  question: string;
  answer: string;
}

// ============================================================
// HELPERS
// ============================================================

export function extractFAQs(contentOrPageData: string | PageData): FAQ[] {
  if (typeof contentOrPageData === "object" && contentOrPageData.structured) {
    const pageData = contentOrPageData as PageData;
    if (pageData.structured?.faqs && pageData.structured.faqs.length > 0) {
      return pageData.structured.faqs;
    }
    return extractFAQsFromContent(pageData.content);
  }
  return extractFAQsFromContent(contentOrPageData as string);
}

function extractFAQsFromContent(content: string): FAQ[] {
  const faqs: FAQ[] = [];
  const match = content.match(/##\s*FAQ\s*\n([\s\S]*?)(?=\n##|\n---|$)/i);
  if (!match) return faqs;

  const section = match[1];
  const entries = section.split(/\n\n+/);

  for (const entry of entries) {
    const qMatch = entry.match(/\*\*([^*]+)\*\*/);
    if (qMatch) {
      const question = qMatch[1].trim();
      const answer = entry.replace(/\*\*[^*]+\*\*/, "").trim();
      if (question && answer) {
        faqs.push({ question, answer });
      }
    }
  }

  return faqs;
}

export function cleanPageContent(contentOrPageData: string | PageData): string {
  let content: string;

  if (typeof contentOrPageData === "object" && contentOrPageData.content) {
    content = (contentOrPageData as PageData).content;
  } else {
    content = contentOrPageData as string;
  }

  let cleaned = content
    .replace(/^#+\s*PAGE\s*:?\s*.*$/gim, "")
    .replace(/^PAGE\s*:?\s*.*$/gim, "")
    .replace(/PAGE:\s*\/[^\n]*/gi, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  cleaned = cleaned
    .replace(/##\s*FAQ\s*\n[\s\S]*?(?=\n##|\n---|$)/i, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return cleaned;
}
