import { describe, expect, it } from "vitest";
import { DESKTOP_GRID_COLUMNS, DESKTOP_GRID_ROWS, DEVMINDS_PRODUCTS, desktopSpan } from "./devminds-products";

describe("More from DevMinds desktop grid", () => {
  it("fills exactly two full rows of the 12-column grid", () => {
    const total = DEVMINDS_PRODUCTS.reduce((sum, product) => sum + desktopSpan(product), 0);
    expect(total).toBe(DESKTOP_GRID_COLUMNS * DESKTOP_GRID_ROWS);
  });

  it("breaks rows only between cards, in list order", () => {
    let used = 0;
    for (const product of DEVMINDS_PRODUCTS) {
      const span = desktopSpan(product);
      const remaining = DESKTOP_GRID_COLUMNS - (used % DESKTOP_GRID_COLUMNS);
      expect(span).toBeLessThanOrEqual(remaining);
      used += span;
    }
  });
});
