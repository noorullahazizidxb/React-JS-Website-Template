import { AtSign, Globe, Send } from "lucide-react";
import { Logo, BRAND } from "../Logo";
import { DevmindsProducts } from "../DevmindsProducts";

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
      <div className="container">
        <DevmindsProducts current="ourworks" />
      </div>
    </footer>
  );
}
