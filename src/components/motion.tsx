import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export function Reveal({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: "div" | "ul" }) {
  const reduce = useReducedMotion();
  const Comp = as === "ul" ? motion.ul : motion.div;
  return (
    <Comp
      className={className}
      variants={stagger}
      initial={reduce ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
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
      <motion.p variants={fadeUp} className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-brand"><span aria-hidden className="h-px w-6 bg-brand/60" />{eyebrow}<span aria-hidden className="h-px w-6 bg-brand/60" /></motion.p>
      <motion.h2 id={`${id}-title`} variants={fadeUp} className="font-display text-3xl leading-tight tracking-tight sm:text-5xl">{title}</motion.h2>
      {intro && <motion.p variants={fadeUp} className="mt-4 text-pretty text-muted-foreground sm:text-lg">{intro}</motion.p>}
    </Reveal>
  );
}
