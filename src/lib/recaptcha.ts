const SITE_KEY: string = import.meta.env.VITE_RECAPTCHA_SITE_KEY || "6Le88_ctAAAAAO3lfOo3F17MfgJvIak9ZGnq-YkG";

type Grecaptcha = { ready: (cb: () => void) => void; execute: (key: string, opts: { action: string }) => Promise<string> };
declare global { interface Window { grecaptcha?: Grecaptcha } }

let loader: Promise<Grecaptcha> | null = null;
function load(): Promise<Grecaptcha> {
  if (loader) return loader;
  loader = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
    s.async = true;
    s.onload = () => window.grecaptcha!.ready(() => resolve(window.grecaptcha!));
    s.onerror = () => { loader = null; reject(new Error("reCAPTCHA failed to load")); };
    document.head.appendChild(s);
  });
  return loader;
}

export function preloadRecaptcha() { load().catch(() => {}); }

/** Gets a v3 token and verifies it server-side. Resolves true when human. */
export async function verifyRecaptcha(action: string): Promise<boolean> {
  const g = await load();
  const token = await g.execute(SITE_KEY, { action });
  const r = await fetch("/api/verify-recaptcha", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token, action }) });
  const d = await r.json().catch(() => ({}));
  return r.ok && d.success === true;
}
