import type { Metadata } from "next";
import { cmsMetadataOr, renderCmsPageOrNotFound } from "@/components/cms/CmsRoute";

// A5 — catch-all for ERP-created pages. Code-owned routes (every other folder
// in app/) always take precedence over this dynamic segment; anything the
// ERP does not know about falls through to the normal 404.

export const revalidate = 60;

// Render on first visit, then cache (ISR) for `revalidate` seconds.
export async function generateStaticParams() {
  return [];
}

type Props = { params: Promise<{ slug: string[] }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return cmsMetadataOr(slug.join("/"), {});
}

export default async function CmsCatchAllPage({ params }: Props) {
  const { slug } = await params;
  return renderCmsPageOrNotFound(slug.join("/"));
}
