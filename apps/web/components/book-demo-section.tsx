"use client";

import * as React from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { SiGoogle } from "@icons-pack/react-simple-icons";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { CalendarCheck, Clock, Loader2 } from "lucide-react";

import { Button } from "@repo/ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/ui/dialog";
import { cn } from "@repo/ui/lib/utils";

import { BookDemoCalendar } from "@/components/book-demo-calendar";
import { api } from "@/convex/_generated/api";
import { FACEBOOK_MESSENGER_URL } from "@/lib/social-links";

const TIME_SLOTS = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
];
const PENDING_KEY = "book-demo-pending";

function toDateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function parseTimeSlot(time: string) {
  const match = /^(\d+):(\d+)\s*(AM|PM)$/i.exec(time);
  if (!match) return null;
  let hour = Number(match[1]);
  const minute = Number(match[2]);
  const period = match[3]!.toUpperCase();
  if (period === "PM" && hour !== 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;
  return { hour, minute };
}

// Only relevant for today — a slot on a future date is never "past."
function isPastTimeSlot(dateKey: string, time: string) {
  const now = new Date();
  if (dateKey !== toDateKey(now)) return false;
  const parsed = parseTimeSlot(time);
  if (!parsed) return false;
  const slot = new Date(now.getFullYear(), now.getMonth(), now.getDate(), parsed.hour, parsed.minute);
  return slot.getTime() <= now.getTime();
}

function formatDateKey(dateKey: string) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year!, month! - 1, day!).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

