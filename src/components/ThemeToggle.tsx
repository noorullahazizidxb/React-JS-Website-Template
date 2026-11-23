import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme, type Theme } from "./theme";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { cn } from "@/lib/utils";

const opts: { v: Theme; icon: typeof Sun; label: string }[] = [
  { v: "light", icon: Sun, label: "Light theme" },
  { v: "system", icon: Monitor, label: "System theme" },
  { v: "dark", icon: Moon, label: "Dark theme" },
];

const isTheme = (value: string): value is Theme => opts.some((o) => o.v === value);

/** Light / system / dark switch: a radio group with arrow-key navigation (Radix) and 40px targets. */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  return (
    <ToggleGroup
      type="single"
      value={theme}
      onValueChange={(value) => isTheme(value) && setTheme(value)}
      aria-label="Color theme"
      className={cn("gap-0.5 rounded-full border bg-card/60 p-0.5", className)}
    >
      {opts.map(({ v, icon: Icon, label }) => (
        <ToggleGroupItem
          key={v}
          value={v}
          aria-label={label}
          title={label}
          className="h-10 w-10 rounded-full p-0 text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:ring-2 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
        >
          <Icon aria-hidden />
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
