import type { BezierDefinition, Transition, Variants } from "framer-motion";

/**
 * Motion tokens: the only place durations, easings and shared variants are defined.
 * Every variant animates transform/opacity only, so nothing in flow shifts layout.
 */

export const duration = { fast: 0.18, base: 0.32, slow: 0.6, draw: 1.1 } as const;

export const ease = {
  out: [0.22, 1, 0.36, 1],
  inOut: [0.65, 0, 0.35, 1],
} as const satisfies Record<string, BezierDefinition>;

export const spring = {
  /** Pills, indicators and hover lifts: quick to settle, no wobble. */
  snappy: { type: "spring", stiffness: 420, damping: 34, mass: 0.6 },
  /** Larger surfaces such as the scroll progress bar. */
  soft: { type: "spring", stiffness: 200, damping: 30, restDelta: 0.001 },
} as const satisfies Record<string, Transition>;

/** whileInView settings: play once, slightly before the element is fully on screen. */
export const viewportOnce = { once: true, margin: "0px 0px -80px 0px" } as const;

/** Parent variant that staggers its children's `hidden` → `show` transition. */
export const stagger = (gap = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: duration.slow, ease: ease.out } },
};

/** `fadeUp` delayed by `custom` steps; for items revealed individually (e.g. grid columns). */
export const fadeUpAt: Variants = {
  hidden: fadeUp.hidden,
  show: (step: number) => ({ opacity: 1, y: 0, transition: { duration: duration.slow, ease: ease.out, delay: step * 0.06 } }),
};

/** Draws a horizontal rule from its start edge. */
export const drawX: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: duration.draw, ease: ease.inOut } },
};

/** Swaps between mutually exclusive states (loading / error / content). Exit is faster than enter. */
export const crossfade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: duration.base, ease: ease.out } },
  exit: { opacity: 0, transition: { duration: duration.fast, ease: ease.inOut } },
};

/** Dropdown panels (mobile navigation) and their items. */
export const panel: Variants = {
  hidden: { opacity: 0, y: -8, transition: { duration: duration.fast, ease: ease.inOut } },
  show: { opacity: 1, y: 0, transition: { duration: duration.base, ease: ease.out, staggerChildren: 0.04, delayChildren: 0.04 } },
};

export const panelItem: Variants = {
  hidden: { opacity: 0, y: -4 },
  show: { opacity: 1, y: 0, transition: { duration: duration.base, ease: ease.out } },
};

/** Success confirmations: a short, settled pop. */
export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: spring.snappy },
};

/** Pointer feedback for clickable cards. */
export const cardHover = { y: -4, transition: spring.snappy } as const;
export const cardTap = { scale: 0.99 } as const;
