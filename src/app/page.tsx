/* eslint-disable @next/next/no-img-element */
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import ContactSection from "@/components/section/contact-section";
import HackathonsSection from "@/components/section/hackathons-section";
import ProjectsSection from "@/components/section/projects-section";
import WorkSection from "@/components/section/work-section";
import { ArrowUpRight, MapPin } from "lucide-react";
import { fetchActivityStats } from "@/lib/stats";
import { GitHubContributionsCard } from "@/components/github-contributions";
import { LeetCodeStatsCard } from "@/components/leetcode-stats-card";

const BLUR_FADE_DELAY = 0.04;

export default async function Page() {
  const stats = await fetchActivityStats();
  return (
    <main className="min-h-dvh flex flex-col gap-14 relative">
      <section id="hero" data-cursor-label="Intro">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-2 gap-y-6 flex flex-col md:flex-row justify-between">
            <div className="gap-2 flex flex-col order-2 md:order-1">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-semibold tracking-tighter sm:text-4xl lg:text-5xl"
                yOffset={8}
                text={`Hi, I'm ${DATA.name.split(" ")[0]}`}
              />
              <BlurFadeText
                className="text-muted-foreground max-w-[600px] md:text-lg lg:text-xl"
                delay={BLUR_FADE_DELAY}
                text={DATA.description}
              />
            </div>
            <BlurFade delay={BLUR_FADE_DELAY} className="order-1 md:order-2">
              <Avatar className="size-24 md:size-32 border rounded-full shadow-lg ring-4 ring-muted">
                <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
        </div>
      </section>
      <section id="about" data-cursor-label="About">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h2 className="text-xl font-bold">About</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
              <Markdown>{DATA.summary}</Markdown>
            </div>
          </BlurFade>
        </div>
      </section>
      <section id="work" data-cursor-label="Work">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">Work Experience</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <WorkSection />
          </BlurFade>
        </div>
      </section>
      <section id="education" data-cursor-label="Education">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">Education</h2>
          </BlurFade>
          <div className="flex flex-col gap-8">
            {DATA.education.map((education, index) => (
              <BlurFade
                key={education.school}
                delay={BLUR_FADE_DELAY * 8 + index * 0.05}
              >
                <Link
                  href={education.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-x-3 justify-between group"
                >
                  <div className="flex items-center gap-x-3 flex-1 min-w-0">
                    {education.logoUrl ? (
                      <img
                        src={education.logoUrl}
                        alt={education.school}
                        className="size-10 md:size-12 rounded-full bg-white overflow-hidden object-contain shadow-sm flex-none"
                      />
                    ) : (
                      <div className="size-10 md:size-12 rounded-full bg-white/95 shadow-sm flex-none" />
                    )}
                    <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                      <div className="font-semibold leading-none flex items-center gap-2">
                        {education.school}
                        <ArrowUpRight
                          className="h-3.5 w-3.5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                          aria-hidden
                        />
                      </div>
                      <div className="font-sans text-sm text-muted-foreground">
                        {education.degree}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs tabular-nums text-muted-foreground text-right flex-none">
                    <span>
                      {education.start} - {education.end}
                    </span>
                  </div>
                </Link>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="skills" data-cursor-label="Skills">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold">Skills</h2>
          </BlurFade>
          <div className="flex flex-wrap gap-2">
            {DATA.skills.map((skill, id) => (
              <BlurFade
                key={skill.name}
                delay={BLUR_FADE_DELAY * 10 + id * 0.05}
              >
                <div className="border bg-background border-border ring-2 ring-border/20 rounded-xl h-8 w-fit px-4 flex items-center gap-2 text-foreground">
                  {skill.icon && (
                    <i
                      className={`${skill.icon} text-base leading-none`}
                      aria-hidden="true"
                    />
                  )}
                  <span className="text-foreground text-sm font-medium">
                    {skill.name}
                  </span>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="activity" data-cursor-label="Activity">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 10.5}>
            <h2 className="text-xl font-bold">Activity</h2>
          </BlurFade>
          <div className="flex flex-col gap-4">
            <BlurFade delay={BLUR_FADE_DELAY * 11}>
              <GitHubContributionsCard username="sabarishsriram" />
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 11.5}>
              <LeetCodeStatsCard
                easySolved={stats.leetcodeEasySolved ?? 0}
                easyTotal={stats.leetcodeTotalQuestions ?? 0}
                mediumSolved={stats.leetcodeMediumSolved ?? 0}
                mediumTotal={stats.leetcodeTotalQuestions ?? 0}
                hardSolved={stats.leetcodeHardSolved ?? 0}
                hardTotal={stats.leetcodeTotalQuestions ?? 0}
                totalSolved={stats.leetcodeSolved ?? 0}
                totalQuestions={stats.leetcodeTotalQuestions ?? 0}
                attempting={1}
              />
            </BlurFade>
          </div>
        </div>
      </section>
      <section id="projects" data-cursor-label="Projects">
        <BlurFade delay={BLUR_FADE_DELAY * 12}>
          <ProjectsSection />
        </BlurFade>
      </section>
      <section
        id="location"
        className="w-full flex justify-center"
        data-cursor-label="Chennai"
      >
        <BlurFade delay={BLUR_FADE_DELAY * 12.5}>
          <div className="max-w-md sm:max-w-lg rounded-2xl border border-border/60 bg-card/80 overflow-hidden shadow-sm">
            <div className="flex items-center justify-between px-4 pt-3 pb-2 text-xs text-muted-foreground">
              <div className="inline-flex items-center gap-2">
                <span className="inline-flex size-6 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                  <MapPin className="h-3.5 w-3.5" />
                </span>
                <span className="font-medium tracking-tight">
                  Chennai, India
                </span>
              </div>
              <span className="text-[10px] uppercase tracking-[0.18em]">
                Live map
              </span>
            </div>
            <div className="relative h-44 sm:h-52">
              <iframe
                title="Chennai map"
                src={
                  process.env.NEXT_PUBLIC_GMAPS_EMBED_URL ??
                  "https://www.google.com/maps?q=Chennai%2C%20India&output=embed"
                }
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full border-0 bg-background dark:brightness-[0.8]"
              />
            </div>
          </div>
        </BlurFade>
      </section>
      <section id="hackathons" data-cursor-label="Hackathons">
        <BlurFade delay={BLUR_FADE_DELAY * 13}>
          <HackathonsSection />
        </BlurFade>
      </section>
      <section id="contact" data-cursor-label="Contact">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <ContactSection />
        </BlurFade>
      </section>
    </main>
  );
}
