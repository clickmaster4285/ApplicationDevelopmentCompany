"use client";

import { motion } from "framer-motion";
import { Check, ArrowUpRight, Sparkles, Zap, Shield, Users, TrendingUp, Award, Target, Layers, BarChart3, Globe, Cpu, Database, Cloud, Lock, Terminal, Rocket, Lightbulb, PieChart, Brain, GitBranch, Server, Network, HardDrive, Monitor, Smartphone, Tablet, Layout, Code, Settings, Palette, Search, Megaphone, ShoppingCart, Users as UsersIcon, Mail, Phone, MapPin, Clock, Star, Heart, ThumbsUp, Flag, Gem, Crown, Diamond, Zap as ZapIcon, Flame, Bolt, Waves, Mountain, Trees, Sun, Moon, Cloud as CloudIcon, Wind, Droplets, Leaf, Flower, Sparkles as SparklesIcon } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const iconMap: Record<string, React.ReactNode> = {
  strategy: <Target className="h-5 w-5" />,
  planning: <Layers className="h-5 w-5" />,
  design: <Palette className="h-5 w-5" />,
  development: <Code className="h-5 w-5" />,
  testing: <Search className="h-5 w-5" />,
  deployment: <Rocket className="h-5 w-5" />,
  maintenance: <Settings className="h-5 w-5" />,
  security: <Lock className="h-5 w-5" />,
  performance: <ZapIcon className="h-5 w-5" />,
  scaling: <TrendingUp className="h-5 w-5" />,
  analytics: <BarChart3 className="h-5 w-5" />,
  integration: <GitBranch className="h-5 w-5" />,
  cloud: <Cloud className="h-5 w-5" />,
  database: <Database className="h-5 w-5" />,
  api: <Server className="h-5 w-5" />,
  frontend: <Monitor className="h-5 w-5" />,
  backend: <Cpu className="h-5 w-5" />,
  mobile: <Smartphone className="h-5 w-5" />,
  web: <Globe className="h-5 w-5" />,
  ai: <Brain className="h-5 w-5" />,
  ml: <Brain className="h-5 w-5" />,
  default: <SparklesIcon className="h-5 w-5" />,
};

function getIconForTitle(title: string): React.ReactNode {
  const lowerTitle = title.toLowerCase();
  for (const [key, icon] of Object.entries(iconMap)) {
    if (lowerTitle.includes(key)) return icon;
  }
  return iconMap.default;
}

function removeRepeatedContentBlocks(text: string) {
  let cleaned = text.trim();

  for (let pass = 0; pass < 3; pass += 1) {
    const blocks = cleaned
      .split(/\n{2,}/)
      .map((block) => block.trim())
      .filter(Boolean);

    if (blocks.length < 2 || blocks.length % 2 !== 0) break;

    const midpoint = blocks.length / 2;
    const firstHalf = blocks.slice(0, midpoint);
    const secondHalf = blocks.slice(midpoint);
    const normalize = (value: string) =>
      value.replace(/\s+/g, " ").trim().toLowerCase();

    const isRepeated = firstHalf.every(
      (block, index) => normalize(block) === normalize(secondHalf[index]),
    );

    if (!isRepeated) break;

    cleaned = firstHalf.join("\n\n");
  }

  return cleaned.trim();
}

function sectionHasMarkdownList(text: string) {
  return /^[-*]\s+|^\d+\.\s+/m.test(text);
}

