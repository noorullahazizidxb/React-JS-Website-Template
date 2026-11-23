import { useState, type ReactNode } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { ArrowUpRight, CloudOff, Globe, RefreshCw } from "lucide-react";
import type { LiveProject } from "@/lib/cms/live-projects";
import { useLiveProjects, type LiveProjectsState } from "@/hooks/useLiveProjects";
import { shouldFeatureLead } from "@/lib/grid";
import { cardHover, cardTap, crossfade, fadeUpAt, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { Section, SectionHeading } from "../motion";

const MAX_TAGS = 4;
const SKELETON_COUNT = 6;
/** Desktop column count; the lead card is featured when that completes the last row. */
const COLUMNS = 3;
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
    <div className="relative aspect-[16/10] shrink-0 overflow-hidden border-b bg-muted">
      {project.cover && !failed ? (
        <img
          src={project.cover}
          alt=""
          loading="lazy"
          decoding="async"
          width={800}
          height={500}
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transition-none"
        />
      ) : (
        <Placeholder project={project} />
      )}
      <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Live
      </span>
    </div>
  );
}

function ProjectCard({ project, featured, step }: { project: LiveProject; featured: boolean; step: number }) {
  const reduce = useReducedMotion();
  const host = new URL(project.url).hostname.replace(/^www\./, "");
  const extraTags = project.stack.length - MAX_TAGS;
  return (
    <m.li
      className={cn("h-full", featured && "sm:col-span-2")}
      variants={fadeUpAt}
      custom={step}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={viewportOnce}
    >
      <m.a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={cardHover}
        whileTap={cardTap}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm transition-[box-shadow,border-color] duration-300 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <Cover project={project} />
        <div className={cn("flex flex-1 flex-col p-5", featured && "sm:px-7")}>
          <p className="text-xs font-medium text-brand">{project.eyebrow || project.status}</p>
          <div className="mt-2 flex items-start justify-between gap-3">
            <h3 className={cn("text-lg font-semibold leading-snug", featured && "sm:font-display sm:text-3xl sm:font-normal sm:leading-tight")}>{project.title}</h3>
            <span aria-hidden className="grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-[transform,background-color,border-color,color] duration-300 group-hover:rotate-45 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground motion-reduce:transition-none">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
          <p className={cn("mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground", featured && "sm:line-clamp-2 sm:max-w-2xl sm:text-base")}>{project.summary}</p>
          {project.stack.length > 0 && (
            <ul aria-label="Tech stack" className="mt-auto flex flex-wrap gap-1.5 pt-5">
              {project.stack.slice(0, MAX_TAGS).map((tag) => (
                <li key={tag}><Badge>{tag}</Badge></li>
              ))}
              {extraTags > 0 && <li><Badge aria-label={`${extraTags} more technologies`}>+{extraTags}</Badge></li>}
            </ul>
          )}
        </div>
        <p className={cn("flex items-center gap-2 border-t px-5 py-3.5 text-sm font-medium text-brand", featured && "sm:px-7")}>
          <Globe aria-hidden className="h-4 w-4 shrink-0" />
          <span className="truncate">{host}</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </p>
      </m.a>
    </m.li>
  );
}

function ProjectGrid({ projects }: { projects: LiveProject[] }) {
  const featureLead = shouldFeatureLead(projects.length, COLUMNS);
  return (
    <ul className={GRID}>
      {projects.map((project, index) => {
        const featured = featureLead && index === 0;
        const cell = featureLead && index > 0 ? index + 1 : index;
        return <ProjectCard key={project.slug} project={project} featured={featured} step={cell % COLUMNS} />;
      })}
    </ul>
  );
}

function Skeletons() {
  return (
    <>
      <p role="status" className="sr-only">Loading live projects…</p>
      <ul aria-hidden className={GRID}>
        {Array.from({ length: SKELETON_COUNT }, (_, i) => (
          <li key={i} className="overflow-hidden rounded-2xl border bg-card shadow-sm">
            <Skeleton className="aspect-[16/10] rounded-none" />
            <div className="space-y-3 p-5">
              <Skeleton className="h-3 w-1/3" />
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

function Notice({ icon, title, children }: { icon?: ReactNode; title: string; children: ReactNode }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center rounded-2xl border bg-card p-8 text-center shadow-sm">
      {icon && <span aria-hidden className="mb-4 grid h-12 w-12 place-items-center rounded-full bg-brand/10 text-brand ring-1 ring-inset ring-brand/20">{icon}</span>}
      <p className="font-semibold">{title}</p>
      {children}
    </div>
  );
}

function WorkContent({ state, retry }: { state: LiveProjectsState; retry: () => void }) {
  switch (state.status) {
    case "loading":
      return <Skeletons />;
    case "error":
      return (
        <Notice icon={<CloudOff className="h-5 w-5" />} title="Live projects didn't load">
          <p role="alert" className="mt-2 text-sm text-muted-foreground">Our project list comes from the DevMinds CMS, which didn't respond. Check your connection and try again.</p>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <Button variant="outline" onClick={retry}><RefreshCw /> Try again</Button>
            <Button asChild variant="ghost"><a href="https://devminds.net/" target="_blank" rel="noopener noreferrer">Visit devminds.net <ArrowUpRight /><span className="sr-only"> (opens in a new tab)</span></a></Button>
          </div>
        </Notice>
      );
    case "ready":
      return state.projects.length > 0 ? (
        <ProjectGrid projects={state.projects} />
      ) : (
        <Notice title="No live projects yet">
          <p className="mt-2 text-sm text-muted-foreground">New launches appear here as soon as they go live. Check back soon.</p>
        </Notice>
      );
  }
}

export function Work() {
  const { state, retry } = useLiveProjects();
  return (
    <Section id="work" busy={state.status === "loading"}>
      <SectionHeading id="work" eyebrow="Our Works" title={<>Live projects, <em className="text-brand">made with care</em></>} intro="Platforms, apps and products we've designed, engineered and shipped — live today." />
      <AnimatePresence mode="wait" initial={false}>
        <m.div key={state.status} variants={crossfade} initial="hidden" animate="show" exit="exit">
          <WorkContent state={state} retry={retry} />
        </m.div>
      </AnimatePresence>
    </Section>
  );
}
