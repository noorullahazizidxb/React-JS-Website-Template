import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { testimonials } from "@/data";
import { Card, CardContent } from "../ui/card";
import { Reveal, SectionHeading, fadeUp } from "../motion";

export function Testimonials() {
  return (
    <section id="testimonials" className="scroll-mt-20 bg-secondary/50 py-24">
      <div className="container">
        <SectionHeading eyebrow="Testimonials" title="Trusted by teams who care about craft" />
        <Reveal as="ul" className="grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <motion.li key={t.name} variants={fadeUp}>
              <Card className="h-full">
                <CardContent className="flex h-full flex-col p-7">
                  <Quote aria-hidden className="h-6 w-6 text-brand" />
                  <blockquote className="mt-4 flex-1 font-display text-lg leading-relaxed">“{t.quote}”</blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <span aria-hidden className="grid h-10 w-10 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                      {t.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                    <span><span className="block text-sm font-semibold">{t.name}</span><span className="block text-xs text-muted-foreground">{t.role}</span></span>
                  </figcaption>
                </CardContent>
              </Card>
            </motion.li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
