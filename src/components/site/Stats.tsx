import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "150+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "40+", label: "Enterprise Clients" },
  { value: "10M+", label: "Users Impacted" },
];

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-stat]").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 85%" },
          y: 120,
          opacity: 0,
          scale: 0.9,
          duration: 1.4,
          ease: "expo.out",
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative py-32 md:py-44 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-5">— In Numbers</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-20 gap-x-12">
          {stats.map((s) => (
            <div key={s.label} data-stat className="border-t border-white/10 pt-8">
              <div className="text-chrome-shine text-[clamp(4rem,12vw,11rem)] leading-[0.9] font-medium tracking-[-0.05em]">
                {s.value}
              </div>
              <div className="mt-4 text-xs uppercase tracking-[0.4em] text-white/50">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
