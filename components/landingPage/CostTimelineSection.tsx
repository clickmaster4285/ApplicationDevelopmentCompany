import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const costFactors = [
  "Application type",
  "Number and complexity of features",
  "UI/UX requirements",
  "User roles",
  "Third-party integrations",
  "Backend requirements",
  "Security needs",
  "Technology choices",
  "Testing requirements",
  "Deployment",
  "Ongoing maintenance",
];

export function CostTimelineSection() {
  return (
    <section className="relative py-32 md:py-40 border-t border-white/5">
      <div className="mx-auto w-[85vw] px-6">
        <div className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-5">
          — Cost &amp; Timeline
        </div>
        <h2 className="text-chrome text-5xl md:text-7xl font-medium leading-[1.02] tracking-[-0.03em] max-w-3xl mb-16">
          App development cost &amp; timeline, explained.
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Cost */}
          <div>
            <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-white">
              How much does app development cost?
            </h3>
            <p className="mt-5 text-white/55 leading-relaxed">
              There is no single price for every application because
              development cost depends on the project.
            </p>
            <p className="mt-4 text-sm uppercase tracking-[0.2em] text-white/40">
              The main cost factors include:
            </p>

            <div className="mt-5 flex flex-wrap gap-2.5">
              {costFactors.map((factor) => (
                <span
                  key={factor}
                  className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-gradient-to-b from-[#161616] to-[#0a0a0a] px-4 py-2 text-xs text-white/70 transition-colors duration-300 hover:text-white hover:border-white/20"
                >
                  <span className="h-1.5 w-1.5 rotate-45 bg-chrome opacity-70" />
                  {factor}
                </span>
              ))}
            </div>

            <p className="mt-8 text-white/55 leading-relaxed">
              A simple application with a limited feature set will normally
              require less work than a large platform with multiple user types,
              integrations, advanced security, and complex business logic.
            </p>
            <p className="mt-4 text-white/55 leading-relaxed">
              The best way to understand your budget is to first define the
              project scope.
            </p>

            <Link
              href="/cost/app-development-cost/"
              className="group mt-8 inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-white/70 hover:text-white transition-colors"
            >
              Request an App Development Estimate
              <ArrowUpRight className="h-4 w-4 text-chrome transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Timeline */}
          <div className="lg:pl-16 lg:border-l lg:border-white/5">
            <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-white">
              How long does app development take?
            </h3>
            <p className="mt-5 text-white/55 leading-relaxed">
              The development timeline depends on the size and complexity of
              your application.
            </p>
            <p className="mt-4 text-white/55 leading-relaxed">
              A focused MVP may require a shorter development cycle, while a
              larger business or enterprise application may need more time for
              planning, design, development, integrations, testing, and
              deployment.
            </p>
            <p className="mt-4 text-white/55 leading-relaxed">
              We define the project stages before development so you have a
              clearer understanding of what needs to be built and how the
              project will move forward.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}