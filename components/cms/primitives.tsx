import Link from "next/link";
import { createElement, type CSSProperties, type ReactNode } from "react";
import { ArrowRight, icons, type LucideIcon } from "lucide-react";
import { MagneticButton } from "@/components/landingPage/MagneticButton";
import { CmsMotion } from "./CmsMotion";
import { isExternalUrl, safeImageUrl, safeUrl, sanitizeHtml, text } from "@/lib/cms/sanitize";
import type { CmsSectionSettings } from "@/lib/cms/types";

/*
 * Every CMS primitive below mirrors the site's own UI (components/shared/
 * IndustryServicePage.tsx, HeroHeader.tsx, landingPage/*): same container
 * width, section rhythm, eyebrows, chrome headings, cards and magnetic
 * buttons — so ERP-created pages look like hand-built pages.
 */

/* ------------------------------------------------------------------ */
/* Section shell: honors settings.width / paddingY / background /      */
/* motion, on top of the site's SectionWrapper look.                   */
/* ------------------------------------------------------------------ */

// Same container as the site's SectionWrapper (`w-[85vw] px-4 md:px-6`).
const WIDTH_CLASS: Record<string, string> = {
  narrow: "w-[85vw] max-w-4xl px-4 md:px-6",
  wide: "w-[85vw] px-4 md:px-6",
  full: "w-full px-4 md:px-8",
};

const DARK_VARS: CSSProperties = {
  ["--cms-fg" as string]: "#ffffff",
  ["--cms-fg-muted" as string]: "rgba(255,255,255,0.5)",
  ["--cms-border" as string]: "rgba(255,255,255,0.06)",
  ["--cms-card" as string]: "rgba(255,255,255,0.02)",
};

// Background layers copied from the site's SectionWrapper / CTASection.
const BACKGROUND: Record<string, { className: string; style: CSSProperties }> = {
  dark: { className: "bg-[#050505]", style: DARK_VARS },
  muted: {
    className:
      "border-y border-white/5 before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-b before:from-primary/[0.03] before:via-transparent before:to-transparent",
    style: DARK_VARS,
  },
  primary: {
    className:
      "bg-gradient-to-br from-[#161616] via-[#0e0e0e] to-[#0a0a0a] border-y border-white/[0.06] before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] before:from-primary/[0.1] before:via-transparent before:to-transparent",
    style: DARK_VARS,
  },
  light: {
    className: "bg-white",
    style: {
      ["--cms-fg" as string]: "#050505",
      ["--cms-fg-muted" as string]: "rgba(5,5,5,0.62)",
      ["--cms-border" as string]: "rgba(5,5,5,0.1)",
      ["--cms-card" as string]: "rgba(5,5,5,0.03)",
    },
  },
};

function clampPx(value: unknown, fallback: number): number {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.max(0, Math.min(400, Math.round(n)));
}

