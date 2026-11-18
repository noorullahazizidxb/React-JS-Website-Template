/**
 * Live projects for the "Our Works" section.
 *
 * Source of truth: CMS `liveProducts` from
 * `GET https://devminds.net/cms/api/public/content?version=v3` (the same
 * payload devminds.net v3 and noor.devminds.net read). This module is pure:
 * it validates the untrusted JSON and maps it to view models.
 *
 * Hygiene, matching noor.devminds.net's `selectLiveProjects`:
 * - drop admin test duplicates whose slug ends in `-copy` / `-copy-N`
 * - drop rows without an http(s) live URL or a summary (no invented copy)
 * - drop later rows that repeat a slug or point at the same live URL
 * CMS order is preserved.
 */

export interface LiveProject {
  slug: string;
  title: string;
  eyebrow: string;
  status: string;
  summary: string;
  url: string;
  cover?: string;
  stack: string[];
}

const COPY_SLUG = /-copy(-\d+)?$/i;

export const isCopySlug = (slug: string): boolean => COPY_SLUG.test(slug);

type JsonRecord = Record<string, unknown>;

const isRecord = (value: unknown): value is JsonRecord =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const text = (value: unknown): string => (typeof value === "string" ? value.trim() : "");

const records = (value: unknown): JsonRecord[] => (Array.isArray(value) ? value.filter(isRecord) : []);

const httpUrl = (value: unknown): URL | undefined => {
  try {
    const url = new URL(text(value));
    return url.protocol === "https:" || url.protocol === "http:" ? url : undefined;
  } catch {
    return undefined;
  }
};

/** Two URLs are the same site when host (minus `www.`) and path match. */
const siteKey = (url: URL): string =>
  `${url.hostname.replace(/^www\./, "")}${url.pathname.replace(/\/+$/, "")}`.toLowerCase();

const stackOf = (product: JsonRecord): string[] => {
  const items = records(product.stackGroups).flatMap((group) =>
    Array.isArray(group.items) ? group.items.map(text) : [],
  );
  return [...new Set(items.filter(Boolean))];
};

/** Map one raw CMS row to a card, or `undefined` when it cannot be shown honestly. */
const toLiveProject = (product: JsonRecord): { key: string; card: LiveProject } | undefined => {
  const slug = text(product.slug);
  const title = text(product.title);
  const summary = text(product.summary);
  const url = records(product.surfaces).map((s) => httpUrl(s.url)).find(Boolean);
  if (!slug || !title || !summary || !url || isCopySlug(slug)) return undefined;
  return {
    key: siteKey(url),
    card: {
      slug,
      title,
      eyebrow: text(product.eyebrow),
      status: text(product.status) || "Live",
      summary,
      url: url.href,
      cover: httpUrl(product.cover)?.href,
      stack: stackOf(product),
    },
  };
};

/**
 * Validate a CMS content document and select its live projects.
 * Throws when the document is not shaped like CMS content, so callers can
 * fall back instead of rendering an empty list for a broken response.
 */
export function selectLiveProjects(content: unknown): LiveProject[] {
  if (!isRecord(content) || !Array.isArray(content.liveProducts)) {
    throw new TypeError("CMS content has no liveProducts array");
  }
  const seen = new Set<string>();
  const out: LiveProject[] = [];
  for (const raw of records(content.liveProducts)) {
    const project = toLiveProject(raw);
    if (!project) continue;
    const { key, card } = project;
    if (seen.has(card.slug) || seen.has(key)) continue;
    seen.add(card.slug).add(key);
    out.push(card);
  }
  return out;
}
