import { useTheme } from "./theme";
import { cn } from "@/lib/utils";

/**
 * Brand logo — the ONLY place logos are referenced.
 * Light = blue (light mode), dark = orange (dark mode).
 * Wide: one-line 284x32 wordmark. Compact: two-line 168x32 (used on narrow screens).
 */
export const LOGO_LIGHT = "/logo-light.svg";
export const LOGO_DARK = "/logo-dark.svg";
export const LOGO_LIGHT_COMPACT = "/logo-light-168x32.svg";
export const LOGO_DARK_COMPACT = "/logo-dark-168x32.svg";
export const BRAND = "DevMinds";
export const LOGO_ALT = "Our Works In DevMinds.net";

export function Logo({ className }: { className?: string }) {
  const { resolved } = useTheme();
  const dark = resolved === "dark";
  return (
    <span className={cn("inline-flex items-center", className)}>
      <img src={dark ? LOGO_DARK_COMPACT : LOGO_LIGHT_COMPACT} alt={LOGO_ALT} width={168} height={32} className="h-8 w-auto sm:hidden" />
      <img src={dark ? LOGO_DARK : LOGO_LIGHT} alt={LOGO_ALT} width={284} height={32} className="hidden h-8 w-auto sm:block" />
    </span>
  );
}
