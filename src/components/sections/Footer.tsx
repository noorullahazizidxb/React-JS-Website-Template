import { AtSign, Globe, Send } from "lucide-react";
import { Logo, BRAND } from "../Logo";

const DEVMINDS_PRODUCTS = [
  { href: "https://devminds.net", label: "DevMinds — software studio" },
  { href: "https://marketplace.devminds.net", label: "DevMinds Marketplace — buy and sell online" },
  { href: "https://jobs.devminds.net", label: "DevMinds Jobs — jobs platform and education hub" },
  { href: "https://notes.devminds.net", label: "DevMinds Notes — note taking app" },
  { href: "https://budget-manager.devminds.net", label: "DevMinds Budget App — budget manager" },
  { href: "https://noorullah-azizi.devminds.net", label: "Noorullah Azizi — founder portfolio" },
];

export function Footer() {
  return (
    <footer className="border-t py-12">
      <div className="container flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Logo />
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">Design &amp; engineering studio crafting premium digital products.</p>
        </div>
        <div className="flex flex-col gap-4 sm:items-end">
          <ul className="flex gap-2">
            {[{ I: Globe, l: "Website" }, { I: AtSign, l: "Social" }, { I: Send, l: "Newsletter" }].map(({ I, l }) => (
              <li key={l}><a href="#top" aria-label={l} className="grid h-10 w-10 place-items-center rounded-full border text-muted-foreground transition-colors hover:text-foreground"><I className="h-4 w-4" /></a></li>
            ))}
          </ul>
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} {BRAND}. All rights reserved.</p>
        </div>
      </div>
      <nav aria-label="DevMinds products" className="container mt-8 border-t pt-6">
        <h2 className="text-sm font-semibold">DevMinds products</h2>
        <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {DEVMINDS_PRODUCTS.map((p) => (
            <li key={p.href}><a href={p.href} className="hover:text-foreground">{p.label}</a></li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}
