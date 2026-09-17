"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

const aboutVideo = "/images/about.mp4";

// Counter component for stats
function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { innerText: 0 },
        {
          innerText: to,
          duration: 2,
          ease: "power2.out",
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          onUpdate: function () {
            el.innerText = Math.floor(Number(el.innerText)).toString();
          },
        },
      );
    });

    return () => ctx.revert();
  }, [to]);

  return (
    <>
      <span ref={ref}>0</span>
      {suffix}
    </>
  );
}

// Reveal animation wrapper
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });

    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}

export function About() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="relative py-32 md:py-40">
      <div className="mx-auto w-[85vw] px-6">
        {/* Header on left, video on right */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left side - Header and content */}
          <div>
            <div className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-5">
              — Application Development Solutions
            </div>
            <h2 className="text-5xl md:text-7xl font-medium leading-[1.02] tracking-[-0.03em] mb-8">
              Solutions built{" "}
              <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                around your business.
              </span>
            </h2>

            <p className="text-white/55 text-lg leading-relaxed">
              Every business has different processes, users, and goals. That is
              why we create application development solutions around the
              problem you need to solve instead of forcing your business into a
              standard product. We can build applications for customer
              management, booking, inventory, operations, workflow automation,
              communication, reporting, payments, data management, and other
              business functions.
            </p>
            <p className="mt-6 text-white/55 text-lg leading-relaxed">
              Our team looks at how your business works, what your users need,
              and which systems your application must connect with. We then
              create a solution that fits your current needs and can grow over
              time.
            </p>

            <Link
              href="/solutions"
              className="group mt-8 inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-white/70 hover:text-white transition-colors"
            >
              Explore Our Application Solutions
              <ArrowUpRight className="h-4 w-4 text-chrome transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            {/* Stats grid - no cards */}
            <div className="mt-12 grid grid-cols-2 gap-8">
              {[
                { n: 150, s: "+", l: "Projects Delivered" },
                { n: 120, s: "+", l: "Happy Clients" },
                { n: 32, s: "", l: "Countries Served" },
                { n: 11, s: "", l: "Years Experience" },
              ].map((stat) => (
                <div key={stat.l}>
                  <div className="text-4xl md:text-5xl font-medium text-white tracking-tight">
                    <Counter to={stat.n} suffix={stat.s} />
                  </div>
                  <div className="mt-2 text-xs uppercase tracking-[0.2em] text-white/40">
                    {stat.l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Video (appears on top on mobile) */}
          <div className="relative h-[480px] lg:h-[560px] rounded-3xl overflow-hidden order-first lg:order-last mt-12">
            <video
              ref={videoRef}
              src={aboutVideo}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-[108%] w-full object-cover"
              style={{ top: "-4%" }}
            />
            {/* Minimal gradient overlays for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

            {/* Bottom left badge */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/60">
                Established
              </div>
              <div className="text-sm font-medium tracking-tight text-white/80">
                2014
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
