import { GitHubContributionsCard } from "@/components/github-contributions";
import { Icons } from "@/components/icons";
import { LeetCodeActivityCard } from "@/components/leetcode-activity-card";
import { Counter, Reveal } from "@/components/motion";
import { DATA } from "@/data/resume";
import type { ActivityStats } from "@/lib/stats";

const USERNAME = "sabarishsriram";

function MiniStat({ label, value }: { label: string; value?: number }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
      <span className="font-dot text-3xl leading-none font-bold">
        {value === undefined ? "—" : <Counter value={value} />}
      </span>
    </div>
  );
}

function Panel({
  title,
  icon,
  href,
  stats,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  href: string;
  stats: { label: string; value?: number }[];
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full min-w-0 flex-col gap-6 rounded-[1.75rem] border border-border bg-card p-5 sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <span className="inline-flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-full bg-muted [&_svg]:size-4">
            {icon}
          </span>
          <span className="text-sm font-medium">{title}</span>
        </span>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
        >
          @{USERNAME} ↗
        </a>
      </div>
      <div className="grid grid-cols-3 gap-4 border-b border-border pb-6">
        {stats.map((stat) => (
          <MiniStat key={stat.label} {...stat} />
        ))}
      </div>
      {children}
    </div>
  );
}

export default function ActivitySection({ stats }: { stats: ActivityStats }) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      <Reveal className="h-full min-w-0">
        <Panel
          title="GitHub"
          icon={<Icons.github />}
          href={DATA.contact.social.GitHub.url}
          stats={[
            { label: "Repos", value: stats.githubRepos },
            { label: "Stars", value: stats.githubStars },
            { label: "Followers", value: stats.githubFollowers },
          ]}
        >
          <GitHubContributionsCard username={USERNAME} months={DATA.activityMonths} />
        </Panel>
      </Reveal>
      <Reveal delay={0.08} className="h-full min-w-0">
        <Panel
          title="LeetCode"
          icon={<Icons.leetcode />}
          href={DATA.contact.social.LeetCode.url}
          stats={[
            { label: "Easy", value: stats.leetcodeEasySolved },
            { label: "Medium", value: stats.leetcodeMediumSolved },
            { label: "Hard", value: stats.leetcodeHardSolved },
          ]}
        >
          <LeetCodeActivityCard username={USERNAME} months={DATA.activityMonths} />
        </Panel>
      </Reveal>
    </div>
  );
}