// Inline section version of the old booking dialog — full calendar always
// visible, picking a date reveals its time list next to it. Booked slots
// come from Convex's `appointments` table (convex/appointments.ts), keyed
// by project, so a date/time already taken by a real visitor greys out for
// everyone. Confirming requires Google sign-in (Convex Auth), writes the
// appointment row, then hands off to Facebook Messenger.
export function BookDemoSection({ projectName, projectSlug }: { projectName: string; projectSlug: string }) {
  const [selectedDate, setSelectedDate] = React.useState<string | null>(null);
  const [selectedTime, setSelectedTime] = React.useState<string | null>(null);

  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [scheduling, setScheduling] = React.useState(false);
  const [scheduleError, setScheduleError] = React.useState<string | null>(null);
  const [signingIn, setSigningIn] = React.useState(false);
  const [slotsVisible, setSlotsVisible] = React.useState(false);

  const { isAuthenticated } = useConvexAuth();
  const { signIn } = useAuthActions();
  const viewer = useQuery(api.users.viewer);
  const booked = useQuery(api.appointments.listByProject, { projectSlug });
  const createAppointment = useMutation(api.appointments.create);

  const bookedTimesByDate = React.useMemo(() => {
    const map = new Map<string, Set<string>>();
    for (const row of booked ?? []) {
      const set = map.get(row.date) ?? new Set<string>();
      set.add(row.time);
      map.set(row.date, set);
    }
    return map;
  }, [booked]);

  // Whole day disabled once every slot on it is taken.
  const blockedDates = React.useMemo(() => {
    const dates = new Set<string>();
    for (const [date, times] of bookedTimesByDate) {
      if (times.size >= TIME_SLOTS.length) dates.add(date);
    }
    return dates;
  }, [bookedTimesByDate]);

  const bookedTimesForSelectedDate = selectedDate
    ? (bookedTimesByDate.get(selectedDate) ?? new Set<string>())
    : new Set<string>();

  // Google sign-in is a full-page redirect — restore the in-progress
  // selection (and reopen the confirm dialog) once the user lands back here
  // signed in, since component state doesn't survive the round trip.
  React.useEffect(() => {
    if (!isAuthenticated) return;
    try {
      const raw = sessionStorage.getItem(PENDING_KEY);
      if (!raw) return;
      const pending = JSON.parse(raw) as { date: string | null; time: string | null };
      if (pending.date) setSelectedDate(pending.date);
      if (pending.time) setSelectedTime(pending.time);
      setConfirmOpen(true);
      sessionStorage.removeItem(PENDING_KEY);
    } catch {
      sessionStorage.removeItem(PENDING_KEY);
    }
  }, [isAuthenticated]);

  function handleSelectDate(dateKey: string) {
    setSelectedDate(dateKey);
    setSelectedTime(null);
  }

  // Not scroll-triggered (the list is already on-screen when a date is
  // picked) — this stagger fires on the click itself, via a mount-flag flip
  // one frame later so the "from" state actually paints first.
  React.useEffect(() => {
    if (!selectedDate) return;
    setSlotsVisible(false);
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setSlotsVisible(true)));
    return () => cancelAnimationFrame(raf);
  }, [selectedDate]);

  function handleGoogleSignIn() {
    try {
      sessionStorage.setItem(PENDING_KEY, JSON.stringify({ date: selectedDate, time: selectedTime }));
    } catch {
      // Storage can fail (private mode, quota) — sign-in still proceeds,
      // the selection just won't survive the redirect round trip.
    }
    setSigningIn(true);
    // Send the user back to this exact section (not Convex Auth's default
    // landing page) once Google hands control back — the sessionStorage
    // entry above then restores the date/time picks on remount.
    // Temporary logging — remove once sign-in is confirmed reflecting correctly.
    signIn("google", { redirectTo: `${window.location.pathname}#book-demo` })
      .then((result) => console.log("[BookDemoSection] signIn result:", result))
      .catch((err) => {
        console.error("[BookDemoSection] signIn failed:", err);
        setSigningIn(false);
      });
  }

  async function handleConfirm() {
    if (!selectedDate || !selectedTime) return;
    setScheduling(true);
    setScheduleError(null);
    try {
      await createAppointment({ projectSlug, date: selectedDate, time: selectedTime });
      setConfirmOpen(false);
      window.open(FACEBOOK_MESSENGER_URL, "_blank", "noopener,noreferrer");
    } catch (err) {
      setScheduleError(err instanceof Error ? err.message : "Something went wrong — try again.");
    } finally {
      setScheduling(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      <div className="rounded-2xl border border-border-sage bg-card p-6 sm:p-8">
        <BookDemoCalendar selectedDate={selectedDate} onSelectDate={handleSelectDate} blockedDates={blockedDates} />
      </div>

      <div className="rounded-2xl border border-border-sage bg-card p-6 sm:p-8">
        {selectedDate ? (
          <>
            <p className="font-mono text-caption uppercase tracking-[0.04em] text-slate-sage">
              {formatDateKey(selectedDate)}
            </p>
            <h3 className="mt-2 font-display text-h3 text-foreground">Pick a time</h3>

            <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {TIME_SLOTS.map((time, i) => {
                const isBooked = bookedTimesForSelectedDate.has(time);
                const isPast = !isBooked && isPastTimeSlot(selectedDate, time);
                const isDisabled = isBooked || isPast;
                const isSelected = selectedTime === time;
                return (
                  <button
                    key={time}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => setSelectedTime(time)}
                    aria-pressed={isSelected}
                    aria-label={
                      isBooked ? `${time}, already booked` : isPast ? `${time}, has already passed` : time
                    }
                    style={{ transitionDelay: slotsVisible ? `${i * 40}ms` : "0ms" }}
                    className={cn(
                      "flex items-center justify-center gap-1.5 rounded-lg border px-3 py-2.5 text-sm transition-all duration-300 ease-out",
                      slotsVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
                      isDisabled && "cursor-not-allowed border-border-sage text-slate-sage/40 line-through",
                      !isDisabled && !isSelected && "border-border-sage text-foreground hover:border-primary/40",
                      isSelected && "border-primary bg-primary font-semibold text-primary-foreground",
                    )}
                  >
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    {time}
                  </button>
                );
              })}
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
              {selectedTime
                ? `Selected: ${formatDateKey(selectedDate)} at ${selectedTime}`
                : "Choose an available time to continue."}
            </p>

            <Button
              variant="accent"
              size="lg"
              className="mt-4 w-full"
              disabled={!selectedTime}
              onClick={() => {
                setScheduleError(null);
                setConfirmOpen(true);
              }}
            >
              Schedule Appointment
            </Button>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <CalendarCheck className="h-8 w-8 text-primary" aria-hidden="true" />
            <p className="mt-4 text-body text-foreground">Pick a date for your {projectName} demo</p>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              Available times show up here once you choose a day on the calendar.
            </p>
          </div>
        )}
      </div>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          {isAuthenticated ? (
            <>
              <DialogHeader>
                <DialogTitle>Confirm your appointment</DialogTitle>
                <DialogDescription>
                  {selectedDate && selectedTime
                    ? `${formatDateKey(selectedDate)} at ${selectedTime} — ${projectName} demo`
                    : null}
                </DialogDescription>
              </DialogHeader>
              <p className="mt-2 text-sm text-muted-foreground">
                Signed in as {viewer?.email ?? viewer?.name ?? "you"} — confirming locks in this slot, then continue
                through Messenger to finish.
              </p>
              {scheduleError && <p className="mt-2 text-sm text-destructive">{scheduleError}</p>}
              <Button variant="accent" size="lg" className="mt-4 w-full" disabled={scheduling} onClick={handleConfirm}>
                {scheduling ? "Scheduling…" : "Confirm & Message Us"}
              </Button>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Sign in to continue</DialogTitle>
                <DialogDescription>Sign in with Google to confirm this appointment.</DialogDescription>
              </DialogHeader>
              <Button
                variant="outline"
                size="lg"
                className="mt-2 w-full gap-2"
                disabled={signingIn}
                onClick={handleGoogleSignIn}
              >
                {signingIn ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                ) : (
                  <SiGoogle className="h-4 w-4" aria-hidden="true" />
                )}
                {signingIn ? "Redirecting…" : "Sign in with Google"}
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
