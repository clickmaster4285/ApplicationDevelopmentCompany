import { Rocket, TrendingUp, Building2 } from "lucide-react";

const audiences = [
  {
    icon: Rocket,
    title: "Startups & MVPs",
    desc: "Turn a new idea into an MVP that focuses on the most important features, helps test demand, and creates a strong base for future growth.",
  },
  {
    icon: TrendingUp,
    title: "Growing Businesses",
    desc: "Replace manual processes, improve existing systems, connect business tools, or create applications that support growing teams and customers.",
  },
  {
    icon: Building2,
    title: "Enterprises",
    desc: "Build applications for larger workflows, complex integrations, high user demand, security requirements, data management, and long-term scalability.",
  },
];

export function AudienceSection() {
  return (
    <section className="relative py-32 md:py-40 border-t border-white/5">
      <div className="mx-auto w-[85vw] px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div>
            <div className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-5">
              — Who We Build For
            </div>
            <h2 className="text-chrome text-5xl md:text-7xl font-medium leading-[1.02] tracking-[-0.03em] max-w-3xl">
              Custom applications for startups, businesses, and enterprises.
            </h2>
          </div>
          <p className="max-w-md text-white/55 leading-relaxed">
            We work with organizations at different stages of growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {audiences.map((a) => {
            const Icon = a.icon;
            return (
              <div
                key={a.title}
                className="group relative overflow-hidden rounded-3xl border border-white/[0.07] bg-gradient-to-b from-[#161616] to-[#0a0a0a] p-8 transition-colors duration-500 hover:border-white/20"
              >
                <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(400px_circle_at_50%_0%,rgba(232,237,242,0.08),transparent_60%)]" />
                <div className="mb-8 flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/[0.03]">
                    <Icon className="h-5 w-5 text-chrome" />
                  </span>
                  <span className="h-2 w-2 rotate-45 bg-chrome opacity-50 transition-opacity group-hover:opacity-100" />
                </div>
                <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-white">
                  {a.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">
                  {a.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}