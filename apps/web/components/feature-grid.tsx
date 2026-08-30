"use client";

import { Zap } from "lucide-react";

import { cn } from "@repo/ui/lib/utils";

import { useRevealEach } from "@/hooks/use-reveal";
import { DEFAULT_FEATURE_ICON, FEATURE_ICONS } from "@/lib/feature-icons";

// One-at-a-time entrance — each card has its own IntersectionObserver entry
// (useRevealEach) and reveals exactly when it scrolls into view. Global CSS
// zeroes transition-duration under prefers-reduced-motion, so this degrades
// to an instant, unanimated appearance there.
export function FeatureGrid({
  features,
  highlightFeatures,
}: {
  features: readonly string[];
  highlightFeatures?: readonly string[];
}) {
  const { setRef, visible } = useRevealEach<HTMLLIElement>(features.length);

  return (
    <ul className="mt-10 grid gap-4 sm:grid-cols-2">
      {features.map((feature, i) => {
        const FeatureIcon = FEATURE_ICONS[feature] ?? DEFAULT_FEATURE_ICON;
        const isHighlight = highlightFeatures?.includes(feature) ?? false;
        const isVisible = visible[i];
        return (
          <li
            key={feature}
            ref={setRef(i)}
            className={cn(
              "flex items-start gap-3 rounded-lg border p-5 transition-all duration-500 ease-out",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
              isHighlight ? "border-accent/50 bg-accent/5" : "border-border-sage bg-card hover:border-primary/40",
            )}
          >
            <FeatureIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <p className="text-body text-foreground">{feature}</p>
              {isHighlight && (
                <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-0.5 font-mono text-[0.65rem] font-medium uppercase tracking-wide text-accent-foreground">
                  <Zap className="h-3 w-3" aria-hidden="true" />
                  Advanced feature
                </span>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
