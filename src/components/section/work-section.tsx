/* eslint-disable @next/next/no-img-element */
"use client";

import { Reveal } from "@/components/motion";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

function Logo({ src, alt }: { src?: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="flex size-11 flex-none items-center justify-center rounded-xl border border-border bg-card font-dot text-xl font-bold text-muted-foreground sm:size-12">
        {alt.charAt(0)}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      // The image can fail before hydration attaches onError, so check on mount too.
      ref={(img) => {
        if (img?.complete && img.naturalWidth === 0) setFailed(true);
      }}
      onError={() => setFailed(true)}
      className="size-11 flex-none rounded-xl border border-border bg-white object-contain sm:size-12"
    />
  );
}

type Entry = {
  key: string;
  logo?: string;
  heading: string;
  href?: string;
  subheading: string;
  period: string;
  description?: string;
};

export function EntryList({
  entries,
  className,
}: {
  entries: Entry[];
  className?: string;
}) {
  return (
    <ul className={cn("flex flex-col", className)}>
      {entries.map((entry, i) => (
        <li key={entry.key}>
          <Reveal delay={i * 0.06}>
            <div className="group relative -mx-4 grid gap-x-6 gap-y-1 rounded-2xl px-4 py-5 transition-colors duration-300 hover:bg-foreground/[0.025] sm:grid-cols-[1fr_auto]">
              <div className="flex min-w-0 items-center gap-4">
                <Logo src={entry.logo} alt={entry.heading} />
                <div className="min-w-0">
                  <h3 className="text-lg font-medium leading-snug">
                    {entry.href ? (
                      <a
                        href={entry.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 after:absolute after:inset-0"
                      >
                        {entry.heading}
                        <ArrowUpRight className="size-3.5 -translate-x-1 text-muted-foreground opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                      </a>
                    ) : (
                      entry.heading
                    )}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {entry.subheading}
                  </p>
                </div>
              </div>
              <p className="pl-[3.75rem] font-mono text-xs text-muted-foreground sm:pt-1.5 sm:pl-0 sm:text-right">
                {entry.period}
              </p>
              {entry.description && (
                <p className="mt-2 text-sm leading-relaxed text-pretty text-muted-foreground sm:col-span-2 sm:pl-16">
                  {entry.description}
                </p>
              )}
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

export default function WorkSection() {
  const work: Entry[] = DATA.work.map((w) => ({
    key: w.company,
    logo: w.logoUrl,
    heading: w.company,
    subheading: `${w.title} · ${w.location}`,
    period: `${w.start} — ${w.end ?? "Present"}`,
    description: w.description,
  }));

  const leadership: Entry[] = DATA.leadership.map((l) => ({
    key: l.company,
    logo: l.logoUrl,
    heading: l.company,
    subheading: l.title,
    period: l.dates.replace(" - ", " — "),
    description: l.description,
  }));

  return (
    <div className="flex flex-col gap-10">
      <EntryList entries={work} />
      {leadership.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Leadership
          </p>
          <EntryList entries={leadership} />
        </div>
      )}
    </div>
  );
}

export function EducationSection() {
  const education: Entry[] = DATA.education.map((e) => ({
    key: e.school,
    logo: e.logoUrl,
    heading: e.school,
    href: e.href,
    subheading: e.degree,
    period: `${e.start} — ${e.end}`,
  }));

  return <EntryList entries={education} />;
}
