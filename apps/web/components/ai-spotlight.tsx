import { Sparkles, User } from "lucide-react";

export function AiSpotlight({
  spotlight,
}: {
  spotlight: {
    eyebrow: string;
    title: string;
    description: string;
    example: { query: string; response: readonly string[] };
  };
}) {
  return (
    <div className="grid gap-10 rounded-2xl border border-border-sage bg-card p-6 sm:p-8 lg:grid-cols-2 lg:items-center">
      <div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 font-mono text-[0.65rem] font-medium uppercase tracking-wide text-accent-foreground">
          <Sparkles className="h-3 w-3" aria-hidden="true" />
          {spotlight.eyebrow}
        </span>
        <h3 className="mt-4 font-display text-h3 text-foreground">{spotlight.title}</h3>
        <p className="mt-3 text-body text-muted-foreground">{spotlight.description}</p>
      </div>

      {/* Illustrative example — not a live search, shown to demonstrate the
          concept (matching intent, not exact product name). */}
      <div className="flex flex-col gap-3 rounded-xl border border-border-sage bg-background p-5">
        <div className="flex items-start justify-end gap-2">
          <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground">
            {spotlight.example.query}
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
            {spotlight.example.response.map((item) => (
              <p key={item} className="text-sm text-foreground">
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
