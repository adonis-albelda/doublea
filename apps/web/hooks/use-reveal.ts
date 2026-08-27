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
