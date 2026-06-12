import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { name: "Helix Health", category: "Healthcare App", desc: "A patient-first telehealth platform redefining care delivery for 1.2M users.", metric: "+412% engagement", hue: "#1a2630" },
  { name: "Lumen Capital", category: "Fintech Platform", desc: "Institutional trading and portfolio analytics with sub-second responsiveness.", metric: "$3.8B AUM", hue: "#1f1f24" },
  { name: "Atelier", category: "E-Commerce Mobile App", desc: "Boutique commerce experience with cinematic product storytelling.", metric: "5.2× conversion", hue: "#1a1818" },
  { name: "Sapien", category: "Education Platform", desc: "Adaptive learning for ambitious learners across 27 countries.", metric: "98% retention", hue: "#161e1c" },
  { name: "Northstar", category: "Booking System", desc: "Premium travel booking engine with real-time inventory orchestration.", metric: "180k+ daily bookings", hue: "#1c1a16" },
];

function ProjectCard({ p, i }: { p: typeof projects[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });
      gsap.to(screenRef.current, {
        scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 1 },
        y: -60,
        rotateX: -2,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const reverse = i % 2 === 1;
  return (
    <div ref={ref} className="relative min-h-screen flex items-center py-24">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className={`grid md:grid-cols-12 gap-12 items-center ${reverse ? "md:[direction:rtl]" : ""}`}>
          <div className="md:col-span-5 [direction:ltr]">
            <div className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-4">— {p.category}</div>
            <h3 className="text-chrome text-5xl md:text-6xl font-medium tracking-[-0.03em] leading-[1.02]">{p.name}</h3>
            <p className="mt-6 text-white/55 leading-relaxed max-w-md">{p.desc}</p>
            <div className="mt-8 flex items-center gap-6">
              <span className="text-2xl text-white font-light">{p.metric}</span>
              <span className="h-px w-12 bg-white/20" />
              <span className="text-xs uppercase tracking-[0.3em] text-white/40">Case study</span>
            </div>
          </div>
          <div className="md:col-span-7 [direction:ltr]">
            <div
              ref={screenRef}
              className="relative aspect-[4/3] rounded-3xl overflow-hidden border-chrome shadow-[var(--shadow-deep)]"
              style={{
                background: `radial-gradient(ellipse at 30% 20%, ${p.hue}, #050505 70%)`,
              }}
            >
              {/* Device chrome */}
              <div className="absolute inset-6 rounded-2xl border border-white/10 bg-gradient-to-b from-[#0e0e0e] to-[#050505] overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-10 flex items-center px-4 gap-1.5 border-b border-white/5">
                  <span className="h-2 w-2 rounded-full bg-white/15" />
                  <span className="h-2 w-2 rounded-full bg-white/15" />
                  <span className="h-2 w-2 rounded-full bg-white/15" />
                  <span className="ml-4 text-[10px] tracking-[0.3em] text-white/30 uppercase">{p.name}.app</span>
                </div>
                {/* Fake UI */}
                <div className="absolute inset-x-6 top-16 grid grid-cols-3 gap-3">
                  {Array.from({ length: 6 }).map((_, k) => (
                    <div key={k} className="h-24 rounded-lg border border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent" />
                  ))}
                </div>
                <div className="absolute inset-x-6 bottom-6 h-20 rounded-lg border border-white/5 bg-gradient-to-r from-white/[0.06] via-white/[0.02] to-transparent" />
                {/* Shine */}
                <div className="absolute -top-1/2 -left-1/4 h-[200%] w-1/3 rotate-12 bg-gradient-to-b from-white/10 via-transparent to-transparent" />
              </div>
              {/* Reflection edges */}
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5 rounded-3xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <section id="work" className="relative bg-[#050505]">
      <div className="mx-auto max-w-7xl px-6 pt-32 pb-10">
        <div className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-5">— Selected Work</div>
        <h2 className="text-chrome text-5xl md:text-7xl font-medium tracking-[-0.03em] leading-[1.02] max-w-3xl">
          Products that move markets.
        </h2>
      </div>
      {projects.map((p, i) => (
        <ProjectCard key={p.name} p={p} i={i} />
      ))}
    </section>
  );
}
