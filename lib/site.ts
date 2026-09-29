export const SITE_URL = "https://clickmastersapplicationdevelopment.com";

/** Absolute URL that matches the address Next.js serves (no trailing slash). */
export function canonicalUrl(path: string): string {
  let pathname = path || "/";

  if (pathname.startsWith("http://") || pathname.startsWith("https://")) {
    try {
      pathname = new URL(pathname).pathname;
    } catch {
      pathname = "/";
    }
  }

  if (!pathname.startsWith("/")) pathname = `/${pathname}`;
  if (pathname.length > 1) pathname = pathname.replace(/\/+$/, "");

  return `${SITE_URL}${pathname}`;
}
