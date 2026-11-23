/**
 * Whether the first card should span two cells so the last row of a `columns`-wide grid ends full.
 * Only applies when one extra cell is exactly what the last row is missing.
 */
export const shouldFeatureLead = (count: number, columns = 3): boolean =>
  count > columns && count % columns === columns - 1;
