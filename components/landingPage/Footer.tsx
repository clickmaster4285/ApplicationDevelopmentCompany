import Link from "next/link";

const logo = "/images/logo-white.webp";

const cols = [
  {
    title: "Services",
    links: [
      { label: "Mobile Apps", href: "/services/mobile-app-development" },
      { label: "Web Apps", href: "/services/web-application-development" },
      { label: "UI/UX Design", href: "/services/ui-ux-design" },
      { label: "SaaS", href: "/services/saas-development" },
      { label: "API Integration", href: "/services/api-development" },
      { label: "Maintenance", href: "/services/software-maintenance-support" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Process", href: "/process" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Case Studies", href: "/case-studies" },
      { label: "Blog", href: "/blog" },
      { label: "Guides", href: "/resources" },
      { label: "Engineering", href: "/resources/software-engineering" },
    ],
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
            <div className="flex items-center">
              <img
                src={logo}
                alt="ClickMasters"
                className="h-12 w-auto object-contain"
              />
            </div>

            <p className="mt-6 text-white/55 max-w-sm leading-relaxed text-sm">
              ClickMasters is an application development company in USA serving
              businesses that need custom digital products and business
              applications.
            </p>
            <div className="mt-8">
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-3">
                Newsletter
              </div>
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
                <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-5">
                  {c.title}
                </div>
                <ul className="space-y-3">
                  {c.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-sm text-white/65 hover:text-white transition-colors"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="lg:col-span-3">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-5">
              Contact
            </div>
            <p className="text-sm leading-relaxed text-white/65">
              sales@clickmastersapplicationdevelopment.com
              <br />
              +44 7988 576086
              <br />
              +1 325 202 4074
              <br />
              San Francisco · Remote
            </p>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <div>
            © {new Date().getFullYear()} ClickMasters Application Development.
            All rights reserved.
          </div>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white/70">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white/70">
              Terms
            </Link>
            <Link href="/about/security" className="hover:text-white/70">
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
