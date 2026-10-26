"use client";

import { Reveal, WordReveal } from "@/components/motion";
import { DATA } from "@/data/resume";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useRef, useState } from "react";

function CopyEmail() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(DATA.contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${DATA.contact.email}`;
    }
  };

  return (
    <div className="inline-flex max-w-full items-center rounded-full border border-border bg-card p-1 pl-5">
      <a
        href={`mailto:${DATA.contact.email}`}
        className="truncate pr-3 text-sm transition-colors hover:text-brand sm:text-base"
      >
        {DATA.contact.email}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label="Copy email address"
        className="relative inline-flex size-9 flex-none cursor-pointer items-center justify-center rounded-full bg-foreground text-background transition-transform active:scale-95"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={copied ? "check" : "copy"}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {copied ? <Check className="size-4" /> : <Copy className="size-3.5" />}
          </motion.span>
        </AnimatePresence>
      </button>
      <span role="status" className="sr-only">
        {copied ? "Email copied" : ""}
      </span>
    </div>
  );
}

export default function ContactSection() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const inView = useInView(headingRef, { once: true, margin: "-80px" });
  const socials = Object.values(DATA.contact.social).filter((s) => s.navbar);

  return (
    <div className="flex flex-col gap-10">
      <h2
        ref={headingRef}
        className="font-dot text-5xl leading-[0.9] font-bold uppercase sm:text-7xl"
      >
        {inView ? (
          <>
            <WordReveal text="Let's build" />
            <br />
            <WordReveal text="something" delay={0.16} />{" "}
            <WordReveal
              text="good."
              delay={0.24}
              className="text-brand"
            />
          </>
        ) : (
          <span className="opacity-0">Let&apos;s build something good.</span>
        )}
      </h2>

      <Reveal delay={0.2} className="flex max-w-lg flex-col gap-8">
        <p className="text-pretty text-muted-foreground sm:text-lg">
          I&apos;m open to internships and full-time roles. If you have a
          project in mind, a question, or just want to say hello, my inbox is
          always open.
        </p>

        <div className="flex flex-col gap-5">
          <div>
            <CopyEmail />
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {socials.map((social) => (
              <li key={social.name}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  {social.name}
                  <ArrowUpRight className="size-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </li>
            ))}
            <li>
              <a
                href={DATA.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                Résumé
                <ArrowUpRight className="size-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </li>
          </ul>
        </div>
      </Reveal>
    </div>
  );
}
