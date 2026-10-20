"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, X } from "lucide-react";

const ARM_DELAY_MS = 500;
const SCROLLED_THRESHOLD_PX = 40;

// Scrolling to the very bottom slides up a "Continue to next" bottom sheet —
// it never navigates on its own; the reader taps it to move on. Scrolling
// back up (or tapping X) hides it again. Scrolling back to the very top
// auto-returns to the previous screen after a short pause, so a quick peek
// at the edge doesn't yank the reader away. That side only arms once the
// reader has actually scrolled down at least once, so landing fresh on a
// page (already at the top) never immediately bounces back.
//
// The actual router.push runs inside a transition so `isPending` reflects
// real navigation time (data fetch/compile), not a guess — the reader sees
// "Loading…" for exactly as long as the page takes, instead of the content
// silently freezing for a couple seconds with no feedback.
export function ScreenScrollArea({
  children,
  previousHref,
  nextHref,
  nextTitle,
}: {
  children: React.ReactNode;
  previousHref?: string;
  nextHref?: string;
  nextTitle?: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [direction, setDirection] = useState<"next" | "previous" | null>(null);
  const [showNextSheet, setShowNextSheet] = useState(false);
  const dismissedRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const topSentinelRef = useRef<HTMLDivElement>(null);
  const bottomSentinelRef = useRef<HTMLDivElement>(null);
  const hasScrolledRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let lastScrollTop = container.scrollTop;

    function handleScroll() {
      if (!container) return;
      if (container.scrollTop > SCROLLED_THRESHOLD_PX) {
        hasScrolledRef.current = true;
      }
      // Any upward scroll hides the sheet; it comes back next time the
      // reader reaches the bottom.
      if (container.scrollTop < lastScrollTop - 4) {
        setShowNextSheet(false);
        dismissedRef.current = false;
      }
      lastScrollTop = container.scrollTop;
    }

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const sentinel = bottomSentinelRef.current;
    if (!container || !sentinel || !nextHref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only show once the reader has actually scrolled. A page short
        // enough to fit on screen (every "coming soon" stub) has its bottom
        // sentinel visible on arrival — the sheet shouldn't pop up there.
        if (entry?.isIntersecting && container.scrollTop > 0 && !dismissedRef.current) {
          setShowNextSheet(true);
        }
      },
      { root: container, threshold: 1 },
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [nextHref]);

  useEffect(() => {
    const container = containerRef.current;
    const sentinel = topSentinelRef.current;
    if (!container || !sentinel || !previousHref) return;

    let timer: ReturnType<typeof setTimeout> | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && hasScrolledRef.current) {
          timer = setTimeout(() => {
            setDirection("previous");
            startTransition(() => router.push(previousHref));
          }, ARM_DELAY_MS);
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
    <div className="relative flex min-w-0 flex-1 flex-col">
      <div
        ref={containerRef}
        className="min-h-0 flex-1 scroll-smooth overflow-y-auto px-4 py-6 sm:px-6 lg:px-10 lg:py-10 [scrollbar-color:hsl(var(--border-sage))_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border-sage [&::-webkit-scrollbar-track]:bg-transparent"
      >
        <div className="mx-auto max-w-3xl space-y-10">
          <div ref={topSentinelRef} aria-hidden="true" />
          {isPending && direction === "previous" && <LoadingHint />}
          {children}
          <div ref={bottomSentinelRef} aria-hidden="true" />
        </div>
      </div>

      {nextHref && (
        <div
          role="dialog"
          aria-label="Continue to the next page"
          aria-hidden={!showNextSheet}
          className={`pointer-events-none absolute inset-x-0 bottom-0 z-20 px-4 pb-4 transition-all duration-300 ease-out sm:px-6 ${
            showNextSheet ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
          }`}
        >
          <div
            className={`mx-auto flex max-w-3xl items-center gap-3 rounded-2xl border border-border-sage bg-card px-5 py-4 shadow-2xl ${
              showNextSheet ? "pointer-events-auto" : ""
            }`}
          >
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground">You&apos;ve reached the end of this page</p>
              <p className="mt-0.5 truncate text-xs text-muted-foreground">
                Continue to{" "}
                {nextTitle ? <span className="font-medium text-foreground">{nextTitle}</span> : "the next page"}?
              </p>
            </div>
            <Link
              href={nextHref}
              tabIndex={showNextSheet ? 0 : -1}
              onClick={(event) => {
                // Plain clicks go through the transition so the button can
                // show "Loading…"; modifier clicks (new tab) stay native.
                if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
                event.preventDefault();
                setDirection("next");
                startTransition(() => router.push(nextHref));
              }}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {isPending && direction === "next" ? "Loading…" : "Continue"}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <button
              type="button"
              tabIndex={showNextSheet ? 0 : -1}
              onClick={() => {
                dismissedRef.current = true;
                setShowNextSheet(false);
              }}
              aria-label="Close"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-slate-sage transition-colors hover:text-foreground"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function LoadingHint() {
  return (
    <p className="animate-pulse text-center text-xs text-muted-foreground" role="status">
      Loading…
    </p>
  );
}
