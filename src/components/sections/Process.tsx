import { motion } from "framer-motion";
import { steps } from "@/data";
import { Reveal, Section, SectionHeading, fadeUp } from "../motion";

export function Process() {
  return (
    <Section id="process">
      <SectionHeading id="process" eyebrow="Process" title="A calm, transparent way of working" />
      <div className="relative">
        <span aria-hidden className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block" />
        <Reveal as="ul" className="relative grid gap-10 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
          {steps.map((s) => (
            <motion.li key={s.n} variants={fadeUp}>
              <span aria-hidden className="grid h-12 w-12 place-items-center rounded-full border bg-background font-display text-lg text-brand shadow-sm ring-4 ring-background">{s.n}</span>
              <h3 className="mt-5 text-xl font-semibold"><span className="sr-only">Step {s.n}: </span>{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </motion.li>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
