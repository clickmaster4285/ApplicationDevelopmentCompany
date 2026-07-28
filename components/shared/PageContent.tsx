"use client";

import { motion } from "framer-motion";
import { Check, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function PageContent({
  content,
  pageData,
}: {
  content?: string;
  pageData?: { content?: string; [key: string]: any };
}) {
  const rawContent = content || pageData?.content || "";

  const contentWithoutHeader = rawContent
    .replace(/^# .+\n/, "")
    .replace(/^(.+?)(?=\n\n|$)/, "");

  const cleanHeading = (text: string) => {
    const cleanText = text.replace(/\[#\w+\]\s*/, "");
    return cleanText.replace(/^(SOLUTION|TECH|PAGE)\s+\d+\s+[—\-]\s*/, "");
  };

  const extractId = (text: string) => {
    const anchorMatch = text.match(/\[#(\w+)\]/);
    return anchorMatch ? anchorMatch[1] : undefined;
  };

  const rawSections = contentWithoutHeader
    .split(/(?=^## )/m)
    .filter(Boolean)
    .map((section) => section.trim());

  const sections = rawSections
    .map((section) => {
      const lines = section.split("\n");
      const titleLine = lines[0] || "";
      const title = cleanHeading(titleLine.replace(/^##\s*/, "").trim());
      let description = lines.slice(1).join("\n").trim();

      const faqMatch = description.match(/\n\*\*[^*]+\?\*\*/);

      if (faqMatch && faqMatch.index !== undefined) {
        description = description.slice(0, faqMatch.index).trim();
      }

      const isFaq =
        /^faq$/i.test(title) || /frequently asked questions/i.test(title);
      const raw = `${lines[0]}\n${description}`;
      return {
        raw,
        title,
        description,
        isFaq,
      };
    })
    .filter((s) => s.title && s.description && !s.isFaq);

  const parseSectionBody = (raw: string) => {
    const body = raw.replace(/^##[^\n]*\n?/, "").trim();
    const lines = body.split("\n");
    const introLines: string[] = [];
    const items: string[] = [];
    let inList = false;

    for (const line of lines) {
      const trimmed = line.trim();
      if (/^[-*]\s+/.test(trimmed) || /^\d+\.\s+/.test(trimmed)) {
        inList = true;
        items.push(trimmed.replace(/^[-*]\s+/, "").replace(/^\d+\.\s+/, ""));
      } else if (trimmed) {
        if (!inList) introLines.push(trimmed);
      }
    }

    return { intro: introLines.join("\n\n"), items };
  };

  const headingComponents = {
    h2: ({ children, ...props }: any) => {
      const text = String(children);
      const id = extractId(text);
      const cleanText = cleanHeading(text);
      return (
        <h2
          id={id}
          className="font-display text-white text-xl md:text-2xl font-medium leading-[1.05] tracking-[-0.02em] mb-4"
          {...props}
        >
          {cleanText}
        </h2>
      );
    },
    h3: ({ children, ...props }: any) => {
      const text = String(children);
      const id = extractId(text);
      const cleanText = cleanHeading(text);
      return (
        <h3
          id={id}
          className="font-display text-white text-lg md:text-xl font-medium tracking-[-0.02em] mb-3 mt-6"
          {...props}
        >
          {cleanText}
        </h3>
      );
    },
    h4: ({ children, ...props }: any) => {
      const text = String(children);
      const id = extractId(text);
      const cleanText = cleanHeading(text);
      return (
        <h4
          id={id}
          className="font-display text-white text-base md:text-lg font-medium tracking-[-0.02em] mb-2 mt-5"
          {...props}
        >
          {cleanText}
        </h4>
      );
    },
  };

  const paragraphComponents = {
    p: ({ children, ...props }: any) => {
      if (!children) return null;
      const text = String(children);
      if (!text.trim() || text.trim() === "[Trust bar]") return null;
      if (text.trim().startsWith(">")) {
        return (
          <blockquote className="my-4 rounded-r-xl border-l-2 border-primary/40 bg-primary/[0.04] px-4 py-3 text-white/70 italic text-sm">
            {text.replace(/^>\s*/, "")}
          </blockquote>
        );
      }
      return (
        <p
          className="text-white/55 leading-relaxed mb-4 text-sm md:text-[15px]"
          {...props}
        >
          {children}
        </p>
      );
    },
    strong: ({ children, ...props }: any) => {
      const text = String(children);
      if (text.includes("[PLACEHOLDER")) {
        return (
          <span
            className="rounded bg-yellow-500/10 px-1.5 py-0.5 font-medium text-yellow-400"
            {...props}
          >
            {children}
          </span>
        );
      }
      return (
        <strong className="font-semibold text-white" {...props}>
          {children}
        </strong>
      );
    },
  };

  const linkComponents = {
    a: ({ href, children, ...props }: any) => {
      const baseClass =
        "inline-flex items-center gap-1 text-primary/80 underline-offset-2 transition-all hover:text-primary hover:underline";

      if (href?.startsWith("#")) {
        return (
          <a href={href} className={baseClass} {...props}>
            {children}
          </a>
        );
      }

      if (href?.startsWith("/")) {
        return (
          <Link href={href} className={baseClass} {...props}>
            {children}
          </Link>
        );
      }

      const externalClass =
        baseClass +
        " after:ml-0.5 after:inline-block after:text-[10px] after:content-['↗']";

      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={externalClass}
          {...props}
        >
          {children}
        </a>
      );
    },
  };

  const codeComponents = {
    code: ({ inline, children, ...props }: any) => {
      if (inline) {
        return (
          <code
            className="rounded-md bg-white/10 px-1.5 py-0.5 font-mono text-[0.9em] text-white/85"
            {...props}
          >
            {children}
          </code>
        );
      }
      return (
        <pre
          className="my-4 overflow-x-auto rounded-xl border border-white/[0.07] bg-white/[0.03] p-4"
          {...props}
        >
          <code className="font-mono text-sm text-white/80">{children}</code>
        </pre>
      );
    },
  };

  const blockComponents = {
    blockquote: ({ children, ...props }: any) => (
      <blockquote
        className="my-4 rounded-r-xl border-l-2 border-primary/30 bg-primary/[0.04] px-4 py-3 text-white/70 text-sm"
        {...props}
      >
        {children}
      </blockquote>
    ),
    hr: () => <hr className="my-6 border-white/[0.06]" />,
  };

  const introMarkdownComponents = {
    ...headingComponents,
    ...paragraphComponents,
    ...linkComponents,
    ...codeComponents,
    ...blockComponents,
  };

  if (sections.length === 0) {
    return null;
  }

  return (
    <section className="relative py-12 md:py-30 border-t border-white/5">
      <div className="mx-auto w-[85vw] px-6">
        <div className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-5 text-center">
          — Insights
        </div>

        <h2 className="text-chrome text-center text-5xl md:text-6xl font-medium tracking-[-0.03em] leading-[1.02] mb-20">
          How This Solution Helps Your Business
        </h2>

        <div className="space-y-16 md:space-y-24">
          {sections.map((section, index) => {
            const reverse = index % 2 === 1;
            const { intro, items } = parseSectionBody(section.raw);
            const isFirst = index === 0;

            // First section: full-width, plain layout — heading and description
            // run the full line, no card / grid split.
            if (isFirst) {
              // Plain text — strip markdown bold markers and stray leading dashes
              // so nothing renders with literal ** or - characters.
              const stripMarkdown = (text: string) =>
                text
                  .replace(/\*/g, "")
                  .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
                  .replace(/^-\s+/gm, "")
                  .trim();

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl border border-white/10 grid place-items-center bg-white/[0.03]">
                      <Check className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.4em] text-white/40">
                      [{" "}
                      {section.title
                        .split(" ")
                        .slice(0, 3)
                        .join(" ")
                        .toUpperCase()}{" "}
                      · {String(index + 1).padStart(2, "0")} ]
                    </span>
                  </div>
                  {/* <h3 className="text-white/90 text-xl md:text-2xl leading-[1.05] tracking-tight mb-6">
                {section.title}
              </h3> */}
                  {items.length > 0 ? (
                    <div className="space-y-4">
                      {intro && (
                        <p className="text-base md:text-lg text-white/55 leading-relaxed">
                          {stripMarkdown(intro)}
                        </p>
                      )}
                      <ul className="space-y-3">
                        {items.map((item, itemIndex) => (
                          <li
                            key={itemIndex}
                            className="flex items-start gap-3"
                          >
                            <Check className="w-5 h-5 mt-1 text-primary shrink-0" />
                            <span className="text-base md:text-lg text-white/60 leading-relaxed">
                              {stripMarkdown(item)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-base md:text-lg text-white/55 leading-relaxed">
                      {stripMarkdown(
                        section.raw.replace(/^##[^\n]*\n?/, "").trim(),
                      )}
                    </p>
                  )}
                </motion.div>
              );
            }

            return (
              <div
                key={index}
                className={`grid lg:grid-cols-12 gap-10 items-start ${
                  reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <motion.div
                  initial={{ opacity: 0, x: reverse ? 60 : -60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="lg:col-span-5 lg:sticky lg:top-32"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl border border-white/10 grid place-items-center bg-white/[0.03]">
                      <Check className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.4em] text-white/40">
                      [{" "}
                      {section.title
                        .split(" ")
                        .slice(0, 3)
                        .join(" ")
                        .toUpperCase()}{" "}
                      · {String(index + 1).padStart(2, "0")} ]
                    </span>
                  </div>
                  <h3 className="font-display text-white text-3xl md:text-5xl leading-[1.05] tracking-tight mb-6">
                    {section.title}
                  </h3>
                  {/* {intro && (
                <div className="text-base md:text-lg text-white/55 leading-relaxed">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} components={introMarkdownComponents}>
                    {intro}
                  </ReactMarkdown>
                </div>
              )} */}
                </motion.div>

                <div className="lg:col-span-7 space-y-4">
                  {items.length > 0 ? (
                    items.map((item, itemIndex) => (
                      <motion.div
                        key={itemIndex}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{
                          delay: itemIndex * 0.1,
                          duration: 0.6,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        whileHover={{ y: -4 }}
                        className="group relative rounded-2xl border border-white/[0.08] p-7 md:p-9 bg-white/[0.03] hover:border-primary/40 hover:bg-white/[0.05] transition-all"
                      >
                        <div className="flex items-start gap-4">
                          <Check className="w-5 h-5 mt-1 text-primary shrink-0" />
                          <p className="text-sm md:text-base text-white/60 leading-relaxed">
                            {item}
                          </p>
                        </div>
                        <ArrowUpRight className="absolute top-6 right-6 w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0 transition-all text-white/30" />
                      </motion.div>
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{ y: -4 }}
                      className="group relative rounded-2xl border border-white/[0.08] p-7 md:p-9 bg-white/[0.03] hover:border-primary/40 hover:bg-white/[0.05] transition-all"
                    >
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={introMarkdownComponents}
                      >
                        {section.raw.replace(/^##[^\n]*\n?/, "").trim()}
                      </ReactMarkdown>
                      <ArrowUpRight className="absolute top-6 right-6 w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0 transition-all text-white/30" />
                    </motion.div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
