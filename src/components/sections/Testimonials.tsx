import { m } from "framer-motion";
import { Quote } from "lucide-react";
import { testimonials } from "@/data";
import { Card, CardContent } from "../ui/card";
import { fadeUp } from "@/lib/motion";
import { Reveal, Section, SectionHeading } from "../motion";

export function Testimonials() {
  return (
    <Section id="testimonials" tone="muted">
      <SectionHeading id="testimonials" eyebrow="Testimonials" title="Trusted by teams who care about craft" />
      <Reveal as="ul" className="grid gap-5 md:grid-cols-3">
        {testimonials.map((t) => (
          <m.li key={t.name} variants={fadeUp}>
            <Card className="h-full">
              <CardContent className="h-full p-7">
                <figure className="flex h-full flex-col">
                  <Quote aria-hidden className="h-6 w-6 text-brand" />
                  <blockquote className="mt-4 flex-1 font-display text-lg leading-relaxed">“{t.quote}”</blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t pt-5">
                    <span aria-hidden className="grid h-10 w-10 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                      {t.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                    <span><span className="block text-sm font-semibold">{t.name}</span><span className="block text-xs text-muted-foreground">{t.role}</span></span>
                  </figcaption>
                </figure>
              </CardContent>
            </Card>
          </m.li>
        ))}
      </Reveal>
    </Section>
  );
}
