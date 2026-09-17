import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const supportItems = [
  "Bug fixes",
  "Security updates",
  "Performance improvements",
  "Feature enhancements",
  "Compatibility updates",
  "Application monitoring",
  "Integration updates",
  "Scalability improvements",
];

export function PostLaunchSection() {
  return (
    <section className="relative py-32 md:py-40 border-t border-white/5">
      <div className="mx-auto w-[85vw] px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div>
            <div className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-5">
              — After Launch
            </div>
            <h2 className="text-chrome text-5xl md:text-7xl font-medium leading-[1.02] tracking-[-0.03em] max-w-2xl">
              Post-launch application support.
            </h2>
          </div>
          <p className="max-w-md text-white/55 leading-relaxed">
            Launching your application is only one stage of its lifecycle. As
            users, devices, systems, and business requirements change, your
            application may also need updates.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-white/40">
              Our post-launch support can cover:
            </p>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {supportItems.map((item) => (
                <div
                  key={item}
                  className="inline-flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#161616] to-[#0a0a0a] px-5 py-3.5 text-sm text-white/70 transition-colors duration-300 hover:text-white hover:border-white/20"
                >
                  <span className="h-1.5 w-1.5 rotate-45 bg-chrome opacity-70" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:pl-16 lg:border-l lg:border-white/5">
            <p className="text-white/55 text-lg leading-relaxed">
              This helps keep your application useful, secure, and ready for
              future growth.
            </p>

            <Link
              href="/services/software-maintenance-support/"
              className="group mt-8 inline-flex items-center gap-3 rounded-full border border-chrome/40 bg-white/[0.03] px-8 py-4 text-xs uppercase tracking-[0.25em] text-white/80 backdrop-blur transition-colors hover:text-white hover:bg-white/5"
            >
              Explore Application Maintenance &amp; Support
              <ArrowUpRight className="h-4 w-4 text-chrome transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}