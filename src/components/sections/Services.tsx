import { motion } from "framer-motion";
import { Compass, PenTool, Code2, Smartphone, Sparkles, LineChart } from "lucide-react";
import { services } from "@/data";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Reveal, Section, SectionHeading, fadeUp } from "../motion";

const icons = [Compass, PenTool, Code2, Smartphone, Sparkles, LineChart];

export function Services() {
  return (
    <Section id="services" tone="muted">
      <SectionHeading id="services" eyebrow="Services" title="End-to-end, under one roof" intro="From the first workshop to the hundredth release — strategy, design and engineering working as one team." />
      <Reveal as="ul" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => {
          const Icon = icons[i];
          return (
            <motion.li key={s.title} variants={fadeUp}>
              <Card className="group h-full transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-brand/50 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                <CardHeader>
                  <span aria-hidden className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-brand/10 text-brand ring-1 ring-inset ring-brand/20 transition-transform duration-500 group-hover:scale-110 motion-reduce:transition-none"><Icon className="h-5 w-5" /></span>
                  <CardTitle className="text-lg">{s.title}</CardTitle>
                  <CardDescription className="leading-relaxed">{s.body}</CardDescription>
                </CardHeader>
              </Card>
            </motion.li>
          );
        })}
      </Reveal>
    </Section>
  );
}
