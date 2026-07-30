"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { allPages } from "@/content";

const logo = "/images/logo-white.webp";

// Helper to get clean label from title
const getCleanLabel = (title: string) => {
  // Remove "Company | Clickmasters" or similar suffixes
  let clean = title.split(" | ")[0];
  
  // Remove "Industry" from the end if present (for industry pages)
  clean = clean.replace(/\s+Industry$/i, "");
  
  // Remove common prefixes like "Top ", "Best ", "Professional " etc.
  clean = clean.replace(/^(Top|Best|Professional|Expert|Affordable|Leading)\s+/i, "");
  
  // Truncate if too long, but keep meaningful names
  if (clean.length > 35) {
    clean = clean.substring(0, 35) + "...";
  }
  
  return clean.trim();
};

// Get nav items from content data
const getNavItems = () => {
  const servicesPages = allPages.services?.pages || [];
  const solutionsPages = allPages.solutions?.pages || [];
  const industriesPages = allPages.industries?.pages || [];
  const technologiesPages = allPages.technologies?.pages || [];
  const platformsPages = allPages.platforms?.pages || [];
  const frameworksPages = allPages.frameworks?.pages || [];
  const locationsPages = allPages.locations?.pages || [];
  const comparePages = allPages.compare?.pages || [];
  const costPages = allPages.cost?.pages || [];
  const resourcesPages = allPages.resources?.pages || [];
  const aboutPages = allPages.about?.pages || [];
  const blogsPages = allPages.blogs?.pages || [];
  const caseStudiesPages = allPages.caseStudies?.pages || [];
  const ebooksPages = allPages.ebooks?.pages || [];

  return {
    services: servicesPages.map((page) => ({
      label: getCleanLabel(page.meta.title),
      href: page.url,
    })),
    solutions: solutionsPages.map((page) => ({
      label: getCleanLabel(page.meta.title),
      href: page.url,
    })),
    industries: industriesPages.map((page) => ({
      label: getCleanLabel(page.meta.title),
      href: page.url,
    })),
    technologies: technologiesPages.map((page) => ({
      label: getCleanLabel(page.meta.title),
      href: page.url,
    })),
    platforms: platformsPages.map((page) => ({
      label: getCleanLabel(page.meta.title),
      href: page.url,
    })),
    frameworks: frameworksPages.map((page) => ({
      label: getCleanLabel(page.meta.title),
      href: page.url,
    })),
    locations: locationsPages.map((page) => ({
      label: getCleanLabel(page.meta.title),
      href: page.url,
    })),
    compare: comparePages.map((page) => ({
      label: getCleanLabel(page.meta.title),
      href: page.url,
    })),
    cost: costPages.map((page) => ({
      label: getCleanLabel(page.meta.title),
      href: page.url,
    })),
    resources: resourcesPages.map((page) => ({
      label: getCleanLabel(page.meta.title),
      href: page.url,
    })),
    about: aboutPages.map((page) => ({
      label: getCleanLabel(page.meta.title),
      href: page.url,
    })),
    blogs: blogsPages.map((page) => ({
      label: getCleanLabel(page.meta.title),
      href: page.url,
    })),
    caseStudies: caseStudiesPages.map((page) => ({
      label: getCleanLabel(page.meta.title),
      href: page.url,
    })),
    ebooks: ebooksPages.map((page) => ({
      label: getCleanLabel(page.meta.title),
      href: page.url,
    })),
  };
};

// Main navigation structure
const getMainNav = () => {
  const navItems = getNavItems();

  return [
    {
      label: "Services",
      href: "/services",
      items: navItems.services,
      seeAll: "/services",
    },
    {
      label: "About",
      href: "/about",
      items: navItems.about,
      seeAll: "/about",
    },
    {
      label: "Solutions",
      href: "/solutions",
      items: navItems.solutions,
      seeAll: "/solutions",
    },
    {
      label: "Industries",
      href: "/industries",
      items: navItems.industries,
      seeAll: "/industries",
    },
    {
      label: "Resources",
      href: "/resources",
      items: navItems.resources,
      seeAll: "/resources",
    },
    {
      label: "Blogs",
      href: "/blog",
      items: navItems.blogs,
      seeAll: "/blog",
    },
    {
      label: "Case Studies",
      href: "/case-studies",
      items: navItems.caseStudies,
      seeAll: "/case-studies",
    },
    {
      label: "Ebooks",
      href: "/ebooks",
      items: navItems.ebooks,
      seeAll: "/ebooks",
    },
    {
      label: "Locations",
      href: "/locations",
      items: navItems.locations,
      seeAll: "/locations",
    },
  ];
};

