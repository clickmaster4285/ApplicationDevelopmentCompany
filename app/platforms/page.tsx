import { Metadata } from "next";
import Link from "next/link";
import platformsData from "@/content/platforms";
import { canonicalUrl } from "@/lib/site";
import { withEditedSeo } from "@/lib/cms/metadata";
import { normalizePageMarkdown } from "@/lib/markdown";

// Hub for the /platforms/[slug] pages (mirrors /solutions). Content pages
// link to /platforms/, which previously returned 404.
const baseMetadata: Metadata = {
  title: "Platform Development Services | ClickMasters",
  description:
    "Explore our platform development work across Salesforce, Shopify, WordPress, Stripe, SAP, HubSpot and more — integrations and custom builds done right.",
  alternates: {
    canonical: canonicalUrl("/platforms"),
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withEditedSeo("/platforms", baseMetadata);
}

export default function Page() {
  return (
    <main className="min-h-screen bg-[#050505] px-6 pb-24 pt-32 text-white">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-white/40">
          Application development
        </p>
        <h1 className="text-4xl font-medium tracking-tight md:text-6xl">
          Platform Development Services
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
          Custom development, integrations, and migrations on the commerce, CRM,
          ERP, and cloud platforms businesses already run on.
        </p>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {platformsData.pages.map((page) => {
            const title =
              normalizePageMarkdown(page.content).match(/^#\s+(.+)$/m)?.[1] ?? page.meta.title;

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
