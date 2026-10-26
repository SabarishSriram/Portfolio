"use client";

import { useMounted } from "@/lib/use-mounted";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ActivityCalendar } from "react-activity-calendar";
import type { Activity, ThemeInput } from "react-activity-calendar";

// Two stops (empty → full ink); the calendar interpolates the levels between.
// With round blocks this reads as a dot-matrix display.
const CALENDAR_THEME: ThemeInput = {
  light: ["#dedede", "#111111"],
  dark: ["#262626", "#ffffff"],
};

// Shared by both calendars: round blocks big enough to read as a dot matrix.
export const CALENDAR_BLOCKS = {
  blockSize: 16,
  blockMargin: 5,
  blockRadius: 8,
  fontSize: 10,
} as const;

export function useCalendarTheme() {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();
  const colorScheme: "light" | "dark" =
    mounted && resolvedTheme === "light" ? "light" : "dark";
  return { theme: CALENDAR_THEME, colorScheme };
}

interface LeetCodeActivityCardProps {
  username?: string;
  months?: number;
}

type LeetCodeApiResponse = Record<string, number>;

export function LeetCodeActivityCard({
  username = "sabarishsriram",
  months = 12,
}: LeetCodeActivityCardProps) {
  const [data, setData] = useState<Activity[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setError(null);

        const res = await fetch(
          `https://leetcode-sub-endpoint.vercel.app/leetcode/${username}`,
        );

        if (!res.ok) {
          throw new Error("Failed to load LeetCode activity");
        }

        const json = (await res.json()) as LeetCodeApiResponse;

        if (cancelled) return;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const clampedMonths = Math.min(Math.max(months ?? 12, 1), 12);

        const startDate = new Date(today);
        startDate.setMonth(startDate.getMonth() - clampedMonths);

        const countsByDate: Record<string, number> = {};

        for (const [dateString, count] of Object.entries(json)) {
          const date = new Date(dateString);

          if (date >= startDate && date <= today) {
            const key = date.toISOString().slice(0, 10);
            countsByDate[key] = (countsByDate[key] ?? 0) + count;
          }
        }

        const entries: Activity[] = [];

        for (
          let date = new Date(startDate);
          date <= today;
          date.setDate(date.getDate() + 1)
        ) {
          const key = date.toISOString().slice(0, 10);
          const count = countsByDate[key] ?? 0;

          entries.push({
            date: key,
            count,
            level: Math.min(4, Math.max(0, Math.ceil(count / 2))),
          });
        }

        setData(entries);
      } catch (e) {
        if (!cancelled) {
          setError("Unable to load LeetCode submissions");
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [username, months]);

  const { theme, colorScheme } = useCalendarTheme();

  const clampedMonthsForLabel = Math.min(Math.max(months ?? 12, 1), 12);
  const totalCountLabel =
    clampedMonthsForLabel === 12
      ? "{{count}} submissions in the last year"
      : `{{count}} submissions in the last ${clampedMonthsForLabel} months`;

  return (
    <div className="max-w-full overflow-x-auto font-mono text-muted-foreground">
      {error && <p className="font-mono text-xs">{error}</p>}
      {!error && (
        <ActivityCalendar
          data={data ?? []}
          loading={!data}
          labels={{
            legend: { less: "Less", more: "More" },
            totalCount: totalCountLabel,
          }}
          theme={theme}
          colorScheme={colorScheme}
          maxLevel={4}
          showTotalCount
          {...CALENDAR_BLOCKS}
        />
      )}
    </div>
  );
}
