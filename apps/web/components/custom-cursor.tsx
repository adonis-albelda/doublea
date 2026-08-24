"use client";

import * as React from "react";

const LERP = 0.18;
const INTERACTIVE_SELECTOR = "a, button, [role=button], input, textarea, select, [data-cta]";

// Modern dot + trailing-ring cursor: inner dot snaps to the exact pointer
// position, outer ring eases toward it (lerp) via rAF for the "smooth"
// trailing feel, and grows/tints when hovering anything clickable. Skipped
// entirely on touch/coarse pointers and prefers-reduced-motion — this is a
// pure visual flourish, never the only way to see hover/focus state.
export function CustomCursor() {
  const dotRef = React.useRef<HTMLDivElement>(null);
  const ringRef = React.useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = React.useState(false);
  const [hovering, setHovering] = React.useState(false);

  const mouse = React.useRef({ x: 0, y: 0 });
  const ring = React.useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isFinePointer || prefersReducedMotion) return;

    document.documentElement.classList.add("custom-cursor-active");
    setEnabled(true);

    function onMove(e: MouseEvent) {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    }
    function onOver(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      setHovering(!!target?.closest(INTERACTIVE_SELECTOR));
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);

    let raf: number;
    function tick() {
      ring.current.x += (mouse.current.x - ring.current.x) * LERP;
      ring.current.y += (mouse.current.y - ring.current.y) * LERP;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[200] h-1.5 w-1.5 rounded-full bg-primary"
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`pointer-events-none fixed left-0 top-0 z-[200] rounded-full border-2 transition-[width,height,background-color,border-color] duration-200 ease-out ${
          hovering ? "h-10 w-10 border-primary bg-primary/10" : "h-7 w-7 border-primary/50"
        }`}
      />
    </>
  );
}
