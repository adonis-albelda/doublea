"use client";

import * as React from "react";

// One-shot "has this scrolled into view yet" flag, shared by every
// staggered-entrance grid/list on the site (feature-grid, pricing-section,
// benefits, more-work). Global CSS zeroes transition-duration under
// prefers-reduced-motion, so consumers degrade to an instant appearance.
export function useReveal<T extends HTMLElement>(threshold = 0.1) {
  const ref = React.useRef<T>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry!.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

// Real one-at-a-time entrance — each item gets its own IntersectionObserver
// entry, so it reveals exactly when IT scrolls into view, not on a shared
// per-index CSS transition-delay computed from when the container first
// appeared. On a fast scroll-fling, items further down still each wait for
// their own turn instead of all firing off the same trigger.
export function useRevealEach<T extends HTMLElement>(count: number, threshold = 0.15) {
  const [visible, setVisible] = React.useState<boolean[]>(() => new Array(count).fill(false));
  const elementsRef = React.useRef<(T | null)[]>([]);

  React.useEffect(() => {
    elementsRef.current.length = count;
  }, [count]);

  const setRef = React.useCallback(
    (index: number) => (el: T | null) => {
      elementsRef.current[index] = el;
    },
    [],
  );

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const idx = elementsRef.current.indexOf(entry.target as T);
          if (idx === -1) continue;
          observer.unobserve(entry.target);
          setVisible((prev) => {
            if (prev[idx]) return prev;
            const next = [...prev];
            next[idx] = true;
            return next;
          });
        }
      },
      { threshold },
    );

    elementsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, threshold]);

  return { setRef, visible };
}
