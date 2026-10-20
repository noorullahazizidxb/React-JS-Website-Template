import { motion } from "framer-motion";
import { steps } from "@/data";
import { Reveal, SectionHeading, fadeUp } from "../motion";

export function Process() {
  return (
    <section id="process" className="scroll-mt-20 py-24">
      <div className="container">
        <SectionHeading eyebrow="Process" title="A calm, transparent way of working" />
        <Reveal as="ul" className="relative grid gap-10 md:grid-cols-4 md:gap-6">
          <span aria-hidden className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block" />
          {steps.map((s) => (
            <motion.li key={s.n} variants={fadeUp} className="relative">
              <span className="relative grid h-12 w-12 place-items-center rounded-full border bg-background font-display text-lg text-gold">{s.n}</span>
              <h3 className="mt-5 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </motion.li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
