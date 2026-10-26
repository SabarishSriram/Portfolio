"use client";

import {
  CALENDAR_BLOCKS,
  useCalendarTheme,
} from "@/components/leetcode-activity-card";
import { GitHubCalendar } from "react-github-calendar";

type GitHubContributionsCardProps = {
  username?: string;
  months?: number;
};

export function GitHubContributionsCard({
  username = "sabarishsriram",
  months = 12,
}: GitHubContributionsCardProps) {
  const { theme, colorScheme } = useCalendarTheme();
  const clampedMonths = Math.min(Math.max(months, 1), 12);

  const fromDate = new Date();
  fromDate.setHours(0, 0, 0, 0);
  fromDate.setMonth(fromDate.getMonth() - clampedMonths);

  const transformData = (data: any[]) =>
    data.filter((day) => new Date(day.date) >= fromDate);

  return (
    <div className="max-w-full overflow-x-auto font-mono text-muted-foreground">
      <GitHubCalendar
        username={username}
        theme={theme}
        colorScheme={colorScheme}
        {...CALENDAR_BLOCKS}
        labels={{
          totalCount:
            clampedMonths === 12
              ? "{{count}} contributions in the last year"
              : `{{count}} contributions in the last ${clampedMonths} months`,
        }}
        transformData={transformData}
        showWeekdayLabels={false}
      />
    </div>
  );
}
