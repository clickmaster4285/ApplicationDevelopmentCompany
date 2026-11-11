import type { ReactNode } from "react";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { safeUrl, text } from "@/lib/cms/sanitize";
import type { CmsPost, CmsSection } from "@/lib/cms/types";
import {
  ButtonRow,
  Card,
  CmsButton,
  CmsIcon,
  CmsImage,
  CmsLink,
  SafeHtml,
  SectionIntro,
  SectionShell,
  asItems,
  gridClass,
} from "./primitives";

export type SectionProps = {
  section: CmsSection;
  posts: CmsPost[];
  isFirst: boolean;
};

type C = Record<string, any>;

function shell(props: SectionProps, children: ReactNode, opts: Partial<Parameters<typeof SectionShell>[0]> = {}) {
  return (
    <SectionShell type={props.section.type ?? ""} id={props.section.id} settings={props.section.settings} {...opts}>
      {children}
    </SectionShell>
  );
}

const layoutOf = (p: SectionProps) => String(p.section.settings?.layout ?? "");

/* ---------------------------- chrome ---------------------------- */

function HeaderSection(p: SectionProps) {
  const c: C = p.section.content ?? {};
  const items = asItems(c.navItems);
  return shell(
    p,
    <div className="flex flex-wrap items-center justify-between gap-5 rounded-2xl border border-[var(--cms-border)] bg-[var(--cms-card)] px-5 py-4">
      <CmsLink url="/" className="flex items-center gap-3 font-semibold">
        {c.showLogo !== false && c.logoImage ? <CmsImage src={c.logoImage} alt={c.logoText} className="h-8 w-auto" /> : null}
        {text(c.logoText)}
      </CmsLink>
      {items.length > 0 && (
        <nav className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.16em] text-[var(--cms-fg-muted)]">
          {items.map((item, i) => (
            <CmsLink key={i} url={item.url} newTab={item.newTab === true} className="hover:text-[var(--cms-fg)]">
              {text(item.label)}
            </CmsLink>
          ))}
        </nav>
      )}
      <CmsButton label={c.ctaLabel} url={c.ctaUrl} />
    </div>,
    { defaultPadding: [24, 24] },
  );
}

function FooterSection(p: SectionProps) {
  const c: C = p.section.content ?? {};
  return shell(
    p,
    <div className="flex flex-col gap-3 border-t border-[var(--cms-border)] pt-8 text-sm text-[var(--cms-fg-muted)] md:flex-row md:items-center md:justify-between">
      <div>
        {text(c.logoText) && <div className="font-semibold text-[var(--cms-fg)]">{text(c.logoText)}</div>}
        {text(c.tagline) && <div className="mt-1">{text(c.tagline)}</div>}
      </div>
      {text(c.copyright) && <div className="text-xs">{text(c.copyright)}</div>}
    </div>,
    { defaultPadding: [48, 48] },
  );
}

/* ----------------------------- hero ----------------------------- */

function HeroSection(p: SectionProps) {
  const c: C = p.section.content ?? {};
  const split = layoutOf(p) === "split" && !!c.image;
  const center = !split && layoutOf(p) !== "left";
  const Heading = p.isFirst ? "h1" : "h2";

  const copy = (
    <div className={center ? "mx-auto max-w-4xl text-center" : ""}>
      {text(c.eyebrow) && (
        <div className="mb-5 text-[11px] font-medium uppercase tracking-[0.3em] text-[var(--cms-fg-muted)]">{text(c.eyebrow)}</div>
      )}
      {text(c.heading) && (
        <Heading className="text-4xl font-semibold leading-[1.02] tracking-tight md:text-6xl lg:text-7xl">{text(c.heading)}</Heading>
      )}
      {text(c.description) && (
        <p className="mt-6 text-base leading-relaxed text-[var(--cms-fg-muted)] md:text-xl">{text(c.description)}</p>
      )}
      <ButtonRow {...c} center={center} />
      {text(c.meta) && <div className="mt-6 text-xs uppercase tracking-[0.2em] text-[var(--cms-fg-muted)]">{text(c.meta)}</div>}
    </div>
  );

  return shell(
    p,
    split ? (
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {copy}
        <CmsImage src={c.image} alt={c.heading} className="w-full rounded-3xl border border-[var(--cms-border)] object-cover" />
      </div>
    ) : (
      <>
        {copy}
        {c.image ? (
          <CmsImage src={c.image} alt={c.heading} className="mx-auto mt-14 w-full rounded-3xl border border-[var(--cms-border)] object-cover" />
        ) : null}
      </>
    ),
    { defaultPadding: [160, 120] },
  );
}

