"use client";

import * as React from "react";

import { cn } from "@repo/ui/lib/utils";

// Blurred until scrolled into view, then sharpens once — one-shot reveal
// via IntersectionObserver, not a repeat-on-every-scroll effect.
export function ScrollReveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
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
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("transition-[filter] duration-700 ease-out", visible ? "blur-none" : "blur-md", className)}
    >
      {children}
    </div>
  );
}
