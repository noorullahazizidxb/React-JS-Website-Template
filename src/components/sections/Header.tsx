import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, LayoutGroup, m, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { contactLink, navLinks } from "@/data";
import { Logo } from "../Logo";
import { ThemeToggle } from "../ThemeToggle";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { crossfade, duration, panel, panelItem, spring } from "@/lib/motion";

/** Matches Tailwind's `lg` breakpoint, where the desktop nav takes over (it overflows at `md`). */
const DESKTOP_QUERY = "(min-width: 1024px)";

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

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <a href={href} aria-current={active ? "location" : undefined} className={cn("relative block rounded-full px-4 py-2.5 transition-colors hover:text-foreground", active && "text-foreground")}>
      {active && <m.span aria-hidden layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-primary/10 ring-1 ring-inset ring-primary/25" transition={spring.snappy} />}
      {label}
    </a>
  );
}

/** Reading progress along the header's bottom edge (transform only). */
function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, spring.soft);
  return <m.span aria-hidden style={{ scaleX: reduce ? scrollYProgress : smooth }} className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gradient-to-r from-brand to-brand-2" />;
}

export function Header() {
  const active = useActiveSection(sectionIds);
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
    <>
      <AnimatePresence>
        {open && <m.div aria-hidden key="scrim" variants={crossfade} initial="hidden" animate="show" exit="exit" onClick={close} className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm lg:hidden" />}
      </AnimatePresence>
      <header className={cn("fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300", solid ? "border-b bg-background/85 shadow-sm backdrop-blur-xl" : "border-b border-transparent bg-transparent")}>
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-10 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground">Skip to content</a>
        <div className="container flex h-16 items-center justify-between gap-4">
          <a href="#top" aria-label="Our Works In DevMinds.net home" className="inline-flex h-10 shrink-0 items-center rounded-md"><Logo /></a>
          <nav aria-label="Primary" className="hidden lg:block">
            <LayoutGroup id="desktop-nav">
              <ul className="isolate flex items-center gap-1 rounded-full border bg-card/60 p-1 text-sm text-muted-foreground shadow-sm backdrop-blur">
                {navLinks.map((l) => (
                  <li key={l.href}><NavLink {...l} active={active === l.href.slice(1)} /></li>
                ))}
              </ul>
            </LayoutGroup>
          </nav>
          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle className="hidden lg:flex" />
            <Button asChild size="sm" className="hidden h-10 sm:inline-flex"><a href={contactLink.href}>{contactLink.label}</a></Button>
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen((o) => !o)}>
              <AnimatePresence mode="wait" initial={false}>
                <m.span key={open ? "close" : "open"} initial={{ opacity: 0, rotate: -45 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 45 }} transition={{ duration: duration.fast }} className="grid place-items-center">
                  {open ? <X /> : <Menu />}
                </m.span>
              </AnimatePresence>
            </Button>
          </div>
        </div>
        <AnimatePresence>
          {open && (
            <m.nav id="mobile-nav" aria-label="Mobile" variants={panel} initial="hidden" animate="show" exit="hidden" className="lg:hidden">
              <ul className="container flex flex-col gap-1 pb-5 pt-2">
                {navLinks.map((l) => {
                  const current = active === l.href.slice(1);
                  return (
                    <m.li key={l.href} variants={panelItem}>
                      <a href={l.href} onClick={close} aria-current={current ? "location" : undefined} className={cn("block rounded-xl px-3 py-3 text-lg transition-colors hover:bg-accent", current ? "bg-primary/10 font-medium text-foreground" : "text-muted-foreground")}>{l.label}</a>
                    </m.li>
                  );
                })}
                <m.li variants={panelItem} className="flex items-center justify-between gap-4 rounded-xl px-3 py-2">
                  <span className="text-sm text-muted-foreground">Theme</span>
                  <ThemeToggle />
                </m.li>
                <m.li variants={panelItem} className="pt-2"><Button asChild size="lg" className="w-full"><a href={contactLink.href} onClick={close}>{contactLink.label}</a></Button></m.li>
              </ul>
            </m.nav>
          )}
        </AnimatePresence>
        <ScrollProgress />
      </header>
    </>
  );
}
