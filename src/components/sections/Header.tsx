import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { contactLink, navLinks } from "@/data";
import { Logo } from "../Logo";
import { ThemeToggle } from "../ThemeToggle";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

/** Matches Tailwind's `md` breakpoint, where the desktop nav takes over. */
const DESKTOP_QUERY = "(min-width: 768px)";

function useActiveSection(ids: readonly string[]) {
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

/** Closes the mobile menu on Escape and when the viewport grows to the desktop layout. */
function useDismissMenu(open: boolean, close: () => void) {
  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia(DESKTOP_QUERY);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    const onChange = (e: MediaQueryListEvent) => { if (e.matches) close(); };
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onChange);
    return () => { window.removeEventListener("keydown", onKey); mq.removeEventListener("change", onChange); };
  }, [open, close]);
}

const sectionIds = navLinks.map((l) => l.href.slice(1));

function NavLink({ href, label, active, reduce }: { href: string; label: string; active: boolean; reduce: boolean | null }) {
  return (
    <a href={href} aria-current={active ? "location" : undefined} className={cn("relative block rounded-full px-3.5 py-1.5 transition-colors hover:text-foreground", active && "text-foreground")}>
      {active && (
        <motion.span aria-hidden layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-primary/10 ring-1 ring-inset ring-primary/25" transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34, mass: 0.6 }} />
      )}
      {label}
    </a>
  );
}

export function Header() {
  const active = useActiveSection(sectionIds);
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  useDismissMenu(open, close);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const solid = scrolled || open;
  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300", solid ? "border-b bg-background/85 shadow-sm backdrop-blur-xl" : "border-b border-transparent bg-transparent")}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-10 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground">Skip to content</a>
      <div className="container flex h-16 items-center justify-between gap-4">
        <a href="#top" aria-label="Our Works In DevMinds.net home" className="shrink-0 rounded-md"><Logo /></a>
        <nav aria-label="Primary" className="hidden md:block">
          <LayoutGroup id="desktop-nav"><ul className="isolate flex items-center gap-1 rounded-full border bg-card/60 p-1 text-sm text-muted-foreground shadow-sm backdrop-blur">
            {navLinks.map((l) => (
              <li key={l.href}><NavLink {...l} active={active === l.href.slice(1)} reduce={reduce} /></li>
            ))}
          </ul></LayoutGroup>
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />
          <Button asChild size="sm" className="hidden sm:inline-flex"><a href={contactLink.href}>{contactLink.label}</a></Button>
          <Button variant="ghost" size="icon" className="md:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen((o) => !o)}>
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav id="mobile-nav" aria-label="Mobile" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden md:hidden">
            <ul className="container flex flex-col gap-1 pb-5 pt-2">
              {navLinks.map((l) => {
                const current = active === l.href.slice(1);
                return (
                  <li key={l.href}>
                    <a href={l.href} onClick={close} aria-current={current ? "location" : undefined} className={cn("block rounded-xl px-3 py-3 text-lg transition-colors hover:bg-accent", current ? "bg-primary/10 font-medium text-foreground" : "text-muted-foreground")}>{l.label}</a>
                  </li>
                );
              })}
              <li className="pt-3"><Button asChild size="lg" className="w-full"><a href={contactLink.href} onClick={close}>{contactLink.label}</a></Button></li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
