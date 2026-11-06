// Server-only helper that builds a "Related pages" link set for content
// collection pages. Goal: every detail page receives inbound links from
// several sibling pages and from other sections, not only from its hub.

import solutionsData from "@/content/solutions";
import industriesData from "@/content/industries";
import resourcesData from "@/content/resources";
import servicesData from "@/content/services";
import platformsData from "@/content/platforms";
import technologiesData from "@/content/technologies";
import compareData from "@/content/compare";
import costData from "@/content/cost";

export type SectionKey =
  | "solutions"
  | "industries"
  | "resources"
  | "services"
  | "platforms"
  | "technologies"
  | "compare"
  | "cost";

export interface RelatedLink {
  href: string;
  title: string;
  description: string;
}

export interface RelatedGroup {
  key: SectionKey;
  label: string;
  links: RelatedLink[];
}

interface RawPage {
  url: string;
  meta: { title: string; description: string };
  internalLinks?: string[];
  related?: Record<string, string | string[] | undefined>;
}

interface IndexedPage extends RelatedLink {
  section: SectionKey;
  /** Resource category (e.g. "qa-testing"); null for other sections. */
  category: string | null;
  isHub: boolean;
  raw: RawPage;
}

const SECTION_LABELS: Record<SectionKey, string> = {
  solutions: "Solutions",
  industries: "Industries",
  resources: "Resources",
  services: "Services",
  platforms: "Platforms",
  technologies: "Technologies",
  compare: "Comparisons",
  cost: "Cost Guides",
};

const SOURCES: Record<SectionKey, { pages: RawPage[] }> = {
  solutions: solutionsData as { pages: RawPage[] },
  industries: industriesData as { pages: RawPage[] },
  resources: resourcesData as { pages: RawPage[] },
  services: servicesData as { pages: RawPage[] },
  platforms: platformsData as { pages: RawPage[] },
  technologies: technologiesData as { pages: RawPage[] },
  compare: compareData as { pages: RawPage[] },
  cost: costData as { pages: RawPage[] },
};

/** Sections that each page links into, besides its own. */
const CROSS_SECTIONS: Record<SectionKey, SectionKey[]> = {
  solutions: ["industries", "resources", "services"],
  industries: ["solutions", "resources", "services"],
  resources: ["solutions", "industries", "services"],
  services: ["solutions", "industries", "resources"],
  platforms: ["solutions", "resources", "industries"],
  technologies: ["solutions", "resources", "industries"],
  compare: ["resources", "solutions", "industries"],
  cost: ["resources", "solutions", "industries"],
};

const SIBLINGS_EACH_SIDE = 3;
const CROSS_LINKS_PER_SECTION = 2;
const MAX_EXPLICIT = 6;

