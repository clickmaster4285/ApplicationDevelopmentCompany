import { Zap, Layers, Cpu, Shield, Headphones, Gauge } from "lucide-react";

const items = [
  { icon: Zap, title: "Fast Delivery", desc: "Tight, opinionated cycles. Production shipping in weeks, not quarters." },
  { icon: Layers, title: "Scalable Architecture", desc: "Systems designed for the 10x — modular, observable and resilient." },
  { icon: Cpu, title: "Modern Tech Stack", desc: "React, TypeScript, edge runtimes and the latest mobile frameworks." },
  { icon: Shield, title: "Enterprise Security", desc: "SOC2 mindset, hardened auth, encryption-at-rest and continuous audits." },
  { icon: Headphones, title: "Dedicated Support", desc: "Senior engineers on call. Real humans, real ownership, real SLAs." },
  { icon: Gauge, title: "Performance Optimized", desc: "Sub-second LCP and 60fps interactions on every device we ship to." },
];

export function WhyUs() {
  return (
    <section className="relative py-32 md:py-40 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 max-w-3xl">
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-5">— Why ClickMasters</div>
          <h2 className="text-chrome text-5xl md:text-7xl font-medium tracking-[-0.03em] leading-[1.02]">
            Built for teams who refuse compromise.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 rounded-3xl overflow-hidden border border-white/5">
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <div
                key={it.title}
                className="group relative bg-[#0a0a0a] p-10 transition-all duration-500 hover:bg-[#0f0f0f]"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/0 to-transparent group-hover:via-white/40 transition-all duration-500" />
                <Icon className="h-7 w-7 text-chrome mb-8" strokeWidth={1.3} />
                <h3 className="text-xl text-white font-medium tracking-tight">{it.title}</h3>
                <p className="mt-3 text-sm text-white/50 leading-relaxed">{it.desc}</p>
                <div className="mt-8 h-px w-full bg-white/[0.06] overflow-hidden">
                  <div className="h-full w-0 bg-chrome transition-all duration-700 group-hover:w-full" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
