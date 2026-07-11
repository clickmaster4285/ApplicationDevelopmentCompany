const items = [
  "Mobile Applications",
  "SaaS Platforms",
  "Enterprise Systems",
  "UI/UX Design",
  "API Integrations",
  "Cloud Infrastructure",
  "Product Engineering",
  "Application Maintenance",
];

export function Marquee() {
  const doubled = [...items, ...items];
  return (
    <section className="relative border-y border-white/5 bg-[#070707] py-10 overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#050505] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#050505] to-transparent z-10" />
      <div className="flex w-max animate-marquee items-center gap-14">
        {doubled.map((t, i) => (
          <div key={i} className="flex items-center gap-14">
            <span className="text-2xl md:text-3xl font-light tracking-tight text-white/75">{t}</span>
            <span className="h-2 w-2 rotate-45 bg-chrome opacity-70" />
          </div>
        ))}
      </div>
    </section>
  );
}
