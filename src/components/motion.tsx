import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

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

export function SectionHeading({ eyebrow, title, intro }: { eyebrow: string; title: ReactNode; intro?: string }) {
  return (
    <Reveal className="mx-auto mb-14 max-w-2xl text-center">
      <motion.p variants={fadeUp} className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-brand">{eyebrow}</motion.p>
      <motion.h2 variants={fadeUp} className="font-display text-3xl leading-tight tracking-tight sm:text-5xl">{title}</motion.h2>
      {intro && <motion.p variants={fadeUp} className="mt-4 text-muted-foreground sm:text-lg">{intro}</motion.p>}
    </Reveal>
  );
}
