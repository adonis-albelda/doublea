"use client";

import * as React from "react";
import Link from "next/link";
import { CalendarCheck } from "lucide-react";

import { Button } from "@repo/ui/components/ui/button";

// Scrolls to the inline #book-demo section (see book-demo-section.tsx)
// instead of opening a popup — renders the inline trigger plus a fixed
// bottom-right twin that fades/slides in once the inline one scrolls out of
// view (tracked via IntersectionObserver).
export function BookDemoCta({
  projectName,
  className,
  showFloatingButton = true,
  buttonSize = "lg",
  buttonVariant = "accent",
  fullWidth = false,
}: {
  projectName: string;
  className?: string;
  /** Grid cards render several of these at once — only one page-level
   * floating twin should exist, so the detail-page hero opts in and grid
   * cards opt out. */
  showFloatingButton?: boolean;
  buttonSize?: "default" | "sm" | "lg";
  /** design-system.md §2 — clay ("accent") is a once-per-screen accent, not
   * decorative. Grid cards render several of these at once, so they should
   * pass "outline" instead of the default "accent". */
  buttonVariant?: "accent" | "outline";
  fullWidth?: boolean;
}) {
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [showFloating, setShowFloating] = React.useState(false);

  React.useEffect(() => {
    if (!showFloatingButton) return;
    const el = anchorRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShowFloating(!entry!.isIntersecting),
      // Top margin accounts for the sticky nav (h-20) so the button counts
      // as "hidden" once it passes under the header, not just off-viewport.
      { rootMargin: "-88px 0px 0px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [showFloatingButton]);

  const label = `Book a demo for ${projectName}`;

  return (
    <>
      <div ref={anchorRef} className={className}>
        <Button
          variant={buttonVariant}
          size={buttonSize}
          className={fullWidth ? "w-full" : undefined}
          aria-label={label}
          asChild
        >
          <Link href="#book-demo">
            <CalendarCheck className="h-4 w-4" aria-hidden="true" />
            Book a Demo
          </Link>
        </Button>
      </div>

      {showFloatingButton && (
        <div
          className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
            showFloating ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
          }`}
        >
          <Button
            variant="accent"
            size="lg"
            className="shadow-xl"
            aria-label={label}
            tabIndex={showFloating ? undefined : -1}
            asChild
          >
            <Link href="#book-demo">
              <CalendarCheck className="h-4 w-4" aria-hidden="true" />
              Book a Demo
            </Link>
          </Button>
        </div>
      )}
    </>
  );
}
