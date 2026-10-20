import { Check } from "lucide-react";

export function HighlightsSection({ intro, items }: { intro: string; items: string[] }) {
  return (
    <section>
      <h3 className="font-display text-h3 text-foreground">What You Can Do</h3>
      <p className="mt-2 text-sm text-muted-foreground">{intro}</p>
      <ul className="mt-4 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm text-foreground">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
