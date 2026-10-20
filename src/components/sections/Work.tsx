import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/data";
import { Badge } from "../ui/badge";
import { SectionHeading } from "../motion";
import { cn } from "@/lib/utils";

const filters = ["All", "Web", "Mobile", "Platform", "Brand"] as const;

function Artwork({ p }: { p: Project }) {
  return (
    <div
      aria-hidden
      className="relative aspect-[4/3] overflow-hidden rounded-xl"
      style={{ background: `linear-gradient(135deg, hsl(${p.hue} 45% 22%), hsl(${(p.hue + 40) % 360} 40% 12%))` }}
    >
      <div className="grain absolute inset-0 opacity-40" />
      <div className="absolute left-[10%] top-[14%] h-[72%] w-[80%] rounded-lg border border-white/15 bg-white/[0.07] shadow-2xl backdrop-blur transition-transform duration-700 group-hover:-translate-y-2 group-hover:scale-[1.03]">
        <div className="flex gap-1.5 border-b border-white/10 p-2.5">
          <span className="h-2 w-2 rounded-full bg-white/30" /><span className="h-2 w-2 rounded-full bg-white/20" /><span className="h-2 w-2 rounded-full bg-white/10" />
        </div>
        <div className="space-y-2 p-4">
          <div className="h-3 w-1/2 rounded bg-white/40" />
          <div className="h-2 w-3/4 rounded bg-white/15" />
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="h-10 rounded" style={{ background: `hsl(${p.hue} 60% 60% / .55)` }} />
            <div className="h-10 rounded bg-white/10" /><div className="h-10 rounded bg-white/10" />
          </div>
        </div>
      </div>
      <span className="absolute bottom-3 right-4 font-display text-5xl text-white/10">{p.year}</span>
    </div>
  );
}

export function Work() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const reduce = useReducedMotion();
  const list = projects.filter((p) => filter === "All" || p.category === filter);
  return (
    <section id="work" className="scroll-mt-20 py-24">
      <div className="container">
        <SectionHeading eyebrow="Our Works" title={<>Selected projects, <em className="text-gold">made with care</em></>} intro="A curated look at platforms, apps and brands we've designed and engineered with our partners." />
        <LayoutGroup>
          <div role="tablist" aria-label="Filter projects" className="mb-10 flex flex-wrap justify-center gap-2">
            {filters.map((f) => (
              <button key={f} role="tab" aria-selected={filter === f} onClick={() => setFilter(f)}
                className={cn("relative rounded-full px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", filter === f ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground")}>
                {filter === f && <motion.span layoutId="pill" className="absolute inset-0 rounded-full bg-primary" transition={{ type: "spring", bounce: 0.2, duration: 0.5 }} />}
                <span className="relative">{f}</span>
              </button>
            ))}
          </div>
          <motion.ul layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {list.map((p) => (
                <motion.li key={p.title} layout={!reduce}
                  initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
                  <motion.a href="#contact" whileHover={reduce ? undefined : { y: -6 }}
                    className="group block h-full rounded-2xl border bg-card p-3 shadow-sm transition-shadow hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <Artwork p={p} />
                    <div className="p-3 pt-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs uppercase tracking-widest text-muted-foreground">{p.client} · {p.category}</p>
                          <h3 className="mt-1 text-lg font-semibold">{p.title}</h3>
                        </div>
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all group-hover:rotate-45 group-hover:bg-primary group-hover:text-primary-foreground">
                          <ArrowUpRight className="h-4 w-4" />
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{p.summary}</p>
                      <p className="mt-4 text-sm font-medium text-gold">{p.metric}</p>
                      <div className="mt-4 flex flex-wrap gap-1.5">{p.tags.map((t) => <Badge key={t}>{t}</Badge>)}</div>
                    </div>
                  </motion.a>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </LayoutGroup>
      </div>
    </section>
  );
}
