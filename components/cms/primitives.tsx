import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { CmsMotion } from "./CmsMotion";
import { isExternalUrl, safeImageUrl, safeUrl, sanitizeHtml, text } from "@/lib/cms/sanitize";
import type { CmsSectionSettings } from "@/lib/cms/types";

/* ------------------------------------------------------------------ */
/* Section shell: honors settings.width / paddingY / background /      */
/* motion. Colors come from CSS vars set by <CmsPage>.                  */
/* ------------------------------------------------------------------ */

const WIDTH_CLASS: Record<string, string> = {
  narrow: "max-w-3xl",
  wide: "max-w-7xl",
  full: "max-w-none",
};

const BACKGROUND_STYLE: Record<string, CSSProperties> = {
  dark: {
    background: "#050505",
    ["--cms-fg" as string]: "#ffffff",
    ["--cms-fg-muted" as string]: "rgba(255,255,255,0.62)",
    ["--cms-border" as string]: "rgba(255,255,255,0.1)",
    ["--cms-card" as string]: "rgba(255,255,255,0.03)",
  },
  muted: {
    background: "#0d0d0d",
    ["--cms-fg" as string]: "#ffffff",
    ["--cms-fg-muted" as string]: "rgba(255,255,255,0.62)",
    ["--cms-border" as string]: "rgba(255,255,255,0.1)",
    ["--cms-card" as string]: "rgba(255,255,255,0.04)",
  },
  light: {
    background: "#ffffff",
    ["--cms-fg" as string]: "#050505",
    ["--cms-fg-muted" as string]: "rgba(5,5,5,0.65)",
    ["--cms-border" as string]: "rgba(5,5,5,0.12)",
    ["--cms-card" as string]: "rgba(5,5,5,0.03)",
  },
  primary: {
    background: "var(--cms-primary)",
    ["--cms-fg" as string]: "var(--cms-primary-fg)",
    ["--cms-fg-muted" as string]: "var(--cms-primary-fg)",
    ["--cms-border" as string]: "rgba(255,255,255,0.25)",
    ["--cms-card" as string]: "rgba(255,255,255,0.08)",
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
  defaultPadding = [96, 96],
  defaultWidth = "wide",
}: {
  type: string;
  id?: string;
  settings?: CmsSectionSettings;
  children: ReactNode;
  defaultPadding?: [number, number];
  defaultWidth?: "narrow" | "wide" | "full";
}) {
  const s = settings ?? {};
  const padding = Array.isArray(s.paddingY) ? s.paddingY : [];
  const top = clampPx(padding[0], defaultPadding[0]);
  const bottom = clampPx(padding[1] ?? padding[0], defaultPadding[1]);
  const width = WIDTH_CLASS[String(s.width ?? defaultWidth)] ?? WIDTH_CLASS[defaultWidth];
  const bg = BACKGROUND_STYLE[String(s.background ?? "")] ?? {};
  const motion = typeof s.motion === "string" && s.motion !== "none" && s.motion !== "";

  const inner = <div className={`mx-auto w-full px-5 sm:px-8 ${width}`}>{children}</div>;

  return (
    <section
      id={id ? `cms-${id.replace(/[^A-Za-z0-9_-]/g, "")}` : undefined}
      data-cms-section={type}
      className="relative text-[var(--cms-fg)]"
      style={{
        paddingTop: `clamp(${Math.round(top * 0.55)}px, ${(top / 14.4).toFixed(2)}vw, ${top}px)`,
        paddingBottom: `clamp(${Math.round(bottom * 0.55)}px, ${(bottom / 14.4).toFixed(2)}vw, ${bottom}px)`,
        ...bg,
      }}
    >
      {motion ? <CmsMotion>{inner}</CmsMotion> : inner}
    </section>
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
/* Text / links / images / rich text                                    */
/* ------------------------------------------------------------------ */

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
    <div className={`mb-12 ${center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}`}>
      {e && (
        <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.3em] text-[var(--cms-fg-muted)]">{e}</div>
      )}
      {h && (
        <Heading
          className={
            Heading === "h1"
              ? "text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl"
              : "text-3xl font-semibold leading-tight tracking-tight md:text-5xl"
          }
        >
          {h}
        </Heading>
      )}
      {d && <p className="mt-5 text-base leading-relaxed text-[var(--cms-fg-muted)] md:text-lg">{d}</p>}
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

const BUTTON_BASE =
  "inline-flex items-center justify-center rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-[0.17em] transition duration-300 hover:-translate-y-0.5";

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
  if (!l || !safeUrl(url)) return null;
  const cls =
    variant === "primary"
      ? `${BUTTON_BASE} bg-[var(--cms-primary)] text-[var(--cms-primary-fg)] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]`
      : `${BUTTON_BASE} border border-[var(--cms-border)] text-[var(--cms-fg)] hover:bg-[var(--cms-card)]`;
  return (
    <CmsLink url={url} className={cls}>
      {l}
    </CmsLink>
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
    <div className={`mt-8 flex flex-wrap gap-3 ${center ? "justify-center" : ""}`}>
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

const PROSE =
  "text-[var(--cms-fg-muted)] leading-relaxed [&_a]:text-[var(--cms-fg)] [&_a]:underline [&_a]:underline-offset-4 " +
  "[&_h1]:text-[var(--cms-fg)] [&_h2]:text-[var(--cms-fg)] [&_h3]:text-[var(--cms-fg)] [&_h4]:text-[var(--cms-fg)] " +
  "[&_h1]:mt-10 [&_h1]:mb-4 [&_h1]:text-4xl [&_h1]:font-semibold [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-3xl [&_h2]:font-semibold " +
  "[&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-2xl [&_h3]:font-semibold [&_h4]:mt-6 [&_h4]:mb-2 [&_h4]:text-xl [&_h4]:font-semibold " +
  "[&_p]:mb-5 [&_ul]:mb-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mb-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-2 " +
  "[&_strong]:text-[var(--cms-fg)] [&_blockquote]:border-l-2 [&_blockquote]:border-[var(--cms-border)] [&_blockquote]:pl-5 [&_blockquote]:italic " +
  "[&_img]:my-6 [&_img]:rounded-2xl [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:bg-[var(--cms-card)] [&_pre]:p-4 " +
  "[&_table]:w-full [&_td]:border [&_td]:border-[var(--cms-border)] [&_td]:p-2 [&_th]:border [&_th]:border-[var(--cms-border)] [&_th]:p-2";

/** The ONLY place CMS HTML reaches the DOM — always through the A6 sanitizer. */
export function SafeHtml({ html, className = "" }: { html: unknown; className?: string }) {
  const clean = sanitizeHtml(html);
  if (!clean) return null;
  return <div className={`${PROSE} ${className}`} dangerouslySetInnerHTML={{ __html: clean }} />;
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-[var(--cms-border)] bg-[var(--cms-card)] p-6 md:p-8 ${className}`}>
      {children}
    </div>
  );
}

export function CmsIcon({ icon }: { icon: unknown }) {
  const value = text(icon).trim();
  if (!value) return null;
  if (safeImageUrl(value) && /[/.]/.test(value)) {
    return <CmsImage src={value} alt="" className="mb-5 h-10 w-10 object-contain" />;
  }
  // Emoji / short glyphs render as text; longer icon names get a monogram.
  const glyph = [...value].length <= 3 ? value : value.charAt(0).toUpperCase();
  return (
    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--cms-border)] text-lg">
      {glyph}
    </div>
  );
}

export function asItems(value: unknown): Record<string, any>[] {
  return Array.isArray(value) ? value.filter((v) => v && typeof v === "object") : [];
}
