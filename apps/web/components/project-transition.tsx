"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";

interface Origin {
  x: number;
  y: number;
}

const ProjectTransitionContext = React.createContext<((href: string, origin: Origin) => void) | null>(
  null,
);

// Circle-wipe page transition: a filled circle grows from the click point
// to cover the whole viewport, the route change happens underneath it once
// covered, then it shrinks back away once the new page has mounted. Plain
// CSS transform transitions, no motion library, no browser View Transitions
// API dependency (Next 14 App Router doesn't wire that up for client nav).
export function ProjectTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [active, setActive] = React.useState(false);
  const [covered, setCovered] = React.useState(false);
  const [origin, setOrigin] = React.useState<Origin>({ x: 0, y: 0 });
  const [radius, setRadius] = React.useState(0);
  const pendingHrefRef = React.useRef<string | null>(null);

  const start = React.useCallback((href: string, clickOrigin: Origin) => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      router.push(href);
      return;
    }

    const r = Math.hypot(
      Math.max(clickOrigin.x, window.innerWidth - clickOrigin.x),
      Math.max(clickOrigin.y, window.innerHeight - clickOrigin.y),
    );
    pendingHrefRef.current = href;
    setOrigin(clickOrigin);
    setRadius(r);
    setActive(true);
    setCovered(false);

    // Double rAF so the browser paints the scale(0) frame before flipping
    // to scale(1) — otherwise the transition has no "from" state to animate
    // from on a just-mounted element.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setCovered(true));
    });
  }, [router]);

  // Fully covered — safe to actually navigate now.
  const handleGrowEnd = React.useCallback(() => {
    if (!covered || !pendingHrefRef.current) return;
    router.push(pendingHrefRef.current);
  }, [covered, router]);

  // New route mounted — shrink the circle back away to reveal it.
  React.useEffect(() => {
    if (active && covered && pendingHrefRef.current && pathname === pendingHrefRef.current) {
      pendingHrefRef.current = null;
      setCovered(false);
    }
  }, [pathname, active, covered]);

  const handleShrinkEnd = React.useCallback(() => {
    if (covered) return;
    setActive(false);
  }, [covered]);

  return (
    <ProjectTransitionContext.Provider value={start}>
      {children}
      {active && (
        <div
          aria-hidden="true"
          onTransitionEnd={covered ? handleGrowEnd : handleShrinkEnd}
          className="pointer-events-none fixed z-[100] rounded-full bg-primary transition-transform duration-500 ease-in-out"
          style={{
            left: origin.x,
            top: origin.y,
            width: radius * 2,
            height: radius * 2,
            marginLeft: -radius,
            marginTop: -radius,
            transform: covered ? "scale(1)" : "scale(0)",
          }}
        />
      )}
    </ProjectTransitionContext.Provider>
  );
}

export function useProjectTransition() {
  const start = React.useContext(ProjectTransitionContext);
  if (!start) throw new Error("useProjectTransition must be used within ProjectTransitionProvider");
  return start;
}
