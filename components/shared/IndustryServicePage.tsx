"use client";

// app/components/shared/IndustryServicePage.tsx
import React, { useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";
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
  Plus,
  ArrowRight,
  Star,
  ExternalLink,
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
    .replace(/##\s*(?:FAQ|FAQs|Frequently Asked Questions[^\n]*)\n[\s\S]*?(?=\n##|\n---|$)/i, "")
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
  className = "",
}: {
  children: React.ReactNode;
  variant?: "default" | "primary" | "success" | "outline";
  className?: string;
}) {
  const variants = {
    default: "border-white/10 bg-white/[0.04] text-white/70",
    primary: "border-primary/30 bg-primary/10 text-primary",
    success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    outline: "border-white/20 bg-transparent text-white/60 hover:text-white hover:border-white/30",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

// ============================================================
// ENHANCED CARD COMPONENT
// ============================================================

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "outlined" | "gradient";
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

function Card({
  children,
  className = "",
  variant = "default",
  hover = true,
  padding = "md",
}: CardProps) {
  const variants = {
    default: "border-white/[0.06] bg-white/[0.02]",
    elevated: "border-white/5 bg-gradient-to-br from-white/[0.04] to-white/[0.01] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)]",
    outlined: "border-white/15 bg-transparent",
    gradient: "border-transparent bg-gradient-to-br from-primary/[0.08] via-white/[0.02] to-transparent",
  };

  const paddings = {
    none: "",
    sm: "p-4 md:p-5",
    md: "p-6 md:p-8",
    lg: "p-8 md:p-10 lg:p-12",
  };

  return (
    <div
      className={`
        rounded-2xl backdrop-blur-sm transition-all duration-500
        ${variants[variant]}
        ${paddings[padding]}
        ${hover ? "hover:border-white/15 hover:bg-white/[0.05] hover:shadow-[0_25px_80px_-25px_rgba(0,0,0,0.6)] hover:-translate-y-1" : ""}
        ${className}
      `}
    >
      <div className="relative z-10">{children}</div>
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
}

// ============================================================
// SECTION WRAPPER
// ============================================================

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  background?: "none" | "subtle" | "gradient" | "grid";
}

function SectionWrapper({
  children,
  className = "",
  id,
  background = "none",
}: SectionWrapperProps) {
  const backgrounds = {
    none: "",
    subtle: "relative before:absolute before:inset-0 before:bg-gradient-to-b from-primary/[0.03] via-transparent to-transparent before:pointer-events-none",
    gradient: "relative before:absolute before:inset-0 before:bg-gradient-to-br from-primary/[0.05] via-transparent to-blue-500/[0.02] before:pointer-events-none",
    grid: "relative before:absolute before:inset-0 before:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMjUiPjxwYXRoIGQ9Ik00OCA0NnYtMkgyNHYyaDI0ek00OCAzNnYtMkg0di0yaDI0eiIvPjwvZz48L2c+PC9zdmc+')] before:bg-[size:80px_80px] before:pointer-events-none before:opacity-50",
  };

  return (
    <section id={id} className={`relative py-16 md:py-24 lg:py-32 ${backgrounds[background]} ${className}`}>
      <div className="mx-auto w-[85vw] px-4 md:px-6 relative z-10">{children}</div>
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

  const firstParagraphEnd = contentAfterH1.search(/\n\n/);
  let description =
    firstParagraphEnd !== -1
      ? contentAfterH1.substring(0, firstParagraphEnd).trim()
      : contentAfterH1.trim();

  const stripMarkdown = (text: string) =>
    text
      .replace(/\*/g, "")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/^-\s+/gm, "")
      .trim();

  description = stripMarkdown(description);

  if (!h1Text && !description) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="mb-12 md:mb-16"
    >
      {h1Text && !/PAGE/i.test(h1Text) && (
        <h1 className="text-chrome text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium leading-[1.02] tracking-[-0.02em] mb-6">
          {h1Text}
        </h1>
      )}
      {description && description.trim() !== "[Trust bar]" && (
        <p className="text-white/60 leading-relaxed text-base md:text-lg max-w-[85vw]">
          {description}
        </p>
      )}
    </motion.div>
  );
}

// ============================================================
// PAGE TABLES COMPONENT
// ============================================================

export function PageTables({ pageData }: { pageData: PageData }) {
  const structuredTables = pageData?.structured?.tables || [];

  if (structuredTables.length === 0) return null;

  return (
    <SectionWrapper background="subtle" className="border-t border-white/5">
      <div className="text-center mb-16">
        <div className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-5 inline-flex items-center gap-2">
          <span className="w-12 h-px bg-white/10" />
          — Overview
          <span className="w-12 h-px bg-white/10" />
        </div>
        <h2 className="text-chrome text-4xl md:text-5xl lg:text-6xl font-medium tracking-[-0.03em] leading-[1.02]">
          What It Does for Your Business
        </h2>
      </div>

      <div className="space-y-8">
        {structuredTables.map((table, tableIndex) => (
          <motion.div
            key={tableIndex}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: tableIndex * 0.1 }}
          >
            <Card variant="elevated" className="overflow-hidden p-0">
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
                                        className="text-primary/80 hover:text-primary hover:underline transition-colors inline-flex items-center gap-1"
                                        {...props}
                                      >
                                        {children}
                                        <ExternalLink className="h-3 w-3" />
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
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
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
// ENHANCED FAQ SECTION COMPONENT
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
    <SectionWrapper background="subtle" className="border-t border-white/5" id="faq">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-5 inline-flex items-center gap-2">
            <span className="w-12 h-px bg-white/10" />
            — Support
            <span className="w-12 h-px bg-white/10" />
          </div>
          <h2 className="text-chrome text-4xl md:text-5xl lg:text-6xl font-medium tracking-[-0.03em] leading-[1.02]">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-white/50 text-base max-w-2xl mx-auto">
            Can't find what you're looking for?{" "}
            <Link href="/contact" className="text-primary hover:text-white transition-colors inline-flex items-center gap-1">
              Contact us directly
              <ArrowRight className="h-4 w-4" />
            </Link>
          </p>
        </div>

        <div className="divide-y divide-white/5 border border-white/5 rounded-2xl overflow-hidden">
          <FAQAccordion faqs={finalFaqs} />
        </div>
      </div>
    </SectionWrapper>
  );
}

// ============================================================
// ENHANCED CTA SECTION COMPONENT
// ============================================================

export function CTASection({ pageData }: { pageData: PageData }) {
  const ctaText =
    pageData.structured?.cta ||
    pageData.metadata.cta ||
    "Ready to Get Started?";
  const primaryKeyword = pageData.metadata.primaryKeyword || "your project";

  return (
    <SectionWrapper background="gradient">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-br from-[#161616] via-[#0e0e0e] to-[#0a0a0a] px-6 py-12 md:px-12 md:py-16 lg:px-16 lg:py-20 text-center"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/[0.1] via-transparent to-transparent" />
        <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        <div className="absolute -bottom-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="h-5 w-5 text-primary/60"
            >
              <Sparkles className="h-5 w-5" />
            </motion.div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-white/40">
              Connect
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-chrome text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-medium leading-[1.05] tracking-[-0.02em] max-w-3xl mx-auto"
          >
            {ctaText.split("\n")[0] || ctaText}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mx-auto mt-6 max-w-2xl text-sm md:text-base text-white/50 leading-relaxed"
          >
            Let's discuss how we can help you with{" "}
            <span className="text-white/70 font-medium">{primaryKeyword}</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-3.5 md:px-10 md:py-4 text-sm md:text-base font-medium text-[#050505] shadow-lg shadow-white/5 transition-all hover:bg-white/90 hover:shadow-white/10 hover:scale-[1.02] active:scale-[0.98]"
            >
              Contact Us Today
              <motion.span
                className="inline-block"
                animate={{ x: 0 }}
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <ArrowRight className="h-4 w-4" />
              </motion.span>
            </Link>

            <Link
              href="#faq"
              className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-8 py-3.5 md:px-10 md:py-4 text-sm md:text-base font-medium text-white/80 transition-all hover:border-white/30 hover:text-white hover:bg-white/5 backdrop-blur"
            >
              View FAQs
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-6 text-white/40 text-xs"
          >
            <span className="flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-primary" />
              Enterprise Security
            </span>
            <span className="w-px h-5 bg-white/10" />
            <span className="flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5 text-primary" />
              500+ Projects
            </span>
            <span className="w-px h-5 bg-white/10" />
            <span className="flex items-center gap-1.5">
              <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
              4.9/5 Rating
            </span>
            <span className="w-px h-5 bg-white/10" />
            <span className="flex items-center gap-1.5">
              <TrendingUp className="h-3.5 w-3.5 text-primary" />
              98% Success Rate
            </span>
          </motion.div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}

// ============================================================
// ENHANCED RELATED SERVICES COMPONENT
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
    <SectionWrapper background="subtle" className="border-t border-white/[0.04]">
      {siblingServices.length > 0 && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-12"
          >
            <h2 className="text-chrome text-xl md:text-2xl lg:text-3xl font-medium tracking-tight">
              Related Services
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent max-w-md" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {siblingServices.map((service, index) => (
              <motion.article
                key={service.url}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Link
                  href={service.url}
                  className="group relative flex flex-col h-full overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-7 transition-all duration-500 hover:border-white/15 hover:bg-white/[0.04]"
                >
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="text-[15px] md:text-base lg:text-lg font-medium text-white group-hover:text-primary transition-colors leading-[1.3]">
                        {service.metadata.primaryKeyword}
                      </h3>
                      <motion.div
                        className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 border border-white/10 grid place-items-center"
                        whileHover={{ scale: 1.1 }}
                      >
                        <ChevronRight className="h-4 w-4 text-white/40 group-hover:text-primary transition-colors" />
                      </motion.div>
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/45 flex-1">
                      {service.meta.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-white/30 text-xs">
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                        4.9
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        100+
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </>
      )}

      {parentService && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3.5 md:px-6 md:py-4"
        >
          <span className="text-white/30 text-sm flex-shrink-0">←</span>
          <p className="text-sm text-white/50">
            Part of{" "}
            <Link
              href={parentService.url}
              className="font-medium text-white/70 transition-colors hover:text-white hover:underline underline-offset-2"
            >
              {parentService.metadata.primaryKeyword}
            </Link>
          </p>
        </motion.div>
      )}
    </SectionWrapper>
  );
}

// ============================================================
// STATS BAR COMPONENT
// ============================================================

export function StatsBar({
  stats,
}: {
  stats: Array<{
    value: string | number;
    label: string;
    icon?: React.ReactNode;
    suffix?: string;
  }>;
}) {
  return (
    <SectionWrapper background="subtle" className="py-12 md:py-16 border-y border-white/5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative text-center p-6 md:p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04] transition-all group"
          >
            {stat.icon && (
              <div className="flex justify-center mb-3 text-primary/80 group-hover:text-primary transition-colors">
                {stat.icon}
              </div>
            )}
            <div className="text-3xl md:text-4xl lg:text-5xl font-light text-white leading-[1.1]">
              {stat.value}
              {stat.suffix && <span className="text-white/40 font-normal">{stat.suffix}</span>}
            </div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/30 mt-2 font-medium">
              {stat.label}
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-primary transition-all duration-500 group-hover:w-3/4" />
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}

// ============================================================
// FEATURE GRID COMPONENT
// ============================================================

export function FeatureGrid({
  features,
  title,
  subtitle,
}: {
  features: Array<{
    title: string;
    description: string;
    icon?: React.ReactNode;
    link?: string;
  }>;
  title: string;
  subtitle?: string;
}) {
  return (
    <SectionWrapper background="subtle">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-5 inline-flex items-center gap-2">
          <span className="w-12 h-px bg-white/10" />
          — Features
          <span className="w-12 h-px bg-white/10" />
        </div>
        <h2 className="text-chrome text-4xl md:text-5xl lg:text-6xl font-medium tracking-[-0.03em] leading-[1.02]">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-4 text-white/50 text-base md:text-lg max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {features.map((feature, index) => (
          <motion.article
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            whileHover={{ y: -6 }}
            className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-7 transition-all duration-500 hover:border-white/15 hover:bg-white/[0.04]"
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative">
              {feature.icon && (
                <div className="w-12 h-12 rounded-xl border border-white/10 bg-white/[0.03] grid place-items-center mb-5 group-hover:border-primary/30 group-hover:bg-primary/10 transition-all">
                  {feature.icon}
                </div>
              )}
              <h3 className="text-white text-lg md:text-xl font-medium leading-[1.3] mb-3">
                {feature.title}
              </h3>
              <p className="text-white/50 leading-relaxed text-sm md:text-base mb-5">
                {feature.description}
              </p>
              {feature.link && (
                <Link
                  href={feature.link}
                  className="group inline-flex items-center gap-1.5 text-sm font-medium text-white/60 hover:text-primary transition-colors"
                >
                  Learn more
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </SectionWrapper>
  );
}

// ============================================================
// PROCESS STEPS COMPONENT
// ============================================================

export function ProcessSteps({
  steps,
  title,
  subtitle,
}: {
  steps: Array<{
    step: string;
    title: string;
    description: string;
    icon?: React.ReactNode;
  }>;
  title: string;
  subtitle?: string;
}) {
  return (
    <SectionWrapper background="grid">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-5 inline-flex items-center gap-2">
          <span className="w-12 h-px bg-white/10" />
          — Process
          <span className="w-12 h-px bg-white/10" />
        </div>
        <h2 className="text-chrome text-4xl md:text-5xl lg:text-6xl font-medium tracking-[-0.03em] leading-[1.02]">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-4 text-white/50 text-base md:text-lg max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>

      <div className="space-y-8 md:space-y-12">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: index * 0.12 }}
            className="relative flex flex-col md:flex-row md:items-center gap-8 md:gap-12"
          >
            <div className={`flex items-center gap-6 md:w-[180px] md:justify-end ${index % 2 === 1 ? "md:order-2" : ""} md:pr-8`}>
              <div className="relative flex-shrink-0">
                <div className="w-16 h-16 rounded-2xl border border-primary/30 bg-primary/10 grid place-items-center text-primary relative z-10">
                  <span className="text-2xl md:text-3xl font-medium tracking-tight">{step.step}</span>
                </div>
                <div className="absolute -top-4 -bottom-4 left-1/2 w-px bg-gradient-to-b from-primary/30 to-transparent" />
              </div>
              {step.icon && (
                <div className="w-12 h-12 rounded-xl border border-white/10 bg-white/[0.03] grid place-items-center flex-shrink-0">
                  {step.icon}
                </div>
              )}
            </div>

            <div className={`flex-1 ${index % 2 === 1 ? "md:pr-8" : "md:pl-8"}`}>
              <h3 className="text-chrome text-xl md:text-2xl lg:text-3xl font-medium leading-[1.1] tracking-tight mb-3">
                {step.title}
              </h3>
              <p className="text-white/60 leading-relaxed text-base md:text-lg">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
        {/* Remove the last connector line */}
        <style jsx>{`
          div:last-child .absolute {
            display: none;
          }
        `}</style>
      </div>
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
            url: "https://clickmastersapplicationdevelopment.com",
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

// ============================================================
// TESTIMONIAL CAROUSEL COMPONENT
// ============================================================

export function TestimonialCarousel({
  testimonials,
}: {
  testimonials: Array<{
    quote: string;
    author: string;
    role: string;
    company: string;
    avatar?: string;
    rating?: number;
  }>;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const next = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <SectionWrapper background="subtle">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-5 inline-flex items-center gap-2">
          <span className="w-12 h-px bg-white/10" />
          — Testimonials
          <span className="w-12 h-px bg-white/10" />
        </div>
        <h2 className="text-chrome text-4xl md:text-5xl lg:text-6xl font-medium tracking-[-0.03em] leading-[1.02]">
          Trusted by Industry Leaders
        </h2>
      </div>

      <div className="relative max-w-4xl mx-auto">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-[0.22,1,0.36,1]"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="w-full flex-shrink-0 px-4"
                initial={false}
                animate={{ opacity: index === currentIndex ? 1 : 0.5, scale: index === currentIndex ? 1 : 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Card variant="elevated" padding="lg" className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-6">
                    {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <blockquote className="text-white/70 text-lg md:text-xl lg:text-2xl leading-relaxed mb-8 font-medium">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex flex-col items-center gap-1">
                    <div className="font-medium text-white">{testimonial.author}</div>
                    <div className="text-white/50 text-sm">{testimonial.role}, {testimonial.company}</div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {testimonials.length > 1 && (
          <div className="flex items-center justify-center gap-3 mt-10">
            <button
              onClick={prev}
              disabled={isAnimating}
              className="w-12 h-12 rounded-full border border-white/10 bg-white/[0.03] grid place-items-center text-white/60 hover:text-white hover:border-white/20 transition-all disabled:opacity-50"
            >
              <ChevronRight className="h-6 w-6 -rotate-180" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className="w-2.5 h-2.5 rounded-full transition-all"
                  animate={{
                    width: index === currentIndex ? 24 : 8,
                    backgroundColor: index === currentIndex ? "var(--primary)" : "rgba(255,255,255,0.3)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                />
              ))}
            </div>
            <button
              onClick={next}
              disabled={isAnimating}
              className="w-12 h-12 rounded-full border border-white/10 bg-white/[0.03] grid place-items-center text-white/60 hover:text-white hover:border-white/20 transition-all disabled:opacity-50"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}

// ============================================================
// BREADCRUMB COMPONENT
// ============================================================

export function Breadcrumb({
  items,
}: {
  items: Array<{ label: string; href?: string }>;
}) {
  return (
    <nav className="mb-8" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 text-white/20 flex-shrink-0" />
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="text-white/40 hover:text-white transition-colors flex items-center gap-1"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-white/60 font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
