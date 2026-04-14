"use client";

import { useEffect, useMemo, useState } from "react";
import { ActivityCalendar } from "react-activity-calendar";
import type { Activity } from "react-activity-calendar";

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

  const colorTheme = useMemo(
    () => ({
      // GitHub-style ramp but in yellow/gold
      dark: ["#0d1117", "#0e4429", "#006d32", "#26a641", "#39d353"],
      light: ["#ffffff", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
    }),
    [],
  );

  const clampedMonthsForLabel = Math.min(Math.max(months ?? 12, 1), 12);
  const totalCountLabel =
    clampedMonthsForLabel === 12
      ? "Total submissions in the last year: {{count}}"
      : `Total submissions in the last ${clampedMonthsForLabel} months: {{count}}`;

  return (
    <div className="w-full flex justify-center px-0">
      <div className="w-full rounded-2xl border border-border/70 bg-card/90 shadow-sm px-3 py-3">
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold text-foreground">
            LeetCode Activity
          </h3>

          <div className="flex justify-center">
            <div className="max-w-full overflow-x-auto sm:overflow-visible">
              {error && (
                <p className="text-xs text-destructive text-center">{error}</p>
              )}
              {!error && !data && (
                <p className="text-xs text-muted-foreground text-center">
                  Loading LeetCode submissions…
                </p>
              )}
              {!error && data && (
                <ActivityCalendar
                  data={data}
                  labels={{
                    legend: { less: "Less", more: "More" },
                    totalCount: totalCountLabel,
                  }}
                  theme={colorTheme}
                  maxLevel={4}
                  showTotalCount
                  blockSize={13}
                  blockMargin={4}
                  fontSize={12}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
