import { useEffect, useRef } from "react";

const techs = [
  { name: "React", angle: 0, icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" },
  { name: "Next.js", angle: 30, icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg" },
  { name: "Node.js", angle: 60, icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" },
  { name: "TypeScript", angle: 90, icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" },
  { name: "Flutter", angle: 120, icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/flutter/flutter-original.svg" },
  { name: "Firebase", angle: 150, icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/firebase/firebase-original.svg" },
  { name: "Tailwind CSS", angle: 180, icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Prisma", angle: 210, icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/prisma/prisma-original.svg" },
  { name: "GraphQL", angle: 240, icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/graphql/graphql-plain.svg" },
  { name: "Docker", angle: 270, icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg" },
  { name: "PostgreSQL", angle: 300, icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg" },
  { name: "MongoDB", angle: 330, icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg" },
  { name: "Vue.js", angle: 360, icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original.svg" },
  { name: "Angular", angle: 390, icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/angularjs/angularjs-original.svg" },
  { name: "Python", angle: 420, icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" },
  { name: "Kubernetes", angle: 450, icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/kubernetes/kubernetes-plain.svg" },
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
      <div className="mx-auto w-[85vw] px-6">
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
            {/* Center core - removed shadow */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-20 w-20 rounded-full bg-chrome grid place-items-center">
              <div className="h-3 w-3 rounded-full bg-[#050505]" />
            </div>
            {/* Nodes - removed backdrop-blur and gradient */}
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
                    <div className="relative h-16 w-16 rounded-full border border-white/15 bg-black/40 grid place-items-center transition-all duration-500 group-hover:scale-110">
                      <img 
                        src={t.icon} 
                        alt={t.name} 
                        className="w-8 h-8 object-contain"
                        style={{ filter: t.name === "Next.js" ? "invert(1)" : "none" }}
                      />
                    </div>
                    {/* Tooltip */}
                    <div className="absolute left-1/2 -translate-x-1/2 -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <span className="text-[10px] tracking-[0.1em] uppercase text-white/70 whitespace-nowrap bg-black/60 px-2 py-1 rounded backdrop-blur">
                        {t.name}
                      </span>
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