"use client";

import * as React from "react";
import Link from "next/link";
import { CalendarCheck } from "lucide-react";

import { Button } from "@repo/ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/ui/dialog";

import { BookDemoCalendar } from "@/components/book-demo-calendar";
import { FACEBOOK_MESSENGER_URL } from "@/lib/social-links";

// PLACEHOLDER blocked dates — there's no booking backend in this repo, so
// nothing here is actually reserved or shared across visitors. This is a
// UI-only demo: swap for a real source (e.g. a Cal.com embed, or a real
// database-backed booking flow) before this can genuinely block dates that
// are already taken.
function usePlaceholderBlockedDates() {
  return React.useMemo(() => {
    const today = new Date();
    const offsets = [3, 4, 9, 15, 21];
    return new Set(
      offsets.map((days) => {
        const d = new Date(today);
        d.setDate(d.getDate() + days);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      }),
    );
  }, []);
}

function formatDateKey(dateKey: string) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year!, month! - 1, day!).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

// Renders the inline "Book a Demo" button plus a fixed bottom-right twin
// that fades/slides in once the inline one scrolls out of view (tracked via
// IntersectionObserver). Both open the same date-picker dialog; confirming a
// date hands off to Facebook Messenger (no real slot reservation exists —
// see usePlaceholderBlockedDates above).
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
  const [open, setOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<string | null>(null);
  const blockedDates = usePlaceholderBlockedDates();

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
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setSelectedDate(null);
      }}
    >
      <div ref={anchorRef} className={className}>
        <DialogTrigger asChild>
          <Button
            variant={buttonVariant}
            size={buttonSize}
            className={fullWidth ? "w-full" : undefined}
            aria-label={label}
          >
            <CalendarCheck className="h-4 w-4" aria-hidden="true" />
            Book a Demo
          </Button>
        </DialogTrigger>
      </div>

      {showFloatingButton && (
        <div
          className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
            showFloating ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
          }`}
        >
          <DialogTrigger asChild>
            <Button
              variant="accent"
              size="lg"
              className="shadow-xl"
              aria-label={label}
              tabIndex={showFloating ? undefined : -1}
            >
              <CalendarCheck className="h-4 w-4" aria-hidden="true" />
              Book a Demo
            </Button>
          </DialogTrigger>
        </div>
      )}

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book a demo — {projectName}</DialogTitle>
          <DialogDescription>
            Pick a date below, then confirm through Messenger — we&apos;ll reply with a time that works.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <BookDemoCalendar selectedDate={selectedDate} onSelectDate={setSelectedDate} blockedDates={blockedDates} />
        </div>

        <p className="mt-4 text-sm text-muted-foreground">
          {selectedDate ? `Selected: ${formatDateKey(selectedDate)}` : "Choose an available date to continue."}
        </p>

        {selectedDate ? (
          <Button variant="accent" size="lg" className="mt-2 w-full" asChild>
            <Link
              href={FACEBOOK_MESSENGER_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
            >
              Continue to Messenger
            </Link>
          </Button>
        ) : (
          <Button variant="accent" size="lg" className="mt-2 w-full" disabled>
            Continue to Messenger
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}
