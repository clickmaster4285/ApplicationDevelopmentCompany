import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";

export function USALocationSection() {
  return (
    <section className="relative py-32 md:py-40 border-t border-white/5 overflow-hidden">
      <div className="mx-auto w-[85vw] px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-5">
              — Application Development Company in USA
            </div>
            <h2 className="text-chrome text-5xl md:text-7xl font-medium leading-[1.02] tracking-[-0.03em] mb-8">
              Serving businesses across the USA.
            </h2>

            <p className="text-white/55 text-lg leading-relaxed">
              ClickMasters is an application development company in USA serving
              businesses that need custom digital products and business
              applications.
            </p>
            <p className="mt-6 text-white/55 text-lg leading-relaxed">
              We work with startups, established companies, and enterprise
              teams that need a clear development process from planning through
              launch and ongoing support.
            </p>
            <p className="mt-6 text-white/55 text-lg leading-relaxed">
              Whether you are creating a new application, replacing an outdated
              system, improving an existing product, or turning a business
              process into a digital solution, our team can help you move from
              idea to execution.
            </p>

            <Link
              href="/contact"
              className="group mt-10 inline-flex items-center gap-3 rounded-full border border-chrome/40 bg-white/[0.03] px-8 py-4 text-xs uppercase tracking-[0.25em] text-white/80 backdrop-blur transition-colors hover:text-white hover:bg-white/5"
            >
              Talk to Our App Development Team
              <ArrowUpRight className="h-4 w-4 text-chrome transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute -inset-10 bg-[radial-gradient(circle_at_center,rgba(232,237,242,0.1),transparent_65%)] blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border border-white/[0.07] bg-gradient-to-b from-[#161616] to-[#0a0a0a] p-10 md:p-14">
              <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              <div className="flex items-center gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/[0.03]">
                  <MapPin className="h-5 w-5 text-chrome" />
                </span>
                <div className="text-[10px] uppercase tracking-[0.3em] text-white/50">
                  USA-Based Delivery
                  <br />
                  <span className="text-white/80">Startups &rarr; Enterprise</span>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-8">
                {[
                  { l: "Planning", s: "Clear scope" },
                  { l: "Launch", s: "On target" },
                  { l: "Support", s: "Ongoing" },
                  { l: "Growth", s: "Built in" },
                ].map((item) => (
                  <div key={item.l} className="border-t border-white/10 pt-5">
                    <div className="text-lg font-medium tracking-tight text-white">
                      {item.l}
                    </div>
                    <div className="mt-1 text-xs uppercase tracking-[0.2em] text-white/40">
                      {item.s}
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-10 text-sm leading-relaxed text-white/55">
                A clear development process from planning through launch and
                ongoing support &mdash; for teams of every size.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}