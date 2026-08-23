"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

// The one signature motif from design-system.md §5 — scattered squares that
// thin out and resolve into a single ascending line. Used exactly twice on
// the page: `variant="hero"` (animated once on load) and
// `variant="divider"` (static dotted-to-solid rule between two sections).
// Not a repeating background, not on every card.

const SQUARES: Array<{ x: number; y: number; size: number; opacity: number; tone: "300" | "500" }> = [
  { x: 18, y: 168, size: 7, opacity: 0.9, tone: "300" },
  { x: 34, y: 178, size: 5, opacity: 0.55, tone: "500" },
  { x: 12, y: 148, size: 6, opacity: 0.7, tone: "500" },
  { x: 46, y: 162, size: 4, opacity: 0.4, tone: "300" },
  { x: 58, y: 150, size: 6, opacity: 0.65, tone: "300" },
  { x: 30, y: 130, size: 5, opacity: 0.5, tone: "500" },
  { x: 70, y: 138, size: 4, opacity: 0.45, tone: "500" },
  { x: 50, y: 112, size: 4, opacity: 0.35, tone: "300" },
  { x: 84, y: 122, size: 3, opacity: 0.4, tone: "300" },
  { x: 66, y: 96, size: 3, opacity: 0.3, tone: "500" },
  { x: 98, y: 104, size: 3, opacity: 0.3, tone: "500" },
];

const LINE_PATH = "M 20 175 C 70 150, 110 90, 150 70 S 230 30, 300 18";
// Arrowhead drawn as a continuation of the same path (lift-pen, two barbs
// off the tip) so it animates as one atomic stroke with the ascending line —
// no separate, independently-delayed element that can lag or miss its cue
// under hydration/main-thread jank and read as an unfinished mark.
const FULL_PATH = `${LINE_PATH} L 292 24 M 300 18 L 296 27`;

interface PixelAscentProps {
  variant?: "hero" | "divider";
  className?: string;
}

export function PixelAscent({ variant = "hero", className }: PixelAscentProps) {
  const reduceMotion = useReducedMotion();

  if (variant === "divider") {
    return (
      <div className={className} role="presentation" aria-hidden="true">
        <svg viewBox="0 0 400 8" width="100%" height="8" preserveAspectRatio="none">
          <defs>
            <linearGradient id="pixel-ascent-divider-fade" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="hsl(var(--sage-300))" stopOpacity="0" />
              <stop offset="35%" stopColor="hsl(var(--sage-300))" stopOpacity="0.8" />
              <stop offset="100%" stopColor="hsl(var(--sage-500))" stopOpacity="1" />
            </linearGradient>
          </defs>
          <line
            x1="0"
            y1="4"
            x2="400"
            y2="4"
            stroke="url(#pixel-ascent-divider-fade)"
            strokeWidth="2"
            strokeDasharray="1.5 7"
            strokeLinecap="round"
          />
          <line
            x1="220"
            y1="4"
            x2="400"
            y2="4"
            stroke="hsl(var(--sage-500))"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }

  // variant === "hero"
  if (reduceMotion) {
    return (
      <div className={className} role="presentation" aria-hidden="true">
        <svg viewBox="0 0 320 200" width="100%" height="100%" fill="none">
          {SQUARES.map((sq, i) => (
            <rect
              key={i}
              x={sq.x}
              y={sq.y}
              width={sq.size}
              height={sq.size}
              rx={1}
              fill={sq.tone === "300" ? "hsl(var(--sage-300))" : "hsl(var(--sage-500))"}
              opacity={sq.opacity}
            />
          ))}
          <path d={FULL_PATH} stroke="hsl(var(--sage-700))" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }

  return (
    <div className={className} role="presentation" aria-hidden="true">
      <svg viewBox="0 0 320 200" width="100%" height="100%" fill="none">
        {SQUARES.map((sq, i) => (
          <motion.rect
            key={i}
            x={sq.x}
            y={sq.y}
            width={sq.size}
            height={sq.size}
            rx={1}
            fill={sq.tone === "300" ? "hsl(var(--sage-300))" : "hsl(var(--sage-500))"}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: sq.opacity, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.02 * i, ease: "easeOut" }}
          />
        ))}
        <motion.path
          d={FULL_PATH}
          stroke="hsl(var(--sage-700))"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}
