import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme, type Theme } from "./theme";
import { cn } from "@/lib/utils";

const opts: { v: Theme; icon: typeof Sun; label: string }[] = [
  { v: "light", icon: Sun, label: "Light theme" },
  { v: "system", icon: Monitor, label: "System theme" },
  { v: "dark", icon: Moon, label: "Dark theme" },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <div role="radiogroup" aria-label="Color theme" className="flex items-center gap-0.5 rounded-full border bg-card/60 p-1">
      {opts.map(({ v, icon: Icon, label }) => (
        <button
          key={v}
          role="radio"
          aria-checked={theme === v}
          aria-label={label}
          title={label}
          onClick={() => setTheme(v)}
          className={cn(
            "grid h-7 w-7 place-items-center rounded-full text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            theme === v && "bg-primary text-primary-foreground hover:text-primary-foreground",
          )}
        >
          <Icon className="h-3.5 w-3.5" />
        </button>
      ))}
    </div>
  );
}
