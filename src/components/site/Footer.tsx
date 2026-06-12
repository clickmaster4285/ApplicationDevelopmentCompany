const cols = [
  {
    title: "Services",
    links: ["Mobile Apps", "Web Apps", "UI/UX Design", "SaaS", "API Integration", "Maintenance"],
  },
  {
    title: "Company",
    links: ["About", "Process", "Careers", "Press", "Contact"],
  },
  {
    title: "Resources",
    links: ["Case Studies", "Journal", "Engineering", "Brand Kit"],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#070707]">
      {/* Animated chrome light line */}
      <div className="relative h-px overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-chrome to-transparent opacity-40" />
        <div className="absolute -top-px h-px w-1/3 animate-marquee bg-gradient-to-r from-transparent via-white to-transparent" />
      </div>

      <div className="mx-auto w-[85vw] px-6 py-20">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5">
              <span className="h-7 w-7 rounded-full bg-chrome grid place-items-center">
                <span className="h-2 w-2 rounded-full bg-[#050505]" />
              </span>
              <span className="text-sm tracking-[0.18em] uppercase text-chrome font-semibold">
                ClickMasters
              </span>
            </div>
            <p className="mt-6 text-white/55 max-w-sm leading-relaxed text-sm">
              ClickMasters Application Development — a modern software studio
              engineering mobile, web and SaaS products for ambitious teams.
            </p>
            <div className="mt-8">
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-3">Newsletter</div>
              <form className="flex items-center gap-2 max-w-sm">
                <input
                  type="email"
                  placeholder="you@company.com"
                  className="flex-1 h-11 rounded-full bg-white/5 border border-white/10 px-5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30"
                />
                <button className="h-11 px-5 rounded-full bg-chrome text-[#050505] text-sm font-medium">
                  Join
                </button>
              </form>
            </div>
          </div>
          <div className="lg:col-span-5 grid grid-cols-3 gap-8">
            {cols.map((c) => (
              <div key={c.title}>
                <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-5">{c.title}</div>
                <ul className="space-y-3">
                  {c.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-sm text-white/65 hover:text-white transition-colors">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="lg:col-span-3">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-5">Contact</div>
            <p className="text-sm text-white/65 leading-relaxed">
              sales@clickmastersdigitalmarketing.com<br />
              +44 7988 576086<br />
              San Francisco · Remote
            </p>
            <div className="mt-8 flex gap-3">
              {["Tw", "In", "Gh", "Dr"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="h-9 w-9 rounded-full border border-white/10 grid place-items-center text-xs text-white/70 hover:bg-white/5 hover:text-white transition-colors"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <div>© {new Date().getFullYear()} ClickMasters Application Development. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white/70">Privacy</a>
            <a href="#" className="hover:text-white/70">Terms</a>
            <a href="#" className="hover:text-white/70">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
