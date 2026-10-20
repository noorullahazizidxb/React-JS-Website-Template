import { useTheme } from "./theme";
import { cn } from "@/lib/utils";

/**
 * Brand logo — the ONLY place logos are referenced.
 * To swap: replace /public/logo-light.svg (shown on light backgrounds)
 * and /public/logo-dark.svg (shown on dark backgrounds). Keep the same
 * file names, or change the paths below.
 */
export const LOGO_LIGHT = "/logo-light.svg";
export const LOGO_DARK = "/logo-dark.svg";
export const BRAND = "DevMinds";

export function Logo({ className }: { className?: string }) {
  const { resolved } = useTheme();
  return (
    <img
      src={resolved === "dark" ? LOGO_DARK : LOGO_LIGHT}
      alt={BRAND}
      width={168}
      height={32}
      className={cn("h-8 w-auto", className)}
    />
  );
}
