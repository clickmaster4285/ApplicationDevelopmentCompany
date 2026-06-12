import { MagneticButton } from "./MagneticButton";

export function CTA() {
  return (
    <section id="contact" className="relative py-40 md:py-56 overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[60vmin] w-[60vmin] rounded-full bg-[radial-gradient(circle,rgba(232,237,242,0.18),transparent_60%)] blur-2xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#050505_90%)]" />
      </div>
      {/* Particles */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 40 }).map((_, i) => (
          <span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white/40 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 6}s`,
              opacity: 0.2 + Math.random() * 0.5,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-white/70 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-chrome" />
          Now accepting projects for Q3
        </div>
        <h2 className="mt-10 text-chrome text-[clamp(2.4rem,8vw,7rem)] font-medium tracking-[-0.04em] leading-[0.95]">
          Ready to build your <br /> next application?
        </h2>
        <p className="mt-8 max-w-xl mx-auto text-white/55 text-lg leading-relaxed">
          Partner with ClickMasters and transform your vision into a scalable digital product.
        </p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton variant="chrome">Book a Consultation →</MagneticButton>
          <MagneticButton variant="ghost">Get a Free Quote</MagneticButton>
        </div>
      </div>
    </section>
  );
}
