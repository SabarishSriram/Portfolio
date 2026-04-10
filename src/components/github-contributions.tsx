"use client";

import { GitHubCalendar } from "react-github-calendar";

const githubDarkTheme = {
  // GitHub-style 5-level palettes (background + 4 intensity levels)
  dark: ["#0d1117", "#0e4429", "#006d32", "#26a641", "#39d353"],
  light: ["#ffffff", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
};

type GitHubContributionsCardProps = {
  username?: string;
};

export function GitHubContributionsCard({
  username = "sabarishsriram",
}: GitHubContributionsCardProps) {
  const halfYearAgo = new Date();
  halfYearAgo.setMonth(halfYearAgo.getMonth() - 6);
  const transformData = (data: any[]) =>
    data.filter((day) => new Date(day.date) >= halfYearAgo);

  return (
    <div className="w-full flex justify-center px-0">
      <div className="w-full rounded-2xl border border-border/70 bg-card/90 shadow-sm px-3 py-3">
        <div className="flex justify-center">
          <div className="max-w-full overflow-x-auto sm:overflow-visible">
            <GitHubCalendar
              username={username}
              theme={githubDarkTheme}
              colorScheme="dark"
              blockSize={13}
              blockMargin={4}
              fontSize={12}
              transformData={transformData}
              showWeekdayLabels={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
