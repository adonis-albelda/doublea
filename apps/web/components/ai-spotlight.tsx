"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Sparkles, User } from "lucide-react";

import { cn } from "@repo/ui/lib/utils";

const AUTO_ADVANCE_MS = 7000;

type Spotlight = {
  eyebrow: string;
  title: string;
  description: string;
  example: { query: string; response: readonly string[] };
  note?: string;
};

export function AiSpotlight({ spotlight }: { spotlight: readonly Spotlight[] }) {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    if (spotlight.length <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % spotlight.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(interval);
  }, [spotlight.length]);

  const current = spotlight[index];
  if (!current) return null;

  return (
    <div className="rounded-2xl border border-border-sage bg-card p-6 sm:p-8">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 font-mono text-[0.65rem] font-medium uppercase tracking-wide text-accent-foreground">
            <Sparkles className="h-3 w-3" aria-hidden="true" />
            {current.eyebrow}
          </span>
          <h3 className="mt-4 font-display text-h3 text-foreground">{current.title}</h3>
          <p className="mt-3 text-body text-muted-foreground">{current.description}</p>
        </div>

        {/* Illustrative example — not a live search, shown to demonstrate the
            concept (matching intent, not exact product name). */}
        <div className="flex flex-col gap-3 rounded-xl border border-border-sage bg-background p-5">
          <div className="flex items-start justify-end gap-2">
            <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground">
              {current.example.query}
            </div>
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary">
              <User className="h-3.5 w-3.5 text-secondary-foreground" aria-hidden="true" />
            </span>
          </div>

          <div className="flex items-start gap-2">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent">
              <Sparkles className="h-3.5 w-3.5 text-accent-foreground" aria-hidden="true" />
            </span>
            <div className="flex max-w-[85%] flex-col gap-1.5 rounded-2xl rounded-tl-sm border border-border-sage bg-card px-4 py-2.5">
              {current.example.response.map((item) => (
                <p key={item} className="text-sm text-foreground">
                  {item}
                </p>
              ))}
            </div>
          </div>

          {current.note && (
            <p className="pl-9 text-xs italic text-slate-sage">{current.note}</p>
          )}
        </div>
      </div>

      {spotlight.length > 1 && (
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => setIndex((i) => (i - 1 + spotlight.length) % spotlight.length)}
            aria-label="Previous AI feature"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border-sage text-slate-sage transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>

          <div className="flex items-center gap-2">
            {spotlight.map((item, i) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show AI feature ${i + 1}`}
                aria-current={i === index}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === index ? "w-6 bg-primary" : "w-1.5 bg-border-sage hover:bg-primary/40",
                )}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => setIndex((i) => (i + 1) % spotlight.length)}
            aria-label="Next AI feature"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border-sage text-slate-sage transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
