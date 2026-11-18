import { selectLiveProjects, type LiveProject } from "./live-projects";

export const CMS_CONTENT_URL = "https://devminds.net/cms/api/public/content?version=v3";

const CACHE_KEY = "ourworks:cms-live-products:v1";

export interface LoadOptions {
  url?: string;
  timeoutMs?: number;
  retries?: number;
  baseDelayMs?: number;
  fetcher?: typeof fetch;
  storage?: Pick<Storage, "getItem" | "setItem">;
}

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/** Storage can throw (private mode, quota, blocked cookies); caching is best effort. */
const safeStorage = (): LoadOptions["storage"] => {
  try {
    return window.localStorage;
  } catch {
    return undefined;
  }
};

/** Last successful result, shown instantly and used when the CMS is unreachable. */
export function readCachedLiveProjects(storage = safeStorage()): LiveProject[] | undefined {
  try {
    const raw = storage?.getItem(CACHE_KEY);
    return raw ? selectLiveProjects({ liveProducts: JSON.parse(raw) }) : undefined;
  } catch {
    return undefined;
  }
}

/** Stores the raw CMS rows so cached reads pass through the same validation. */
const writeCache = (storage: LoadOptions["storage"], liveProducts: unknown) => {
  try {
    storage?.setItem(CACHE_KEY, JSON.stringify(liveProducts));
  } catch {
    /* best effort */
  }
};

/**
 * Fetch live projects from the CMS with a per-attempt timeout and exponential
 * backoff. The CMS sends `Cache-Control: public, max-age=30` and allows this
 * origin via CORS, so the browser HTTP cache handles revalidation.
 */
export async function loadLiveProjects({
  url = CMS_CONTENT_URL,
  timeoutMs = 8000,
  retries = 2,
  baseDelayMs = 400,
  fetcher = fetch,
  storage = safeStorage(),
}: LoadOptions = {}): Promise<LiveProject[]> {
  let lastError: unknown;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      const response = await fetcher(url, {
        headers: { accept: "application/json" },
        signal: AbortSignal.timeout(timeoutMs),
      });
      if (!response.ok) throw new Error(`CMS responded ${response.status}`);
      const content = await response.json();
      const projects = selectLiveProjects(content);
      writeCache(storage, content.liveProducts);
      return projects;
    } catch (error) {
      lastError = error;
      if (attempt < retries) await sleep(baseDelayMs * 2 ** attempt);
    }
  }
  throw lastError instanceof Error ? lastError : new Error(String(lastError));
}