export function PageContent({
  content,
  pageData,
}: {
  content?: string;
  pageData?: { content?: string; [key: string]: any };
}) {
  const rawContent = content || pageData?.content || "";

  const contentAfterTitle = rawContent.replace(/^# .+\n?/, "").trimStart();
  const firstSectionIndex = contentAfterTitle.search(/^##\s+/m);
  const contentBeforeSections =
    firstSectionIndex >= 0 ? contentAfterTitle.slice(0, firstSectionIndex) : "";
  const contentWithoutHeader =
    firstSectionIndex >= 0 ? contentAfterTitle.slice(firstSectionIndex) : "";
  const introRemainder = contentBeforeSections
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .slice(1)
    .join("\n\n");

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
      let description = removeRepeatedContentBlocks(
        lines.slice(1).join("\n").trim(),
      );

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
        isUtilitySection: isFaq,
      };
    })
    .filter((s) => s.title && s.description && !s.isUtilitySection);

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
        "inline-flex items-center gap-1 text-sky-400 underline underline-offset-4 decoration-sky-400/40 transition-all hover:text-sky-300 hover:decoration-sky-300";

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
    <section className="relative py-16 md:py-32 border-t border-white/5">
      <div className="mx-auto w-[85vw] px-6">
        {introRemainder && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-20 group relative rounded-2xl border border-white/[0.08] p-6 md:p-8 bg-white/[0.03]"
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={introMarkdownComponents}
            >
              {introRemainder}
            </ReactMarkdown>
          </motion.div>
        )}

        <div className="space-y-20 md:space-y-28">
          {sections.map((section, index) => {
            const reverse = index % 2 === 1;
            const { intro, items } = parseSectionBody(section.raw);
            const isFirst = index === 0;
            const sectionIcon = getIconForTitle(section.title);
            const sectionBody = section.description;
            const hasMarkdownList = sectionHasMarkdownList(sectionBody);

            // First section: full-width hero layout
            if (isFirst) {
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
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 rounded-2xl border border-white/10 grid place-items-center bg-white/[0.03] flex-shrink-0">
                      {sectionIcon}
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 block mb-1">
                        [ {section.title
                          .split(" ")
                          .slice(0, 3)
                          .join(" ")
                          .toUpperCase()} · {String(index + 1).padStart(2, "0")} ]
                      </span>
                    </div>
                  </div>
                  
                  {hasMarkdownList && items.length > 0 ? (
                    <div className="space-y-5">
                      {intro && (
                        <p className="text-lg md:text-xl text-white/55 leading-relaxed max-w-3xl">
                          {stripMarkdown(intro)}
                        </p>
                      )}
                      <ul className="space-y-4">
                        {items.map((item, itemIndex) => (
                          <motion.li
                            key={itemIndex}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: itemIndex * 0.08, duration: 0.5 }}
                            className="flex items-start gap-4 group"
                          >
                            <div className="w-10 h-10 rounded-xl border border-primary/30 bg-primary/10 grid place-items-center flex-shrink-0 text-primary group-hover:bg-primary group-hover:border-primary group-hover:text-[#050505] transition-all">
                              <Check className="w-5 h-5" />
                            </div>
                            <span className="text-lg md:text-xl text-white/60 leading-relaxed pt-1">
                              {stripMarkdown(item)}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-lg md:text-xl text-white/55 leading-relaxed max-w-3xl">
                      {stripMarkdown(
                        sectionBody,
                      )}
                    </p>
                  )}
                </motion.div>
              );
            }

            // Subsequent sections: alternating grid layout
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className={`grid lg:grid-cols-12 gap-10 items-start ${
                  reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* Left side - Visual/Title */}
                <motion.div
                  initial={{ opacity: 0, x: reverse ? 60 : -60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="lg:col-span-5 lg:sticky lg:top-32"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 rounded-2xl border border-white/10 grid place-items-center bg-white/[0.03] flex-shrink-0">
                      {sectionIcon}
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.4em] text-white/40">
                      [ {section.title
                        .split(" ")
                        .slice(0, 3)
                        .join(" ")
                        .toUpperCase()} · {String(index + 1).padStart(2, "0")} ]
                    </span>
                  </div>
                  <h3 className="font-display text-white text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-tight mb-6">
                    {section.title}
                  </h3>
                </motion.div>

                {/* Right side - Content items */}
                <div className="lg:col-span-7 space-y-5">
                  {hasMarkdownList && items.length > 0 ? (
                    items.map((item, itemIndex) => (
                      <motion.div
                        key={itemIndex}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{
                          delay: itemIndex * 0.08,
                          duration: 0.6,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        whileHover={{ y: -4, x: 4 }}
                        className="group relative rounded-2xl border border-white/[0.08] p-6 md:p-8 bg-white/[0.03] hover:border-primary/40 hover:bg-white/[0.05] transition-all duration-300"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-xl border border-primary/30 bg-primary/10 grid place-items-center flex-shrink-0 text-primary group-hover:bg-primary group-hover:border-primary group-hover:text-[#050505] transition-all">
                            <Check className="w-5 h-5" />
                          </div>
                          <p className="text-sm md:text-base text-white/60 leading-relaxed flex-1">
                            {item}
                          </p>
                        </div>
                        <motion.div
                          className="absolute top-6 right-6 w-8 h-8 rounded-lg bg-white/[0.03] grid place-items-center"
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 0, x: 10 }}
                          whileHover={{ opacity: 0.6, x: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ArrowUpRight className="w-4 h-4 text-white/30" />
                        </motion.div>
                      </motion.div>
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{ y: -4 }}
                      className="group relative rounded-2xl border border-white/[0.08] p-6 md:p-8 bg-white/[0.03] hover:border-primary/40 hover:bg-white/[0.05] transition-all duration-300"
                    >
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={introMarkdownComponents}
                      >
                        {sectionBody}
                      </ReactMarkdown>
                      <motion.div
                        className="absolute top-6 right-6 w-8 h-8 rounded-lg bg-white/[0.03] grid place-items-center"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 0, x: 10 }}
                        whileHover={{ opacity: 0.6, x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ArrowUpRight className="w-4 h-4 text-white/30" />
                      </motion.div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
