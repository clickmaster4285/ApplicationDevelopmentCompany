import Script from "next/script";
import type { CSSProperties } from "react";
import { allowCustomJs } from "@/lib/cms/config";
import { safeColor, sanitizeCss, sanitizeHtml } from "@/lib/cms/sanitize";
import type { CmsColors, CmsPage as CmsPageData } from "@/lib/cms/types";
import { CmsSectionRenderer } from "./CmsSectionRenderer";

// Default accent when the ERP has no colors: the site's own "chrome" token.
const FALLBACK_PRIMARY = "var(--chrome)";

function readableOn(color: string | undefined): string {
  const hex = color?.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i)?.[1];
  if (!hex) return "#050505";
  const full = hex.length === 3 ? hex.split("").map((ch) => ch + ch).join("") : hex;
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16) / 255);
  const lin = (v: number) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  const luminance = 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  return luminance > 0.45 ? "#050505" : "#ffffff";
}

/** CSS custom properties consumed by CMS sections. */
export function cmsThemeVars(colors: CmsColors | undefined, fallback?: CmsColors): CSSProperties {
  const primary = safeColor(colors?.primary) ?? safeColor(fallback?.primary);
  const secondary = safeColor(colors?.secondary) ?? safeColor(fallback?.secondary);
  return {
    ["--cms-primary" as string]: primary ?? FALLBACK_PRIMARY,
    ["--cms-primary-fg" as string]: readableOn(primary ?? "#e8edf2"),
    ["--cms-secondary" as string]: secondary ?? "#0d0d0d",
    ["--cms-fg" as string]: "#ffffff",
    ["--cms-fg-muted" as string]: "rgba(255,255,255,0.62)",
    ["--cms-border" as string]: "rgba(255,255,255,0.1)",
    ["--cms-card" as string]: "rgba(255,255,255,0.03)",
  };
}

export function CmsPage({ page, siteColors }: { page: CmsPageData; siteColors?: CmsColors }) {
  const css = sanitizeCss(page.customCode?.css);
  const html = sanitizeHtml(page.customCode?.html);
  const js = typeof page.customCode?.js === "string" ? page.customCode.js.trim() : "";

  return (
    <main
      data-cms-page={page.pageType ?? "page"}
      className="min-h-screen bg-[#050505] pt-[72px] text-white selection:bg-white/20"
      style={cmsThemeVars(page.design?.colors, siteColors)}
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
