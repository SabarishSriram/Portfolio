"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { EASE_OUT } from "@/components/motion";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import { motion, useScroll, useSpring } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LINKS = [
  { id: "about", label: "About", className: "hidden sm:block" },
  { id: "work", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
    // Sections opt in with data-nav="<link id>"; an empty value clears the pill.
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section[data-nav]"),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive((entry.target as HTMLElement).dataset.nav || null);
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [enabled]);

  return enabled ? active : null;
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[70] h-px origin-left bg-brand"
      style={{ scaleX }}
    />
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const active = useActiveSection(isHome);

  return (
    <>
      <ScrollProgress />
      <motion.header
        className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4"
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.2, ease: EASE_OUT }}
      >
        <nav className="pointer-events-auto flex items-center gap-0.5 rounded-full border border-border bg-card/75 p-1 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.25)] backdrop-blur-xl backdrop-saturate-150 dark:shadow-[0_8px_32px_-12px_rgba(0,0,0,0.8)]">
          <Link
            href="/"
            aria-label={`${DATA.name} – home`}
            className="px-3 font-dot text-xl leading-none font-bold transition-opacity hover:opacity-70"
          >
            {DATA.initials}
            <span className="text-brand">.</span>
          </Link>
          <span aria-hidden className="mx-1 h-4 w-px bg-border" />
          {LINKS.map((link) => (
            <Link
              key={link.id}
              href={isHome ? `#${link.id}` : `/#${link.id}`}
              className={cn(
                "relative rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground",
                active === link.id && "text-background hover:text-background",
                link.className,
              )}
            >
              {active === link.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-foreground"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative">{link.label}</span>
            </Link>
          ))}
          <span aria-hidden className="mx-1 h-4 w-px bg-border" />
          <ModeToggle />
        </nav>
      </motion.header>
    </>
  );
}
