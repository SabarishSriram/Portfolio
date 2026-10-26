import { LocalTime } from "@/components/local-time";
import { DATA } from "@/data/resume";
import { ArrowUp } from "lucide-react";

// Deterministic "barcode" built from the name, so it never changes between renders.
const BARS = Array.from(DATA.name.replace(/\s/g, "").toUpperCase()).flatMap(
  (ch) => {
    const code = ch.charCodeAt(0);
    return [(code % 3) + 1, ((code >> 2) % 2) + 1];
  },
);

export default function Footer() {
  return (
    <footer className="mt-32 flex flex-col gap-8 border-t border-border pt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div aria-hidden className="flex h-8 items-stretch gap-[2px] text-foreground">
          {BARS.map((w, i) => (
            <span
              key={i}
              className={i % 2 === 0 ? "bg-current" : "bg-transparent"}
              style={{ width: w * 1.5 }}
            />
          ))}
        </div>
        <a
          href="#top"
          className="group inline-flex items-center gap-2 transition-colors hover:text-foreground"
        >
          Back to top
          <span className="flex size-7 items-center justify-center rounded-full border border-border transition-colors group-hover:bg-foreground group-hover:text-background">
            <ArrowUp className="size-3" />
          </span>
        </a>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {DATA.name}
        </p>
        <p>
          {DATA.location.split(",")[0]} ·{" "}
          <LocalTime timeZone={DATA.timezone} label={DATA.timezoneLabel} />
        </p>
        <p>
          SN {DATA.initials}-{new Date().getFullYear()}-V2
          <span className="ml-2 inline-block size-1.5 rounded-full bg-brand align-middle" />
        </p>
      </div>
    </footer>
  );
}
