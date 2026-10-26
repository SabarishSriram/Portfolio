import { Reveal } from "@/components/motion";
import { DATA } from "@/data/resume";

export default function SkillsSection() {
  return (
    <div className="flex flex-col divide-y divide-border">
      {DATA.skills.map((group, i) => (
        <Reveal
          key={group.category}
          delay={i * 0.05}
          className="grid gap-3 py-5 first:pt-0 sm:grid-cols-[8rem_1fr] sm:gap-6"
        >
          <p className="pt-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            {group.category}
          </p>
          <ul className="flex flex-wrap gap-2">
            {group.items.map((skill) => (
              <li
                key={skill.name}
                className="group/skill inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-3 py-1.5 text-[13px] transition duration-300 hover:-translate-y-0.5 hover:border-foreground/20 hover:bg-card"
              >
                <i
                  aria-hidden
                  className={`${skill.icon} text-base leading-none`}
                />
                {skill.name}
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </div>
  );
}
