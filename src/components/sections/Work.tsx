import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, RefreshCw } from "lucide-react";
import type { LiveProject } from "@/lib/cms/live-projects";
import { useLiveProjects } from "@/hooks/useLiveProjects";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { SectionHeading } from "../motion";

const MAX_TAGS = 6;
const SKELETON_COUNT = 6;
const GRID = "grid gap-6 sm:grid-cols-2 lg:grid-cols-3";

/** Stable hue per project so cards without a cover still look distinct. */
const hueOf = (slug: string) => [...slug].reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 360, 7);

function Placeholder({ project }: { project: LiveProject }) {
  const hue = hueOf(project.slug);
  return (
    <div
      aria-hidden
      className="absolute inset-0"
      style={{ background: `linear-gradient(135deg, hsl(${hue} 45% 22%), hsl(${(hue + 40) % 360} 40% 12%))` }}
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
            <div className="h-10 rounded" style={{ background: `hsl(${hue} 60% 60% / .55)` }} />
            <div className="h-10 rounded bg-white/10" /><div className="h-10 rounded bg-white/10" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Cover({ project }: { project: LiveProject }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted">
      {project.cover && !failed ? (
        <img
          src={project.cover}
          alt=""
          loading="lazy"
          decoding="async"
          width={800}
          height={600}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      ) : (
        <Placeholder project={project} />
      )}
    </div>
  );
}

function ProjectCard({ project }: { project: LiveProject }) {
  const reduce = useReducedMotion();
  const host = new URL(project.url).hostname.replace(/^www\./, "");
  const extraTags = project.stack.length - MAX_TAGS;
  return (
    <motion.li
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={reduce ? undefined : { y: -6 }}
        className="group flex h-full flex-col rounded-2xl border bg-card p-3 shadow-sm transition-shadow hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Cover project={project} />
        <div className="flex flex-1 flex-col p-3 pt-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">{project.eyebrow || project.status}</p>
              <h3 className="mt-1 text-lg font-semibold">{project.title}</h3>
            </div>
            <span aria-hidden className="grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all group-hover:rotate-45 group-hover:bg-primary group-hover:text-primary-foreground">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
          <p className="mt-2 line-clamp-4 text-sm text-muted-foreground">{project.summary}</p>
          <p className="mt-4 truncate text-sm font-medium text-brand">
            {host}
            <span className="sr-only"> (opens in a new tab)</span>
          </p>
          {project.stack.length > 0 && (
            <ul aria-label="Tech stack" className="mt-auto flex flex-wrap gap-1.5 pt-4">
              {project.stack.slice(0, MAX_TAGS).map((tag) => (
                <li key={tag}><Badge>{tag}</Badge></li>
              ))}
              {extraTags > 0 && <li><Badge>+{extraTags}</Badge></li>}
            </ul>
          )}
        </div>
      </motion.a>
    </motion.li>
  );
}

function Skeletons() {
  return (
    <ul aria-hidden className={GRID}>
      {Array.from({ length: SKELETON_COUNT }, (_, i) => (
        <li key={i} className="rounded-2xl border bg-card p-3 shadow-sm">
          <div className="aspect-[4/3] animate-pulse rounded-xl bg-muted" />
          <div className="space-y-3 p-3 pt-5">
            <div className="h-3 w-1/3 animate-pulse rounded bg-muted" />
            <div className="h-5 w-2/3 animate-pulse rounded bg-muted" />
            <div className="h-3 w-full animate-pulse rounded bg-muted" />
            <div className="h-3 w-5/6 animate-pulse rounded bg-muted" />
          </div>
        </li>
      ))}
    </ul>
  );
}

function Notice({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-md rounded-2xl border bg-card p-8 text-center shadow-sm">{children}</div>;
}

export function Work() {
  const { state, retry } = useLiveProjects();
  return (
    <section id="work" className="scroll-mt-20 py-24" aria-busy={state.status === "loading"}>
      <div className="container">
        <SectionHeading eyebrow="Our Works" title={<>Live projects, <em className="text-brand">made with care</em></>} intro="Platforms, apps and products we've designed, engineered and shipped — live today." />
        {state.status === "loading" && (
          <>
            <p role="status" className="sr-only">Loading live projects…</p>
            <Skeletons />
          </>
        )}
        {state.status === "error" && (
          <Notice>
            <p role="alert" className="text-muted-foreground">We couldn't load our live projects right now.</p>
            <Button variant="outline" className="mt-5" onClick={retry}>
              <RefreshCw /> Try again
            </Button>
          </Notice>
        )}
        {state.status === "ready" &&
          (state.projects.length > 0 ? (
            <ul className={GRID}>
              {state.projects.map((project) => <ProjectCard key={project.slug} project={project} />)}
            </ul>
          ) : (
            <Notice>
              <p className="text-muted-foreground">No live projects to show yet. Check back soon.</p>
            </Notice>
          ))}
      </div>
    </section>
  );
}
