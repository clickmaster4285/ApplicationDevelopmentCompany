import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Helix from '@/assets/health.jpeg';
import Lumen from '@/assets/fintech.jpeg';
import Atelier from '@/assets/atelier.jpeg';
import Sapien from '@/assets/sapien.jpeg';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { name: "Helix Health", category: "Healthcare App", desc: "A patient-first telehealth platform redefining care delivery for 1.2M users.", metric: "+412% engagement", hue: "#1a2630", image: Helix },

  { name: "Atelier", category: "E-Commerce Mobile App", desc: "Boutique commerce experience with cinematic product storytelling.", metric: "5.2× conversion", hue: "#1a1818", image: Atelier },

  
  { name: "Lumen Capital", category: "Fintech Platform", desc: "Institutional trading and portfolio analytics with sub-second responsiveness.", metric: "$3.8B AUM", hue: "#1f1f24", image: Lumen },





  { name: "Sapien", category: "Education Platform", desc: "Adaptive learning for ambitious learners across 27 countries.", metric: "98% retention", hue: "#161e1c", image: Sapien },
];

function ProjectCard({ p, i }: { p: typeof projects[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      // Card entrance animation
      gsap.from(ref.current, {
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });
      
      // Screen/device tilt animation on scroll
      gsap.to(screenRef.current, {
        scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 1 },
        y: -60,
        rotateX: -2,
      });
      
      // Image reveal animation
      if (imageRef.current) {
        gsap.from(imageRef.current, {
          scrollTrigger: { trigger: ref.current, start: "top 70%" },
          scale: 1.1,
          opacity: 0,
          duration: 1.4,
          ease: "power2.out",
        });
        
        // Parallax effect on image
        gsap.to(imageRef.current, {
          scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 0.5 },
          y: (i % 2 === 0) ? 40 : -40,
          ease: "none",
        });
      }
    }, ref);
    return () => ctx.revert();
  }, [i]);

  const reverse = i % 2 === 1;
  return (
    <div ref={ref} className="relative min-h-screen flex items-center py-24">
      <div className="mx-auto  w-[85vw] px-6">
        <div className={`grid md:grid-cols-12 gap-12 items-center ${reverse ? "md:[direction:rtl]" : ""}`}>
          <div className="md:col-span-5 [direction:ltr]">
            <div className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-4">— {p.category}</div>
            <h3 className="text-chrome text-5xl md:text-6xl font-medium tracking-[-0.03em] leading-[1.02] text-white">{p.name}</h3>
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
              className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
              style={{
                background: `radial-gradient(ellipse at 30% 20%, ${p.hue}, #050505 70%)`,
              }}
            >
              {/* Device chrome */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden">
                {/* Top bar */}
                <div className="absolute top-0 inset-x-0 h-10 flex items-center px-4 gap-1.5 border-b border-white/10 bg-black/40 backdrop-blur-sm z-10">
                  <span className="h-2 w-2 rounded-full bg-red-500/80" />
                  <span className="h-2 w-2 rounded-full bg-yellow-500/80" />
                  <span className="h-2 w-2 rounded-full bg-green-500/80" />
                  <span className="ml-4 text-[10px] tracking-[0.3em] text-white/50 uppercase">{p.name}.app</span>
                </div>
                
                {/* Image container */}
                <div className="absolute inset-0 pt-10">
                  <img 
                    ref={imageRef}
                    src={p.image} 
                    alt={p.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Overlay gradient for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
                
                {/* Floating UI elements overlay */}
                <div className="absolute inset-x-4 bottom-6 flex gap-2 pointer-events-none">
                  <div className="h-16 w-16 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20" />
                  <div className="flex-1 h-16 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10" />
                </div>
              </div>
              
              {/* Reflection edges */}
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl" />
              
              {/* Shine effect */}
              <div className="absolute -top-1/2 -left-1/4 h-[200%] w-1/3 rotate-12 bg-gradient-to-b from-white/5 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <section id="work" className="relative bg-[#050505] overflow-hidden">
      <div className="mx-auto w-[85vw] px-6 pt-32 pb-10">
        <div className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-5">— Selected Work</div>
        <h2 className="text-white text-5xl md:text-7xl font-medium tracking-[-0.03em] leading-[1.02] max-w-3xl">
          Products that move markets.
        </h2>
      </div>
      {projects.map((p, i) => (
        <ProjectCard key={p.name} p={p} i={i} />
      ))}
    </section>
  );
}