"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CursorState {
  x: number;
  y: number;
}

export function InteractiveCursor() {
  const [position, setPosition] = useState<CursorState>({ x: 0, y: 0 });
  const [label, setLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleMove = (event: PointerEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    const handleEnter = (event: Event) => {
      const target = event.currentTarget as HTMLElement | null;
      const cursorLabel = target?.dataset.cursorLabel;
      setLabel(cursorLabel || null);
      setActive(true);
    };

    const handleLeave = () => {
      setActive(false);
    };

    window.addEventListener("pointermove", handleMove);

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-cursor-label]"),
    );

    targets.forEach((el) => {
      el.addEventListener("pointerenter", handleEnter);
      el.addEventListener("pointerleave", handleLeave);
    });

    return () => {
      window.removeEventListener("pointermove", handleMove);
      targets.forEach((el) => {
        el.removeEventListener("pointerenter", handleEnter);
        el.removeEventListener("pointerleave", handleLeave);
      });
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-40 hidden md:block">
      <div
        className={cn(
          "absolute -translate-x-1/2 -translate-y-1/2 rounded-full border bg-primary/5 backdrop-blur-sm shadow-[0_0_0_1px_rgba(255,255,255,0.1)] flex items-center justify-center transition-all duration-200 ease-out",
          active
            ? "w-16 h-16 border-primary/70 bg-primary/10 opacity-100"
            : "w-4 h-4 border-primary/40 opacity-60",
        )}
        style={{ left: position.x, top: position.y }}
      >
        {active && label && (
          <span className="text-[10px] font-medium tracking-tight text-primary-foreground">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