/* ----------------------------- text ----------------------------- */

function TextSection(p: SectionProps) {
  const c: C = p.section.content ?? {};
  return shell(
    p,
    <>
      <SectionIntro heading={c.heading} />
      {text(c.body) && (
        <div className="space-y-5 whitespace-pre-line text-base leading-relaxed text-[var(--cms-fg-muted)] md:text-lg">{text(c.body)}</div>
      )}
    </>,
    { defaultWidth: "narrow" },
  );
}

function RichTextSection(p: SectionProps) {
  const c: C = p.section.content ?? {};
  return shell(
    p,
    <>
      <SectionIntro heading={c.heading} />
      <SafeHtml html={c.bodyHtml} className="md:text-lg" />
    </>,
    { defaultWidth: "narrow" },
  );
}

function CustomContentSection(p: SectionProps) {
  return RichTextSection(p);
}

function HtmlSection(p: SectionProps) {
  const c: C = p.section.content ?? {};
  return shell(p, <SafeHtml html={c.code} />);
}

function ImageSection(p: SectionProps) {
  const c: C = p.section.content ?? {};
  return shell(
    p,
    <figure>
      <CmsImage src={c.image} alt={c.alt ?? c.caption} className="w-full rounded-3xl border border-[var(--cms-border)] object-cover" />
      {text(c.caption) && <figcaption className="mt-4 text-center text-sm text-[var(--cms-fg-muted)]">{text(c.caption)}</figcaption>}
    </figure>,
  );
}

function ImageTextSection(p: SectionProps) {
  const c: C = p.section.content ?? {};
  const reverse = /left|reverse/i.test(layoutOf(p));
  return shell(
    p,
    <div className="grid items-center gap-12 lg:grid-cols-2">
      <div className={reverse ? "lg:order-2" : ""}>
        <SectionIntro eyebrow={c.eyebrow} heading={c.heading} />
        <SafeHtml html={c.bodyHtml} />
        <ButtonRow primaryLabel={c.primaryLabel} primaryUrl={c.primaryUrl} />
      </div>
      <div className={reverse ? "lg:order-1" : ""}>
        <CmsImage src={c.image} alt={c.alt ?? c.heading} className="w-full rounded-3xl border border-[var(--cms-border)] object-cover" />
      </div>
    </div>,
  );
}

function videoEmbed(url: string): { kind: "iframe" | "video"; src: string } | null {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    if (host === "youtu.be") return { kind: "iframe", src: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(u.pathname.slice(1))}` };
    if (host.endsWith("youtube.com")) {
      const id = u.searchParams.get("v") ?? u.pathname.split("/").filter(Boolean).pop();
      if (id) return { kind: "iframe", src: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}` };
    }
    if (host === "vimeo.com" || host === "player.vimeo.com") {
      const id = u.pathname.split("/").filter(Boolean).pop();
      if (id && /^\d+$/.test(id)) return { kind: "iframe", src: `https://player.vimeo.com/video/${id}` };
    }
    if (/\.(mp4|webm|ogg)$/i.test(u.pathname)) return { kind: "video", src: u.toString() };
  } catch {
    // Relative video file.
    if (url.startsWith("/") && /\.(mp4|webm|ogg)$/i.test(url)) return { kind: "video", src: url };
  }
  return null;
}