// Sub-component for dropdown item
function DropdownItem({
  item,
  isMobile = false,
}: {
  item: any;
  isMobile?: boolean;
}) {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  return (
    <Link
      href={item.href}
      className={`
        block px-4 py-2 text-sm transition-colors rounded-lg
        ${
          isActive
            ? "text-white bg-white/10"
            : "text-white/70 hover:text-white hover:bg-white/5"
        }
        ${isMobile ? "text-base" : ""}
      `}
    >
      {item.label}
    </Link>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const mainNav = getMainNav();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const isActivePath = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-3 backdrop-blur-xl bg-black/40 border-b border-white/5"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="mx-auto w-[85vw] px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <img
            src={logo}
            alt="ClickMasters"
            className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {mainNav.map((item) => (
            <div
              key={item.label}
              className="relative group"
              onMouseEnter={() => setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {item.items && item.items.length > 0 ? (
                <>
                  <Link
                    href={item.href}
                    className={`px-4 py-2 text-xs uppercase tracking-[0.18em] transition-colors ${
                      isActivePath(item.href)
                        ? "text-white"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                  {/* Dropdown with scroll */}
                  <div className="absolute top-full left-0 pt-2 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl p-2 shadow-2xl">
                      <div className="h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                        {item.items.map((subItem: any) => (
                          <DropdownItem key={subItem.href} item={subItem} />
                        ))}
                      </div>
                      {/* Uncomment if you want "View All" link */}
                      {/* {item.seeAll && (
                        <Link
                          href={item.seeAll}
                          className="block px-4 py-2 text-xs text-white/40 hover:text-white/70 transition-colors border-t border-white/5 mt-1 pt-2 text-center"
                        >
                          View All {item.label} →
                        </Link>
                      )} */}
                    </div>
                  </div>
                </>
              ) : (
                <Link
                  href={item.href}
                  className={`px-4 py-2 text-xs uppercase tracking-[0.18em] transition-colors ${
                    isActivePath(item.href)
                      ? "text-white"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* CTA Button */}
        <Link
          href="/contact"
          className="hidden md:inline-block text-xs uppercase tracking-[0.18em] px-5 py-2.5 rounded-full bg-chrome text-[#050505] font-medium hover:shadow-[0_10px_40px_-10px_rgba(232,237,242,0.5)] transition-shadow"
        >
          Start a Project
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              mobileMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              mobileMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-x-0 top-[72px] bg-black/95 backdrop-blur-xl border-b border-white/5 transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-4 overflow-y-auto max-h-[80vh]">
          {mainNav.map((item) => (
            <div
              key={item.label}
              className="border-b border-white/5 last:border-0"
            >
              {item.items && item.items.length > 0 ? (
                <>
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      className="flex-1 px-4 py-3 text-sm uppercase tracking-[0.18em] text-white/60 hover:text-white transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                    <button
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === item.label ? null : item.label,
                        )
                      }
                      className="px-4 py-3 text-white/40 hover:text-white transition-colors"
                    >
                      <svg
                        className={`w-4 h-4 transition-transform duration-300 ${
                          activeDropdown === item.label ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>
                  <div
                    className={`overflow-y-auto transition-all duration-300 ${
                      activeDropdown === item.label ? "max-h-80" : "max-h-0"
                    }`}
                  >
                    <div className="pl-4 pb-2">
                      {item.items.map((subItem: any) => (
                        <DropdownItem
                          key={subItem.href}
                          item={subItem}
                          isMobile
                        />
                      ))}
                      {item.seeAll && (
                        <Link
                          href={item.seeAll}
                          className="block px-4 py-2 text-sm text-white/40 hover:text-white/70 transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          View All {item.label} →
                        </Link>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <Link
                  href={item.href}
                  className={`block px-4 py-3 text-sm uppercase tracking-[0.18em] transition-colors ${
                    isActivePath(item.href)
                      ? "text-white"
                      : "text-white/60 hover:text-white"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
          <Link
            href="/contact"
            className="block mt-4 px-4 py-3 text-sm uppercase tracking-[0.18em] text-center rounded-full bg-chrome text-[#050505] font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Start a Project
          </Link>
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </header>
  );
}