export function normalizePath(url: string): string {
  let path = url.trim();
  if (/^https?:\/\//.test(path)) {
    try {
      path = new URL(path).pathname;
    } catch {
      return "";
    }
  }
  path = path.split(/[?#]/)[0];
  if (!path.startsWith("/")) path = `/${path}`;
  if (path.length > 1) path = path.replace(/\/+$/, "");
  return path;
}

function cleanTitle(title: string): string {
  // "Agriculture Software Development | Clickmasters" -> "Agriculture Software Development"
  return title
    .replace(/\s*[|–-]\s*click\s*masters\s*$/i, "")
    .replace(/\s*\|\s*Honest Pricing Guide\s*$/i, "")
    .trim();
}

function hash(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

let cache: {
  bySection: Record<SectionKey, IndexedPage[]>;
  byPath: Map<string, IndexedPage>;
} | null = null;

function getIndex() {
  if (cache) return cache;
  const bySection = {} as Record<SectionKey, IndexedPage[]>;
  const byPath = new Map<string, IndexedPage>();

  for (const section of Object.keys(SOURCES) as SectionKey[]) {
    const list: IndexedPage[] = [];
    for (const raw of SOURCES[section].pages) {
      const href = normalizePath(raw.url);
      if (!href || byPath.has(href)) continue;
      const segments = href.split("/").filter(Boolean);
      const page: IndexedPage = {
        href,
        title: cleanTitle(raw.meta?.title ?? href),
        description: raw.meta?.description ?? "",
        section,
        category: section === "resources" ? segments[1] ?? null : null,
        isHub: section === "resources" ? segments.length <= 2 : segments.length <= 1,
        raw,
      };
      list.push(page);
      byPath.set(href, page);
    }
    list.sort((a, b) => a.href.localeCompare(b.href));
    bySection[section] = list;
  }

  cache = { bySection, byPath };
  return cache;
}

/** Pages on either side of `current` in `pool`, wrapping around. */
function neighbours(pool: IndexedPage[], current: string, eachSide: number) {
  const n = pool.length;
  const idx = pool.findIndex((p) => p.href === current);
  if (n === 0) return [];
  if (idx === -1) return pool.slice(0, eachSide * 2);
  const out: IndexedPage[] = [];
  for (let i = 1; i <= eachSide && out.length < n - 1; i++) {
    out.push(pool[(idx + i) % n]);
    if (out.length < n - 1) out.push(pool[(idx - i + n) % n]);
  }
  return out;
}

/**
 * Deterministic picks from another section. The offset is derived from the
 * current URL so inbound links spread evenly across the target section.
 */
function spreadPicks(pool: IndexedPage[], seed: string, count: number) {
  if (pool.length === 0) return [];
  const start = hash(seed) % pool.length;
  const step = Math.max(1, Math.floor(pool.length / count));
  const out: IndexedPage[] = [];
  for (let i = 0; i < count && i < pool.length; i++) {
    out.push(pool[(start + i * step) % pool.length]);
  }
  return out;
}

export function getRelatedGroups(url: string): RelatedGroup[] {
  const { bySection, byPath } = getIndex();
  const current = normalizePath(url);
  const page = byPath.get(current);
  if (!page) return [];

  const seen = new Set<string>([current]);
  const groups = new Map<SectionKey, RelatedLink[]>();
  const add = (p: IndexedPage | undefined) => {
    if (!p || seen.has(p.href)) return;
    seen.add(p.href);
    const list = groups.get(p.section) ?? [];
    list.push({ href: p.href, title: p.title, description: p.description });
    groups.set(p.section, list);
  };

  // 1. Hand-curated relations from the content data (only ones that resolve).
  const explicit: string[] = [];
  for (const value of Object.values(page.raw.related ?? {})) {
    if (Array.isArray(value)) explicit.push(...value);
    else if (typeof value === "string" && value) explicit.push(value);
  }
  explicit.push(...(page.raw.internalLinks ?? []));
  explicit
    .map((u) => byPath.get(normalizePath(u)))
    .filter((p): p is IndexedPage => Boolean(p))
    .slice(0, MAX_EXPLICIT)
    .forEach(add);

  // 2. Siblings in the same section (same category for resources).
  let siblingPool = bySection[page.section].filter((p) => !p.isHub);
  if (page.section === "resources" && page.category) {
    const sameCategory = siblingPool.filter((p) => p.category === page.category);
    if (sameCategory.length > 1) siblingPool = sameCategory;
  }
  if (page.isHub && page.section === "resources") {
    // A category hub lists its own articles elsewhere; link neighbouring
    // category hubs so every hub has inbound links from its peers.
    const hubs = bySection.resources.filter((p) => p.isHub && p.category);
    neighbours(hubs, current, 2).forEach(add);
  } else {
    neighbours(siblingPool, current, SIBLINGS_EACH_SIDE).forEach(add);
  }

  // 3. Cross-section links, spread deterministically.
  for (const target of CROSS_SECTIONS[page.section]) {
    const pool = bySection[target].filter((p) => !p.isHub);
    spreadPicks(pool, `${current}->${target}`, CROSS_LINKS_PER_SECTION).forEach(add);
  }

  const order: SectionKey[] = [
    page.section,
    ...CROSS_SECTIONS[page.section],
    ...(Object.keys(SECTION_LABELS) as SectionKey[]),
  ];
  return [...new Set(order)]
    .filter((key) => groups.has(key))
    .map((key) => ({ key, label: SECTION_LABELS[key], links: groups.get(key)! }));
}
