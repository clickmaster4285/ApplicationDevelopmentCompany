import { useEffect, useRef } from "react";

const techs = [
  { name: "React", angle: 0 },
  { name: "Next.js", angle: 45 },
  { name: "Node.js", angle: 90 },
  { name: "TypeScript", angle: 135 },
  { name: "Flutter", angle: 180 },
  { name: "React Native", angle: 225 },
  { name: "AWS", angle: 270 },
  { name: "Firebase", angle: 315 },
];

export function Stack() {
  const ringRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    let a = 0;
    const loop = () => {
      a += 0.06;
      if (ringRef.current) ringRef.current.style.transform = `rotate(${a}deg)`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section id="stack" className="relative py-32 md:py-44 overflow-hidden border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-5">— Technology</div>
            <h2 className="text-chrome text-5xl md:text-7xl font-medium tracking-[-0.03em] leading-[1.02]">
              A neural network of modern tools.
            </h2>
            <p className="mt-8 text-white/55 max-w-md leading-relaxed">
              We choose technologies the way an architect chooses materials — for
              durability, expressiveness, and the way they age. Every stack decision
              is engineered, never trend-driven.
            </p>
          </div>
          <div className="relative aspect-square w-full max-w-xl mx-auto">
            {/* Concentric rings */}
            <div className="absolute inset-0 rounded-full border border-white/5" />
            <div className="absolute inset-10 rounded-full border border-white/10" />
            <div className="absolute inset-24 rounded-full border border-white/15" />
            <div className="absolute inset-40 rounded-full border border-white/20" />
            {/* Center core */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-20 w-20 rounded-full bg-chrome shadow-[0_0_60px_rgba(232,237,242,0.3)] grid place-items-center">
              <div className="h-3 w-3 rounded-full bg-[#050505]" />
            </div>
            {/* Nodes */}
            <div ref={ringRef} className="absolute inset-0">
              {techs.map((t) => {
                const rad = (t.angle * Math.PI) / 180;
                const x = 50 + 42 * Math.cos(rad);
                const y = 50 + 42 * Math.sin(rad);
                return (
                  <div
                    key={t.name}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group"
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    <div className="relative h-16 w-16 rounded-full border border-white/15 bg-gradient-to-b from-white/[0.08] to-transparent backdrop-blur grid place-items-center transition-transform duration-500 group-hover:scale-110">
                      <span className="text-[10px] tracking-[0.15em] uppercase text-chrome font-medium">{t.name}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Connection SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
              {techs.map((t) => {
                const rad = (t.angle * Math.PI) / 180;
                const x = 50 + 42 * Math.cos(rad);
                const y = 50 + 42 * Math.sin(rad);
                return (
                  <line key={t.name} x1="50" y1="50" x2={x} y2={y} stroke="#c9cdd2" strokeWidth="0.12" opacity="0.25" />
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
