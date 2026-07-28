// app/components/shared/PageContent.tsx
import React from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Check, Boxes } from 'lucide-react';

// ---------- Parse markdown into sections ----------
type Card = { title: string; body: string };
type Section = {
  slug?: string;
  label: string;   // short chip label from title (e.g. "GBP")
  title: string;
  intro: string;   // markdown paragraph(s) under the H2, before first H3
  cards: Card[];   // each H3 + following prose
  raw: string;     // fallback markdown if no H3s
};

function slugFromTitle(t: string) {
  return t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function shortLabel(t: string) {
  // "Google Business Profile Optimization..." -> "GBP"
  const caps = t.match(/\b[A-Z]{2,}\b/g);
  if (caps?.length) return caps[0];
  const words = t.split(/\s+/).filter(Boolean).slice(0, 2);
  return words.map((w) => w[0]).join('').toUpperCase();
}

function parseSections(content: string): Section[] {
  const lines = content.split('\n');
  const sections: Section[] = [];
  let current: Section | null = null;
  let currentCard: Card | null = null;
  let mode: 'intro' | 'card' = 'intro';

  const flushCard = () => {
    if (current && currentCard) {
      currentCard.body = currentCard.body.trim();
      current.cards.push(currentCard);
      currentCard = null;
    }
  };
  const flushSection = () => {
    flushCard();
    if (current) {
      current.intro = current.intro.trim();
      current.raw = current.raw.trim();
      sections.push(current);
    }
  };

  for (const line of lines) {
    const h2 = line.match(/^##\s+(.*)/);
    const h3 = line.match(/^###\s+(.*)/);
    if (h2) {
      flushSection();
      const rawTitle = h2[1].replace(/\[#\w+\]\s*/, '').trim();
      const anchor = h2[1].match(/\[#(\w+)\]/)?.[1];
      current = {
        slug: anchor ?? slugFromTitle(rawTitle),
        label: shortLabel(rawTitle),
        title: rawTitle,
        intro: '',
        cards: [],
        raw: '',
      };
      mode = 'intro';
      continue;
    }
    if (h3 && current) {
      flushCard();
      const rawTitle = h3[1].replace(/\[#\w+\]\s*/, '').trim();
      currentCard = { title: rawTitle, body: '' };
      mode = 'card';
      continue;
    }
    if (!current) continue;
    current.raw += line + '\n';
    if (mode === 'intro') current.intro += line + '\n';
    else if (currentCard) currentCard.body += line + '\n';
  }
  flushSection();
  return sections.filter((s) => /PAGE/i.test(s.title) === false);
}

// ---------- Small markdown renderer for prose inside cards/intros ----------
function Prose({ children, muted = true }: { children: string; muted?: boolean }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ children }) => (
          <p className={`mb-3 last:mb-0 text-[14.5px] leading-[1.65] ${muted ? 'text-white/55' : 'text-white/75'}`}>
            {children}
          </p>
        ),
        strong: ({ children }) => <strong className="font-medium text-white/90">{children}</strong>,
        a: ({ href, children }) => {
          const cls = 'text-white underline decoration-white/30 underline-offset-4 hover:decoration-white';
          if (href?.startsWith('/')) return <Link href={href} className={cls}>{children}</Link>;
          return <a href={href} className={cls} target={href?.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">{children}</a>;
        },
        ul: ({ children }) => <ul className="mb-3 space-y-1.5">{children}</ul>,
        li: ({ children }) => (
          <li className="flex gap-2 text-[14px] text-white/60">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/30" />
            <span>{children}</span>
          </li>
        ),
        code: ({ children }) => (
          <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[0.85em] text-white/85">{children}</code>
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}

// ---------- Card ----------
function FeatureCard({ title, body }: Card) {
  return (
    <article className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6 transition-colors hover:border-white/[0.14] hover:bg-white/[0.04]">
      <header className="mb-3 flex items-start gap-3">
        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-rose-500/15 ring-1 ring-rose-400/40">
          <Check className="h-3 w-3 text-rose-300" strokeWidth={3} />
        </span>
        <h3 className="font-serif text-[19px] font-medium leading-snug tracking-[-0.01em] text-white/95">
          {title}
        </h3>
      </header>
      <div className="pl-8">
        <Prose>{body}</Prose>
      </div>
    </article>
  );
}

// ---------- Section header (left / right column) ----------
function SectionHeader({ section, index }: { section: Section; index: number }) {
  const num = String(index + 1).padStart(2, '0');
  return (
    <div id={section.slug} className="scroll-mt-24">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
        <Boxes className="h-3.5 w-3.5 text-white/60" strokeWidth={2} />
        <span className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-white/55">
          {`{ ${section.label} · ${num} }`}
        </span>
      </div>
      <h2 className="mb-5 font-serif text-3xl font-medium leading-[1.1] tracking-[-0.02em] text-white md:text-[38px]">
        {section.title}
      </h2>
      {section.intro && (
        <div className="max-w-md">
          <Prose muted>{section.intro}</Prose>
        </div>
      )}
    </div>
  );
}

// ---------- Main ----------
export function PageContent({ content }: { content: string }) {
  const sections = parseSections(content);

  // If no H2 structure, fall back to plain prose so nothing is lost.
  if (sections.length === 0) {
    return (
      <div className="max-w-3xl">
        <Prose muted>{content}</Prose>
      </div>
    );
  }

  return (
    <div className=" mx-auto w-[85vw] px-6 py-16 md:py-24">
      <div className="space-y-24 md:space-y-32">
        {sections.map((section, i) => {
          const flip = i % 2 === 1; // alternate sides
          const hasCards = section.cards.length > 0;

          return (
            <section
              key={i}
              className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16"
            >
              <div className={flip ? 'md:order-2' : ''}>
                <SectionHeader section={section} index={i} />
              </div>

             
            </section>
          );
        })}
      </div>
    </div>
  );
}















