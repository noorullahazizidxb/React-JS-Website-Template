import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2, Mail } from "lucide-react";
import { Button } from "../ui/button";
import { Input, Textarea } from "../ui/input";
import { Label } from "../ui/label";
import { crossfade, fadeUp, popIn } from "@/lib/motion";
import { Reveal } from "../motion";
import { preloadRecaptcha, verifyRecaptcha } from "../../lib/recaptcha";
import { CONTACT_EMAIL } from "@/data";

export function Contact() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => { preloadRecaptcha(); }, []);
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    setError(null);
    setBusy(true);
    try {
      if (!(await verifyRecaptcha("contact"))) { setError("We couldn't verify you're human. Please try again."); return; }
    } catch {
      setError("Verification is unavailable right now. Please email us directly."); return;
    } finally { setBusy(false); }
    const body = `Name: ${d.get("name")}\nEmail: ${d.get("email")}\n\n${d.get("message")}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("New project inquiry")}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };
  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-20 py-20 sm:py-28">
      <div className="container">
        <Reveal className="relative overflow-hidden rounded-3xl bg-primary p-6 text-primary-foreground shadow-2xl shadow-primary/20 sm:p-14">
          <div aria-hidden className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand-2/40 blur-3xl" />
          <div className="relative grid gap-10 lg:grid-cols-2 lg:gap-12">
            <m.div variants={fadeUp}>
              <p className="text-sm font-medium opacity-80">Start a project</p>
              <h2 id="contact-title" className="mt-4 font-display text-4xl leading-tight sm:text-5xl">Have something ambitious in mind?</h2>
              <p className="mt-5 max-w-md opacity-80">Tell us about your idea. We reply within one business day with thoughtful next steps — no pressure, no jargon.</p>
              <a href={`mailto:${CONTACT_EMAIL}`} className="mt-8 inline-flex min-h-10 items-center gap-2 rounded-sm underline-offset-4 hover:underline focus-visible:outline-current"><Mail aria-hidden className="h-4 w-4" /> {CONTACT_EMAIL}</a>
            </m.div>
            <m.div variants={fadeUp} className="rounded-2xl bg-background p-5 text-foreground shadow-xl sm:p-8">
              <AnimatePresence mode="wait" initial={false}>
                {sent ? (
                  <m.div key="ok" variants={crossfade} initial="hidden" animate="show" className="flex min-h-[300px] flex-col items-center justify-center text-center" role="status">
                    <m.span variants={popIn} className="grid h-16 w-16 place-items-center rounded-full bg-brand/10 text-brand ring-1 ring-inset ring-brand/20"><CheckCircle2 aria-hidden className="h-8 w-8" /></m.span>
                    <p className="mt-4 text-xl font-semibold">Thank you!</p>
                    <p className="mt-1 text-sm text-muted-foreground">Your email app should open with your message.</p>
                  </m.div>
                ) : (
                  <m.form key="form" variants={crossfade} exit="exit" onSubmit={onSubmit} className="grid gap-5">
                    <div className="grid gap-2"><Label htmlFor="name">Name</Label><Input id="name" name="name" required autoComplete="name" placeholder="Jane Doe" /></div>
                    <div className="grid gap-2"><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" required autoComplete="email" placeholder="jane@company.com" /></div>
                    <div className="grid gap-2"><Label htmlFor="message">Project details</Label><Textarea id="message" name="message" required placeholder="What are you building?" /></div>
                    {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
                    <Button type="submit" size="lg" disabled={busy} aria-busy={busy}>{busy ? <><Loader2 aria-hidden className="animate-spin motion-reduce:animate-none" /> Verifying…</> : <>Send inquiry <ArrowRight aria-hidden /></>}</Button>
                    <p className="text-xs text-muted-foreground">This site is protected by reCAPTCHA and the Google <a className="underline underline-offset-2 hover:text-foreground" href="https://policies.google.com/privacy">Privacy Policy</a> and <a className="underline underline-offset-2 hover:text-foreground" href="https://policies.google.com/terms">Terms of Service</a> apply.</p>
                  </m.form>
                )}
              </AnimatePresence>
            </m.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
