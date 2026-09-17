"use client";

import {
  Smartphone,
  Globe,
  Palette,
  Cloud,
  Plug,
  Wrench,
  ArrowUpRight,
} from "lucide-react";

const svcMobile = "/images/mobile.jpeg";
const svcWeb = "/images/web.jpeg";
const svcUi = "/images/ui-ux.jpeg";
const svcSaas = "/images/saas.jpeg";
const svcApi = "/images/api.jpeg";
const svcMaint = "/images/application.jpeg";

import { useRef } from "react";
import Link from "next/link";

const services = [
  {
    icon: Smartphone,
    title: "Mobile Application Development",
    desc: "Build mobile applications that give users a smooth experience across modern devices. We develop applications based on your features, users, business goals, and long-term growth plans.",
    cta: "Explore Mobile Application Development",
    href: "/services/mobile-app-development/",
    img: svcMobile,
    large: true, // First card - full width
  },
  {
    icon: Globe,
    title: "Web Application Development",
    desc: "We build custom web applications that help businesses manage operations, serve customers, automate work, and deliver digital services through a browser.",
    cta: "Explore Web Application Development",
    href: "/services/web-application-development/",
    img: svcWeb,
    large: false,
  },
  {
    icon: Palette,
    title: "Desktop Application Development",
    desc: "Get reliable desktop applications designed for business operations, internal teams, data management, and specialized workflows.",
    cta: "Explore Desktop Application Development",
    href: "/services/desktop-application-development/",
    img: svcUi,
    large: false,
  },
  {
    icon: Cloud,
    title: "AI Application Development",
    desc: "Add AI features to your applications to automate tasks, improve decisions, support users, and make better use of business data.",
    cta: "Explore AI Application Development",
    href: "/services/ai-application-development/",
    img: svcSaas,
    large: true, // Fourth card - full width
  },
  {
    icon: Plug,
    title: "Specialized Application Development",
    desc: "We also build specialized applications for SaaS products, IoT systems, blockchain platforms, AR/VR experiences, embedded systems, and other advanced business needs.",
    cta: "View All App Development Services",
    href: "/services",
    img: svcApi,
    large: false,
  },
  {
    icon: Wrench,
    title: "Application Maintenance & Support",
    desc: "Post-launch support covering bug fixes, security updates, performance improvements, feature enhancements, and scalability improvements.",
    cta: "Explore Application Maintenance & Support",
    href: "/services/software-maintenance-support/",
    img: svcMaint,
    large: false,
  },
];

function Capsule({ s, i }: { s: (typeof services)[number]; i: number }) {
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
    if (el)
      el.style.transform =
        "perspective(1200px) rotateY(0) rotateX(0) translateZ(0)";
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
      <div
        data-shine
        className="pointer-events-none absolute inset-0 opacity-80"
      />
      <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

      {/* Image Section - different heights for large cards */}
      <div
        className={`relative ${isLarge ? "h-[520px]" : "h-[440px]"} overflow-hidden`}
      >
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
          <span className="text-xs tracking-[0.3em] text-white/30">
            0{i + 1}
          </span>
        </div>

        <h3
          className={`font-medium text-white tracking-tight ${isLarge ? "text-4xl md:text-5xl" : "text-3xl md:text-4xl"}`}
        >
          {s.title}
        </h3>
        <p
          className={`mt-3 text-sm leading-relaxed text-white/55 ${isLarge ? "max-w-2xl" : ""}`}
        >
          {s.desc}
        </p>

        <Link
          href={s.href}
          className="relative mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/70 hover:text-white transition-colors"
        >
          {s.cta}
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
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
            <div className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-5">
              — App Development Services
            </div>
            <h2 className="text-chrome text-5xl md:text-7xl font-medium leading-[1.02] tracking-[-0.03em] max-w-2xl">
              End&#8209;to&#8209;End App
              <br />
              Development Services
            </h2>
          </div>
          <p className="max-w-md text-white/55 leading-relaxed">
            Our app development services cover the full journey from an early
            idea to a working digital product. We focus on building
            applications that are simple to use, reliable, secure, and ready to
            grow with your business.
          </p>
        </div>

        {/* Same grid layout as Projects */}
        <div className="grid lg:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <Capsule key={s.title} s={s} i={i} />
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Link
            href="/services"
            className="group inline-flex items-center gap-3 rounded-full border border-chrome/40 bg-white/[0.03] px-8 py-4 text-xs uppercase tracking-[0.25em] text-white/80 backdrop-blur transition-colors hover:text-white hover:bg-white/5"
          >
            View All App Development Services
            <ArrowUpRight className="h-4 w-4 text-chrome transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
