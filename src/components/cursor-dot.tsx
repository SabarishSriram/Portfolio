"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

const INTERACTIVE = "a, button, [role='button'], input, label";

/**
 * A small red dot that trails the pointer and opens into a ring over anything
 * clickable. Purely decorative; the native cursor stays. Mouse only.
 */
export function CursorDot() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      setHovering(Boolean((e.target as Element | null)?.closest?.(INTERACTIVE)));
    };
    const onLeave = () => setVisible(false);
    window.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[80] hidden rounded-full border-solid border-brand [@media(hover:hover)]:block"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      animate={{
        width: hovering ? 40 : 8,
        height: hovering ? 40 : 8,
        opacity: visible ? 1 : 0,
        borderWidth: hovering ? 1.5 : 0,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      {/* Fill fades out as the dot opens into a ring (opacity, since motion can't tween lab() colors) */}
      <motion.span
        className="absolute inset-0 rounded-full bg-brand"
        animate={{ opacity: hovering ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
}
