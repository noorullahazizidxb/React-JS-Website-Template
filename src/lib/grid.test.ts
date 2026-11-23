import { describe, expect, it } from "vitest";
import { shouldFeatureLead } from "./grid";

describe("shouldFeatureLead", () => {
  it("features the lead card when it completes the last row", () => {
    expect(shouldFeatureLead(11)).toBe(true);
    expect(shouldFeatureLead(5)).toBe(true);
  });

  it("keeps the grid uniform when rows already end full or need more than one cell", () => {
    expect(shouldFeatureLead(12)).toBe(false);
    expect(shouldFeatureLead(10)).toBe(false);
  });

  it("never features a single short row", () => {
    expect(shouldFeatureLead(2)).toBe(false);
    expect(shouldFeatureLead(0)).toBe(false);
  });

  it("supports other column counts", () => {
    expect(shouldFeatureLead(7, 2)).toBe(true);
    expect(shouldFeatureLead(8, 2)).toBe(false);
  });
});
