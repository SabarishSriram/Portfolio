"use client";

import { CheckCircle2 } from "lucide-react";

export type LeetCodeStatsCardProps = {
  easySolved: number;
  easyTotal: number;
  mediumSolved: number;
  mediumTotal: number;
  hardSolved: number;
  hardTotal: number;
  totalSolved: number;
  totalQuestions: number;
  attempting?: number;
};

export function LeetCodeStatsCard({
  easySolved,
  easyTotal,
  mediumSolved,
  mediumTotal,
  hardSolved,
  hardTotal,
  totalSolved,
  totalQuestions,
  attempting = 0,
}: LeetCodeStatsCardProps) {
  const ratio = totalQuestions > 0 ? totalSolved / totalQuestions : 0;
  const angle = Math.min(1, ratio) * 360;

  return (
    <div className="w-full flex justify-center px-0">
      <div className="w-full rounded-2xl border border-border/70 bg-card/95 shadow-sm px-4 py-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Left: circular progress like LeetCode UI */}
          <div className="flex flex-col items-center gap-2 md:flex-1">
            <div className="relative h-32 w-32">
              <div
                className="absolute inset-[10%] rounded-full border-2 border-transparent"
                style={{
                  backgroundImage:
                    "conic-gradient(#22c55e 0deg, #eab308 160deg, #ef4444 260deg, #4b5563 360deg)",
                  WebkitMask:
                    "radial-gradient(farthest-side, transparent 70%, black 71%)",
                  mask: "radial-gradient(farthest-side, transparent 70%, black 71%)",
                }}
              />
              {/* colored endpoints */}
              <span className="absolute left-[15%] bottom-[18%] h-2 w-2 rounded-full bg-cyan-400" />
              <span className="absolute left-[19%] top-[13%] h-2 w-2 rounded-full bg-yellow-400" />
              <span className="absolute right-[13%] top-[19%] h-2 w-2 rounded-full bg-red-400" />

              <div className="absolute inset-[22%] rounded-full bg-card flex flex-col items-center justify-center gap-0.5">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-semibold tabular-nums text-foreground">
                    {totalSolved}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    /{totalQuestions}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-sm text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Solved</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              {attempting} Attempting
            </p>
          </div>

          {/* Right: difficulty cards */}
          <div className="flex flex-1 flex-col gap-2 text-[13px] max-w-xs md:max-w-none md:items-stretch">
            <DifficultyCard
              label="Easy"
              colorClass="text-emerald-400"
              bgHover="hover:bg-emerald-500/15"
              solved={easySolved}
              total={easyTotal}
            />
            <DifficultyCard
              label="Med."
              colorClass="text-amber-300"
              bgHover="hover:bg-amber-400/15"
              solved={mediumSolved}
              total={mediumTotal}
            />
            <DifficultyCard
              label="Hard"
              colorClass="text-red-400"
              bgHover="hover:bg-red-500/15"
              solved={hardSolved}
              total={hardTotal}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

type DifficultyCardProps = {
  label: string;
  colorClass: string;
  bgHover: string;
  solved: number;
  total: number;
};

function DifficultyCard({
  label,
  colorClass,
  bgHover,
  solved,
  total,
}: DifficultyCardProps) {
  return (
    <div
      className={`flex items-center justify-between rounded-xl bg-[#2b2b2f] px-4 py-3 transition-colors duration-200 ${bgHover}`}
    >
      <div className="flex flex-col gap-0.5">
        <span className={`text-xs font-semibold ${colorClass}`}>{label}</span>
        <span className="text-[11px] text-zinc-200">
          {solved} / {total}
        </span>
      </div>
      <span className={`text-sm font-semibold tabular-nums text-zinc-50`}>
        {solved}
      </span>
    </div>
  );
}
