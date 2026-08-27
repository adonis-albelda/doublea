"use client";

import * as React from "react";
import Image from "next/image";

import { cn } from "@repo/ui/lib/utils";

import type { Project } from "@/lib/projects";

const ADVANCE_MS = 3000;

function PhoneFrame({
  src,
  alt,
  className,
  priority,
  style,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={style}
      className={cn(
        "relative overflow-hidden rounded-[1.75rem] border-[5px] border-ink bg-ink shadow-xl",
        "animate-in fade-in-0 slide-in-from-bottom-8 duration-500 fill-mode-backwards",
        className,
      )}
    >
      <div className="absolute left-1/2 top-0 z-10 h-4 w-16 -translate-x-1/2 rounded-b-xl bg-ink" />
      <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.4rem] bg-ink">
        <Image src={src} alt={alt} fill sizes="160px" className="object-contain" priority={priority} />
      </div>
      <div className="absolute bottom-1 left-1/2 z-10 h-[3px] w-10 -translate-x-1/2 rounded-full bg-white/70" />
    </div>
  );
}

// Three phone frames side by side, each showing a different screenshot at
// once — the whole trio advances together every 3s so all screenshots
// eventually cycle through, three at a time.
export function PhoneTrioMockup({ project, className }: { project: Project; className?: string }) {
  const images = project.screenshots ?? [];
  const [start, setStart] = React.useState(0);

  React.useEffect(() => {
    if (images.length <= 3) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setStart((s) => (s + 3) % images.length);
    }, ADVANCE_MS);
    return () => clearInterval(interval);
  }, [images.length]);

  if (images.length === 0) return null;

  const trio = [0, 1, 2].map((i) => images[(start + i) % images.length]!);

  return (
    // Fanned out from a common base point, like a leaf's leaflets — center
    // frame upright and tallest, the two sides splayed outward and rotated,
    // not just offset in a flat row.
    <div
      key={start}
      className={cn("mx-auto flex w-full max-w-md items-end justify-center gap-0", className)}
    >
      <PhoneFrame
        src={trio[0]!}
        alt={`${project.name} app screenshot`}
        className="w-[30%] origin-bottom-right -rotate-[14deg] translate-x-2"
        style={{ animationDelay: "120ms" }}
      />
      <PhoneFrame
        src={trio[1]!}
        alt={`${project.name} app screenshot`}
        className="z-10 w-[38%]"
        priority
      />
      <PhoneFrame
        src={trio[2]!}
        alt={`${project.name} app screenshot`}
        className="w-[30%] origin-bottom-left rotate-[14deg] -translate-x-2"
        style={{ animationDelay: "120ms" }}
      />
    </div>
  );
}
