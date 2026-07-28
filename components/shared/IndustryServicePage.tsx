// app/components/shared/IndustryServicePage.tsx
import React from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowUpRight } from 'lucide-react';
import { FAQAccordion } from './FAQAccordion';
// import { PageContent } from './PageContent';

// Types
export interface PageData {
  url: string;
  meta: {
    title: string;
    description: string;
  };
  metadata: {
    primaryKeyword?: string;
    tier?: string;
    intent?: string;
    cta?: string;
    schema?: string[];
  };
  content: string;
  related?: {
    siblings?: string[];
    parent?: string;
  };
}

export interface FAQ {
  question: string;
  answer: string;
}

// ============================================================
// HELPERS
// ============================================================

export function extractFAQs(content: string): FAQ[] {
  const faqs: FAQ[] = [];
  const match = content.match(/##\s*FAQ\s*\n([\s\S]*?)(?=\n##|\n---|$)/i);
  if (!match) return faqs;

  const section = match[1];
  const entries = section.split(/\n\n+/);

  for (const entry of entries) {
    const qMatch = entry.match(/\*\*([^*]+)\*\*/);
    if (qMatch) {
      const question = qMatch[1].trim();
      const answer = entry.replace(/\*\*[^*]+\*\*/, '').trim();
      if (question && answer) {
        faqs.push({ question, answer });
      }
    }
  }

  return faqs;
}

export function cleanPageContent(content: string): string {
  let cleaned = content
    .replace(/^#+\s*PAGE\s*:?\s*.*$/gim, '')
    .replace(/^PAGE\s*:?\s*.*$/gim, '')
    .replace(/PAGE:\s*\/[^\n]*/gi, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  // Remove FAQ section if present
  cleaned = cleaned
    .replace(/##\s*FAQ\s*\n[\s\S]*?(?=\n##|\n---|$)/i, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  return cleaned;
}

// ============================================================
// COMPONENTS
// ============================================================

// Badge Component
export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-white/70">
      {children}
    </span>
  );
}

// Hero Header Component
export function HeroHeader({ 
  pageData, 
  type = 'Industry' 
}: { 
  pageData: PageData;
  type?: 'Industry' | 'Service';
}) {
  return (
    <section className="relative py-6 pt-10 md:pt-40 ">
      <div className="mx-auto w-[85vw] px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-6">
          <div>
            <div className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-5">
              — {type}
            </div>
            <h1 className="text-chrome text-5xl md:text-7xl font-medium leading-[1.02] tracking-[-0.03em] max-w-6xl">
              {pageData.meta.title}
            </h1>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <p className="max-w-2xl text-white/55 leading-relaxed">
            {pageData.meta.description}
          </p>
          
          <div className="flex flex-wrap gap-2.5">
            
            {pageData.metadata.intent && (
              <Badge>{pageData.metadata.intent}</Badge>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// Main Content Component
export function MainContent({ content }: { content: string }) {
  // Utility to strip metadata header lines
  const cleanContent = (rawContent: string) => {
    const lines = rawContent.split('\n');
    const filteredLines = lines.filter(line => {
      const trimmed = line.trim();
      return !(
        trimmed.startsWith('> **PAGE:**') ||
        trimmed.startsWith('> **SOURCE FILE:**') ||
        trimmed.startsWith('---') ||
        trimmed.startsWith('# PAGE') ||
        trimmed.startsWith('PAGE') ||
        trimmed.match(/^#\s*PAGE\s*\d+/) ||
        trimmed.match(/^>.*PAGE.*/) ||
        trimmed.match(/^>\s*\*\*PAGE:\*\*/) ||
        trimmed.match(/^>\s*\*\*SOURCE FILE:\*\*/)
      );
    });

    let cleaned = filteredLines.join('\n');
    cleaned = cleaned.replace(/\n{3,}/g, '\n\n');
    return cleaned.trim();
  };

  return (
    <section className="relative py-6">
      <div className="mx-auto w-[85vw] px-6">
        <PageContent content={cleanContent(content)} />
      </div>
    </section>
  );
}
// Component 1: PageHeader - handles h1 and description
export function PageHeader({ content }: { content: string }) {
  // Extract h1 and first paragraph (description) from content
  const h1Match = content.match(/^# (.+)$/m);
  let h1Text = h1Match ? h1Match[1] : '';
  
  // Remove prefixes like "SOLUTION 07 —" or "TECH 15 —"
  h1Text = h1Text.replace(/^(SOLUTION|TECH)\s+\d+\s+[—\-]\s*/, '');
  
  // Get the paragraph after h1 (description)
  const contentAfterH1 = content.replace(/^# .+\n/, '');
  const pMatch = contentAfterH1.match(/^(.+?)(?=\n\n|$)/s);
  const description = pMatch ? pMatch[1] : '';

  return (
    <div className="mb-12">
      {/* Render h1 */}
      {h1Text && !/PAGE/i.test(h1Text) && (
        <h1 className="text-chrome text-3xl md:text-4xl font-medium leading-[1.02] tracking-[-0.03em] mb-8 mt-0">
          {h1Text}
        </h1>
      )}
      
      {/* Render description */}
      {description && description.trim() !== '[Trust bar]' && (
        <p className="text-white/55 leading-relaxed mb-6 text-[15px] md:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

// Component 2: PageTables - handles all tables and other content

export function PageTables({ content }: { content: string }) {
  // Remove h1 and first paragraph from content for tables section
  const contentWithoutHeader = content
    .replace(/^# .+\n/, '') // Remove h1
    .replace(/^(.+?)(?=\n\n|$)/s, ''); // Remove first paragraph (description)

  // Helper: Clean heading text by removing anchor tags and prefixes
  const cleanHeading = (text: string) => {
    const cleanText = text.replace(/\[#\w+\]\s*/, '');
    // Remove prefixes like "SOLUTION 07 —" or "TECH 15 —"
    return cleanText.replace(/^(SOLUTION|TECH)\s+\d+\s+[—\-]\s*/, '');
  };

  // Helper: Extract ID from heading
  const extractId = (text: string) => {
    const anchorMatch = text.match(/\[#(\w+)\]/);
    return anchorMatch ? anchorMatch[1] : undefined;
  };

  // Heading renderers
  const headingComponents = {
    h2: ({ children, ...props }) => {
      const text = String(children);
      const id = extractId(text);
      const cleanText = cleanHeading(text);
      
      return (
        <h2 
          id={id} 
          className="text-chrome text-xl md:text-2xl lg:text-3xl font-medium leading-[1.02] tracking-[-0.03em] mb-8 mt-14" 
          {...props}
        >
          {cleanText}
        </h2>
      );
    },
    h3: ({ children, ...props }) => {
      const text = String(children);
      const id = extractId(text);
      const cleanText = cleanHeading(text);
      
      return (
        <h3 
          id={id} 
          className="text-chrome text-2xl md:text-3xl font-medium leading-[1.02] tracking-[-0.02em] mb-5 mt-12" 
          {...props}
        >
          {cleanText}
        </h3>
      );
    },
    h4: ({ children, ...props }) => {
      const text = String(children);
      const id = extractId(text);
      const cleanText = cleanHeading(text);
      
      return (
        <h4 
          id={id} 
          className="text-chrome text-xl md:text-2xl font-medium tracking-[-0.02em] mb-4 mt-10" 
          {...props}
        >
          {cleanText}
        </h4>
      );
    },
  };

  // Paragraph renderers
  const paragraphComponents = {
    p: ({ children, ...props }) => {
      if (!children) return null;
      const text = String(children);
      if (!text.trim() || text.trim() === '[Trust bar]') return null;
      
      return (
        <p className="text-white/55 leading-relaxed mb-6 text-[15px] md:text-base" {...props}>
          {children}
        </p>
      );
    },
    strong: ({ children, ...props }) => {
      const text = String(children);
      if (text.includes('[PLACEHOLDER')) {
        return (
          <span className="rounded bg-yellow-500/10 px-1.5 py-0.5 font-medium text-primary" {...props}>
            {children}
          </span>
        );
      }
      return (
        <strong className="font-medium text-white" {...props}>{children}</strong>
      );
    },
    text: ({ children }) => {
      const text = String(children);
      if (/PAGE/i.test(text) && text.length < 20) return null;
      if (text.trim() === '[Trust bar]') return null;
      return <>{children}</>;
    },
  };

  // List renderers
  const listComponents = {
    ul: ({ children, ...props }) => (
      <ul className="space-y-3 mb-6" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="list-decimal space-y-3 pl-5 mb-6" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="relative pl-6 leading-relaxed text-white/55 before:absolute before:left-0 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-white/20" {...props}>
        {children}
      </li>
    ),
  };

  // Link renderers
  const linkComponents = {
    a: ({ href, children, ...props }) => {
      const baseClass = 'inline-flex items-center gap-1 text-white/80 underline-offset-4 transition-all hover:text-white hover:underline';
      
      if (href?.startsWith('#')) {
        return (
          <a href={href} className={baseClass} {...props}>
            {children}
          </a>
        );
      }
      if (href?.startsWith('/')) {
        return (
          <Link href={href} className={baseClass} {...props}>
            {children}
          </Link>
        );
      }
      return (
        <a 
          href={href} 
          target="_blank" 
          rel="noopener noreferrer" 
          className={`${baseClass} after:ml-0.5 after:inline-block after:text-[10px] after:content-['↗']`}
          {...props}
        >
          {children}
        </a>
      );
    },
  };

  // Table renderers
  const tableComponents = {
    table: ({ children, ...props }) => (
      <div className="my-8 overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02]" {...props}>
        <table className="min-w-full divide-y divide-white/10">{children}</table>
      </div>
    ),
    thead: ({ children, ...props }) => (
      <thead className="bg-white/[0.04]" {...props}>{children}</thead>
    ),
    th: ({ children, ...props }) => (
      <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-[0.08em] text-white/50" {...props}>
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td className="border-t border-white/[0.06] px-5 py-4 text-sm text-white/60" {...props}>
        {children}
      </td>
    ),
  };

  // Code renderers
  const codeComponents = {
    code: ({ inline, children, ...props }: any) => {
      if (inline) {
        return (
          <code className="rounded-md bg-white/10 px-1.5 py-0.5 font-mono text-[0.9em] text-white/85" {...props}>
            {children}
          </code>
        );
      }
      return (
        <pre className="my-6 overflow-x-auto rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5" {...props}>
          <code className="font-mono text-sm text-white/80">{children}</code>
        </pre>
      );
    },
  };

  // Block renderers
  const blockComponents = {
    blockquote: ({ children, ...props }) => (
      <blockquote className="my-8 rounded-r-2xl border-l-2 border-white/20 bg-white/[0.03] px-5 py-4 text-white/70" {...props}>
        {children}
      </blockquote>
    ),
    hr: () => <hr className="my-14 border-white/[0.06]" />,
  };

  // Combine all components
  const markdownComponents = {
    ...headingComponents,
    ...paragraphComponents,
    ...listComponents,
    ...linkComponents,
    ...tableComponents,
    ...codeComponents,
    ...blockComponents,
  };

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={markdownComponents}
    >
      {contentWithoutHeader}
    </ReactMarkdown>
  );
}



// Main PageContent component that composes both
export function PageContent({ content }: { content: string }) {
  return (
    <>
      <PageHeader content={content} />
      <PageTables content={content} />
    </>
  );
}


// FAQ Section Component
export function FAQSection({ faqs }: { faqs: FAQ[] }) {
  return (
    <section className="relative py-6 md:py-10">
      <div className="mx-auto w-[85vw] px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20">
          <div>
            <div className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-5">
              — Support
            </div>
            <h2 className="text-chrome text-3xl md:text-4xl font-medium leading-[1.02] tracking-[-0.03em] max-w-2xl">
              Frequently Asked Questions
            </h2>
          </div>
          <p className="max-w-md text-white/55 leading-relaxed">
            Everything you need to know about working with us in this industry.
          </p>
        </div>

        <FAQAccordion faqs={faqs} />
      </div>
    </section>
  );
}

// CTA Section Component
export function CTASection({ pageData }: { pageData: PageData }) {
  return (
    <section className="relative py-6 md:py-10">
      <div className="mx-auto w-[85vw] px-6">
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.07] bg-gradient-to-b from-[#161616] to-[#0a0a0a] px-8 py-16 text-center md:px-16 md:py-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.05] via-transparent to-transparent" />
          <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

          <div className="relative">
            <div className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-5">
              — Connect
            </div>
            
            <h2 className="text-chrome text-4xl md:text-6xl font-medium leading-[1.02] tracking-[-0.03em] max-w-3xl mx-auto">
              {pageData.metadata.cta || 'Ready to Get Started?'}
            </h2>
            
            <p className="mx-auto mt-6 max-w-2xl text-base text-white/60 leading-relaxed">
              Let's discuss how we can help you with {pageData.metadata.primaryKeyword}.
            </p>
            
            <Link
              href="/contact"
              className="group mt-10 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-medium text-[#050505] shadow-lg shadow-white/10 transition-all hover:bg-white/90 hover:shadow-white/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              Contact Us Today
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// Related Services Component
export function RelatedServices({
  siblingServices,
  parentService,
}: {
  siblingServices: PageData[];
  parentService: PageData | null;
}) {
  if (siblingServices.length === 0 && !parentService) return null;

  return (
    <section className="mx-auto w-[85vw] px-6 pb-24 pt-4">
      {siblingServices.length > 0 && (
        <>
          <div className="mb-8 flex items-center gap-3">
            <h2 className="text-2xl font-medium tracking-tight text-white md:text-3xl">
              Related Services
            </h2>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {siblingServices.map((service) => (
              <Link
                key={service.url}
                href={service.url}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]"
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative flex flex-1 flex-col">
                  <h3 className="text-[17px] font-medium text-white">
                    {service.metadata.primaryKeyword}
                  </h3>
                  <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-white/50">
                    {service.meta.description}
                  </p>
                  <div className="mt-6 flex items-center text-sm font-medium text-white/60 transition-all duration-300 group-hover:text-white">
                    Learn more
                    <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      {parentService && (
        <div className="mt-8 flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] px-5 py-4">
          <span className="text-white/40">←</span>
          <p className="text-sm text-white/50">
            Part of{' '}
            <Link
              href={parentService.url}
              className="font-medium text-white/75 transition-colors hover:text-white"
            >
              {parentService.metadata.primaryKeyword}
            </Link>
          </p>
        </div>
      )}
    </section>
  );
}

// Structured Data Components
export function StructuredData({ pageData }: { pageData: PageData }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: pageData.meta.title,
          description: pageData.meta.description,
          provider: {
            '@type': 'Organization',
            name: 'Clickmasters',
            url: 'https://clickmasters.com',
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
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        }),
      }}
    />
  );
}