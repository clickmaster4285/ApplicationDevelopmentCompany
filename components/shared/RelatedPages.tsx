import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getRelatedGroups } from "@/lib/related-pages";

/**
 * Server-rendered "Explore related pages" block. Links are computed at build
 * time from the content collections, so no content data ships to the client.
 */
export function RelatedPages({ url }: { url: string }) {
  const groups = getRelatedGroups(url);
  if (groups.length === 0) return null;

  return (
    <section
      aria-labelledby="related-pages-heading"
      className="relative border-t border-white/[0.04] py-16 md:py-24"
    >
      <div className="mx-auto w-[85vw] px-4 md:px-6">
        <div className="flex items-center gap-3 mb-10 md:mb-12">
          <h2
            id="related-pages-heading"
            className="text-chrome text-xl md:text-2xl lg:text-3xl font-medium tracking-tight"
          >
            Explore Related Pages
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent max-w-md" />
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <div key={group.key}>
              <h3 className="mb-4 text-[10px] uppercase tracking-[0.3em] text-white/40">
                {group.label}
              </h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      title={link.description || undefined}
                      className="group flex items-start justify-between gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-white/70 transition-colors hover:border-white/15 hover:bg-white/[0.04] hover:text-white"
                    >
                      <span className="leading-snug">{link.title}</span>
                      <ChevronRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-white/30 transition-colors group-hover:text-primary" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
