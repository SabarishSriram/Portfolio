"use client";

import { useMemo, useSyncExternalStore } from "react";

const subscribe = (onTick: () => void) => {
  const id = setInterval(onTick, 1000);
  return () => clearInterval(id);
};
// Whole seconds, so the snapshot is stable between ticks.
const getSnapshot = () => Math.floor(Date.now() / 1000);
// Nothing on the server, so server and client markup match.
const getServerSnapshot = () => null;

/** Unix time in whole seconds, ticking every second; null during SSR. */
export function useSeconds() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Splits a timestamp into wall-clock parts for the given time zone. */
export function useClockParts(seconds: number | null, timeZone: string) {
  const formatter = useMemo(
    () =>
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone,
      }),
    [timeZone],
  );
  if (seconds === null) return null;
  const [hh, mm, ss] = formatter.format(seconds * 1000).split(":");
  return { hh, mm, ss: Number(ss) };
}

export function LocalTime({
  timeZone,
  label,
  withSeconds = true,
}: {
  timeZone: string;
  label?: string;
  withSeconds?: boolean;
}) {
  const parts = useClockParts(useSeconds(), timeZone);

  return (
    <span className="tabular-nums">
      {parts
        ? `${parts.hh}:${parts.mm}${withSeconds ? `:${String(parts.ss).padStart(2, "0")}` : ""}`
        : withSeconds
          ? "--:--:--"
          : "--:--"}
      {label && ` ${label}`}
    </span>
  );
}