function VideoSection(p: SectionProps) {
  const c: C = p.section.content ?? {};
  const url = safeUrl(c.videoUrl);
  const embed = url ? videoEmbed(url) : null;
  return shell(
    p,
    <>
      <SectionIntro heading={c.heading} description={c.description} center />
      {embed && (
        <div className="aspect-video overflow-hidden rounded-3xl border border-[var(--cms-border)] bg-black">
          {embed.kind === "iframe" ? (
            <iframe
              src={embed.src}
              title={text(c.heading) || "Video"}
              className="h-full w-full"
              loading="lazy"
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : (
            <video src={embed.src} controls preload="metadata" className="h-full w-full" />
          )}
        </div>
      )}
    </>,
  );
}

/* ------------------------- list sections ------------------------- */

function CardsSection(p: SectionProps) {
  const c: C = p.section.content ?? {};
  return shell(
    p,
    <>
      <SectionIntro heading={c.heading} description={c.description} />
      <div className={`grid gap-6 ${gridClass(p.section.settings?.columns, 3)}`}>
        {asItems(c.items).map((item, i) => (
          <Card key={i} className="flex flex-col overflow-hidden !p-0">
            <CmsImage src={item.image} alt={item.title} className="aspect-[16/10] w-full object-cover" />
            <div className="flex flex-1 flex-col p-6 md:p-8">
              <h3 className="text-xl font-semibold">{text(item.title)}</h3>
              {text(item.description) && <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--cms-fg-muted)]">{text(item.description)}</p>}
              {text(item.linkLabel) && safeUrl(item.url) && (
                <CmsLink url={item.url} className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] hover:underline">
                  {text(item.linkLabel)} →
                </CmsLink>
              )}
            </div>
          </Card>
        ))}
      </div>
    </>,
  );
}

function FeaturesSection(p: SectionProps) {
  const c: C = p.section.content ?? {};
  return shell(
    p,
    <>
      <SectionIntro heading={c.heading} description={c.description} />
      <div className={`grid gap-6 ${gridClass(p.section.settings?.columns, 3)}`}>
        {asItems(c.items).map((item, i) => (
          <Card key={i}>
            <CmsIcon icon={item.icon} />
            <CmsImage src={item.image} alt={item.title} className="mb-5 w-full rounded-xl object-cover" />
            <h3 className="text-lg font-semibold">{text(item.title)}</h3>
            {text(item.description) && <p className="mt-3 text-sm leading-relaxed text-[var(--cms-fg-muted)]">{text(item.description)}</p>}
          </Card>
        ))}
      </div>
    </>,
  );
}

function ServicesSection(p: SectionProps) {
  const c: C = p.section.content ?? {};
  return shell(
    p,
    <>
      <SectionIntro heading={c.heading} description={c.description} />
      <div className={`grid gap-6 ${gridClass(p.section.settings?.columns, 3)}`}>
        {asItems(c.items).map((item, i) => {
          const body = (
            <Card className="h-full transition-colors hover:border-[var(--cms-fg-muted)]">
              <CmsIcon icon={item.icon} />
              <h3 className="text-lg font-semibold">{text(item.title)}</h3>
              {text(item.description) && <p className="mt-3 text-sm leading-relaxed text-[var(--cms-fg-muted)]">{text(item.description)}</p>}
            </Card>
          );
          return safeUrl(item.url) ? (
            <CmsLink key={i} url={item.url} className="block">
              {body}
            </CmsLink>
          ) : (
            <div key={i}>{body}</div>
          );
        })}
      </div>
    </>,
  );
}

function BenefitsSection(p: SectionProps) {
  const c: C = p.section.content ?? {};
  return shell(
    p,
    <>
      <SectionIntro heading={c.heading} description={c.description} />
      <ul className={`grid gap-6 ${gridClass(p.section.settings?.columns, 2)}`}>
        {asItems(c.items).map((item, i) => (
          <li key={i} className="flex gap-4">
            <span aria-hidden className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--cms-primary)] text-xs text-[var(--cms-primary-fg)]">
              ✓
            </span>
            <div>
              <h3 className="font-semibold">{text(item.title)}</h3>
              {text(item.description) && <p className="mt-1 text-sm leading-relaxed text-[var(--cms-fg-muted)]">{text(item.description)}</p>}
            </div>
          </li>
        ))}
      </ul>
    </>,
  );
}

