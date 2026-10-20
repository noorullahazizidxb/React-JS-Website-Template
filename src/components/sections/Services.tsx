import { motion } from "framer-motion";
import { Compass, PenTool, Code2, Smartphone, Sparkles, LineChart } from "lucide-react";
import { services } from "@/data";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Reveal, SectionHeading, fadeUp } from "../motion";

const icons = [Compass, PenTool, Code2, Smartphone, Sparkles, LineChart];

export function Services() {
  return (
    <section id="services" className="scroll-mt-20 bg-secondary/50 py-24">
      <div className="container">
        <SectionHeading eyebrow="Services" title="End-to-end, under one roof" intro="From the first workshop to the hundredth release — strategy, design and engineering working as one team." />
        <Reveal as="ul" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = icons[i];
            return (
              <motion.li key={s.title} variants={fadeUp}>
                <Card className="group h-full transition-colors hover:border-gold/60">
                  <CardHeader>
                    <span className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-gold/15 text-gold transition-transform duration-500 group-hover:scale-110"><Icon className="h-5 w-5" /></span>
                    <CardTitle className="text-lg">{s.title}</CardTitle>
                    <CardDescription className="leading-relaxed">{s.body}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.li>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
