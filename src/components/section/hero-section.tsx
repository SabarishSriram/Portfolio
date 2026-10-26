/* eslint-disable @next/next/no-img-element */
import { LocalTime } from "@/components/local-time";
import { DotMap } from "@/components/dot-map";
import { Icons } from "@/components/icons";
import { Counter, Reveal, Typewriter, WordReveal } from "@/components/motion";
import { DATA } from "@/data/resume";
import type { ActivityStats } from "@/lib/stats";
import { cn } from "@/lib/utils";
import { FileText, Terminal } from "lucide-react";

const WIDGET =
  "relative h-full overflow-hidden rounded-[1.75rem] border border-border bg-card";

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
      {children}
    </span>
  );
}

function PhotoWidget() {
  return (
    <div className={cn(WIDGET, "group")}>
      <img
        src={DATA.avatarUrl}
        alt={DATA.name}
        className="size-full object-cover transition duration-700 group-hover:scale-[1.04]"
      />
    </div>
  );
}

function MapWidget() {
  const city = DATA.location.split(",")[0];
  return (
    <a
      href={DATA.locationLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${DATA.location} on a map`}
      className={cn(WIDGET, "flex flex-col p-4 transition-colors hover:border-foreground/20 sm:p-5")}
    >
      <div className="flex items-center justify-between">
        <Label>
          <span className="text-foreground">{city}</span>
        </Label>
        <Label>
          <LocalTime timeZone={DATA.timezone} label={DATA.timezoneLabel} withSeconds={false} />
        </Label>
      </div>
      <DotMap
        lat={DATA.geo.lat}
        lng={DATA.geo.lng}
        countries={[...DATA.geo.countries]}
        className="mx-auto min-h-0 w-full flex-1 text-foreground"
      />
    </a>
  );
}

function NameWidget() {
  const [first, ...rest] = DATA.name.split(" ");
  return (
    <div className={cn(WIDGET, "flex flex-col justify-between gap-4 p-5 sm:p-6")}>
      <div className="flex items-start justify-between">
        <Label>Portfolio — {new Date().getFullYear()}</Label>
        <span className="size-2 rounded-full bg-brand" />
      </div>
      <h1 className="font-dot text-[clamp(2.5rem,10vw,3.25rem)] leading-[0.85] font-bold uppercase">
        <WordReveal text={first} delay={0.15} />
        <br />
        <WordReveal text={rest.join(" ")} delay={0.25} />
      </h1>
      <div className="flex items-center justify-between gap-4">
        <Label>{DATA.role}</Label>
        <Label>{DATA.location.split(",")[0]}, IN</Label>
      </div>
    </div>
  );
}

function StatWidget({ stats }: { stats: ActivityStats }) {
  const { leetcodeEasySolved: easy, leetcodeMediumSolved: medium, leetcodeHardSolved: hard } =
    stats;
  // Prefer LeetCode; fall back to GitHub, then to the project count.
  const stat =
    stats.leetcodeSolved !== undefined
      ? { title: "LeetCode", label: "Problems solved", value: stats.leetcodeSolved, icon: <Icons.leetcode className="size-4" />, href: DATA.contact.social.LeetCode.url }
      : stats.githubRepos !== undefined
        ? { title: "GitHub", label: "Public repos", value: stats.githubRepos, icon: <Icons.github className="size-4" />, href: DATA.contact.social.GitHub.url }
        : { title: "Shipped", label: "Projects", value: DATA.projects.length, icon: <Terminal className="size-4" />, href: "#projects" };

  const breakdown =
    stats.leetcodeSolved !== undefined &&
    easy !== undefined &&
    medium !== undefined &&
    hard !== undefined
      ? [
          ...Array(Math.round((easy / stats.leetcodeSolved) * 12)).fill("bg-foreground/35"),
          ...Array(Math.round((medium / stats.leetcodeSolved) * 12)).fill("bg-foreground"),
          ...Array(Math.max(1, Math.round((hard / stats.leetcodeSolved) * 12))).fill("bg-brand"),
        ].slice(0, 12)
      : null;

  return (
    <a
      href={stat.href}
      target={stat.href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      className={cn(WIDGET, "flex flex-col justify-between p-4 transition-colors hover:border-foreground/20 sm:p-5")}
    >
      <div className="flex items-center justify-between text-muted-foreground">
        <Label>{stat.title}</Label>
        {stat.icon}
      </div>
      <div>
        <Counter
          value={stat.value}
          className="font-dot text-5xl leading-none font-bold sm:text-6xl"
        />
        <div className="mt-1.5">
          <Label>{stat.label}</Label>
        </div>
      </div>
      {breakdown ? (
        <div className="flex gap-1" aria-label={`Easy ${easy}, medium ${medium}, hard ${hard}`}>
          {breakdown.map((color, i) => (
            <span key={i} className={cn("size-1.5 rounded-full", color)} />
          ))}
        </div>
      ) : (
        <span />
      )}
    </a>
  );
}

function TaglineWidget() {
  return (
    <div className={cn(WIDGET, "flex flex-col justify-between gap-4 p-5 sm:p-6")}>
      <div className="flex items-center justify-between text-muted-foreground">
        <Label>Now</Label>
        <Terminal className="size-4" />
      </div>
      <p className="text-lg leading-snug text-pretty text-muted-foreground">
        {DATA.headline}{" "}
        <span className="text-foreground">
          I build <Typewriter words={DATA.taglines} />
        </span>
      </p>
      <Label>{DATA.coordinates}</Label>
    </div>
  );
}

function LinksWidget() {
  const { GitHub, LinkedIn } = DATA.contact.social;
  const links = [
    { label: "GitHub", href: GitHub.url, icon: <Icons.github /> },
    { label: "LinkedIn", href: LinkedIn.url, icon: <Icons.linkedin /> },
    { label: "Email", href: `mailto:${DATA.contact.email}`, icon: <Icons.email /> },
    { label: "Résumé", href: DATA.resumeUrl, icon: <FileText />, accent: true },
  ];

  return (
    <div className={cn(WIDGET, "flex flex-col justify-between p-4 sm:p-5")}>
      <div className="flex items-center justify-between">
        <Label>Connect</Label>
        <Label>{String(links.length).padStart(2, "0")}</Label>
      </div>
      <ul className="grid grid-cols-2 place-items-center gap-2">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              aria-label={link.label}
              title={link.label}
              className={cn(
                "flex size-12 items-center justify-center rounded-full transition duration-300 hover:scale-105 sm:size-14 [&_svg]:size-5",
                link.accent
                  ? "bg-brand text-white"
                  : "bg-muted text-foreground hover:bg-foreground hover:text-background",
              )}
            >
              {link.icon}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Desktop: two rows of four columns. Mobile: two columns, dense packing fills the gaps.
export default function HeroSection({ stats }: { stats: ActivityStats }) {
  return (
    <div className="grid grid-flow-row-dense grid-cols-2 gap-3 md:grid-cols-4">
      <Reveal className="aspect-square" delay={0.05}>
        <PhotoWidget />
      </Reveal>
      <Reveal className="col-span-2" delay={0.12}>
        <NameWidget />
      </Reveal>
      <Reveal className="aspect-square" delay={0.18}>
        <MapWidget />
      </Reveal>
      <Reveal className="aspect-square" delay={0.24}>
        <StatWidget stats={stats} />
      </Reveal>
      <Reveal className="col-span-2" delay={0.3}>
        <TaglineWidget />
      </Reveal>
      <Reveal className="aspect-square" delay={0.36}>
        <LinksWidget />
      </Reveal>
    </div>
  );
}
