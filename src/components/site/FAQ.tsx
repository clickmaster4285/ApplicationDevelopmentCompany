import { useState } from "react";
import { Plus } from "lucide-react";

const faqs = [
  { q: "What kinds of products do you build?", a: "Native and cross-platform mobile applications, SaaS platforms, enterprise web systems, internal tools and API platforms. We specialize in 0→1 launches and complex re-platforming work." },
  { q: "How do engagements typically work?", a: "We begin with a discovery sprint to align on strategy, scope and architecture, then move into design and development cycles with weekly demos and a transparent roadmap." },
  { q: "What is your typical timeline?", a: "Most production launches ship in 8–16 weeks, depending on scope. Discovery sprints can be as fast as one week." },
  { q: "Do you support products after launch?", a: "Yes. Every engagement can transition into a dedicated support partnership including monitoring, performance tuning and continuous feature development." },
  { q: "What technologies do you specialize in?", a: "React, Next.js, TypeScript, Node.js, React Native, Flutter, Swift, Kotlin, GraphQL, Postgres, AWS and Firebase — chosen per project for longevity and fit." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative py-32 md:py-40 border-t border-white/5">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-5 text-center">— FAQ</div>
        <h2 className="text-chrome text-center text-5xl md:text-6xl font-medium tracking-[-0.03em] leading-[1.02] mb-16">
          Answers to common questions.
        </h2>
        <div className="divide-y divide-white/5 border-y border-white/5">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <button
                key={i}
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full text-left py-7 flex flex-col group"
              >
                <div className="flex items-center justify-between gap-6">
                  <span className="text-lg md:text-xl text-white font-medium tracking-tight">{f.q}</span>
                  <span
                    className={`flex-shrink-0 h-9 w-9 rounded-full border border-white/15 bg-gradient-to-b from-white/[0.06] to-transparent grid place-items-center transition-transform duration-500 ${
                      isOpen ? "rotate-45 bg-chrome border-transparent" : ""
                    }`}
                  >
                    <Plus className={`h-4 w-4 transition-colors ${isOpen ? "text-[#050505]" : "text-chrome"}`} />
                  </span>
                </div>
                <div
                  className="grid transition-all duration-500 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="pt-5 pr-16 text-white/55 leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
