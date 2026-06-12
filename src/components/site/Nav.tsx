import { useEffect, useState } from "react";

const links = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Work", href: "#work" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3 backdrop-blur-xl bg-black/40 border-b border-white/5" : "py-6 bg-transparent"
      }`}
    >
      <div className="mx-auto w-[85vw] px-6 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 group">
          <span className="relative h-7 w-7 rounded-full bg-chrome grid place-items-center shadow-[inset_0_0_8px_rgba(0,0,0,0.4)]">
            <span className="h-2 w-2 rounded-full bg-[#050505]" />
          </span>
          <span className="text-sm tracking-[0.18em] uppercase text-chrome font-semibold">ClickMasters</span>
        </a>
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-4 py-2 text-xs uppercase tracking-[0.18em] text-white/60 hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="text-xs uppercase tracking-[0.18em] px-5 py-2.5 rounded-full bg-chrome text-[#050505] font-medium hover:shadow-[0_10px_40px_-10px_rgba(232,237,242,0.5)] transition-shadow"
        >
          Start a Project
        </a>
      </div>
    </header>
  );
}
