import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Check, ChevronRight, Mail, MapPin, Phone, Sparkles, Star } from "lucide-react";
import { ContactForm } from "@/app/contact/contact-form";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { safeUrl, text } from "@/lib/cms/sanitize";
import type { CmsPost, CmsSection } from "@/lib/cms/types";
import {
  ButtonRow,
  CARD_TITLE_CLASS,
  Card,
  CmsButton,
  CmsIcon,
  CmsImage,
  CmsLink,
  Eyebrow,
  GlowPanel,
  H1_CLASS,
  HeroBackdrop,
  SafeHtml,
  SectionIntro,
  SectionShell,
  asItems,
  gridClass,
} from "./primitives";

/*
 * ERP section types rendered with the site's own UI. Each section maps to
 * the closest hand-built component on the site (named in its comment) so a
 * created page is visually indistinguishable from a code-owned one.
 */

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

const MUTED = "text-[var(--cms-fg-muted)]";

/* ---------------------------- chrome ---------------------------- */
// The root layout renders the site's <Nav>/<Footer>; CmsSectionRenderer
// skips these types. Kept so the registry still knows the ERP types.

function HeaderSection(p: SectionProps) {
  const c: C = p.section.content ?? {};
  const items = asItems(c.navItems);
  return shell(
    p,
    <div className="flex flex-wrap items-center justify-between gap-5 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 backdrop-blur">
      <CmsLink url="/" className="flex items-center gap-3 font-medium">
        {c.showLogo !== false && c.logoImage ? <CmsImage src={c.logoImage} alt={c.logoText} className="h-8 w-auto" /> : null}
        {text(c.logoText)}
      </CmsLink>
      {items.length > 0 && (
        <nav className="flex flex-wrap gap-5 text-sm text-white/60">
          {items.map((item, i) => (
            <CmsLink key={i} url={item.url} newTab={item.newTab === true} className="transition-colors hover:text-white">
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
    <div className={`flex flex-col gap-3 border-t border-white/5 pt-8 text-sm ${MUTED} md:flex-row md:items-center md:justify-between`}>
      <div>
        {text(c.logoText) && <div className="font-medium text-white">{text(c.logoText)}</div>}
        {text(c.tagline) && <div className="mt-1">{text(c.tagline)}</div>}
      </div>
      {text(c.copyright) && <div className="text-xs">{text(c.copyright)}</div>}
    </div>,
    { defaultPadding: [48, 48] },
  );
}

/* ----------------------------- hero ----------------------------- */
// Mirrors components/shared/HeroHeader.tsx.

function HeroSection(p: SectionProps) {
  const c: C = p.section.content ?? {};
  const split = layoutOf(p) === "split" && !!c.image;
  // "background": image fills the hero behind the copy instead of below it.
  const background = layoutOf(p) === "background" && !!c.image;
  const center = !split && layoutOf(p) !== "left";
  const Heading = p.isFirst ? "h1" : "h2";

  const copy = (
    <div className={`flex flex-col gap-6 ${center ? "mx-auto max-w-4xl items-center text-center" : ""}`}>
      {text(c.eyebrow) && (
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.12em] text-white/60 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            {text(c.eyebrow)}
          </span>
        </div>
      )}
      {text(c.heading) && <Heading className={H1_CLASS}>{text(c.heading)}</Heading>}
      {text(c.description) && (
        <p className={`max-w-2xl text-base leading-relaxed text-white/60 md:text-lg ${center ? "mx-auto" : ""}`}>{text(c.description)}</p>
      )}
      <div className="-mt-4">
        <ButtonRow {...c} center={center} />
      </div>
      {text(c.meta) && (
        <div className="flex items-center gap-2 text-sm text-white/50">
          <Star className="h-4 w-4 fill-current text-primary" />
          {text(c.meta)}
        </div>
      )}
    </div>
  );

  return shell(
    p,
    split ? (
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
        {copy}
        <div className="relative rounded-2xl border border-white/10 bg-white/5 p-2 shadow-2xl backdrop-blur-xl">
          <div className="pointer-events-none absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          <CmsImage src={c.image} alt={c.heading} className="w-full rounded-xl object-cover" />
        </div>
      </div>
    ) : (
      <>
        {copy}
        {c.image && !background ? (
          <div className="relative mx-auto mt-14 max-w-5xl rounded-2xl border border-white/10 bg-white/5 p-2 shadow-2xl backdrop-blur-xl">
            <CmsImage src={c.image} alt={c.heading} className="aspect-[16/9] w-full rounded-xl object-cover md:aspect-[21/9]" />
          </div>
        ) : null}
      </>
    ),
    {
      // <main> already offsets the fixed site nav (pt-[72px]).
      defaultPadding: [96, 96],
      // grid (not flex): the content wrapper must stretch to full width,
      // otherwise "full"-width content shrinks to fit and hugs the left edge.
      className: p.isFirst ? "grid min-h-[80vh] content-center" : "",
      backdrop: (
        <>
          {background && (
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <CmsImage src={c.image} alt="" className="h-full w-full object-cover opacity-40" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/70 via-[#050505]/60 to-[#050505]" />
            </div>
          )}
          <HeroBackdrop />
        </>
      ),
    },
  );
}

/* ----------------------------- text ----------------------------- */
// Mirrors components/shared/PageContent.tsx long-form content.

function TextSection(p: SectionProps) {
  const c: C = p.section.content ?? {};
  return shell(
    p,
    <>
      <SectionIntro heading={c.heading} />
      {text(c.body) && <div className={`space-y-5 whitespace-pre-line text-base leading-relaxed md:text-lg ${MUTED}`}>{text(c.body)}</div>}
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

const FRAME = "rounded-2xl border border-[var(--cms-border)] bg-[var(--cms-card)] p-2";

function ImageSection(p: SectionProps) {
  const c: C = p.section.content ?? {};
  return shell(
    p,
    <figure>
      <div className={FRAME}>
        <CmsImage src={c.image} alt={c.alt ?? c.caption} className="w-full rounded-xl object-cover" />
      </div>
      {text(c.caption) && <figcaption className={`mt-4 text-center text-sm ${MUTED}`}>{text(c.caption)}</figcaption>}
    </figure>,
  );
}

function ImageTextSection(p: SectionProps) {
  const c: C = p.section.content ?? {};
  const reverse = /left|reverse/i.test(layoutOf(p));
  return shell(
    p,
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
      <div className={reverse ? "lg:order-2" : ""}>
        <SectionIntro eyebrow={c.eyebrow} heading={c.heading} />
        <div className="-mt-6">
          <SafeHtml html={c.bodyHtml} />
        </div>
        <ButtonRow primaryLabel={c.primaryLabel} primaryUrl={c.primaryUrl} />
      </div>
      <div className={reverse ? "lg:order-1" : ""}>
        <div className={FRAME}>
          <CmsImage src={c.image} alt={c.alt ?? c.heading} className="w-full rounded-xl object-cover" />
        </div>
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
        <div className={`mx-auto max-w-5xl ${FRAME}`}>
          <div className="aspect-video overflow-hidden rounded-xl bg-black">
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
        </div>
      )}
    </>,
  );
}

/* ------------------------- list sections ------------------------- */
// Mirror FeatureGrid / RelatedServices in components/shared/IndustryServicePage.tsx.

function LearnMore({ url, label }: { url: unknown; label?: unknown }) {
  if (!safeUrl(url)) return null;
  return (
    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-white/60 transition-colors group-hover:text-primary">
      {text(label) || "Learn more"}
      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
    </span>
  );
}

function maybeLink(url: unknown, key: number, child: ReactNode) {
  return safeUrl(url) ? (
    <CmsLink key={key} url={url} className="block h-full">
      {child}
    </CmsLink>
  ) : (
    <div key={key} className="h-full">
      {child}
    </div>
  );
}

function CardsSection(p: SectionProps) {
  const c: C = p.section.content ?? {};
  return shell(
    p,
    <>
      <SectionIntro heading={c.heading} description={c.description} />
      <div className={`grid gap-5 md:gap-6 ${gridClass(p.section.settings?.columns, 3)}`}>
        {asItems(c.items).map((item, i) =>
          maybeLink(
            item.url,
            i,
            <Card className="h-full overflow-hidden !p-0">
              <CmsImage src={item.image} alt={item.title} className="aspect-[16/10] w-full object-cover" />
              <div className="flex flex-1 flex-col p-6 md:p-7">
                <h3 className={CARD_TITLE_CLASS}>{text(item.title)}</h3>
                {text(item.description) && <p className={`mt-3 flex-1 text-sm leading-relaxed md:text-base ${MUTED}`}>{text(item.description)}</p>}
                <LearnMore url={item.url} label={item.linkLabel} />
              </div>
            </Card>,
          ),
        )}
      </div>
    </>,
  );
}

function FeaturesSection(p: SectionProps) {
  const c: C = p.section.content ?? {};
  return shell(
    p,
    <>
      <SectionIntro eyebrow={c.eyebrow ?? "Features"} heading={c.heading} description={c.description} center />
      <div className={`grid gap-5 md:gap-6 ${gridClass(p.section.settings?.columns, 3)}`}>
        {asItems(c.items).map((item, i) => (
          <Card key={i} className="h-full">
            <CmsIcon icon={item.icon} />
            <CmsImage src={item.image} alt={item.title} className="mb-5 w-full rounded-xl object-cover" />
            <h3 className={`mb-3 ${CARD_TITLE_CLASS}`}>{text(item.title)}</h3>
            {text(item.description) && <p className={`text-sm leading-relaxed md:text-base ${MUTED}`}>{text(item.description)}</p>}
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
      <SectionIntro eyebrow={c.eyebrow ?? "Services"} heading={c.heading} description={c.description} />
      <div className={`grid gap-5 md:gap-6 ${gridClass(p.section.settings?.columns, 3)}`}>
        {asItems(c.items).map((item, i) =>
          maybeLink(
            item.url,
            i,
            <Card className="h-full">
              <div className="mb-3 flex items-start justify-between gap-4">
                <div>
                  <CmsIcon icon={item.icon} />
                  <h3 className="text-[15px] font-medium leading-[1.3] text-[var(--cms-fg)] transition-colors group-hover:text-primary md:text-base lg:text-lg">
                    {text(item.title)}
                  </h3>
                </div>
                {safeUrl(item.url) && (
                  <div className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full border border-white/10 bg-white/5">
                    <ChevronRight className="h-4 w-4 text-white/40 transition-colors group-hover:text-primary" />
                  </div>
                )}
              </div>
              {text(item.description) && <p className={`mt-2 flex-1 text-sm leading-relaxed ${MUTED}`}>{text(item.description)}</p>}
            </Card>,
          ),
        )}
      </div>
    </>,
  );
}

function BenefitsSection(p: SectionProps) {
  const c: C = p.section.content ?? {};
  return shell(
    p,
    <>
      <SectionIntro eyebrow={c.eyebrow} heading={c.heading} description={c.description} />
      <ul className={`grid gap-5 md:gap-6 ${gridClass(p.section.settings?.columns, 2)}`}>
        {asItems(c.items).map((item, i) => (
          <li key={i} className="flex gap-4 rounded-2xl border border-[var(--cms-border)] bg-[var(--cms-card)] p-5 transition-all duration-500 hover:border-white/15 hover:bg-white/[0.04] md:p-6">
            <span aria-hidden className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
              <Check className="h-4 w-4" />
            </span>
            <div>
              <h3 className="font-medium text-[var(--cms-fg)] md:text-lg">{text(item.title)}</h3>
              {text(item.description) && <p className={`mt-1.5 text-sm leading-relaxed md:text-base ${MUTED}`}>{text(item.description)}</p>}
            </div>
          </li>
        ))}
      </ul>
    </>,
  );
}

// Mirrors ProcessSteps.
function ProcessSection(p: SectionProps) {
  const c: C = p.section.content ?? {};
  const items = asItems(c.items);
  return shell(
    p,
    <>
      <SectionIntro eyebrow={c.eyebrow ?? "Process"} heading={c.heading} description={c.description} center />
      <ol className="mx-auto max-w-5xl space-y-8 md:space-y-12">
        {items.map((item, i) => (
          <li key={i} className="relative flex flex-col gap-6 md:flex-row md:items-center md:gap-12">
            <div className="relative flex-shrink-0 md:w-[120px] md:flex md:justify-end">
              <div className="relative z-10 grid h-16 w-16 place-items-center rounded-2xl border border-primary/30 bg-primary/10 text-primary">
                <span className="text-2xl font-medium tracking-tight md:text-3xl">{String(i + 1).padStart(2, "0")}</span>
              </div>
            </div>
            <div className="flex-1 md:border-l md:border-[var(--cms-border)] md:pl-12">
              <h3 className="text-chrome mb-3 text-xl font-medium leading-[1.1] tracking-tight md:text-2xl lg:text-3xl">{text(item.title)}</h3>
              {text(item.description) && <p className={`text-base leading-relaxed md:text-lg ${MUTED}`}>{text(item.description)}</p>}
            </div>
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
      <SectionIntro eyebrow={c.eyebrow} heading={c.heading} description={c.description} />
      <ol className="relative space-y-10 border-l border-[var(--cms-border)] pl-8">
        {asItems(c.items).map((item, i) => (
          <li key={i} className="relative">
            <span aria-hidden className="absolute -left-[38px] top-1.5 h-3.5 w-3.5 rounded-full border border-primary/40 bg-primary/20 ring-4 ring-[#050505]" />
            {text(item.date) && <div className={`text-[10px] uppercase tracking-[0.3em] ${MUTED}`}>{text(item.date)}</div>}
            <h3 className="mt-2 text-xl font-medium text-[var(--cms-fg)]">{text(item.title)}</h3>
            {text(item.description) && <p className={`mt-2 leading-relaxed ${MUTED}`}>{text(item.description)}</p>}
          </li>
        ))}
      </ol>
    </>,
    { defaultWidth: "narrow" },
  );
}

// Mirrors TestimonialCarousel's card.
function TestimonialsSection(p: SectionProps) {
  const c: C = p.section.content ?? {};
  return shell(
    p,
    <>
      <SectionIntro eyebrow={c.eyebrow ?? "Testimonials"} heading={c.heading} center />
      <div className={`grid gap-5 md:gap-6 ${gridClass(p.section.settings?.columns, 3)}`}>
        {asItems(c.items).map((item, i) => {
          const rating = Math.max(1, Math.min(5, Math.round(Number(item.rating)) || 5));
          return (
            <Card key={i} className="h-full bg-gradient-to-br from-white/[0.04] to-white/[0.01] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)]">
              <div className="mb-5 flex gap-1">
                {Array.from({ length: rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <blockquote className="flex-1 text-base font-medium leading-relaxed text-white/70 md:text-lg">“{text(item.quote)}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <CmsImage src={item.image} alt={item.name} className="h-11 w-11 rounded-full border border-white/10 object-cover" />
                <div>
                  <div className="font-medium text-white">{text(item.name)}</div>
                  {text(item.role) && <div className="text-sm text-white/50">{text(item.role)}</div>}
                </div>
              </figcaption>
            </Card>
          );
        })}
      </div>
    </>,
  );
}

function TeamSection(p: SectionProps) {
  const c: C = p.section.content ?? {};
  return shell(
    p,
    <>
      <SectionIntro eyebrow={c.eyebrow} heading={c.heading} description={c.description} />
      <div className={`grid gap-5 md:gap-6 ${gridClass(p.section.settings?.columns, 4)}`}>
        {asItems(c.items).map((item, i) => (
          <Card key={i} className="h-full overflow-hidden !p-0">
            <CmsImage src={item.image} alt={item.name} className="aspect-square w-full object-cover grayscale transition duration-500 group-hover:grayscale-0" />
            <div className="p-6">
              <h3 className="text-lg font-medium text-[var(--cms-fg)]">{text(item.name)}</h3>
              {text(item.role) && <div className={`mt-1 text-[10px] uppercase tracking-[0.3em] ${MUTED}`}>{text(item.role)}</div>}
              {text(item.bio) && <p className={`mt-3 text-sm leading-relaxed ${MUTED}`}>{text(item.bio)}</p>}
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
      <SectionIntro eyebrow={c.eyebrow ?? "Pricing"} heading={c.heading} description={c.description} center />
      <div className={`grid gap-5 md:gap-6 ${gridClass(p.section.settings?.columns, 3)}`}>
        {asItems(c.items).map((item, i) => (
          <Card
            key={i}
            className={`h-full ${item.featured ? "border-primary/30 bg-gradient-to-br from-primary/[0.08] via-white/[0.02] to-transparent" : ""}`}
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-medium text-[var(--cms-fg)]">{text(item.name)}</h3>
              {item.featured && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-primary">
                  Popular
                </span>
              )}
            </div>
            <div className="mt-5 flex items-baseline gap-1">
              <span className="text-4xl font-light leading-[1.1] text-white md:text-5xl">{text(item.price)}</span>
              {text(item.period) && <span className="text-sm text-white/40">/{text(item.period)}</span>}
            </div>
            {text(item.description) && <p className={`mt-3 text-sm ${MUTED}`}>{text(item.description)}</p>}
            <ul className="mt-6 flex-1 space-y-3 text-sm text-white/70">
              {featureList(item.features).map((f, j) => (
                <li key={j} className="flex gap-2.5">
                  <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
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

// Mirrors FAQSection.
function FaqSection(p: SectionProps) {
  const c: C = p.section.content ?? {};
  const faqs = asItems(c.items)
    .map((item) => ({ question: text(item.question), answer: text(item.answer) }))
    .filter((f) => f.question);
  return shell(
    p,
    <>
      <SectionIntro
        eyebrow={c.eyebrow ?? "Support"}
        heading={text(c.heading) || "Frequently Asked Questions"}
        description={c.description}
        center
      />
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
      <SectionIntro eyebrow={c.eyebrow} heading={c.heading} description={c.description} />
      <div className={`grid gap-4 md:gap-5 ${gridClass(p.section.settings?.columns, 3)}`}>
        {asItems(c.items).map((item, i) => (
          <figure key={i} className="group">
            <div className="overflow-hidden rounded-2xl border border-[var(--cms-border)]">
              <CmsImage src={item.image} alt={item.caption} className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105" />
            </div>
            {text(item.caption) && <figcaption className={`mt-3 text-sm ${MUTED}`}>{text(item.caption)}</figcaption>}
          </figure>
        ))}
      </div>
    </>,
  );
}

// Mirrors StatsBar.
function StatsSection(p: SectionProps) {
  const c: C = p.section.content ?? {};
  return shell(
    p,
    <>
      <SectionIntro eyebrow={c.eyebrow} heading={c.heading} description={c.description} center />
      <dl className={`grid gap-4 md:gap-6 ${gridClass(p.section.settings?.columns, 4)}`}>
        {asItems(c.items).map((item, i) => (
          <div
            key={i}
            className="group relative flex flex-col rounded-2xl border border-white/5 bg-white/[0.02] p-6 text-center transition-all hover:border-white/10 hover:bg-white/[0.04] md:p-8"
          >
            <dt className="order-2 mt-2 text-[10px] font-medium uppercase tracking-[0.3em] text-white/30">{text(item.label)}</dt>
            <dd className="text-3xl font-light leading-[1.1] text-white md:text-4xl lg:text-5xl">{text(item.value)}</dd>
            <div className="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-primary transition-all duration-500 group-hover:w-3/4" />
          </div>
        ))}
      </dl>
    </>,
    { defaultPadding: [64, 64], className: "border-y border-white/5" },
  );
}

function LogosSection(p: SectionProps) {
  const c: C = p.section.content ?? {};
  return shell(
    p,
    <>
      {text(c.heading) && (
        <div className="mb-10 text-center">
          <Eyebrow center>{text(c.heading)}</Eyebrow>
        </div>
      )}
      <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
        {asItems(c.items).map((item, i) => {
          const logo = (
            <CmsImage
              src={item.image}
              alt={item.name}
              className="h-10 w-auto max-w-[160px] object-contain opacity-50 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0"
            />
          );
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
    { defaultPadding: [64, 64], className: "border-y border-white/5" },
  );
}

/* ---------------------------- actions ---------------------------- */

// Mirrors CTASection.
function CtaSection(p: SectionProps) {
  const c: C = p.section.content ?? {};
  return shell(
    p,
    <GlowPanel className="text-center">
      <div className="mb-6 flex items-center justify-center gap-2">
        <Sparkles className="h-5 w-5 text-primary/60" />
        <span className="text-[10px] uppercase tracking-[0.4em] text-white/40">{text(c.eyebrow) || "Connect"}</span>
      </div>
      {text(c.heading) && (
        <h2 className="text-chrome mx-auto max-w-3xl text-2xl font-medium leading-[1.05] tracking-[-0.02em] md:text-4xl lg:text-5xl xl:text-6xl">
          {text(c.heading)}
        </h2>
      )}
      {text(c.description) && <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/50 md:text-base">{text(c.description)}</p>}
      <ButtonRow {...c} center />
    </GlowPanel>,
  );
}

const INPUT =
  "h-12 w-full rounded-[13px] border border-white/[0.12] bg-black/30 px-4 text-sm text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.025)] outline-none transition duration-200 placeholder:text-white/30 hover:border-white/20 focus:border-white/40 focus:bg-black/45 focus:ring-2 focus:ring-white/[0.07]";
const SUBMIT =
  "inline-flex h-12 items-center justify-center gap-2 rounded-full bg-chrome px-7 text-sm font-medium tracking-wide text-[#050505] transition-shadow duration-500 hover:shadow-[0_20px_60px_-15px_rgba(232,237,242,0.45)]";

function ContactDetail({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex items-start gap-4">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-primary">{icon}</span>
      <div>
        <dt className="text-[10px] uppercase tracking-[0.3em] text-white/40">{label}</dt>
        <dd className="mt-1 text-white/80">{children}</dd>
      </div>
    </div>
  );
}

// Uses the site's own ContactForm (posts to /api/contact → CRM) unless the
// ERP explicitly points the form somewhere else.
function ContactSection(p: SectionProps) {
  const c: C = p.section.content ?? {};
  const action = safeUrl(c.formAction);
  const email = text(c.email);
  const phone = text(c.phone);
  return shell(
    p,
    <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
      <div>
        <SectionIntro eyebrow={c.eyebrow ?? "Contact"} heading={c.heading} description={c.description} />
        <dl className="space-y-5 text-sm">
          {email && (
            <ContactDetail icon={<Mail className="h-4 w-4" />} label="Email">
              <CmsLink url={`mailto:${email}`} className="transition-colors hover:text-white">{email}</CmsLink>
            </ContactDetail>
          )}
          {phone && (
            <ContactDetail icon={<Phone className="h-4 w-4" />} label="Phone">
              <CmsLink url={`tel:${phone.replace(/[^\d+]/g, "")}`} className="transition-colors hover:text-white">{phone}</CmsLink>
            </ContactDetail>
          )}
          {text(c.address) && (
            <ContactDetail icon={<MapPin className="h-4 w-4" />} label="Address">
              <span className="whitespace-pre-line">{text(c.address)}</span>
            </ContactDetail>
          )}
        </dl>
        <CmsImage src={c.image} alt={c.heading} className="mt-10 w-full rounded-2xl border border-white/10 object-cover" />
      </div>
      <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-white/20 md:p-8">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="pointer-events-none absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        <div className="relative">
          {action ? (
            <form action={action} method="post" className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input name="name" required placeholder="Name" className={INPUT} autoComplete="name" />
                <input name="email" type="email" required placeholder="Email" className={INPUT} autoComplete="email" />
              </div>
              <input name="phone" type="tel" placeholder="Phone" className={INPUT} autoComplete="tel" />
              <textarea name="message" required rows={5} placeholder="How can we help?" className={`${INPUT} h-auto min-h-36 py-3`} />
              <button type="submit" className={SUBMIT}>
                {text(c.buttonLabel) || "Send message"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          ) : (
            <ContactForm compact />
          )}
        </div>
      </div>
    </div>,
  );
}

function NewsletterSection(p: SectionProps) {
  const c: C = p.section.content ?? {};
  const action = safeUrl(c.formAction);
  return shell(
    p,
    <GlowPanel className="text-center">
      <SectionIntro eyebrow={c.eyebrow ?? "Newsletter"} heading={c.heading} description={c.description} center />
      {action && (
        <form action={action} method="post" className="mx-auto -mt-4 flex max-w-md flex-col gap-3 sm:flex-row">
          <input name="email" type="email" required placeholder="you@company.com" className={`${INPUT} rounded-full`} autoComplete="email" />
          <button type="submit" className={`${SUBMIT} shrink-0`}>
            {text(c.buttonLabel) || "Subscribe"}
          </button>
        </form>
      )}
    </GlowPanel>,
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
    <div className={`grid gap-5 md:gap-6 ${gridClass(columns, 3)}`}>
      {items.map((post, i) => (
        <CmsLink key={i} url={post.url} className="block h-full">
          <Card className="h-full overflow-hidden !p-0">
            <div className="overflow-hidden">
              <CmsImage src={post.image} alt={post.title} className="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-105" />
            </div>
            <div className="flex flex-1 flex-col p-6 md:p-7">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-base font-medium leading-[1.3] text-white transition-colors group-hover:text-primary md:text-lg">{post.title}</h3>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-white/40 transition-colors group-hover:text-primary" />
              </div>
              {post.description && <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-white/45">{post.description}</p>}
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
      <SectionIntro eyebrow={c.eyebrow ?? "Insights"} heading={c.heading} description={c.description} />
      <PostsGrid items={resolvePosts(c, p.posts)} columns={p.section.settings?.columns} />
    </>,
  );
}

// Mirrors RelatedServices' heading row.
function RelatedPostsSection(p: SectionProps) {
  const c: C = p.section.content ?? {};
  return shell(
    p,
    <>
      {text(c.heading) && (
        <div className="mb-12 flex items-center gap-3">
          <h2 className="text-chrome text-xl font-medium tracking-tight md:text-2xl lg:text-3xl">{text(c.heading)}</h2>
          <div className="h-px max-w-md flex-1 bg-gradient-to-r from-white/10 to-transparent" />
        </div>
      )}
      <PostsGrid items={resolvePosts(c, p.posts)} columns={p.section.settings?.columns} />
    </>,
    { className: "border-t border-white/[0.04]" },
  );
}

function AuthorSection(p: SectionProps) {
  const c: C = p.section.content ?? {};
  return shell(
    p,
    <>
      <SectionIntro heading={c.heading} />
      <Card hover={false}>
        <div className="flex flex-col gap-6 sm:flex-row">
          <CmsImage src={c.image} alt={c.name} className="h-24 w-24 shrink-0 rounded-full border border-white/10 object-cover" />
          <div>
            <div className="text-lg font-medium text-white">{text(c.name)}</div>
            {text(c.role) && <div className="mt-1 text-[10px] uppercase tracking-[0.3em] text-white/40">{text(c.role)}</div>}
            <SafeHtml html={c.bioHtml} className="mt-4 text-sm" />
          </div>
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
