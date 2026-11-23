import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowDownRight } from "lucide-react";
import { Button } from "../ui/button";
import { fadeUp, stagger } from "@/lib/motion";

const stats = [
  { v: "120+", l: "Products shipped" },
  { v: "14", l: "Countries served" },
  { v: "98%", l: "Client retention" },
  { v: "9 yrs", l: "Of craft" },
];

/** Plays once after first paint; the headline and intro above it are never hidden (LCP). */
const entrance = stagger(0.12, 0.1);

export function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, reduce ? 0 : 120]);
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden pb-16 pt-28 sm:pb-24 sm:pt-40">
      <div aria-hidden className="grain absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <m.div aria-hidden style={{ y }} className="absolute -top-40 left-1/2 -z-10 h-[520px] w-[820px] max-w-[160vw] -translate-x-1/2 rounded-full bg-brand/20 blur-[120px]" />
      <m.div aria-hidden style={{ y }} className="absolute -top-24 right-[-10%] -z-10 h-[360px] w-[480px] max-w-[120vw] rounded-full bg-brand-2/15 blur-[120px]" />
      <div className="container">
        <p className="mb-6 inline-flex items-center gap-2.5 rounded-full border bg-card/70 px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur">
          <span aria-hidden className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60 motion-reduce:animate-none" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
          </span>
          Selected works, 2024–2026
        </p>
        <h1 id="hero-title" className="max-w-4xl font-display text-[clamp(2.5rem,7.2vw,5rem)] leading-[1.04] tracking-tight">
          We craft digital products with <em className="bg-gradient-to-r from-brand to-brand-2 bg-clip-text pr-1 text-transparent">quiet</em> confidence.
        </h1>
        <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
          DevMinds is a design &amp; engineering studio building premium web platforms, mobile apps and brands for ambitious teams.
        </p>
        <m.div variants={entrance} initial={reduce ? "show" : "hidden"} animate="show">
          <m.div variants={fadeUp} className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild size="lg" className="group shadow-lg shadow-primary/25">
              <a href="#work">Explore our work <ArrowDownRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5 motion-reduce:transition-none" /></a>
            </Button>
            <Button asChild size="lg" variant="outline" className="group bg-card/60 backdrop-blur">
              <a href="#contact">Book a call <ArrowRight className="transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none" /></a>
            </Button>
          </m.div>
          <m.dl variants={fadeUp} className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border bg-border shadow-sm sm:mt-20 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.l} className="flex flex-col-reverse bg-card/90 p-5 backdrop-blur sm:p-6">
                <dt className="mt-1 text-sm text-muted-foreground">{s.l}</dt>
                <dd className="font-display text-3xl text-foreground sm:text-4xl">{s.v}</dd>
              </div>
            ))}
          </m.dl>
        </m.div>
      </div>
    </section>
  );
}
