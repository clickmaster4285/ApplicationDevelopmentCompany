import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const industries = [
  "Healthcare",
  "Finance",
  "Retail",
  "E-Commerce",
  "Logistics",
  "Manufacturing",
  "Education",
  "Real Estate",
  "Travel",
  "Automotive",
  "Professional Services",
];

export function IndustrySection() {
  return (
    <section className="relative py-32 md:py-40 border-t border-white/5 overflow-hidden">
      <div className="mx-auto w-[85vw] px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div>
            <div className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-5">
              — Industries We Serve
            </div>
            <h2 className="text-chrome text-5xl md:text-7xl font-medium leading-[1.02] tracking-[-0.03em] max-w-2xl">
              Application development
              <br />
              <span className="text-zinc-300">for your industry.</span>
            </h2>
          </div>
          <p className="max-w-md text-white/55 leading-relaxed">
            Different industries have different users, workflows, regulations,
            and technology needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <p className="text-white/55 text-lg leading-relaxed">
              We develop applications for businesses across industries such as
              healthcare, finance, retail, e-commerce, logistics,
              manufacturing, education, real estate, travel, automotive, and
              professional services.
            </p>
            <p className="mt-6 text-white/55 text-lg leading-relaxed">
              Our goal is to understand how your industry works before deciding
              how your application should work.
            </p>

            <Link
              href="/industries"
              className="group mt-10 inline-flex items-center gap-3 rounded-full border border-chrome/40 bg-white/[0.03] px-8 py-4 text-xs uppercase tracking-[0.25em] text-white/80 backdrop-blur transition-colors hover:text-white hover:bg-white/5"
            >
              Explore Industries We Serve
              <ArrowUpRight className="h-4 w-4 text-chrome transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <div className="flex flex-wrap gap-3 lg:justify-end lg:pt-2">
            {industries.map((industry) => (
              <span
                key={industry}
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-gradient-to-b from-[#161616] to-[#0a0a0a] px-5 py-2.5 text-sm text-white/70 transition-colors duration-300 hover:text-white hover:border-white/20"
              >
                <span className="h-1.5 w-1.5 rotate-45 bg-chrome opacity-70" />
                {industry}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}