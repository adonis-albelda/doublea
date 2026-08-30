"use client";

import * as React from "react";
import { CheckCircle2, X } from "lucide-react";

const AUTO_DISMISS_MS = 5000;

// Minimal fixed-position toast — no global provider, just local show/hide
// state owned by whichever form renders it. Good enough for a single
// confirmation banner; reach for a real toast library if more call sites
// need one later.
export function Toast({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  React.useEffect(() => {
    const timer = setTimeout(onDismiss, AUTO_DISMISS_MS);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div
      role="status"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-sm items-start gap-3 rounded-xl border border-border-sage bg-card p-4 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-300 sm:inset-x-auto sm:right-6"
    >
      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
      <p className="flex-1 text-sm text-foreground">{message}</p>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss"
        className="text-slate-sage transition-colors hover:text-foreground"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
