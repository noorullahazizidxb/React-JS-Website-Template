import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowDownRight } from "lucide-react";
import { Button } from "../ui/button";
import { fadeUp, stagger } from "../motion";

const stats = [
  { v: "120+", l: "Products shipped" },
  { v: "14", l: "Countries served" },
  { v: "98%", l: "Client retention" },
  { v: "9 yrs", l: "Of craft" },
];

export function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, reduce ? 0 : 120]);
  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-32 sm:pt-40">
      <div aria-hidden className="grain absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <motion.div aria-hidden style={{ y }} className="absolute -top-40 left-1/2 h-[520px] w-[820px] max-w-[160vw] -translate-x-1/2 rounded-full bg-gold/20 blur-[120px]" />
      <motion.div className="container relative" variants={stagger} initial={reduce ? "show" : "hidden"} animate="show">
        <motion.p variants={fadeUp} className="mb-6 inline-flex items-center gap-2 rounded-full border bg-card/70 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" /> Selected works · 2024 — 2026
        </motion.p>
        <motion.h1 variants={fadeUp} className="max-w-4xl font-display text-[2.6rem] leading-[1.05] tracking-tight sm:text-7xl">
          We craft digital products with <em className="text-gold">quiet</em> confidence.
        </motion.h1>
        <motion.p variants={fadeUp} className="mt-6 max-w-xl text-lg text-muted-foreground">
          DevMinds is a design &amp; engineering studio building premium web platforms, mobile apps and brands for ambitious teams.
        </motion.p>
        <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-3">
          <Button asChild size="lg"><a href="#work">Explore our work <ArrowDownRight /></a></Button>
          <Button asChild size="lg" variant="outline"><a href="#contact">Book a call <ArrowRight /></a></Button>
        </motion.div>
        <motion.dl variants={fadeUp} className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.l} className="bg-background/90 p-6">
              <dt className="text-sm text-muted-foreground">{s.l}</dt>
              <dd className="mt-1 font-display text-3xl sm:text-4xl">{s.v}</dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>
    </section>
  );
}
