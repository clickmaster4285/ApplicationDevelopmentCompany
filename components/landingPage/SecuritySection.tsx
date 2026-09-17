import { ShieldCheck, Network, PlugZap } from "lucide-react";

const pillars = [
  {
    icon: ShieldCheck,
    title: "Application Security",
    desc: "We consider data protection, access control, secure development practices, and testing throughout the application lifecycle.",
  },
  {
    icon: Network,
    title: "Scalable Architecture",
    desc: "Applications can be planned for future users, added features, larger data volumes, and changing business demands.",
  },
  {
    icon: PlugZap,
    title: "API & System Integrations",
    desc: "Your application can connect with existing systems such as CRM platforms, ERP software, payment gateways, databases, cloud services, and other third-party tools.",
  },
];

export function SecuritySection() {
  return (
    <section className="relative py-32 md:py-40 border-t border-white/5">
      <div className="mx-auto w-[85vw] px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div>
            <div className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-5">
              — Built For The Long Run
            </div>
            <h2 className="text-chrome text-5xl md:text-7xl font-medium leading-[1.02] tracking-[-0.03em] max-w-3xl">
              Secure, scalable, and integration&#8209;ready applications.
            </h2>
          </div>
          <p className="max-w-md text-white/55 leading-relaxed">
            Modern applications need to do more than work on launch day. They
            should support your business as it changes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
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
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}