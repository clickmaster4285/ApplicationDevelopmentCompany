import "server-only";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCmsPage, getCmsPages, getCmsSiteInfo } from "@/lib/cms/client";
import { createdPageMetadata, withEditedSeo } from "@/lib/cms/metadata";
import { normalizeSlug, slugToPath } from "@/lib/cms/slug";
import type { CmsColors, CmsSiteInfo } from "@/lib/cms/types";
import { CmsPage } from "./CmsPage";

export function siteColorsOf(site: CmsSiteInfo | null): CmsColors | undefined {
  if (!site) return undefined;
  return {
    primary: site.design?.colors?.primary ?? site.website?.primaryColor,
    secondary: site.design?.colors?.secondary ?? site.website?.secondaryColor,
  };
}

/**
 * A5 step 2/3: render the created page for `path`, or a normal 404.
 * Used by the root catch-all and as the fallback of code-owned dynamic
 * routes when they have no content of their own for a path.
 */
export async function renderCmsPageOrNotFound(path: string) {
  const slug = normalizeSlug(path);
  const page = await getCmsPage(slug);
  if (!page) notFound();
  const site = await getCmsSiteInfo();
  return <CmsPage page={page} siteColors={siteColorsOf(site)} />;
}

/** Metadata for the created page at `path` (with edited SEO on top), or `fallback`. */
export async function cmsMetadataOr(path: string, fallback: Metadata): Promise<Metadata> {
  const slug = normalizeSlug(path);
  const page = await getCmsPage(slug);
  if (!page) return fallback;

  const listed = (await getCmsPages()).find((p) => typeof p.slug === "string" && normalizeSlug(p.slug) === slug);
  const withNoindex = listed?.noindex === true ? { ...page, noindex: true } : page;
  return withEditedSeo(slugToPath(slug), createdPageMetadata(withNoindex, slug));
}
