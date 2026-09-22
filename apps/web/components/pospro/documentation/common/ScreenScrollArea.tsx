"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const ADVANCE_DELAY_MS = 900;
const SCROLLED_THRESHOLD_PX = 40;

// Scrolling to the very bottom auto-advances to the next screen; scrolling
// back to the very top auto-returns to the previous one — both after a
// short pause so a quick peek at either edge doesn't yank the reader away.
// The "return to previous" side only arms once the reader has actually
// scrolled down at least once, so landing fresh on a page (already at the
// top) never immediately bounces back.
export function ScreenScrollArea({
  children,
  previousHref,
  nextHref,
}: {
  children: React.ReactNode;
  previousHref?: string;
  nextHref?: string;
}) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const topSentinelRef = useRef<HTMLDivElement>(null);
  const bottomSentinelRef = useRef<HTMLDivElement>(null);
  const hasScrolledRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    function handleScroll() {
      if (container && container.scrollTop > SCROLLED_THRESHOLD_PX) {
        hasScrolledRef.current = true;
      }
    }

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const sentinel = bottomSentinelRef.current;
    if (!container || !sentinel || !nextHref) return;

    let timer: ReturnType<typeof setTimeout> | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          timer = setTimeout(() => router.push(nextHref), ADVANCE_DELAY_MS);
        } else if (timer) {
          clearTimeout(timer);
          timer = null;
        }
      },
      { root: container, threshold: 1 },
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, [nextHref, router]);

  useEffect(() => {
    const container = containerRef.current;
    const sentinel = topSentinelRef.current;
    if (!container || !sentinel || !previousHref) return;

    let timer: ReturnType<typeof setTimeout> | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && hasScrolledRef.current) {
          timer = setTimeout(() => router.push(previousHref), ADVANCE_DELAY_MS);
        } else if (timer) {
          clearTimeout(timer);
          timer = null;
        }
      },
      { root: container, threshold: 1 },
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, [previousHref, router]);

  return (
    <div
      ref={containerRef}
      className="min-w-0 flex-1 scroll-smooth overflow-y-auto px-10 py-10 [scrollbar-color:hsl(var(--border-sage))_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border-sage [&::-webkit-scrollbar-track]:bg-transparent"
    >
      <div className="mx-auto max-w-3xl space-y-10">
        <div ref={topSentinelRef} aria-hidden="true" />
        {children}
        <div ref={bottomSentinelRef} aria-hidden="true" />
      </div>
    </div>
  );
}
