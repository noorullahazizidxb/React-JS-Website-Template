import { describe, expect, it } from "vitest";
import { isCopySlug, selectLiveProjects } from "./live-projects";

const row = (slug: string, url: string, extra: Record<string, unknown> = {}) => ({
  slug,
  title: `Title ${slug}`,
  summary: `Summary ${slug}`,
  surfaces: [{ label: "Live", url }],
  ...extra,
});

describe("isCopySlug", () => {
  it.each(["a-copy", "a-copy-2", "A-COPY"])("flags %s", (slug) => expect(isCopySlug(slug)).toBe(true));
  it.each(["copy-writer", "a-copycat", "a"])("keeps %s", (slug) => expect(isCopySlug(slug)).toBe(false));
});

describe("selectLiveProjects", () => {
  it("rejects documents without a liveProducts array", () => {
    expect(() => selectLiveProjects(null)).toThrow(TypeError);
    expect(() => selectLiveProjects({ liveProducts: {} })).toThrow(TypeError);
  });

  it("maps fields and flattens a unique stack in CMS order", () => {
    const [p] = selectLiveProjects({
      liveProducts: [
        row("notes", "https://notes.devminds.net", {
          eyebrow: " Live on Vercel ",
          cover: "https://cdn.example/n.png",
          stackGroups: [{ items: ["React", "Vite"] }, { items: ["React", "Prisma", 3] }],
        }),
      ],
    });
    expect(p).toEqual({
      slug: "notes",
      title: "Title notes",
      eyebrow: "Live on Vercel",
      status: "Live",
      summary: "Summary notes",
      url: "https://notes.devminds.net/",
      cover: "https://cdn.example/n.png",
      stack: ["React", "Vite", "Prisma"],
    });
  });

  it("drops -copy slugs, rows without url or summary, and duplicate sites", () => {
    const slugs = selectLiveProjects({
      liveProducts: [
        row("market", "https://marketplace.devminds.net"),
        row("market-copy", "https://other.devminds.net"),
        row("markets", "https://www.marketplace.devminds.net/"),
        row("market", "https://third.devminds.net"),
        row("no-url", "javascript:alert(1)"),
        row("no-summary", "https://x.devminds.net", { summary: "  " }),
        "garbage",
        row("jobs", "https://jobs.devminds.net"),
      ],
    }).map((p) => p.slug);
    expect(slugs).toEqual(["market", "jobs"]);
  });

  it("uses the first valid surface and ignores an invalid cover", () => {
    const [p] = selectLiveProjects({
      liveProducts: [row("a", "not a url", { surfaces: [{ url: "" }, { url: "https://a.dev" }], cover: "data:x" })],
    });
    expect(p.url).toBe("https://a.dev/");
    expect(p.cover).toBeUndefined();
  });
});
