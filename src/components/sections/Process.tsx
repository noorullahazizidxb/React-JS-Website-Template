import { m } from "framer-motion";
import { steps } from "@/data";
import { drawX, fadeUp, stagger } from "@/lib/motion";
import { Reveal, Section, SectionHeading } from "../motion";

const stepStagger = stagger(0.14, 0.1);

export function Process() {
  return (
    <Section id="process">
      <SectionHeading id="process" eyebrow="Process" title="A calm, transparent way of working" />
      <Reveal className="relative">
        <m.span aria-hidden variants={drawX} className="absolute left-0 right-0 top-6 hidden h-px origin-left bg-gradient-to-r from-transparent via-brand/40 to-transparent md:block" />
        <m.ol variants={stepStagger} className="relative grid gap-10 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
          {steps.map((s) => (
            <m.li key={s.n} variants={fadeUp}>
              <span aria-hidden className="grid h-12 w-12 place-items-center rounded-full border bg-background font-display text-lg text-brand shadow-sm ring-4 ring-background">{s.n}</span>
              <h3 className="mt-5 text-xl font-semibold"><span className="sr-only">Step {s.n}: </span>{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </m.li>
          ))}
        </m.ol>
      </Reveal>
    </Section>
  );
}
