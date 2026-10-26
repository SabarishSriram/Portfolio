"use client";

import { useMounted } from "@/lib/use-mounted";
import { cn } from "@/lib/utils";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/** Fades, lifts and un-blurs its children the first time they scroll into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 16,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.8, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}

/** Slides each word up from behind a mask, staggered. Plays on mount. */
export function WordReveal({
  text,
  className,
  delay = 0,
  stagger = 0.08,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const words = text.split(" ");
  return (
    <span className={cn("inline-block", className)}>
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden
          className="inline-block overflow-hidden pr-[0.08em] pb-[0.14em] -mb-[0.14em] align-bottom"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1, delay: delay + i * stagger, ease: EASE_OUT }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </span>
  );
}

/** Types each phrase out, holds, deletes it, then moves on. Red block caret. */
export function Typewriter({
  words,
  className,
}: {
  words: readonly string[];
  className?: string;
}) {
  // Only trust the motion preference after mount so the first client render
  // matches the server HTML (the server can't know the preference).
  const mounted = useMounted();
  const prefersReduced = useReducedMotion();
  const reduceMotion = mounted && prefersReduced;
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const word = words[index];

  useEffect(() => {
    if (reduceMotion) return;
    const done = !deleting && length === word.length;
    const empty = deleting && length === 0;
    const delay = done ? 1800 : empty ? 300 : deleting ? 35 : 70;
    const id = setTimeout(() => {
      if (done) setDeleting(true);
      else if (empty) {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      } else setLength((l) => l + (deleting ? -1 : 1));
    }, delay);
    return () => clearTimeout(id);
  }, [deleting, length, word, words.length, reduceMotion]);

  return (
    <span className={className}>
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden>{reduceMotion ? words[0] : word.slice(0, length)}</span>
      <span
        aria-hidden
        className="ml-0.5 inline-block h-[0.9em] w-[0.5em] translate-y-[0.1em] animate-pulse bg-brand"
      />
    </span>
  );
}

/** Counts up from zero to `value` once visible. */
export function Counter({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!inView || !node) return;
    if (reduceMotion) {
      node.textContent = value.toLocaleString();
      return;
    }
    const controls = animate(0, value, {
      duration: 1.6,
      ease: EASE_OUT,
      onUpdate: (v) => {
        node.textContent = Math.round(v).toLocaleString();
      },
    });
    return () => controls.stop();
  }, [inView, value, reduceMotion]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      0
    </span>
  );
}

/** Section header: red index, dot-matrix title, a hairline that draws in, an icon. */
export function SectionLabel({
  index,
  title,
  icon,
  className,
}: {
  index: string;
  title: string;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <motion.span
        className="font-mono text-xs text-brand"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        [{index}]
      </motion.span>
      <motion.h2
        className="font-dot text-3xl font-bold uppercase tracking-tight sm:text-4xl"
        initial={{ opacity: 0, x: -8 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: EASE_OUT }}
      >
        {title}
      </motion.h2>
      <motion.span
        aria-hidden
        className="h-px flex-1 origin-left bg-border"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.1, ease: EASE_OUT }}
      />
      {icon && (
        <span className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground [&_svg]:size-4">
          {icon}
        </span>
      )}
    </div>
  );
}
