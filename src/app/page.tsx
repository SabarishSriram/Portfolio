import { Reveal, SectionLabel } from "@/components/motion";
import ActivitySection from "@/components/section/activity-section";
import ContactSection from "@/components/section/contact-section";
import HeroSection from "@/components/section/hero-section";
import ProjectsSection from "@/components/section/projects-section";
import SkillsSection from "@/components/section/skills-section";
import WorkSection, {
  EducationSection,
  EntryList,
} from "@/components/section/work-section";
import { DATA } from "@/data/resume";
import { fetchActivityStats } from "@/lib/stats";
import {
  Activity,
  Briefcase,
  GraduationCap,
  LayoutGrid,
  Mail,
  Trophy,
  UserRound,
  Wrench,
} from "lucide-react";

function Section({
  id,
  nav,
  index,
  title,
  icon,
  children,
}: {
  id: string;
  nav: string;
  index: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} data-nav={nav} className="flex flex-col gap-8">
      <SectionLabel index={index} title={title} icon={icon} />
      {children}
    </section>
  );
}

export default async function Page() {
  const stats = await fetchActivityStats();
  const [currentSchool] = DATA.education;

  // Numbered in render order so optional sections don't leave gaps.
  let count = 0;
  const next = () => String(++count).padStart(2, "0");

  return (
    <main className="flex flex-col gap-24 sm:gap-32">
      <section id="hero" data-nav="">
        <HeroSection stats={stats} />
      </section>

      <Section id="about" nav="about" index={next()} title="About" icon={<UserRound />}>
        <Reveal>
          <p className="max-w-3xl text-xl leading-snug text-pretty text-foreground/90 sm:text-2xl">
            {DATA.summary}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <dl className="grid grid-cols-3 gap-4 border-t border-border pt-6">
            {[
              ["Based in", DATA.location.split(",")[0]],
              ["Studying", currentSchool.degree],
              ["Graduating", currentSchool.end],
            ].map(([label, value]) => (
              <div key={label} className="flex flex-col gap-1.5">
                <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  {label}
                </dt>
                <dd className="font-dot text-lg leading-tight font-bold uppercase sm:text-2xl">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Section>

      <Section id="work" nav="work" index={next()} title="Experience" icon={<Briefcase />}>
        <WorkSection />
      </Section>

      <Section id="projects" nav="projects" index={next()} title="Projects" icon={<LayoutGrid />}>
        <ProjectsSection />
      </Section>

      {DATA.hackathons.length > 0 && (
        <Section id="hackathons" nav="projects" index={next()} title="Hackathons" icon={<Trophy />}>
          <EntryList
            entries={DATA.hackathons.map((h) => ({
              key: h.title + h.dates,
              logo: h.image,
              heading: h.title,
              subheading: h.location ?? "",
              period: h.dates ?? "",
              description: h.description,
            }))}
          />
        </Section>
      )}

      <Section id="skills" nav="projects" index={next()} title="Skills" icon={<Wrench />}>
        <SkillsSection />
      </Section>

      <Section id="education" nav="projects" index={next()} title="Education" icon={<GraduationCap />}>
        <EducationSection />
      </Section>

      <Section id="activity" nav="projects" index={next()} title="Activity" icon={<Activity />}>
        <ActivitySection stats={stats} />
      </Section>

      <Section id="contact" nav="contact" index={next()} title="Contact" icon={<Mail />}>
        <ContactSection />
      </Section>
    </main>
  );
}
