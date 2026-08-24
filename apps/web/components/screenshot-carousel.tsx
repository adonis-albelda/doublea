"use client";

import * as React from "react";
import Image from "next/image";

const DEFAULT_ADVANCE_MS = 5000;

// Cycles real device screenshots inside a device mockup, one at a time,
// crossfading. Used for any mockup with real screenshots (device-mockup.tsx);
// mockups without any fall back to the abstract placeholder screen.
export function ScreenshotCarousel({
  images,
  alt,
  sizes,
  advanceMs = DEFAULT_ADVANCE_MS,
  fit = "cover",
}: {
  images: readonly string[];
  alt: string;
  sizes: string;
  advanceMs?: number;
  /** "contain" letterboxes instead of cropping — use when the images' real
   * aspect ratio doesn't match the frame (e.g. phone screenshots shown in a
   * tablet frame). */
  fit?: "cover" | "contain";
}) {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    if (images.length <= 1) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, advanceMs);
    return () => clearInterval(interval);
  }, [images.length, advanceMs]);

  return (
    <div className="relative h-full w-full bg-ink">
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={i === index ? alt : ""}
          fill
          sizes={sizes}
          className={`${fit === "contain" ? "object-contain" : "object-cover"} transition-opacity duration-500 ${i === index ? "opacity-100" : "opacity-0"}`}
          priority={i === 0}
        />
      ))}
    </div>
  );
}
