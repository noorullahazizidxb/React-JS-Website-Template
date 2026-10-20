import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Mail } from "lucide-react";
import { Button } from "../ui/button";
import { Input, Textarea } from "../ui/input";
import { Label } from "../ui/label";
import { Reveal, fadeUp } from "../motion";

export function Contact() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const body = `Name: ${d.get("name")}\nEmail: ${d.get("email")}\n\n${d.get("message")}`;
    window.location.href = `mailto:hello@devminds.net?subject=${encodeURIComponent("New project inquiry")}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };
  return (
    <section id="contact" className="scroll-mt-20 py-24">
      <div className="container">
        <Reveal className="relative overflow-hidden rounded-3xl bg-primary p-8 text-primary-foreground sm:p-14">
          <div aria-hidden className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-gold/30 blur-3xl" />
          <div className="relative grid gap-12 lg:grid-cols-2">
            <motion.div variants={fadeUp}>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] opacity-70">Start a project</p>
              <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">Have something ambitious in mind?</h2>
              <p className="mt-5 max-w-md opacity-80">Tell us about your idea. We reply within one business day with thoughtful next steps — no pressure, no jargon.</p>
              <a href="mailto:hello@devminds.net" className="mt-8 inline-flex items-center gap-2 underline-offset-4 hover:underline"><Mail className="h-4 w-4" /> hello@devminds.net</a>
            </motion.div>
            <motion.div variants={fadeUp} className="rounded-2xl bg-background p-6 text-foreground sm:p-8">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div key="ok" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex min-h-[300px] flex-col items-center justify-center text-center" role="status">
                    <CheckCircle2 className="h-12 w-12 text-gold" />
                    <p className="mt-4 text-xl font-semibold">Thank you!</p>
                    <p className="mt-1 text-sm text-muted-foreground">Your email app should open with your message.</p>
                  </motion.div>
                ) : (
                  <motion.form key="form" exit={{ opacity: 0 }} onSubmit={onSubmit} className="grid gap-5">
                    <div className="grid gap-2"><Label htmlFor="name">Name</Label><Input id="name" name="name" required autoComplete="name" placeholder="Jane Doe" /></div>
                    <div className="grid gap-2"><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" required autoComplete="email" placeholder="jane@company.com" /></div>
                    <div className="grid gap-2"><Label htmlFor="message">Project details</Label><Textarea id="message" name="message" required placeholder="What are you building?" /></div>
                    <Button type="submit" size="lg">Send inquiry <ArrowRight /></Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
