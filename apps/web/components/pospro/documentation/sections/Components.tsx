import { Eye } from "lucide-react";

import type { ScreenComponentSpec } from "@/lib/pospro/auth-data";

export function ComponentsSection({ components }: { components: ScreenComponentSpec[] }) {
  return (
    <section>
      <h3 className="font-display text-h3 text-foreground">Components</h3>
      <div className="mt-4 space-y-5">
        {components.map((component) => (
          <ComponentCard key={component.name} component={component} />
        ))}
      </div>
    </section>
  );
}

function ComponentCard({ component }: { component: ScreenComponentSpec }) {
  const requirements = getRequirementLines(component);

  return (
    <div className="overflow-hidden rounded-lg border border-border-sage bg-card">
      {requirements.length > 0 && (
        <div className="border-b border-border-sage bg-sage-100/60 px-4 py-2">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-sage">Requirements</p>
          <ul className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-ink">
            {requirements.map((requirement) => (
              <li key={requirement}>• {requirement}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="p-4">
        <FieldPreview component={component} />

        {component.errorMessages && (
          <ul className="mt-2 space-y-0.5 text-xs text-destructive">
            {component.errorMessages.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}

        {component.notes && <p className="mt-2 text-xs text-muted-foreground">{component.notes}</p>}
      </div>
    </div>
  );
}

function FieldPreview({ component }: { component: ScreenComponentSpec }) {
  switch (component.type) {
    case "text-input":
    case "password-input":
      return (
        <div>
          <label className="block text-xs font-medium text-foreground">{component.name}</label>
          <div className="mt-1.5 flex items-center justify-between rounded-md border border-border-sage bg-background px-3 py-2 text-sm text-muted-foreground">
            <span>{component.placeholder}</span>
            {component.type === "password-input" && <Eye className="h-4 w-4 shrink-0 text-slate-sage" />}
          </div>
          {component.showStrengthIndicator && (
            <div className="mt-2 flex items-center gap-2">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                <div className="h-full w-1/3 rounded-full bg-clay" />
              </div>
              <span className="text-[10px] text-slate-sage">Fair</span>
            </div>
          )}
        </div>
      );

    case "checkbox":
      return (
        <label className="flex items-start gap-2 text-sm text-foreground">
          <span className="mt-0.5 flex h-4 w-4 shrink-0 rounded border border-border-sage bg-background" />
          <span>{component.name}</span>
        </label>
      );

    case "primary-button":
      return (
        <button
          type="button"
          disabled
          className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          {component.name}
        </button>
      );

    case "text-link":
      return <span className="text-sm font-medium text-primary underline underline-offset-2">{component.name}</span>;

    case "otp-input":
      return (
        <div>
          <label className="block text-xs font-medium text-foreground">{component.name}</label>
          <div className="mt-1.5 flex gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex h-9 w-8 items-center justify-center rounded-md border border-border-sage bg-background text-sm text-muted-foreground"
              >
                –
              </div>
            ))}
          </div>
        </div>
      );

    default:
      return <p className="text-sm text-muted-foreground">{component.name}</p>;
  }
}

function getRequirementLines(component: ScreenComponentSpec): string[] {
  const lines: string[] = [];

  if (component.validation) {
    for (const [key, value] of Object.entries(component.validation)) {
      if (value === false) continue;
      lines.push(value === true ? humanizeKey(key) : `${humanizeKey(key)}: ${value}`);
    }
  }

  if (component.requirements) {
    lines.push(...component.requirements);
  }

  if (component.showStrengthIndicator) {
    lines.push("Live strength indicator");
  }

  return lines;
}

function humanizeKey(key: string): string {
  return key.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/^./, (c) => c.toUpperCase());
}
