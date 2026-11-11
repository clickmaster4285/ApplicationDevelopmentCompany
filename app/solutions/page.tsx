import { Metadata } from "next";
import Link from "next/link";
import solutionsData from "@/content/solutions";
import { canonicalUrl } from "@/lib/site";
import { withEditedSeo } from "@/lib/cms/metadata";

const baseMetadata: Metadata = {
  title: "Application Solutions | ClickMasters",
  description:
    "Explore custom application solutions for business operations, customer experiences, and connected systems, built around real workflows and goals.",
  alternates: {
    canonical: canonicalUrl("/solutions"),
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withEditedSeo("/solutions", baseMetadata);
}

export default function Page() {
  return (
    <main className="min-h-screen bg-[#050505] px-6 pb-24 pt-32 text-white">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-white/40">
          Application development
        </p>
        <h1 className="text-4xl font-medium tracking-tight md:text-6xl">
          Application Solutions
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
          Explore custom software solutions for business operations, customer
          experiences, and connected systems.
        </p>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {solutionsData.pages.map((page) => {
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
