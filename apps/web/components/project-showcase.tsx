"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { LaptopMockup, PhoneSlot, TabletMockup } from "@/components/device-mockup";
import type { Project } from "@/lib/projects";

const AUTO_ADVANCE_MS = 4500;

const DEVICES = [
  { key: "laptop", label: "Laptop", Mockup: LaptopMockup },
  { key: "tablet", label: "Tablet", Mockup: TabletMockup },
  { key: "phone", label: "Phone", Mockup: PhoneSlot },
] as const;

// One device at a time, laptop → tablet → phone → loop. Auto-advances every
// 4.5s; manual prev/next (or a dot) resets that timer so it doesn't fight
// the visitor. Plain CSS transform slide, no carousel library.
export function ProjectShowcase({ project }: { project: Project }) {
  const [index, setIndex] = React.useState(0);

  const goTo = React.useCallback((next: number) => {
    setIndex(((next % DEVICES.length) + DEVICES.length) % DEVICES.length);
  }, []);

  React.useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % DEVICES.length);
    }, AUTO_ADVANCE_MS);

    return () => clearInterval(interval);
  }, [index]);

  return (
    <div className="mx-auto w-full max-w-xl">
      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {DEVICES.map(({ key, Mockup }) => (
              <div key={key} className="w-full shrink-0 px-2 py-4">
                <Mockup project={project} />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label="Previous device"
          className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-border-sage bg-card text-foreground shadow-md transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label="Next device"
          className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-border-sage bg-card text-foreground shadow-md transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {DEVICES.map((device, i) => (
          <button
            key={device.key}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Show ${device.label} view`}
            aria-current={i === index}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-6 bg-primary" : "w-2 bg-border-sage hover:bg-primary/50"
            }`}
          />
        ))}
      </div>
      <p className="mt-2 text-center font-mono text-xs uppercase tracking-[0.04em] text-slate-sage">
        {DEVICES[index]!.label}
      </p>
    </div>
  );
}
