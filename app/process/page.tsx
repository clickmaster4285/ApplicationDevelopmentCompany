import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { canonicalUrl } from "@/lib/site";
import { PROCESS_STEPS } from "@/lib/process-steps";
import { withEditedSeo } from "@/lib/cms/metadata";

const title = "Our Application Development Process | ClickMasters";
const description =
  "How ClickMasters delivers applications: discovery, UI/UX design, development, QA testing, deployment, and long-term maintenance — the same process for every client, wherever you are.";

const baseMetadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: canonicalUrl("/process"),
  },
  openGraph: {
    title,
    description,
    url: canonicalUrl("/process"),
    type: "website",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withEditedSeo("/process", baseMetadata);
}

const phaseDetails: Record<string, string[]> = {
  "Discovery & Planning": [
    "Goals, users, and success criteria agreed in writing",
    "Feature list prioritized into a realistic first release",
    "Technical approach, integrations, and risks identified early",
  ],
  "UI/UX Design & Prototyping": [
    "User journeys mapped before any screen is designed",
    "Clickable prototypes you can review with real users",
    "Design approved before development starts",
  ],
  "Application Development": [
    "Work delivered in milestones you can see and test",
    "Regular progress updates and demos",
    "Code you own, built on suitable, well-supported technologies",
  ],
  "Quality Assurance & Testing": [
    "Functional, usability, and compatibility testing",
    "Performance and security checks before launch",
    "Issues tracked and fixed before go-live",
  ],
  Deployment: [
    "Production environment, app store, or platform setup",
    "Launch checklist and monitoring in place",
    "Handover documentation for your team",
  ],
  "Maintenance & Improvement": [
    "Bug fixes, updates, and security patches",
    "Performance improvements as usage grows",
    "New features planned with you over time",
  ],
};

const nextSteps = [
  { href: "/services", label: "Application development services" },
  { href: "/solutions", label: "Application solutions" },
  { href: "/industries", label: "Industries we serve" },
  { href: "/resources", label: "Guides and resources" },
];

export default function ProcessPage() {
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "ClickMasters application development process",
    description,
    step: PROCESS_STEPS.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.desc,
    })),
  };

  return (
    <main className="min-h-screen bg-[#050505] px-6 pb-24 pt-32 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-white/40">
          How we deliver
        </p>
        <h1 className="text-4xl font-medium tracking-tight md:text-6xl">
          Our Application Development Process
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
          Every project follows the same six phases, whether you are down the
          street or across the country. You always know what stage your
          application is in, what is being delivered, and what comes next.
        </p>

        <ol className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PROCESS_STEPS.map((step, index) => (
            <li
              key={step.title}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-7"
            >
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                Phase {String(index + 1).padStart(2, "0")}
              </div>
              <h2 className="mt-3 text-xl font-medium tracking-tight text-white md:text-2xl">
                {step.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                {step.desc}
              </p>
              {phaseDetails[step.title] ? (
                <ul className="mt-5 space-y-2 border-t border-white/[0.06] pt-5 text-sm text-white/55">
                  {phaseDetails[step.title].map((item) => (
                    <li key={item} className="flex gap-2">
                      <span aria-hidden className="text-white/30">
                        —
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ol>

        <section className="mt-20 rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-12">
          <h2 className="text-2xl font-medium tracking-tight md:text-4xl">
            Ready to start with discovery?
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-white/60">
            Tell us about your idea or the system you want to improve. We will
            review your goals and recommend the right next step, even if that
            means not building anything yet.
          </p>
          <Link
            href="/contact"
            className="group mt-8 inline-flex items-center gap-3 rounded-full border border-white/20 px-6 py-3 text-xs uppercase tracking-[0.25em] text-white/80 transition-colors hover:border-white/40 hover:text-white"
          >
            Start your project
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </section>

        <nav aria-label="Explore more" className="mt-16">
          <h2 className="mb-4 text-[10px] uppercase tracking-[0.3em] text-white/40">
            Explore more
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {nextSteps.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-xl border border-white/10 p-5 text-white/80 transition-colors hover:border-white/30 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </main>
  );
}
