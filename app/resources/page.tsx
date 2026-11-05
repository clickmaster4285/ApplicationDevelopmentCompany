import { Metadata } from "next";
import Link from "next/link";
import resourcesData from "@/content/resources";
import { canonicalUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Resources | ClickMasters",
  description:
    "Explore ClickMasters' collection of resources, guides, insights, case studies, and digital marketing content to help grow your business online.",
  alternates: {
    canonical: canonicalUrl("/resources"),
  },
};

export default function ResourcesPage() {
  const categories = resourcesData.pages.filter((page) => {
    const segments = page.url
      .replace(/^\/+|\/+$/g, "")
      .replace("resources/", "")
      .split("/");
    return segments.length === 1;
  });

  return (
    <main className="min-h-screen bg-[#050505] px-6 pb-24 pt-32 text-white">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-white/40">
          Guides and insights
        </p>
        <h1 className="text-4xl font-medium tracking-tight md:text-6xl">
          Resources
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
          Browse practical guides and insights on application development,
          technology, and building digital products.
        </p>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((page) => {
            const title =
              page.content.match(/^#\s+(.+)$/m)?.[1] ?? page.meta.title;

            return (
              <li key={page.url}>
                <Link
                  href={page.url}
                  className="block rounded-xl border border-white/10 p-5 text-white/80 transition-colors hover:border-white/30 hover:text-white"
                >
                  <span className="block">{title}</span>
                  <span className="mt-3 block text-sm leading-relaxed text-white/50">
                    {page.meta.description}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
