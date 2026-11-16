#!/usr/bin/env node
// Post-deploy / pre-audit verification.
//
//   node scripts/verify-deploy.mjs <baseUrl> [--all] [--markdown] [--concurrency=4]
//
//   <baseUrl>      e.g. http://127.0.0.1:3000 or https://clickmastersapplicationdevelopment.com
//   (default)      smoke test: a fixed set of key pages + every /_next/static
//                  asset they reference must return 200 with a JS/CSS type.
//   --all          check every URL listed in /sitemap_index.xml (sitemap <loc>
//                  hosts are rewritten to <baseUrl>), plus all their assets.
//   --markdown     also fail on raw Markdown visible in rendered text.
//
// Exit code 0 = all checks passed, 1 = failures (details printed).

const args = process.argv.slice(2);
const base = (args.find((a) => !a.startsWith("--")) || "").replace(/\/$/, "");
if (!base) {
  console.error("usage: node scripts/verify-deploy.mjs <baseUrl> [--all] [--markdown]");
  process.exit(2);
}
const ALL = args.includes("--all");
const MARKDOWN = args.includes("--markdown");
const CONCURRENCY = Number(args.find((a) => a.startsWith("--concurrency="))?.split("=")[1] || 4);
const SITE = "https://clickmastersapplicationdevelopment.com";

const SMOKE_PATHS = [
  "/",
  "/services",
  "/industries",
  "/industries/biotech",
  "/industries/fintech",
  "/solutions",
  "/solutions/crm-development",
  "/resources",
  "/compare",
  "/blog",
  "/contact",
  "/about",
  "/sitemap_index.xml",
];

async function fetchWithRetry(url, tries = 3) {
  let last;
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url, { redirect: "manual", signal: AbortSignal.timeout(60_000) });
      const body = await res.text();
      return { status: res.status, type: res.headers.get("content-type") || "", location: res.headers.get("location"), body };
    } catch (error) {
      last = error;
      await new Promise((r) => setTimeout(r, 500 * (i + 1)));
    }
  }
  return { status: 0, type: "", body: "", error: String(last) };
}

async function pool(items, fn) {
  let next = 0;
  const workers = Array.from({ length: Math.max(1, CONCURRENCY) }, async () => {
    while (next < items.length) {
      const item = items[next++];
      await fn(item);
    }
  });
  await Promise.all(workers);
}

function toLocal(loc) {
  return loc.startsWith(SITE) ? loc.slice(SITE.length) || "/" : loc.replace(/^https?:\/\/[^/]+/, "") || "/";
}

async function sitemapPaths() {
  const index = await fetchWithRetry(`${base}/sitemap_index.xml`);
  if (index.status !== 200) throw new Error(`sitemap_index.xml -> ${index.status}`);
  const maps = [...index.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => toLocal(m[1]));
  const paths = new Set();
  for (const map of maps) {
    const res = await fetchWithRetry(base + map);
    if (res.status !== 200) throw new Error(`${map} -> ${res.status}`);
    for (const m of res.body.matchAll(/<loc>([^<]+)<\/loc>/g)) paths.add(toLocal(m[1]));
  }
  return [...paths];
}

function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<head[\s\S]*?<\/head>/i, " ")
    .replace(/<(pre|code)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<(br|\/p|\/div|\/li|\/h\d|\/td|\/th|\/tr|\/span|\/a|\/button)[^>]*>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
}

const MARKDOWN_PATTERNS = {
  link: /\]\((\/|https?:|#)[^)\s]*\)/,
  bold: /\*\*\S[^*\n]{0,200}?\*\*|(^|\s)\*\*\s|\]\*\*/m,
  heading: /^\s{0,3}#{1,6}\s+\S/m,
  table: /^\s*\|.*\|\s*$/m,
};

function markdownHits(html) {
  const hits = {};
  for (const line of visibleText(html).split("\n")) {
    for (const [kind, re] of Object.entries(MARKDOWN_PATTERNS)) {
      if (re.test(line)) (hits[kind] ||= []).push(line.trim().slice(0, 140));
    }
  }
  return hits;
}

const failures = [];
const assets = new Map(); // asset path -> first page referencing it
let pagesChecked = 0;

const paths = ALL ? await sitemapPaths() : SMOKE_PATHS;
console.log(`Checking ${paths.length} page(s) on ${base} ...`);

await pool(paths, async (path) => {
  const res = await fetchWithRetry(base + path);
  pagesChecked++;
  if (res.status !== 200) {
    failures.push(`PAGE ${path} -> ${res.status}${res.location ? ` (Location: ${res.location})` : ""}${res.error ? ` ${res.error}` : ""}`);
    return;
  }
  if (!res.type.includes("html")) return;
  for (const m of res.body.matchAll(/\/_next\/static\/[^"'\s)\\<>]+/g)) {
    const asset = m[0].replace(/&amp;/g, "&");
    if (!assets.has(asset)) assets.set(asset, path);
  }
  if (MARKDOWN) {
    const hits = markdownHits(res.body);
    if (Object.keys(hits).length) failures.push(`MARKDOWN ${path} ${JSON.stringify(hits).slice(0, 400)}`);
  }
});

console.log(`Checking ${assets.size} referenced /_next/static asset(s) ...`);
await pool([...assets.keys()], async (asset) => {
  const res = await fetchWithRetry(base + asset);
  const okType =
    !/\.(js|css)(\?|$)/.test(asset) ||
    (asset.includes(".css") ? res.type.includes("text/css") : res.type.includes("javascript"));
  if (res.status !== 200 || !okType) {
    failures.push(`ASSET ${asset} -> ${res.status} ${res.type} (referenced by ${assets.get(asset)})`);
  }
});

console.log(`Pages: ${pagesChecked}, assets: ${assets.size}, failures: ${failures.length}`);
if (failures.length) {
  for (const f of failures.slice(0, 200)) console.log(`  FAIL ${f}`);
  process.exit(1);
}
console.log("OK");
