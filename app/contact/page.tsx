import type { Metadata } from "next";
import { ArrowDownRight, ArrowUpRight, Clock3, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { canonicalUrl } from "@/lib/site";
import { ContactForm } from "./contact-form";

const pageTitle = "Contact ClickMasters | Start a Project";
const pageDescription =
  "Tell ClickMasters about your application idea. Our team will review your requirements and get back to you about the next steps.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: canonicalUrl("/contact"),
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    type: "website",
    url: canonicalUrl("/contact"),
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

const steps = [
  { number: "01", title: "Tell us what you have in mind" },
  { number: "02", title: "We review your goals and requirements" },
  { number: "03", title: "We get back to you with next steps" },
];

const inquiryTypes = [
  {
    title: "New application projects",
    body: "Planning a mobile app, web application, SaaS product, or internal business system? Tell us who will use it, the problem it should solve, and any deadline or budget range you are working with.",
    link: { label: "Explore our services", href: "/services" },
  },
  {
    title: "Improving an existing product",
    body: "If you already have software that is slow, hard to maintain, or missing key features, share what it is built with and where it falls short. We can review the current state before recommending changes.",
    link: { label: "See our case studies", href: "/case-studies" },
  },
  {
    title: "Maintenance and support",
    body: "Need ongoing updates, bug fixes, monitoring, or help after launch? Describe the application, how it is hosted, and the issues you are seeing so we can point you to the right support option.",
    link: { label: "Maintenance and support services", href: "/services/software-maintenance-support" },
  },
  {
    title: "Partnerships and general questions",
    body: "For agency partnerships, vendor questions, or anything else, email our team with a short summary and we will route your message to the right person.",
    link: { label: "Email our team", href: "mailto:sales@clickmastersapplicationdevelopment.com" },
  },
];

const expectations = [
  {
    title: "A reply within 24 hours",
    body: "Every inquiry is read by a member of our team, and we aim to respond within 24 hours with questions or suggested next steps.",
  },
  {
    title: "An NDA when you need one",
    body: "If your idea is confidential, let us know. We are happy to sign a non-disclosure agreement before discussing detailed requirements.",
  },
  {
    title: "A clear, free quote",
    body: "Once we understand your scope, we prepare a free quote that sets out what is included, the milestones, and the expected timeline.",
  },
];

export default function ContactPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#050505] pb-20 pt-28 text-white md:pb-24 md:pt-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[760px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(226,232,240,0.15),transparent_58%)] motion-safe:animate-pulse-slow"
      />
      <div className="mx-auto w-[min(1240px,90vw)]">
        <div className="grid items-start gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16 xl:gap-20">
          <aside className="space-y-9 lg:sticky lg:top-28">
            <div className="max-w-xl">
              <div className="mb-7 inline-flex animate-in fade-in slide-in-from-bottom-2 duration-700 items-center gap-3 rounded-full border border-white/[0.12] bg-white/[0.045] px-4 py-2 text-[10px] font-medium uppercase tracking-[0.3em] text-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm motion-reduce:animate-none">
                <span className="h-1.5 w-1.5 rounded-full bg-[#e5e9ed] shadow-[0_0_14px_rgba(229,233,237,0.75)]" />
                Start a project
              </div>
              <h1 className="animate-in fade-in duration-1000 delay-100 text-[clamp(3rem,5.2vw,5.5rem)] font-medium leading-[0.94] tracking-[-0.06em] motion-reduce:animate-none">
                <span className="bg-gradient-to-b from-white via-[#d9dde2] to-[#777d85] bg-clip-text text-transparent">
                  Let&rsquo;s make
                  <br />
                  it real.
                </span>
              </h1>
              <p className="mt-7 max-w-lg animate-in fade-in slide-in-from-bottom-2 duration-700 delay-200 text-[15px] leading-7 tracking-[0.005em] text-white/60 md:text-base motion-reduce:animate-none">
                Have an application idea, a system that needs improving, or a
                product ready to grow? Share a little about it and we&rsquo;ll
                help you work out the right next step.
              </p>
            </div>

            <div>
              <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.32em] text-white/40">
                A straightforward start
              </p>
              <ol className="animate-in fade-in slide-in-from-bottom-2 duration-700 delay-300 space-y-4 motion-reduce:animate-none">
                {steps.map((step) => (
                  <li key={step.number} className="flex items-center gap-4 transition-transform duration-200 hover:translate-x-1">
                    <span className="font-mono text-[11px] tracking-[0.08em] text-white/40">{step.number}</span>
                    <span className="h-px w-8 bg-gradient-to-r from-white/25 to-white/10" />
                    <span className="text-[13px] leading-5 text-white/75">{step.title}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <a
                href="mailto:sales@clickmastersapplicationdevelopment.com"
                className="group animate-in fade-in slide-in-from-bottom-2 duration-700 delay-300 rounded-[20px] border border-white/[0.11] bg-gradient-to-br from-white/[0.055] to-white/[0.02] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:from-white/[0.08] hover:to-white/[0.03] motion-reduce:animate-none"
              >
                <div className="mb-5 flex items-center justify-between">
                  <Mail className="h-[17px] w-[17px] text-white/70" strokeWidth={1.6} />
                  <ArrowUpRight className="h-4 w-4 text-white/35 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/80" />
                </div>
                <p className="text-[10px] font-medium uppercase tracking-[0.27em] text-white/40">Email us</p>
                <p className="mt-2 break-all text-[13px] leading-5 text-white/85">sales@clickmastersapplicationdevelopment.com</p>
              </a>
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-700 delay-500 rounded-[20px] border border-white/[0.11] bg-gradient-to-br from-white/[0.055] to-white/[0.02] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] motion-reduce:animate-none">
                <div className="mb-5 flex items-center justify-between">
                  <MapPin className="h-[17px] w-[17px] text-white/70" strokeWidth={1.6} />
                  <Clock3 className="h-4 w-4 text-white/35" strokeWidth={1.6} />
                </div>
                <p className="text-[10px] font-medium uppercase tracking-[0.27em] text-white/40">Based in</p>
                <p className="mt-2 text-[13px] leading-5 text-white/85">San Francisco · Remote</p>
                <div className="mt-4 space-y-2 border-t border-white/[0.08] pt-3">
                  <p className="flex items-center gap-2.5 text-[13px] leading-5 text-white/75">
                    <Phone className="h-3.5 w-3.5 shrink-0 text-white/45" strokeWidth={1.7} />
                    +44 7988 576086
                  </p>
                  <p className="flex items-center gap-2.5 text-[13px] leading-5 text-white/75">
                    <Phone className="h-3.5 w-3.5 shrink-0 text-white/45" strokeWidth={1.7} />
                    +1 325 202 4074
                  </p>
                </div>
              </div>
            </div>

            <div className="hidden border-t border-white/[0.1] pt-4 text-xs leading-6 text-white/45 lg:block">
              Have a quick question? Send us an email and our team will point you
              in the right direction.
              <ArrowDownRight className="mt-4 h-5 w-5 text-white/55" />
            </div>
          </aside>

          <section className="relative isolate overflow-hidden rounded-[30px] border border-white/[0.13] bg-[linear-gradient(145deg,rgba(255,255,255,0.085),rgba(255,255,255,0.035)_42%,rgba(255,255,255,0.018))] p-5 shadow-[0_36px_100px_-48px_rgba(220,226,232,0.32),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl animate-in fade-in slide-in-from-bottom-3 duration-700 delay-150 motion-reduce:animate-none sm:rounded-[32px] sm:p-8 md:p-9 before:pointer-events-none before:absolute before:inset-x-10 before:top-0 before:-z-10 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/50 before:to-transparent">
            <div className="mb-7 flex items-start justify-between gap-5">
              <div>
                <h2 className="text-[1.65rem] font-medium tracking-[-0.035em] text-white md:text-[1.85rem]">Tell us about your project</h2>
                <p className="mt-2 text-sm leading-6 text-white/50">A few details are all we need to get started.</p>
              </div>
              <span className="hidden rounded-full border border-white/[0.12] bg-black/20 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-white/45 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:inline-flex">01 / 01</span>
            </div>
            <ContactForm />
          </section>
        </div>

        <section aria-labelledby="inquiry-types-heading" className="mt-20 border-t border-white/[0.1] pt-14 md:mt-24 md:pt-16">
          <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.32em] text-white/40">How we can help</p>
          <h2 id="inquiry-types-heading" className="max-w-2xl text-[1.65rem] font-medium tracking-[-0.035em] text-white md:text-[2rem]">
            Choose the reason you are getting in touch
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-white/60">
            Including the right details in your message helps us give you a useful answer in our first reply.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {inquiryTypes.map((item) => (
              <div
                key={item.title}
                className="rounded-[20px] border border-white/[0.11] bg-gradient-to-br from-white/[0.055] to-white/[0.02] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
              >
                <h3 className="text-base font-medium tracking-[-0.01em] text-white/90">{item.title}</h3>
                <p className="mt-3 text-[13px] leading-6 text-white/60">{item.body}</p>
                <Link
                  href={item.link.href}
                  className="group mt-5 inline-flex items-center gap-2 text-[12px] font-medium text-white/75 transition-colors hover:text-white"
                >
                  {item.link.label}
                  <ArrowUpRight className="h-3.5 w-3.5 text-white/45 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/80" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="expectations-heading" className="mt-16 md:mt-20">
          <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.32em] text-white/40">What to expect</p>
          <h2 id="expectations-heading" className="max-w-2xl text-[1.65rem] font-medium tracking-[-0.035em] text-white md:text-[2rem]">
            What happens after you contact us
          </h2>
          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            {expectations.map((item, index) => (
              <li key={item.title} className="border-t border-white/[0.12] pt-5">
                <span className="font-mono text-[11px] tracking-[0.08em] text-white/40">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-base font-medium tracking-[-0.01em] text-white/90">{item.title}</h3>
                <p className="mt-3 text-[13px] leading-6 text-white/60">{item.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section
          aria-labelledby="contact-cta-heading"
          className="mt-16 flex flex-col gap-6 rounded-[24px] border border-white/[0.11] bg-gradient-to-br from-white/[0.055] to-white/[0.02] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:p-8 md:mt-20 md:flex-row md:items-center md:justify-between"
        >
          <div className="max-w-xl">
            <h2 id="contact-cta-heading" className="text-xl font-medium tracking-[-0.02em] text-white md:text-2xl">
              Ready to talk about your project?
            </h2>
            <p className="mt-3 text-[13px] leading-6 text-white/60">
              Send your project details through the form above, email{" "}
              <a href="mailto:sales@clickmastersapplicationdevelopment.com" className="break-all text-white/85 underline-offset-4 hover:underline">
                sales@clickmastersapplicationdevelopment.com
              </a>
              , or call us on +1 325 202 4074 (US) or +44 7988 576086 (UK). Want to see how we work first? Read about{" "}
              <Link href="/process" className="text-white/85 underline-offset-4 hover:underline">
                our development process
              </Link>
              .
            </p>
          </div>
          <a
            href="mailto:sales@clickmastersapplicationdevelopment.com"
            className="group inline-flex h-12 shrink-0 items-center justify-center gap-3 rounded-full border border-white/35 bg-gradient-to-r from-white via-[#e1e5e9] to-[#aab0b8] px-7 text-sm font-semibold text-[#080808] shadow-[0_8px_28px_-14px_rgba(255,255,255,0.65),inset_0_1px_0_rgba(255,255,255,0.9)] transition duration-300 hover:-translate-y-0.5 hover:brightness-105"
          >
            Email our team
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </section>
      </div>
    </main>
  );
}
