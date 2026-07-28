// app/components/shared/IndustryServicePage.tsx
import React from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  Sparkles,
  Shield,
  Zap,
  Clock,
  Users,
  TrendingUp,
  Award,
  MapPin,
  GitCompare,
} from "lucide-react";
import { FAQAccordion } from "./FAQAccordion";
import { PageContent } from "./PageContent";

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

// ============================================================
// BADGE COMPONENT
// ============================================================

export function Badge({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "primary" | "success";
}) {
  const variants = {
    default: "border-white/10 bg-white/[0.04] text-white/70",
    primary: "border-primary/30 bg-primary/10 text-primary",
    success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] ${variants[variant]}`}
    >
      {children}
    </span>
  );
}

// ============================================================
// SECTION WRAPPER
// ============================================================

function SectionWrapper({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`relative py-8 md:py-16 ${className}`}>
      <div className="mx-auto w-[85vw]  px-4 md:px-6">{children}</div>
    </section>
  );
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 backdrop-blur-sm transition-all hover:border-white/10 hover:bg-white/[0.04] ${className}`}
    >
      {children}
    </div>
  );
}

// ============================================================
// HERO HEADER COMPONENT
// ============================================================

// app/components/shared/IndustryServicePage.tsx

export function HeroHeader({
  pageData,
  type = "Service",
}: {
  pageData: PageData;
  type?:
    | "Industry"
    | "Service"
    | "Technology"
    | "Solution"
    | "Location"
    | "Compare"
    | "Framework"
    | "Cost"
    | "About"
    | "Resource"
    | "Platform"
    | "Blog"
    | "Case Study"
    | "Eboos";
}) {
  const iconMap: Record<string, React.ReactElement> = {
    Service: <Zap className="h-5 w-5" />,
    Industry: <Users className="h-5 w-5" />,
    Technology: <Sparkles className="h-5 w-5" />,
    Solution: <Check className="h-5 w-5" />,
    Location: <MapPin className="h-5 w-5" />,
    Compare: <GitCompare className="h-5 w-5" />,
    Framework: <Sparkles className="h-5 w-5" />,
    Cost: <Zap className="h-5 w-5" />,
    About: <Users className="h-5 w-5" />,
    Resource: <Sparkles className="h-5 w-5" />,
    Platform: <Sparkles className="h-5 w-5" />,
    Blog: <Sparkles className="h-5 w-5" />,
    "Case Study": <Check className="h-5 w-5" />,
    Eboos: <Sparkles className="h-5 w-5" />,
  };

  // Strip markdown bold/italic markers, links, and leading dashes so this
  // renders as plain text — matches the cleanup used in PageContent/PageHeader.
  const stripMarkdown = (text: string) =>
    text
      .replace(/\*/g, "")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/^-\s+/gm, "")
      .trim();

  const title = stripMarkdown(pageData.meta.title || "");
  const description = stripMarkdown(pageData.meta.description || "");

  return (
    <section className="relative overflow-hidden pt-16 md:pt-32 pb-4 md:pb-6">
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] via-transparent to-transparent pointer-events-none" />
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="mx-auto w-[85vw] max-w-[85vw] px-4 md:px-6 relative">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.12em] text-white/60">
              {iconMap[type] || iconMap.Service}
              {type}
            </span>
            {pageData.metadata.tier && (
              <Badge variant="primary">Tier {pageData.metadata.tier}</Badge>
            )}
          </div>

          <h1 className="text-chrome text-4xl md:text-6xl lg:text-7xl font-medium leading-[1.02] tracking-[-0.03em] max-w-4xl">
            {title}
          </h1>

          <p className="max-w-2xl text-white/55 leading-relaxed text-base md:text-lg mt-2">
            {description}
          </p>

          <div className="flex flex-wrap gap-2.5 mt-2">
            {pageData.metadata.intent && (
              <Badge>{pageData.metadata.intent}</Badge>
            )}
            {pageData.metadata.primaryKeyword && (
              <Badge variant="success">
                {pageData.metadata.primaryKeyword}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// PAGE HEADER COMPONENT
// ============================================================

export function PageHeader({ content }: { content: string }) {
  const h1Match = content.match(/^# (.+)$/m);
  let h1Text = h1Match ? h1Match[1] : "";
  h1Text = h1Text.replace(/^(SOLUTION|TECH|PAGE)\s+\d+\s+[—\-]\s*/, "");

  const contentAfterH1 = content.replace(/^# .+\n/, "");

  // Replace the s flag with a manual approach
  // Find the first paragraph until double newline or end of string
  const firstParagraphEnd = contentAfterH1.search(/\n\n/);
  let description =
    firstParagraphEnd !== -1
      ? contentAfterH1.substring(0, firstParagraphEnd).trim()
      : contentAfterH1.trim();

  // Strip markdown bold/italic markers, links, and leading dashes so this
  // renders as plain text — matches the cleanup used in PageContent.
  const stripMarkdown = (text: string) =>
    text
      .replace(/\*/g, "")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/^-\s+/gm, "")
      .trim();

  description = stripMarkdown(description);

  if (!h1Text && !description) return null;

  return (
    <div className="mb-10 md:mb-14">
      {h1Text && !/PAGE/i.test(h1Text) && (
        <h1 className="text-chrome text-2xl md:text-3xl lg:text-4xl font-medium leading-[1.05] tracking-[-0.02em] mb-4">
          {h1Text}
        </h1>
      )}
      {description && description.trim() !== "[Trust bar]" && (
        <p className="text-white/60 leading-relaxed text-[15px] md:text-base max-w-[85vw]">
          {description}
        </p>
      )}
    </div>
  );
}

// ============================================================
// PAGE CONTENT COMPONENT (MARKDOWN)
// ============================================================

// export function PageContent({ content, pageData }: { content?: string; pageData?: PageData }) {
//   const rawContent = content || pageData?.content || '';

//   const contentWithoutHeader = rawContent
//     .replace(/^# .+\n/, '')
//     .replace(/^(.+?)(?=\n\n|$)/s, '');

//   const cleanHeading = (text: string) => {
//     const cleanText = text.replace(/\[#\w+\]\s*/, '');
//     return cleanText.replace(/^(SOLUTION|TECH|PAGE)\s+\d+\s+[—\-]\s*/, '');
//   };

//   const extractId = (text: string) => {
//     const anchorMatch = text.match(/\[#(\w+)\]/);
//     return anchorMatch ? anchorMatch[1] : undefined;
//   };

//   // Split by ## headings
//   const rawSections = contentWithoutHeader
//     .split(/(?=^## )/m)
//     .filter(Boolean)
//     .map((section) => section.trim());

//   // Process sections: extract title + description, filter invalid ones
//   const sections = rawSections
//     .map((section) => {
//       const lines = section.split('\n');
//       const titleLine = lines[0] || '';
//       const title = cleanHeading(titleLine.replace(/^##\s*/, '').trim());
//      let description = lines.slice(1).join('\n').trim();

// // Remove FAQ portion from this section only
// const faqMatch = description.match(/\n\*\*[^*]+\?\*\*/);

// if (faqMatch && faqMatch.index !== undefined) {
//   description = description.slice(0, faqMatch.index).trim();
// }

// // Detect actual FAQ sections (## FAQ)
// const isFaq =
//   /^faq$/i.test(title) ||
//   /frequently asked questions/i.test(title);
// const raw = `${lines[0]}\n${description}`;
// return {
//   raw,
//   title,
//   description,
//   isFaq,
// };
//     })
//     // Skip if missing title OR missing description
//     // Also skip FAQs
//     .filter((s) => s.title && s.description && !s.isFaq);

//   const headingComponents = {
//     h2: ({ children, ...props }: any) => {
//       const text = String(children);
//       const id = extractId(text);
//       const cleanText = cleanHeading(text);
//       return (
//         <h2
//           id={id}
//           className="text-chrome text-xl md:text-2xl font-medium leading-[1.05] tracking-[-0.02em] mb-4"
//           {...props}
//         >
//           {cleanText}
//         </h2>
//       );
//     },
//     h3: ({ children, ...props }: any) => {
//       const text = String(children);
//       const id = extractId(text);
//       const cleanText = cleanHeading(text);
//       return (
//         <h3
//           id={id}
//           className="text-chrome text-lg md:text-xl font-medium tracking-[-0.02em] mb-3 mt-6"
//           {...props}
//         >
//           {cleanText}
//         </h3>
//       );
//     },
//     h4: ({ children, ...props }: any) => {
//       const text = String(children);
//       const id = extractId(text);
//       const cleanText = cleanHeading(text);
//       return (
//         <h4
//           id={id}
//           className="text-chrome text-base md:text-lg font-medium tracking-[-0.02em] mb-2 mt-5"
//           {...props}
//         >
//           {cleanText}
//         </h4>
//       );
//     },
//   };

//   const paragraphComponents = {
//     p: ({ children, ...props }: any) => {
//       if (!children) return null;
//       const text = String(children);
//       if (!text.trim() || text.trim() === '[Trust bar]') return null;
//       if (text.trim().startsWith('>')) {
//         return (
//           <blockquote className="my-4 rounded-r-xl border-l-2 border-primary/40 bg-primary/[0.04] px-4 py-3 text-white/70 italic text-sm">
//             {text.replace(/^>\s*/, '')}
//           </blockquote>
//         );
//       }
//       return (
//         <p className="text-white/55 leading-relaxed mb-4 text-[15px]" {...props}>
//           {children}
//         </p>
//       );
//     },
//     strong: ({ children, ...props }: any) => {
//       const text = String(children);
//       if (text.includes('[PLACEHOLDER')) {
//         return (
//           <span className="rounded bg-yellow-500/10 px-1.5 py-0.5 font-medium text-yellow-400" {...props}>
//             {children}
//           </span>
//         );
//       }
//       return (
//         <strong className="font-semibold text-white" {...props}>
//           {children}
//         </strong>
//       );
//     },
//   };

//   const listComponents = {
//     ul: ({ children, ...props }: any) => (
//       <ul className="space-y-2 mb-4" {...props}>
//         {children}
//       </ul>
//     ),
//     ol: ({ children, ...props }: any) => (
//       <ol className="list-decimal space-y-2 pl-5 mb-4" {...props}>
//         {children}
//       </ol>
//     ),
//     li: ({ children, ...props }: any) => (
//       <li
//         className="relative pl-5 leading-relaxed text-white/55 before:absolute before:left-0 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-white/20 text-sm"
//         {...props}
//       >
//         {children}
//       </li>
//     ),
//   };

//   const linkComponents = {
//     a: ({ href, children, ...props }: any) => {
//       const baseClass =
//         'inline-flex items-center gap-1 text-primary/80 underline-offset-2 transition-all hover:text-primary hover:underline';
//       if (href?.startsWith('#')) {
//         return (
//           <a href={href} className={baseClass} {...props}>
//             {children}
//           </a>
//         );
//       }
//       if (href?.startsWith('/')) {
//         return (
//           <Link href={href} className={baseClass} {...props}>
//             {children}
//           </Link>
//         );
//       }
//       return (
//         <a
//           href={href}
//           target="_blank"
//           rel="noopener noreferrer"
//           className={`${baseClass} after:ml-0.5 after:inline-block after:text-[10px] after:content-['↗']`}
//           {...props}
//         >
//           {children}
//         </a>
//       );
//     },
//   };

//   const codeComponents = {
//     code: ({ inline, children, ...props }: any) => {
//       if (inline) {
//         return (
//           <code
//             className="rounded-md bg-white/10 px-1.5 py-0.5 font-mono text-[0.9em] text-white/85"
//             {...props}
//           >
//             {children}
//           </code>
//         );
//       }
//       return (
//         <pre
//           className="my-4 overflow-x-auto rounded-xl border border-white/[0.07] bg-white/[0.03] p-4"
//           {...props}
//         >
//           <code className="font-mono text-sm text-white/80">{children}</code>
//         </pre>
//       );
//     },
//   };

//   const blockComponents = {
//     blockquote: ({ children, ...props }: any) => (
//       <blockquote
//         className="my-4 rounded-r-xl border-l-2 border-primary/30 bg-primary/[0.04] px-4 py-3 text-white/70 text-sm"
//         {...props}
//       >
//         {children}
//       </blockquote>
//     ),
//     hr: () => <hr className="my-6 border-white/[0.06]" />,
//   };

//   const markdownComponents = {
//     ...headingComponents,
//     ...paragraphComponents,
//     ...listComponents,
//     ...linkComponents,
//     ...codeComponents,
//     ...blockComponents,
//   };

//   if (sections.length === 0) {
//     return null;
//   }

//   return (
//     <div className="mx-auto max-w-[85vw]">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {sections.map((section, index) => (
//           <Card key={index} className="h-full">
//             <div className="p-6">
//               <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
//                 {section.raw}
//               </ReactMarkdown>
//             </div>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }

// ============================================================
// PAGE TABLES COMPONENT (SEPARATE)
// ============================================================

export function PageTables({ pageData }: { pageData: PageData }) {
  const structuredTables = pageData?.structured?.tables || [];

  if (structuredTables.length === 0) return null;

  return (
    <section className="relative py-16 md:py-20 border-t border-white/5">
      <div className="mx-auto w-[85vw] px-6">
        <div className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-5 text-center">
          — Overview
        </div>

        <h2 className="text-chrome text-center text-5xl md:text-6xl font-medium tracking-[-0.03em] leading-[1.02] mb-16">
          What It Does for Your Business
        </h2>

        <div className="space-y-8">
          {structuredTables.map((table, tableIndex) => (
            <Card key={tableIndex} className="overflow-hidden p-0">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-white/10">
                  <thead className="bg-white/[0.04]">
                    <tr>
                      {table.headers.map((header, headerIndex) => (
                        <th
                          key={headerIndex}
                          className="px-5 py-4 text-left text-xs font-medium uppercase tracking-[0.08em] text-white/50 first:pl-6 last:pr-6"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-white/[0.06]">
                    {table.rows.map((row, rowIndex) => (
                      <tr
                        key={rowIndex}
                        className="hover:bg-white/[0.02] transition-colors"
                      >
                        {table.headers.map((header, cellIndex) => {
                          const cellContent = row[header] || "";
                          const containsMarkdown = /\*\*|\[.*?\]\(.*?\)/.test(
                            cellContent,
                          );

                          return (
                            <td
                              key={cellIndex}
                              className="px-5 py-4 text-sm text-white/60 first:pl-6 last:pr-6"
                            >
                              {containsMarkdown ? (
                                <ReactMarkdown
                                  remarkPlugins={[remarkGfm]}
                                  components={{
                                    a: ({ href, children, ...props }: any) => (
                                      <Link
                                        href={href}
                                        className="text-primary/80 hover:text-primary hover:underline transition-colors"
                                        {...props}
                                      >
                                        {children}
                                      </Link>
                                    ),
                                    strong: ({ children, ...props }: any) => (
                                      <strong
                                        className="font-semibold text-white"
                                        {...props}
                                      >
                                        {children}
                                      </strong>
                                    ),
                                  }}
                                >
                                  {cellContent}
                                </ReactMarkdown>
                              ) : (
                                cellContent
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// MAIN CONTENT WRAPPER
// ============================================================

export function MainContent({ pageData }: { pageData: PageData }) {
  return (
    <>
      <PageContent pageData={pageData} />
      <PageTables pageData={pageData} />
    </>
  );
}

// ============================================================
// FAQ SECTION COMPONENT
// ============================================================

export function FAQSection({
  faqs,
  pageData,
}: {
  faqs?: FAQ[];
  pageData?: PageData;
}) {
  const finalFaqs = faqs || pageData?.structured?.faqs || [];

  if (finalFaqs.length === 0) return null;

  return (
    <section className="relative py-16 md:py-20 border-t border-white/5">
      <div className="mx-auto w-[85vw] max-w-4xl px-6">
        <div className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-5 text-center">
          — Support
        </div>
        <h2 className="text-chrome text-center text-5xl md:text-6xl font-medium tracking-[-0.03em] leading-[1.02] mb-16">
          Frequently Asked Questions
        </h2>
        <FAQAccordion faqs={finalFaqs} />
      </div>
    </section>
  );
}

// ============================================================
// CTA SECTION COMPONENT
// ============================================================

export function CTASection({ pageData }: { pageData: PageData }) {
  const ctaText =
    pageData.structured?.cta ||
    pageData.metadata.cta ||
    "Ready to Get Started?";
  const primaryKeyword = pageData.metadata.primaryKeyword || "your project";

  return (
    <SectionWrapper>
      <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-br from-[#161616] via-[#0e0e0e] to-[#0a0a0a] px-6 py-12 md:px-12 md:py-16 lg:px-16 lg:py-20 text-center">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/[0.08] via-transparent to-transparent" />
        <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        <div className="absolute -bottom-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />

        <div className="relative">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-primary/60" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-white/40">
              Connect
            </span>
          </div>

          <h2 className="text-chrome text-2xl md:text-4xl lg:text-5xl font-medium leading-[1.05] tracking-[-0.02em] max-w-3xl mx-auto">
            {ctaText.split("\n")[0] || ctaText}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm md:text-base text-white/50 leading-relaxed">
            Let's discuss how we can help you with{" "}
            <span className="text-white/70 font-medium">{primaryKeyword}</span>.
          </p>

          <Link
            href="/contact"
            className="group mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-medium text-[#050505] shadow-lg shadow-white/5 transition-all hover:bg-white/90 hover:shadow-white/10 hover:scale-[1.02] active:scale-[0.98]"
          >
            Contact Us Today
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
}

// ============================================================
// RELATED SERVICES COMPONENT
// ============================================================

export function RelatedServices({
  siblingServices,
  parentService,
}: {
  siblingServices: PageData[];
  parentService: PageData | null;
}) {
  if (siblingServices.length === 0 && !parentService) return null;

  return (
    <SectionWrapper className="border-t border-white/[0.04]">
      {siblingServices.length > 0 && (
        <>
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-chrome text-xl md:text-2xl font-medium tracking-tight">
              Related Services
            </h2>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {siblingServices.map((service) => (
              <Link
                key={service.url}
                href={service.url}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 md:p-6 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.04] hover:-translate-y-0.5"
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative flex flex-1 flex-col">
                  <div className="flex items-start justify-between">
                    <h3 className="text-[15px] md:text-base font-medium text-white group-hover:text-primary transition-colors">
                      {service.metadata.primaryKeyword}
                    </h3>
                    <ChevronRight className="h-4 w-4 text-white/20 transition-all group-hover:text-primary group-hover:translate-x-0.5 flex-shrink-0 mt-0.5" />
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/45">
                    {service.meta.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      {parentService && (
        <div className="mt-8 flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3.5">
          <span className="text-white/30 text-sm">←</span>
          <p className="text-sm text-white/50">
            Part of{" "}
            <Link
              href={parentService.url}
              className="font-medium text-white/70 transition-colors hover:text-white hover:underline underline-offset-2"
            >
              {parentService.metadata.primaryKeyword}
            </Link>
          </p>
        </div>
      )}
    </SectionWrapper>
  );
}

// ============================================================
// STRUCTURED DATA COMPONENTS
// ============================================================

export function StructuredData({ pageData }: { pageData: PageData }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: pageData.meta.title,
          description: pageData.meta.description,
          provider: {
            "@type": "Organization",
            name: "Clickmasters",
            url: "https://clickmasters.com",
          },
          serviceType: pageData.metadata.primaryKeyword,
        }),
      }}
    />
  );
}

export function FAQSchema({ faqs }: { faqs: FAQ[] }) {
  if (faqs.length === 0) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }),
      }}
    />
  );
}
