import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Theme = "light" | "dark" | "system";
type Ctx = { theme: Theme; resolved: "light" | "dark"; setTheme: (t: Theme) => void };
const ThemeContext = createContext<Ctx | null>(null);
const mq = () => window.matchMedia("(prefers-color-scheme: dark)");

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => (localStorage.getItem("theme") as Theme) || "system");
  const [systemDark, setSystemDark] = useState(() => mq().matches);
  useEffect(() => {
    const m = mq();
    const on = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);
  const resolved = theme === "system" ? (systemDark ? "dark" : "light") : theme;
  useEffect(() => {
    document.documentElement.classList.toggle("dark", resolved === "dark");
  }, [resolved]);
  const setTheme = (t: Theme) => {
    localStorage.setItem("theme", t);
    setThemeState(t);
  };
  return <ThemeContext.Provider value={{ theme, resolved, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const c = useContext(ThemeContext);
  if (!c) throw new Error("useTheme must be inside ThemeProvider");
  return c;
}
