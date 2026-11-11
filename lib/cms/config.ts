// ERP/CMS configuration. Read from env only (never hard-coded).
//   CMS_API_URL      e.g. https://api.example-erp.com
//   CMS_SITE_DOMAIN  e.g. clickmastersapplicationdevelopment.com
//   CMS_ALLOW_CUSTOM_JS=true  opt in to executing page customCode.js (off by default)

export const CMS_REVALIDATE_SECONDS = 60;

export function getCmsConfig(): { apiUrl: string; domain: string } | null {
  const apiUrl = (process.env.CMS_API_URL ?? "").trim().replace(/\/+$/, "");
  const domain = (process.env.CMS_SITE_DOMAIN ?? "").trim().replace(/^https?:\/\//, "").replace(/\/+$/, "");

  if (!apiUrl || !domain) return null;
  if (!/^https?:\/\//i.test(apiUrl)) return null;

  return { apiUrl, domain };
}

export function cmsBaseUrl(): string | null {
  const config = getCmsConfig();
  if (!config) return null;
  return `${config.apiUrl}/public/${encodeURIComponent(config.domain)}`;
}

export function allowCustomJs(): boolean {
  return process.env.CMS_ALLOW_CUSTOM_JS === "true";
}

/** Dev-only warnings (set CMS_DEBUG=1 to also log in production). */
export function cmsWarn(...args: unknown[]): void {
  if (process.env.NODE_ENV !== "production" || process.env.CMS_DEBUG === "1") {
    console.warn("[cms]", ...args);
  }
}
