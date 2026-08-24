"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@repo/ui/lib/utils";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function toDateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function startOfDay(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export interface BookDemoCalendarProps {
  selectedDate: string | null;
  onSelectDate: (dateKey: string) => void;
  blockedDates: ReadonlySet<string>;
}

export function BookDemoCalendar({ selectedDate, onSelectDate, blockedDates }: BookDemoCalendarProps) {
  const today = React.useMemo(() => startOfDay(new Date()), []);
  const [viewMonth, setViewMonth] = React.useState(() => new Date(today.getFullYear(), today.getMonth(), 1));

  const firstWeekday = viewMonth.getDay();
  const totalDays = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0).getDate();
  const cells: Array<{ date: Date; key: string } | null> = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: totalDays }, (_, i) => {
      const date = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), i + 1);
      return { date, key: toDateKey(date) };
    }),
  ];

  const isCurrentMonth = viewMonth.getFullYear() === today.getFullYear() && viewMonth.getMonth() === today.getMonth();

  return (
    <div>
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1))}
          disabled={isCurrentMonth}
          aria-label="Previous month"
          className="flex h-8 w-8 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary disabled:pointer-events-none disabled:opacity-30"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </button>
        <p className="font-display text-sm font-medium text-foreground">
          {viewMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </p>
        <button
          type="button"
          onClick={() => setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1))}
          aria-label="Next month"
          className="flex h-8 w-8 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary"
        >
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1 text-center">
        {WEEKDAYS.map((day) => (
          <span key={day} className="font-mono text-[0.65rem] uppercase tracking-wide text-slate-sage">
            {day}
          </span>
        ))}
        {cells.map((cell, i) => {
          if (!cell) return <span key={`blank-${i}`} />;
          const isPast = cell.date < today;
          const isBlocked = blockedDates.has(cell.key);
          const isSelected = selectedDate === cell.key;
          const isToday = cell.key === toDateKey(today);
          const disabled = isPast || isBlocked;

          return (
            <button
              key={cell.key}
              type="button"
              disabled={disabled}
              onClick={() => onSelectDate(cell.key)}
              aria-pressed={isSelected}
              aria-label={isBlocked ? `${cell.date.toDateString()}, already booked` : cell.date.toDateString()}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full text-sm transition-colors",
                disabled && "cursor-not-allowed text-slate-sage/40 line-through",
                !disabled && !isSelected && "text-foreground hover:bg-secondary",
                isSelected && "bg-primary font-semibold text-primary-foreground",
                isToday && !isSelected && "ring-1 ring-inset ring-primary/40",
              )}
            >
              {cell.date.getDate()}
            </button>
          );
        })}
      </div>

      <p className="mt-4 flex items-center gap-2 text-xs text-slate-sage">
        <span className="h-2.5 w-2.5 rounded-full bg-slate-sage/30" />
        Already booked — pick another date
      </p>
    </div>
  );
}
