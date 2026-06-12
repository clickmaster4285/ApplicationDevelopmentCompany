import { useEffect, useRef } from "react";
import gsap from "gsap";
import { HeroScene } from "./HeroScene";
import { MagneticButton } from "./MagneticButton";
import heroVideo from "@/assets/hero.mp4"; 

export function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  

  useEffect(() => {
    const el = headlineRef.current;
    if (!el) return;

    // Split words into chars
    const words = el.querySelectorAll<HTMLElement>("[data-word]");
    words.forEach((word) => {
      const text = word.textContent ?? "";
      word.innerHTML = text
        .split("")
        .map((c) => `<span class="inline-block translate-y-[120%] opacity-0">${c === " " ? "&nbsp;" : c}</span>`)
        .join("");
    });

    const chars = el.querySelectorAll<HTMLElement>("span span, [data-word] > span");
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0.1)
      .to(chars, { y: 0, opacity: 1, duration: 1.2, stagger: 0.018 }, 0.2)
      .to(subRef.current, { opacity: 1, y: 0, duration: 1 }, 0.9)
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 1 }, 1.1)
      .to(scrollRef.current, { opacity: 1, duration: 1 }, 1.3);
  }, []);

  return (
    <section id="top" className="relative min-h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Vignette + cinematic overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,5,5,0.55)_55%,#050505_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#050505_0%,transparent_18%,transparent_75%,#050505_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:repeating-linear-gradient(180deg,#fff_0_1px,transparent_1px_3px)]" />

      {/* Copy - Left aligned */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-start justify-center px-6 pt-44 pb-32 min-h-screen">


  <h1
  ref={headlineRef}
  className="mt-8 font-display text-[clamp(2.2rem,6.5vw,6.5rem)] leading-[0.95] tracking-[-0.04em] font-semibold font-['Fraunces'] italic text-white"
>

  <span className="block overflow-hidden" data-word="We engineer">
    We engineer software
  </span>

  <span className="block overflow-hidden text-white/95" data-word="software that">
    that feels{" "}
    <span className="italic text-white drop-shadow-[0_0_18px_rgba(255,255,255,0.25)]" data-word="inevitable.">
      inevitable.
    </span>
  </span>
</h1>

      <p
  ref={subRef}
  className="opacity-0 translate-y-4 mt-8 max-w-3xl text-lg md:text-xl text-white/90 leading-relaxed"
>
  A design and engineering studio building category-defining digital products across mobile, web, and SaaS. We craft systems that feel inevitable not just functional, but deeply intentional. Every interface is shaped with cinematic precision, performance discipline, and obsessive attention to detail. From early-stage startups to scaling platforms, we transform ambitious ideas into high-impact, production-ready experiences.
</p>

        <div ref={ctaRef} className="opacity-0 translate-y-4 mt-10 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton variant="chrome">
            Book a Consultation
           
          </MagneticButton>
          <MagneticButton variant="ghost">View Our Work</MagneticButton>
        </div>

        <div ref={scrollRef} className="opacity-0 absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-white/40">
          Scroll
          <span className="relative block h-12 w-px bg-gradient-to-b from-white/40 to-transparent overflow-hidden">
            <span className="absolute left-0 top-0 h-1/3 w-full bg-white animate-[float-y_2s_ease-in-out_infinite]" />
          </span>
        </div>
      </div>
    </section>
  );
}