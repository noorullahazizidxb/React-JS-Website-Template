import { ArrowUp, Globe, Mail } from "lucide-react";
import { CONTACT_EMAIL, contactLink, navLinks } from "@/data";
import { Logo, BRAND } from "../Logo";
import { DevmindsProducts } from "../DevmindsProducts";

const socials = [
  { href: "https://devminds.net/", label: "DevMinds website", Icon: Globe },
  { href: `mailto:${CONTACT_EMAIL}`, label: `Email ${CONTACT_EMAIL}`, Icon: Mail },
] as const;

const footerLinkClass = "rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground";

export function Footer() {
  return (
    <footer className="border-t bg-secondary/30">
      <div className="container grid grid-cols-2 gap-10 py-14 lg:grid-cols-[1.6fr_1fr_1fr]">
        <div className="col-span-2 lg:col-span-1">
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">Design &amp; engineering studio crafting premium digital products.</p>
          <ul className="mt-6 flex gap-2">
            {socials.map(({ href, label, Icon }) => (
              <li key={href}>
                <a href={href} aria-label={label} title={label} className="grid h-10 w-10 place-items-center rounded-full border bg-card text-muted-foreground transition-colors hover:border-brand/50 hover:text-brand">
                  <Icon aria-hidden className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <nav aria-labelledby="footer-explore">
          <h2 id="footer-explore" className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Explore</h2>
          <ul className="mt-4 grid gap-3">
            {[...navLinks, contactLink].map((l) => (
              <li key={l.href}><a href={l.href} className={footerLinkClass}>{l.label}</a></li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Get in touch</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">We reply within one business day.</p>
          <a href={`mailto:${CONTACT_EMAIL}`} className="mt-3 inline-block rounded-sm text-sm font-medium text-brand underline-offset-4 hover:underline">{CONTACT_EMAIL}</a>
        </div>
      </div>
      <div className="container">
        <DevmindsProducts current="ourworks" />
      </div>
      <div className="container flex flex-col-reverse items-start gap-4 border-t py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} {BRAND}. All rights reserved.</p>
        <a href="#top" className={`inline-flex items-center gap-1.5 ${footerLinkClass}`}>Back to top <ArrowUp aria-hidden className="h-3.5 w-3.5" /></a>
      </div>
    </footer>
  );
}
