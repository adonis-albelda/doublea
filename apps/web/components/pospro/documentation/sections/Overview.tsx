interface OverviewSectionProps {
  purpose: string;
  userFlow: string[];
  nextScreen?: string;
}

export function OverviewSection({ purpose, userFlow, nextScreen }: OverviewSectionProps) {
  return (
    <section>
      <h3 className="font-display text-h3 text-foreground">Overview</h3>
      <p className="mt-2 text-sm text-muted-foreground">{purpose}</p>
      <ol className="mt-4 space-y-2">
        {userFlow.map((step, i) => (
          <li key={step} className="flex gap-3 text-sm">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
              {i + 1}
            </span>
            <span className="text-foreground">{step}</span>
          </li>
        ))}
      </ol>
      {nextScreen && (
        <p className="mt-4 text-sm text-muted-foreground">
          Leads to: <span className="font-medium text-foreground">{nextScreen}</span>
        </p>
      )}
    </section>
  );
}