function ProcessSection(p: SectionProps) {
  const c: C = p.section.content ?? {};
  return shell(
    p,
    <>
      <SectionIntro heading={c.heading} description={c.description} />
      <ol className={`grid gap-6 ${gridClass(p.section.settings?.columns, 4)}`}>
        {asItems(c.items).map((item, i) => (
          <li key={i}>
            <Card className="h-full">
              <div className="mb-4 text-xs font-medium tracking-[0.3em] text-[var(--cms-fg-muted)]">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="text-lg font-semibold">{text(item.title)}</h3>
              {text(item.description) && <p className="mt-3 text-sm leading-relaxed text-[var(--cms-fg-muted)]">{text(item.description)}</p>}
            </Card>
          </li>
        ))}
      </ol>
    </>,
  );
}

function TimelineSection(p: SectionProps) {
  const c: C = p.section.content ?? {};
  return shell(
    p,
    <>
      <SectionIntro heading={c.heading} description={c.description} />
      <ol className="relative space-y-10 border-l border-[var(--cms-border)] pl-8">
        {asItems(c.items).map((item, i) => (
          <li key={i} className="relative">
            <span aria-hidden className="absolute -left-[37px] top-1.5 h-3 w-3 rounded-full bg-[var(--cms-primary)]" />
            {text(item.date) && <div className="text-xs uppercase tracking-[0.2em] text-[var(--cms-fg-muted)]">{text(item.date)}</div>}
            <h3 className="mt-1 text-lg font-semibold">{text(item.title)}</h3>
            {text(item.description) && <p className="mt-2 text-sm leading-relaxed text-[var(--cms-fg-muted)]">{text(item.description)}</p>}
          </li>
        ))}
      </ol>
    </>,
    { defaultWidth: "narrow" },
  );
}

function TestimonialsSection(p: SectionProps) {
  const c: C = p.section.content ?? {};
  return shell(
    p,
    <>
      <SectionIntro heading={c.heading} />
      <div className={`grid gap-6 ${gridClass(p.section.settings?.columns, 3)}`}>
        {asItems(c.items).map((item, i) => (
          <Card key={i} className="flex flex-col">
            <blockquote className="flex-1 text-base leading-relaxed">“{text(item.quote)}”</blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <CmsImage src={item.image} alt={item.name} className="h-11 w-11 rounded-full object-cover" />
              <div>
                <div className="text-sm font-semibold">{text(item.name)}</div>
                {text(item.role) && <div className="text-xs text-[var(--cms-fg-muted)]">{text(item.role)}</div>}
              </div>
            </figcaption>
          </Card>
        ))}
      </div>
    </>,
  );
}

function TeamSection(p: SectionProps) {
  const c: C = p.section.content ?? {};
  return shell(
    p,
    <>
      <SectionIntro heading={c.heading} description={c.description} />
      <div className={`grid gap-6 ${gridClass(p.section.settings?.columns, 4)}`}>
        {asItems(c.items).map((item, i) => (
          <Card key={i} className="overflow-hidden !p-0">
            <CmsImage src={item.image} alt={item.name} className="aspect-square w-full object-cover" />
            <div className="p-6">
              <h3 className="font-semibold">{text(item.name)}</h3>
              {text(item.role) && <div className="mt-1 text-xs uppercase tracking-[0.16em] text-[var(--cms-fg-muted)]">{text(item.role)}</div>}
              {text(item.bio) && <p className="mt-3 text-sm leading-relaxed text-[var(--cms-fg-muted)]">{text(item.bio)}</p>}
            </div>
          </Card>
        ))}
      </div>
    </>,
  );
}

