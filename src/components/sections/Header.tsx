import { useEffect, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "../Logo";
import { ThemeToggle } from "../ThemeToggle";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#testimonials", label: "Clients" },
];

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const on = () => {
      const y = window.scrollY + window.innerHeight * 0.35;
      let cur: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) cur = id;
      }
      const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (nearBottom && !document.getElementById("contact")) cur = ids[ids.length - 1];
      setActive(cur);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); };
  }, [ids]);
  return active;
}

const sectionIds = links.map((l) => l.href.slice(1));

function NavLink({ href, label, active, layoutId, reduce, onClick, className }: { href: string; label: string; active: boolean; layoutId: string; reduce: boolean | null; onClick?: () => void; className?: string }) {
  return (
    <a href={href} onClick={onClick} aria-current={active ? "location" : undefined} className={cn("group relative inline-block transition-colors hover:text-foreground", active && "text-foreground", className)}>
      {label}
      <span aria-hidden className={cn("pointer-events-none absolute inset-x-0 -bottom-1.5 h-0.5 origin-left scale-x-0 rounded-full bg-primary/40 transition-transform group-hover:scale-x-100", reduce ? "duration-0" : "duration-300 ease-out", active && "opacity-0")} />
      {active && (
        <motion.span aria-hidden layoutId={layoutId} className="pointer-events-none absolute inset-x-0 -bottom-1.5 h-0.5 rounded-full bg-primary" transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34, mass: 0.6 }} />
      )}
    </a>
  );
}

export function Header() {
  const active = useActiveSection(sectionIds);
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-300", scrolled ? "border-b bg-background/80 backdrop-blur-xl" : "bg-transparent")}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground">Skip to content</a>
      <div className="container flex h-16 items-center justify-between gap-4">
        <a href="#top" aria-label="Our Works In DevMinds.net home"><Logo /></a>
        <nav aria-label="Primary" className="hidden md:block">
          <LayoutGroup id="desktop-nav"><ul className="flex items-center gap-8 text-sm text-muted-foreground">
            {links.map((l) => (
              <li key={l.href}><NavLink {...l} active={active === l.href.slice(1)} layoutId="nav-underline" reduce={reduce} /></li>
            ))}
          </ul></LayoutGroup>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild size="sm" className="hidden sm:inline-flex"><a href="#contact">Start a project</a></Button>
          <Button variant="ghost" size="icon" className="md:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen((o) => !o)}>
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav id="mobile-nav" aria-label="Mobile" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-b bg-background md:hidden">
            <ul className="container flex flex-col gap-1 py-4">
              {[...links, { href: "#contact", label: "Start a project" }].map((l) => (
                <li key={l.href} className="rounded-lg px-2 py-3 text-lg hover:bg-accent"><NavLink {...l} active={active === l.href.slice(1)} layoutId="mobile-nav-underline" reduce={reduce} onClick={() => setOpen(false)} /></li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
