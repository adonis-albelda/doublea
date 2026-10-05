import { Hammer } from "lucide-react";

// Shown on any manual page that has no written content (or images) yet.
export function ContentInProgress() {
  return (
    <div className="flex gap-4 rounded-lg border border-dashed border-border-sage bg-card/40 p-6">
      <Hammer className="mt-0.5 h-5 w-5 shrink-0 text-slate-sage" aria-hidden="true" />
      <div>
        <p className="font-medium text-foreground">Content for this page is still in progress</p>
        <p className="mt-1 text-sm text-muted-foreground">
          We&apos;re working to make sure everything you need to know about POSPro One is documented here. That&apos;s
          the goal — check back soon as we keep adding to the manual.
        </p>
      </div>
    </div>
  );
}
