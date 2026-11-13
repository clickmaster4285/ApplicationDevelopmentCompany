import Script from "next/script";
import type { CSSProperties } from "react";
import { allowCustomJs } from "@/lib/cms/config";
import { sanitizeCss, sanitizeHtml } from "@/lib/cms/sanitize";
import type { CmsPage as CmsPageData } from "@/lib/cms/types";
import { CmsSectionRenderer } from "./CmsSectionRenderer";

/**
 * CSS custom properties consumed by CMS sections. Created pages always use
 * the site's own palette (globals.css tokens) so they match hand-built
 * pages; ERP design colors are intentionally not applied.
 */
const SITE_THEME_VARS: CSSProperties = {
  ["--cms-fg" as string]: "#ffffff",
  ["--cms-fg-muted" as string]: "rgba(255,255,255,0.5)",
  ["--cms-border" as string]: "rgba(255,255,255,0.06)",
  ["--cms-card" as string]: "rgba(255,255,255,0.02)",
};

export function CmsPage({ page }: { page: CmsPageData }) {
  const css = sanitizeCss(page.customCode?.css);
  const html = sanitizeHtml(page.customCode?.html);
  const js = typeof page.customCode?.js === "string" ? page.customCode.js.trim() : "";

  return (
    <main
      data-cms-page={page.pageType ?? "page"}
      className="min-h-screen bg-[#050505] pt-[72px] text-white selection:bg-white/20"
      style={SITE_THEME_VARS}
    >
      {/* sanitizeCss strips "<" so the CSS cannot close the <style> element. */}
      {css && <style dangerouslySetInnerHTML={{ __html: css }} />}
      <CmsSectionRenderer sections={page.sections} posts={Array.isArray(page.context?.posts) ? page.context.posts : []} />
      {html && <div data-cms-custom-html dangerouslySetInnerHTML={{ __html: html }} />}
      {/* customCode.js runs only with explicit opt-in (CMS_ALLOW_CUSTOM_JS=true). */}
      {js && allowCustomJs() && (
        <Script id={`cms-custom-js-${(page.slug ?? "page").replace(/[^a-z0-9-]/gi, "-")}`} strategy="afterInteractive">
          {js}
        </Script>
      )}
    </main>
  );
}
