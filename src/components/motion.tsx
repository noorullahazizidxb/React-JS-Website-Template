import { m, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

const revealStagger = stagger();

/** Staggers its `fadeUp` children into view once, when the block scrolls into the viewport. */
export function Reveal({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: "div" | "ul" }) {
  const reduce = useReducedMotion();
  const Comp = as === "ul" ? m.ul : m.div;
  return (
    <Comp className={className} variants={revealStagger} initial={reduce ? "show" : "hidden"} whileInView="show" viewport={viewportOnce}>
      {children}
    </Comp>
  );
}

type SectionTone = "plain" | "muted";

/** Page section with the shared vertical rhythm and anchor offset for the fixed header. */
export function Section({ id, tone = "plain", busy, children }: { id: string; tone?: SectionTone; busy?: boolean; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} aria-busy={busy} className={cn("scroll-mt-20 py-20 sm:py-28", tone === "muted" && "border-y border-border/60 bg-secondary/50")}>
      <div className="container">{children}</div>
    </section>
  );
}

export function SectionHeading({ id, eyebrow, title, intro }: { id: string; eyebrow: string; title: ReactNode; intro?: string }) {
  return (
    <Reveal className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
      <m.p variants={fadeUp} className="mb-4 inline-flex items-center gap-2.5 text-sm font-medium text-brand">
        <span aria-hidden className="h-px w-6 bg-brand/60" />
        {eyebrow}
        <span aria-hidden className="h-px w-6 bg-brand/60" />
      </m.p>
      <m.h2 id={`${id}-title`} variants={fadeUp} className="font-display text-3xl leading-tight tracking-tight sm:text-5xl">{title}</m.h2>
      {intro && <m.p variants={fadeUp} className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground sm:text-lg">{intro}</m.p>}
    </Reveal>
  );
}
