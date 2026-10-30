import type { Metadata } from "next";
import { ArrowDownRight, ArrowUpRight, Clock3, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact ClickMasters | Start a Project",
  description:
    "Tell ClickMasters about your application idea. Our team will review your requirements and get back to you about the next steps.",
};

const steps = [
  { number: "01", title: "Tell us what you have in mind" },
  { number: "02", title: "We review your goals and requirements" },
  { number: "03", title: "We get back to you with next steps" },
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
              <h1 className="animate-in fade-in duration-1000 delay-100 text-[clamp(3.25rem,5.7vw,5.9rem)] font-medium leading-[0.88] tracking-[-0.072em] motion-reduce:animate-none">
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
      </div>
    </main>
  );
}
