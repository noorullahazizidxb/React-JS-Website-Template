import { describe, expect, it, vi } from "vitest";
import { loadLiveProjects, readCachedLiveProjects } from "./client";

const content = { liveProducts: [{ slug: "a", title: "A", summary: "S", surfaces: [{ url: "https://a.dev" }] }] };
const ok = () => new Response(JSON.stringify(content), { status: 200 });

const memoryStorage = () => {
  const data = new Map<string, string>();
  return { getItem: (k: string) => data.get(k) ?? null, setItem: (k: string, v: string) => void data.set(k, v) };
};

describe("loadLiveProjects", () => {
  it("retries failures with backoff, then caches the result", async () => {
    const storage = memoryStorage();
    const fetcher = vi
      .fn<typeof fetch>()
      .mockRejectedValueOnce(new TypeError("network"))
      .mockResolvedValueOnce(new Response("", { status: 503 }))
      .mockResolvedValueOnce(ok());
    const projects = await loadLiveProjects({ fetcher, storage, baseDelayMs: 0 });
    expect(fetcher).toHaveBeenCalledTimes(3);
    expect(projects.map((p) => p.slug)).toEqual(["a"]);
    expect(readCachedLiveProjects(storage)).toEqual(projects);
  });

  it("throws the last error once retries are exhausted", async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response("", { status: 500 }));
    await expect(loadLiveProjects({ fetcher, storage: memoryStorage(), retries: 1, baseDelayMs: 0 })).rejects.toThrow("CMS responded 500");
    expect(fetcher).toHaveBeenCalledTimes(2);
  });

  it("treats a malformed document as a failure", async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response("{}", { status: 200 }));
    await expect(loadLiveProjects({ fetcher, storage: memoryStorage(), retries: 0 })).rejects.toThrow(TypeError);
  });
});

describe("readCachedLiveProjects", () => {
  it("ignores missing or corrupt cache entries", () => {
    expect(readCachedLiveProjects(memoryStorage())).toBeUndefined();
    const storage = memoryStorage();
    storage.setItem("ourworks:cms-live-products:v1", "{nope");
    expect(readCachedLiveProjects(storage)).toBeUndefined();
    expect(readCachedLiveProjects(undefined)).toBeUndefined();
  });
});