export function SectionShell({
  type,
  id,
  settings,
  children,
  defaultPadding = [128, 128],
  defaultWidth = "wide",
  className = "",
  backdrop,
}: {
  type: string;
  id?: string;
  settings?: CmsSectionSettings;
  children: ReactNode;
  defaultPadding?: [number, number];
  defaultWidth?: "narrow" | "wide" | "full";
  className?: string;
  /** Decorative layer rendered behind the content (e.g. hero orbs). */
  backdrop?: ReactNode;
}) {
  const s = settings ?? {};
  const padding = Array.isArray(s.paddingY) ? s.paddingY : [];
  const top = clampPx(padding[0], defaultPadding[0]);
  const bottom = clampPx(padding[1] ?? padding[0], defaultPadding[1]);
  const width = WIDTH_CLASS[String(s.width ?? defaultWidth)] ?? WIDTH_CLASS[defaultWidth];
  const bgKey = String(s.background ?? "");
  const bg = BACKGROUND[bgKey];
  // The whole site reveals sections on scroll; only "none" opts out.
  const motion = s.motion !== "none";

  const inner = <div className={`relative z-10 mx-auto ${width}`}>{children}</div>;

  return (
    <section
      id={id ? `cms-${id.replace(/[^A-Za-z0-9_-]/g, "")}` : undefined}
      data-cms-section={type}
      data-cms-bg={bgKey || undefined}
      className={`relative overflow-hidden text-[var(--cms-fg)] ${bg?.className ?? ""} ${className}`}
      style={{
        paddingTop: `clamp(${Math.round(top * 0.5)}px, ${(top / 12.8).toFixed(2)}vw, ${top}px)`,
        paddingBottom: `clamp(${Math.round(bottom * 0.5)}px, ${(bottom / 12.8).toFixed(2)}vw, ${bottom}px)`,
        ...(bg?.style ?? {}),
      }}
    >
      {backdrop}
      {motion ? <CmsMotion>{inner}</CmsMotion> : inner}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Decorative layers (static versions of HeroHeader's)                  */
/* ------------------------------------------------------------------ */

export function HeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
      <div className="absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-3xl" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-2H24v2h12zM36 24v-2H24v2h12z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}

/** The rounded glass panel used by the site's CTASection. */
export function GlowPanel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-br from-[#161616] via-[#0e0e0e] to-[#0a0a0a] px-6 py-12 text-white md:px-12 md:py-16 lg:px-16 lg:py-20 ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/[0.1] via-transparent to-transparent" />
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl" />
      <div className="pointer-events-none absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <div className="pointer-events-none absolute -bottom-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="relative">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Grid columns (settings.columns, literal classes for Tailwind)        */
/* ------------------------------------------------------------------ */

const COLUMN_CLASS: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  5: "grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
  6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
};

export function gridClass(columns: unknown, fallback = 3): string {
  const n = Math.round(Number(columns));
  return COLUMN_CLASS[n >= 1 && n <= 6 ? n : fallback];
}

/* ------------------------------------------------------------------ */
/* Text / links / buttons / images / rich text                          */
/* ------------------------------------------------------------------ */

/** Site eyebrow: `—— — Label ——` in tiny tracked caps. */
export function Eyebrow({ children, center = false }: { children: ReactNode; center?: boolean }) {
  return (
    <div className="mb-5 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-[var(--cms-fg-muted)]">
      <span className="h-px w-12 bg-[var(--cms-border)]" />
      — {children}
      {center && <span className="h-px w-12 bg-[var(--cms-border)]" />}
    </div>
  );
}

export const HEADING_CLASS = "text-chrome text-4xl font-medium leading-[1.02] tracking-[-0.03em] md:text-5xl lg:text-6xl";
export const H1_CLASS = "text-chrome text-4xl font-medium leading-[1.05] tracking-[-0.03em] md:text-5xl lg:text-6xl xl:text-7xl";
export const CARD_TITLE_CLASS = "text-lg font-medium leading-[1.3] text-[var(--cms-fg)] md:text-xl";

export function SectionIntro({
  eyebrow,
  heading,
  description,
  center = false,
  as: Heading = "h2",
}: {
  eyebrow?: unknown;
  heading?: unknown;
  description?: unknown;
  center?: boolean;
  as?: "h1" | "h2";
}) {
  const e = text(eyebrow);
  const h = text(heading);
  const d = text(description);
  if (!e && !h && !d) return null;

  return (
    <div className={`mb-12 md:mb-16 ${center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}`}>
      {e && <Eyebrow center={center}>{e}</Eyebrow>}
      {h && <Heading className={Heading === "h1" ? H1_CLASS : HEADING_CLASS}>{h}</Heading>}
      {d && (
        <p className={`mt-4 text-base leading-relaxed text-[var(--cms-fg-muted)] md:text-lg ${center ? "mx-auto max-w-2xl" : ""}`}>
          {d}
        </p>
      )}
    </div>
  );
}

/** Link that only renders when the URL passes the A6 allow-list. */
export function CmsLink({
  url,
  newTab,
  className,
  children,
}: {
  url: unknown;
  newTab?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const href = safeUrl(url);
  if (!href) return <span className={className}>{children}</span>;

  const blank = newTab === true;
  if (isExternalUrl(href) || /^(mailto|tel):/i.test(href)) {
    return (
      <a href={href} className={className} {...(blank ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} {...(blank ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {children}
    </Link>
  );
}

// Same classes as MagneticButton, for links it can't render (external / mailto / tel).
const BUTTON_BASE =
  "relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-[transform,box-shadow,background] duration-500";
const BUTTON_STYLE = {
  primary: "bg-chrome text-[#050505] hover:shadow-[0_20px_60px_-15px_rgba(232,237,242,0.45)]",
  secondary: "border border-chrome text-white/90 hover:text-white hover:bg-white/5 backdrop-blur",
};

/** The site's MagneticButton (chrome / ghost) driven by CMS label + url. */
export function CmsButton({
  label,
  url,
  variant = "primary",
}: {
  label: unknown;
  url: unknown;
  variant?: "primary" | "secondary";
}) {
  const l = text(label);
  const href = safeUrl(url);
  if (!l || !href) return null;

  const content =
    variant === "primary" ? (
      <>
        {l}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </>
    ) : (
      l
    );

  if (isExternalUrl(href) || /^(mailto|tel):/i.test(href) || href.startsWith("#")) {
    return (
      <a href={href} className={`group ${BUTTON_BASE} ${BUTTON_STYLE[variant]}`}>
        {content}
      </a>
    );
  }
  return (
    <MagneticButton href={href} variant={variant === "primary" ? "chrome" : "ghost"} className="group">
      {content}
    </MagneticButton>
  );
}

export function ButtonRow({
  primaryLabel,
  primaryUrl,
  secondaryLabel,
  secondaryUrl,
  buttonStyle,
  center = false,
}: {
  primaryLabel?: unknown;
  primaryUrl?: unknown;
  secondaryLabel?: unknown;
  secondaryUrl?: unknown;
  buttonStyle?: unknown;
  center?: boolean;
}) {
  const hasPrimary = text(primaryLabel) && safeUrl(primaryUrl);
  const hasSecondary = text(secondaryLabel) && safeUrl(secondaryUrl);
  if (!hasPrimary && !hasSecondary) return null;
  const outline = buttonStyle === "outline" || buttonStyle === "ghost";
  return (
    <div className={`mt-10 flex flex-wrap gap-3 ${center ? "justify-center" : ""}`}>
      <CmsButton label={primaryLabel} url={primaryUrl} variant={outline ? "secondary" : "primary"} />
      <CmsButton label={secondaryLabel} url={secondaryUrl} variant="secondary" />
    </div>
  );
}

export function CmsImage({
  src,
  alt,
  className,
}: {
  src: unknown;
  alt?: unknown;
  className?: string;
}) {
  const url = safeImageUrl(src);
  if (!url) return null;
  // Plain <img>: CMS images come from arbitrary hosts (same as the rest of the site).
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={url} alt={text(alt)} loading="lazy" decoding="async" className={className} />;
}

// Long-form typography matching the site's PageContent markdown.
const PROSE =
  "text-[var(--cms-fg-muted)] leading-relaxed [&_a]:text-[var(--cms-fg)] [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary " +
  "[&_h1]:text-[var(--cms-fg)] [&_h2]:text-[var(--cms-fg)] [&_h3]:text-[var(--cms-fg)] [&_h4]:text-[var(--cms-fg)] " +
  "[&_h1]:mt-12 [&_h1]:mb-5 [&_h1]:text-4xl [&_h1]:font-medium [&_h1]:tracking-[-0.03em] " +
  "[&_h2]:mt-12 [&_h2]:mb-5 [&_h2]:text-3xl [&_h2]:font-medium [&_h2]:tracking-[-0.02em] md:[&_h2]:text-4xl " +
  "[&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-2xl [&_h3]:font-medium [&_h4]:mt-6 [&_h4]:mb-2 [&_h4]:text-xl [&_h4]:font-medium " +
  "[&_p]:mb-5 [&_ul]:mb-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mb-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-2 [&_li]:marker:text-primary " +
  "[&_strong]:text-[var(--cms-fg)] [&_strong]:font-medium [&_blockquote]:border-l-2 [&_blockquote]:border-primary/40 [&_blockquote]:pl-5 [&_blockquote]:italic " +
  "[&_img]:my-8 [&_img]:rounded-2xl [&_img]:border [&_img]:border-[var(--cms-border)] [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:border [&_pre]:border-[var(--cms-border)] [&_pre]:bg-[var(--cms-card)] [&_pre]:p-4 " +
  "[&_table]:w-full [&_table]:overflow-hidden [&_table]:rounded-xl [&_td]:border [&_td]:border-[var(--cms-border)] [&_td]:p-3 [&_th]:border [&_th]:border-[var(--cms-border)] [&_th]:bg-[var(--cms-card)] [&_th]:p-3 [&_th]:text-left [&_th]:font-medium [&_th]:text-[var(--cms-fg)]";

/** The ONLY place CMS HTML reaches the DOM — always through the A6 sanitizer. */
export function SafeHtml({ html, className = "" }: { html: unknown; className?: string }) {
  const clean = sanitizeHtml(html);
  if (!clean) return null;
  return <div className={`${PROSE} ${className}`} dangerouslySetInnerHTML={{ __html: clean }} />;
}

/** The site's card (FeatureGrid / RelatedServices): glass, hover lift. */
export function Card({
  children,
  className = "",
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={`group relative rounded-2xl border border-[var(--cms-border)] bg-[var(--cms-card)] p-6 backdrop-blur-sm transition-all duration-500 md:p-7 ${
        hover ? "hover:-translate-y-1.5 hover:border-white/15 hover:bg-white/[0.04]" : ""
      } ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative flex h-full flex-col">{children}</div>
    </div>
  );
}

/** Resolve a lucide icon from names like "shield", "shield-check", "ShieldCheck". */
function lucideIcon(name: string): LucideIcon | undefined {
  const pascal = name
    .replace(/^lucide[:-]/i, "")
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
  return (icons as Record<string, LucideIcon>)[pascal];
}

/** Icon tile used by the site's FeatureGrid. */
export function CmsIcon({ icon }: { icon: unknown }) {
  const value = text(icon).trim();
  if (!value) return null;
  const tile =
    "mb-5 grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-primary transition-all group-hover:border-primary/30 group-hover:bg-primary/10";

  if (safeImageUrl(value) && /[/.]/.test(value)) {
    return (
      <div className={tile}>
        <CmsImage src={value} alt="" className="h-6 w-6 object-contain" />
      </div>
    );
  }
  const Glyph = /^[a-z][a-z0-9:_\s-]*$/i.test(value) ? lucideIcon(value) : undefined;
  if (Glyph) {
    // createElement: `Glyph` is a static lucide export, not a component made during render.
    return <div className={tile}>{createElement(Glyph, { className: "h-5 w-5" })}</div>;
  }
  // Emoji / short glyphs render as text; other names get a monogram.
  const glyph = [...value].length <= 3 ? value : value.charAt(0).toUpperCase();
  return <div className={`${tile} text-lg`}>{glyph}</div>;
}

export function asItems(value: unknown): Record<string, any>[] {
  return Array.isArray(value) ? value.filter((v) => v && typeof v === "object") : [];
}