function featureList(value: unknown): string[] {
  if (Array.isArray(value)) return value.map((v) => text(typeof v === "object" && v ? (v as C).label ?? (v as C).title : v)).filter(Boolean);
  return text(value)
    .split(/\r?\n|,/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function PricingSection(p: SectionProps) {
  const c: C = p.section.content ?? {};
  return shell(
    p,
    <>
      <SectionIntro heading={c.heading} description={c.description} center />
      <div className={`grid gap-6 ${gridClass(p.section.settings?.columns, 3)}`}>
        {asItems(c.items).map((item, i) => (
          <Card key={i} className={`flex flex-col ${item.featured ? "border-[var(--cms-primary)] ring-1 ring-[var(--cms-primary)]" : ""}`}>
            <h3 className="text-lg font-semibold">{text(item.name)}</h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-semibold tracking-tight">{text(item.price)}</span>
              {text(item.period) && <span className="text-sm text-[var(--cms-fg-muted)]">/{text(item.period)}</span>}
            </div>
            {text(item.description) && <p className="mt-3 text-sm text-[var(--cms-fg-muted)]">{text(item.description)}</p>}
            <ul className="mt-6 flex-1 space-y-2 text-sm">
              {featureList(item.features).map((f, j) => (
                <li key={j} className="flex gap-2">
                  <span aria-hidden>✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <CmsButton label={item.buttonLabel} url={item.buttonUrl} variant={item.featured ? "primary" : "secondary"} />
            </div>
          </Card>
        ))}
      </div>
    </>,
  );
}

function FaqSection(p: SectionProps) {
  const c: C = p.section.content ?? {};
  const faqs = asItems(c.items)
    .map((item) => ({ question: text(item.question), answer: text(item.answer) }))
    .filter((f) => f.question);
  return shell(
    p,
    <>
      <SectionIntro heading={c.heading} description={c.description} />
      {faqs.length > 0 && <FAQAccordion faqs={faqs} />}
    </>,
    { defaultWidth: "narrow" },
  );
}

function GallerySection(p: SectionProps) {
  const c: C = p.section.content ?? {};
  return shell(
    p,
    <>
      <SectionIntro heading={c.heading} description={c.description} />
      <div className={`grid gap-4 ${gridClass(p.section.settings?.columns, 3)}`}>
        {asItems(c.items).map((item, i) => (
          <figure key={i}>
            <CmsImage src={item.image} alt={item.caption} className="aspect-[4/3] w-full rounded-2xl object-cover" />
            {text(item.caption) && <figcaption className="mt-2 text-xs text-[var(--cms-fg-muted)]">{text(item.caption)}</figcaption>}
          </figure>
        ))}
      </div>
    </>,
  );
}

function StatsSection(p: SectionProps) {
  const c: C = p.section.content ?? {};
  return shell(
    p,
    <>
      <SectionIntro heading={c.heading} description={c.description} />
      <dl className={`grid gap-6 ${gridClass(p.section.settings?.columns, 4)}`}>
        {asItems(c.items).map((item, i) => (
          <div key={i} className="flex flex-col border-t border-[var(--cms-border)] pt-6">
            <dt className="order-2 mt-2 text-xs uppercase tracking-[0.2em] text-[var(--cms-fg-muted)]">{text(item.label)}</dt>
            <dd className="text-4xl font-semibold tracking-tight md:text-5xl">{text(item.value)}</dd>
          </div>
        ))}
      </dl>
    </>,
  );
}

function LogosSection(p: SectionProps) {
  const c: C = p.section.content ?? {};
  return shell(
    p,
    <>
      <SectionIntro heading={c.heading} center />
      <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
        {asItems(c.items).map((item, i) => {
          const logo = <CmsImage src={item.image} alt={item.name} className="h-10 w-auto max-w-[160px] object-contain opacity-70 transition-opacity hover:opacity-100" />;
          return safeUrl(item.url) ? (
            <CmsLink key={i} url={item.url} newTab>
              {logo}
            </CmsLink>
          ) : (
            <div key={i}>{logo}</div>
          );
        })}
      </div>
    </>,
    { defaultPadding: [64, 64] },
  );
}

/* ---------------------------- actions ---------------------------- */

function CtaSection(p: SectionProps) {
  const c: C = p.section.content ?? {};
  return shell(
    p,
    <div className="rounded-3xl border border-[var(--cms-border)] bg-[var(--cms-card)] px-6 py-14 text-center md:px-16 md:py-20">
      <SectionIntro heading={c.heading} description={c.description} center />
      <ButtonRow {...c} center />
    </div>,
  );
}

const INPUT =
  "h-12 w-full rounded-xl border border-[var(--cms-border)] bg-[var(--cms-card)] px-4 text-sm text-[var(--cms-fg)] placeholder:text-[var(--cms-fg-muted)] focus:outline-none focus:border-[var(--cms-fg-muted)]";

function ContactSection(p: SectionProps) {
  const c: C = p.section.content ?? {};
  const action = safeUrl(c.formAction);
  const email = text(c.email);
  const phone = text(c.phone);
  return shell(
    p,
    <div className="grid gap-12 lg:grid-cols-2">
      <div>
        <SectionIntro heading={c.heading} description={c.description} />
        <dl className="space-y-4 text-sm">
          {email && (
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-[var(--cms-fg-muted)]">Email</dt>
              <dd><CmsLink url={`mailto:${email}`} className="hover:underline">{email}</CmsLink></dd>
            </div>
          )}
          {phone && (
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-[var(--cms-fg-muted)]">Phone</dt>
              <dd><CmsLink url={`tel:${phone.replace(/[^\d+]/g, "")}`} className="hover:underline">{phone}</CmsLink></dd>
            </div>
          )}
          {text(c.address) && (
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-[var(--cms-fg-muted)]">Address</dt>
              <dd className="whitespace-pre-line">{text(c.address)}</dd>
            </div>
          )}
        </dl>
        <CmsImage src={c.image} alt={c.heading} className="mt-8 w-full rounded-2xl object-cover" />
      </div>
      {action ? (
        <form action={action} method="post" className="space-y-4">
          <input name="name" required placeholder="Name" className={INPUT} autoComplete="name" />
          <input name="email" type="email" required placeholder="Email" className={INPUT} autoComplete="email" />
          <input name="phone" type="tel" placeholder="Phone" className={INPUT} autoComplete="tel" />
          <textarea name="message" required rows={5} placeholder="How can we help?" className={`${INPUT} h-auto py-3`} />
          <button type="submit" className="inline-flex h-12 items-center rounded-full bg-[var(--cms-primary)] px-8 text-xs font-semibold uppercase tracking-[0.17em] text-[var(--cms-primary-fg)]">
            {text(c.buttonLabel) || "Send"}
          </button>
        </form>
      ) : (
        <div className="flex items-start">
          <CmsButton label={text(c.buttonLabel) || "Contact us"} url="/contact" />
        </div>
      )}
    </div>,
  );
}

function NewsletterSection(p: SectionProps) {
  const c: C = p.section.content ?? {};
  const action = safeUrl(c.formAction);
  return shell(
    p,
    <div className="mx-auto max-w-2xl text-center">
      <SectionIntro heading={c.heading} description={c.description} center />
      {action && (
        <form action={action} method="post" className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
          <input name="email" type="email" required placeholder="you@company.com" className={`${INPUT} rounded-full`} autoComplete="email" />
          <button type="submit" className="h-12 shrink-0 rounded-full bg-[var(--cms-primary)] px-6 text-xs font-semibold uppercase tracking-[0.17em] text-[var(--cms-primary-fg)]">
            {text(c.buttonLabel) || "Subscribe"}
          </button>
        </form>
      )}
    </div>,
    { defaultWidth: "narrow" },
  );
}

/* ----------------------------- posts ----------------------------- */

type PostCard = { title: string; description: string; image?: unknown; url?: unknown };

function resolvePosts(c: C, posts: CmsPost[]): PostCard[] {
  const limit = Math.max(1, Math.min(48, Math.round(Number(c.limit)) || 6));
  if (c.mode === "manual") {
    return asItems(c.items)
      .slice(0, limit)
      .map((i) => ({ title: text(i.title), description: text(i.description), image: i.image, url: i.url }));
  }
  const type = text(c.pageType);
  return posts
    .filter((post) => !type || !post.pageType || post.pageType === type)
    .slice(0, limit)
    .map((post) => ({ title: text(post.title), description: text(post.excerpt), image: post.image, url: post.url }));
}

function PostsGrid({ items, columns }: { items: PostCard[]; columns: unknown }) {
  if (items.length === 0) return null;
  return (
    <div className={`grid gap-6 ${gridClass(columns, 3)}`}>
      {items.map((post, i) => (
        <CmsLink key={i} url={post.url} className="group block">
          <Card className="h-full overflow-hidden !p-0 transition-colors group-hover:border-[var(--cms-fg-muted)]">
            <CmsImage src={post.image} alt={post.title} className="aspect-[16/10] w-full object-cover" />
            <div className="p-6">
              <h3 className="text-lg font-semibold leading-snug">{post.title}</h3>
              {post.description && <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[var(--cms-fg-muted)]">{post.description}</p>}
            </div>
          </Card>
        </CmsLink>
      ))}
    </div>
  );
}

function BlogPostsSection(p: SectionProps) {
  const c: C = p.section.content ?? {};
  return shell(
    p,
    <>
      <SectionIntro heading={c.heading} description={c.description} />
      <PostsGrid items={resolvePosts(c, p.posts)} columns={p.section.settings?.columns} />
    </>,
  );
}

function RelatedPostsSection(p: SectionProps) {
  const c: C = p.section.content ?? {};
  return shell(
    p,
    <>
      <SectionIntro heading={c.heading} />
      <PostsGrid items={resolvePosts(c, p.posts)} columns={p.section.settings?.columns} />
    </>,
  );
}

function AuthorSection(p: SectionProps) {
  const c: C = p.section.content ?? {};
  return shell(
    p,
    <>
      <SectionIntro heading={c.heading} />
      <Card className="flex flex-col gap-6 sm:flex-row">
        <CmsImage src={c.image} alt={c.name} className="h-24 w-24 shrink-0 rounded-full object-cover" />
        <div>
          <div className="text-lg font-semibold">{text(c.name)}</div>
          {text(c.role) && <div className="mt-1 text-xs uppercase tracking-[0.16em] text-[var(--cms-fg-muted)]">{text(c.role)}</div>}
          <SafeHtml html={c.bioHtml} className="mt-4 text-sm" />
        </div>
      </Card>
    </>,
    { defaultWidth: "narrow" },
  );
}

/* ---------------------------- registry ---------------------------- */

export const SECTION_COMPONENTS: Record<string, (props: SectionProps) => ReactNode> = {
  header: HeaderSection,
  hero: HeroSection,
  text: TextSection,
  richText: RichTextSection,
  image: ImageSection,
  imageText: ImageTextSection,
  video: VideoSection,
  cards: CardsSection,
  features: FeaturesSection,
  services: ServicesSection,
  benefits: BenefitsSection,
  process: ProcessSection,
  timeline: TimelineSection,
  testimonials: TestimonialsSection,
  team: TeamSection,
  pricing: PricingSection,
  faq: FaqSection,
  gallery: GallerySection,
  stats: StatsSection,
  logos: LogosSection,
  cta: CtaSection,
  contact: ContactSection,
  newsletter: NewsletterSection,
  blogPosts: BlogPostsSection,
  relatedPosts: RelatedPostsSection,
  author: AuthorSection,
  customContent: CustomContentSection,
  footer: FooterSection,
  html: HtmlSection,
};
