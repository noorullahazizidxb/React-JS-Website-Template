import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Globe, RefreshCw } from "lucide-react";
import type { LiveProject } from "@/lib/cms/live-projects";
import { useLiveProjects } from "@/hooks/useLiveProjects";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Section, SectionHeading } from "../motion";

const MAX_TAGS = 4;
const SKELETON_COUNT = 6;
const GRID = "grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7";

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
      <div className="absolute left-[10%] top-[14%] h-[72%] w-[80%] rounded-lg border border-white/15 bg-white/[0.07] shadow-2xl backdrop-blur transition-transform duration-700 group-hover:-translate-y-2 group-hover:scale-[1.03] motion-reduce:transition-none">
        <div className="flex gap-1.5 border-b border-white/10 p-2.5">
          <span className="h-2 w-2 rounded-full bg-white/30" /><span className="h-2 w-2 rounded-full bg-white/20" /><span className="h-2 w-2 rounded-full bg-white/10" />
        </div>
        <div className="space-y-2 p-4">
          <p className="truncate text-sm font-semibold text-white/85">{project.title}</p>
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
    <div className="relative aspect-[16/10] overflow-hidden border-b bg-muted">
      {project.cover && !failed ? (
        <img
          src={project.cover}
          alt=""
          loading="lazy"
          decoding="async"
          width={800}
          height={500}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transition-none"
        />
      ) : (
        <Placeholder project={project} />
      )}
      <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur">
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Live
      </span>
    </div>
  );
}

function ProjectCard({ project }: { project: LiveProject }) {
  const reduce = useReducedMotion();
  const host = new URL(project.url).hostname.replace(/^www\./, "");
  const extraTags = project.stack.length - MAX_TAGS;
  return (
    <motion.li
      className="h-full"
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      >
        <Cover project={project} />
        <div className="flex flex-1 flex-col p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">{project.eyebrow || project.status}</p>
          <div className="mt-2 flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold leading-snug">{project.title}</h3>
            <span aria-hidden className="grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-300 group-hover:rotate-45 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground motion-reduce:transition-none">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{project.summary}</p>
          {project.stack.length > 0 && (
            <ul aria-label="Tech stack" className="mt-auto flex flex-wrap gap-1.5 pt-5">
              {project.stack.slice(0, MAX_TAGS).map((tag) => (
                <li key={tag}><Badge>{tag}</Badge></li>
              ))}
              {extraTags > 0 && <li><Badge aria-label={`${extraTags} more technologies`}>+{extraTags}</Badge></li>}
            </ul>
          )}
        </div>
        <p className="flex items-center gap-2 border-t px-5 py-3.5 text-sm font-medium text-brand">
          <Globe aria-hidden className="h-4 w-4 shrink-0" />
          <span className="truncate">{host}</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </p>
      </a>
    </motion.li>
  );
}

function Skeletons() {
  return (
    <ul aria-hidden className={GRID}>
      {Array.from({ length: SKELETON_COUNT }, (_, i) => (
        <li key={i} className="overflow-hidden rounded-2xl border bg-card shadow-sm">
          <div className="aspect-[16/10] animate-pulse bg-muted" />
          <div className="space-y-3 p-5">
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
    <Section id="work" busy={state.status === "loading"}>
      <SectionHeading id="work" eyebrow="Our Works" title={<>Live projects, <em className="text-brand">made with care</em></>} intro="Platforms, apps and products we've designed, engineered and shipped — live today." />
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
    </Section>
  );
}
