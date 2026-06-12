import {
  Smartphone,
  Globe,
  Palette,
  Cloud,
  Plug,
  Wrench,
  ArrowUpRight,
} from "lucide-react";

import svcMobile from "@/assets/mobile.jpeg";
import svcWeb from "@/assets/web.jpeg";
import svcUi from "@/assets/ui-ux.jpeg";
import svcSaas from "@/assets/saas.jpeg";
import svcApi from "@/assets/api.jpeg";
import svcMaint from "@/assets/application.jpeg";
import { useRef } from "react";

const services = [
  { 
    icon: Smartphone, 
    title: "Mobile App Development", 
    desc: "Native and cross-platform mobile experiences with first-class performance on iOS and Android.",
    img: svcMobile,
    large: true // First card - full width
  },
  { 
    icon: Globe, 
    title: "Web Application Development", 
    desc: "Modern, scalable web platforms built on React, Next.js and edge-first architectures.",
    img: svcWeb,
    large: false
  },
  { 
    icon: Palette, 
    title: "UI/UX Design", 
    desc: "Brand-defining interfaces engineered around motion, hierarchy and product strategy.",
    img: svcUi,
    large: false
  },
  { 
    icon: Cloud, 
    title: "SaaS Development", 
    desc: "Multi-tenant SaaS products with billing, auth, analytics and cloud-native foundations.",
    img: svcSaas,
    large: true // Fourth card - full width
  },
  { 
    icon: Plug, 
    title: "API Integration", 
    desc: "Stitch services, automate workflows and unify data with robust, observable APIs.",
    img: svcApi,
    large: false
  },
  { 
    icon: Wrench, 
    title: "Application Maintenance", 
    desc: "24/7 monitoring, performance tuning and continuous improvement after launch.",
    img: svcMaint,
    large: false
  },
];

function Capsule({ s, i }: { s: typeof services[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1200px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(20px)`;
    const shine = el.querySelector<HTMLElement>("[data-shine]");
    if (shine) {
      shine.style.background = `radial-gradient(400px circle at ${e.clientX - r.left}px ${e.clientY - r.top}px, rgba(232,237,242,0.18), transparent 50%)`;
    }
  };
  
  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "perspective(1200px) rotateY(0) rotateX(0) translateZ(0)";
  };
  
  const Icon = s.icon;
  const isLarge = s.large;
  
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`${isLarge ? "lg:col-span-2" : ""} group relative overflow-hidden rounded-3xl border border-white/[0.07] bg-gradient-to-b from-[#161616] to-[#0a0a0a] transition-transform duration-500 ease-out will-change-transform`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div data-shine className="pointer-events-none absolute inset-0 opacity-80" />
      <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      
      {/* Image Section - different heights for large cards */}
      <div className={`relative ${isLarge ? "h-[520px]" : "h-[440px]"} overflow-hidden`}>
        <img 
          src={s.img} 
          alt={s.title} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
      </div>
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="relative mb-4 flex items-start justify-between">
        
          <span className="text-xs tracking-[0.3em] text-white/30">0{i + 1}</span>
        </div>
        
        <h3 className={`font-medium text-white tracking-tight ${isLarge ? "text-4xl md:text-5xl" : "text-3xl md:text-4xl"}`}>
          {s.title}
        </h3>
        <p className={`mt-3 text-sm leading-relaxed text-white/55 ${isLarge ? "max-w-2xl" : ""}`}>
          {s.desc}
        </p>
        
        <button className="relative mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/70 hover:text-white transition-colors">
          Learn more
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </div>
  );
}

export function Services() {
  return (
    <section id="services" className="relative py-32 md:py-40">
      <div className="mx-auto w-[85vw] px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20">
          <div>
            <div className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-5">— Capabilities</div>
            <h2 className="text-chrome text-5xl md:text-7xl font-medium leading-[1.02] tracking-[-0.03em] max-w-2xl">
              Full-stack craft, end&#8209;to&#8209;end.
            </h2>
          </div>
          <p className="max-w-md text-white/55 leading-relaxed">
            From the first sketch to scaled deployment, every capability is in-house
            and engineered to the same uncompromising standard.
          </p>
        </div>
        
        {/* Same grid layout as Projects */}
        <div className="grid lg:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <Capsule key={s.title} s={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}