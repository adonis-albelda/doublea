"use client";

import { Bot, Layers, ShieldCheck, Zap } from "lucide-react";

import { cn } from "@repo/ui/lib/utils";

import { useRevealEach } from "@/hooks/use-reveal";

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Core: Layers,
  "AI-powered": Bot,
  Security: ShieldCheck,
};

export function FeatureCategories({
  categories,
}: {
  categories: readonly {
    category: string;
    description: string;
    items: readonly { title: string; description: string; highlight?: boolean }[];
  }[];
}) {
  const totalItems = categories.reduce((sum, group) => sum + group.items.length, 0);
  const { setRef, visible } = useRevealEach<HTMLLIElement>(totalItems);
  let index = 0;

  return (
    <div className="mt-10 flex flex-col gap-12">
      {categories.map((group) => {
        const CategoryIcon = CATEGORY_ICONS[group.category] ?? Layers;
        return (
          <div key={group.category}>
            <div className="flex items-center gap-2">
              <CategoryIcon className="h-5 w-5 text-primary" aria-hidden="true" />
              <h3 className="font-mono text-caption uppercase tracking-[0.04em] text-slate-sage">
                {group.category}
              </h3>
            </div>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{group.description}</p>

            {/* 2-per-row grid, tied together by a center spine on sm+ (each
                card's dot lands on it) and a left-edge line on mobile. */}
            <ul className="relative mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              <div
                className="absolute left-[15px] top-2 bottom-2 w-px bg-border-sage sm:left-1/2 sm:-translate-x-1/2"
                aria-hidden="true"
              />
              {group.items.map((item) => {
                const i = index++;
                const isLeftCol = i % 2 === 0;
                return (
                  <li
                    key={item.title}
                    ref={setRef(i)}
                    className={cn(
                      "group relative flex items-start gap-4 transition-all duration-500 ease-out sm:block sm:gap-0",
                      visible[i] ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0",
                    )}
                  >
                    {/* mobile dot — inline, left edge; pops/shakes on hover */}
                    <span
                      className={cn(
                        "relative z-10 mt-1.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 bg-page-wash transition-colors duration-300 group-hover:animate-[dot-pop_0.45s_ease-in-out] sm:hidden",
                        item.highlight ? "border-accent bg-accent/10" : "border-primary/50 group-hover:border-primary",
                      )}
                      aria-hidden="true"
                    >
                      <span className={cn("h-2.5 w-2.5 rounded-full", item.highlight ? "bg-accent" : "bg-primary/60")} />
                    </span>

                    {/* desktop dot — sits on the center spine, tying every card to it; pops/shakes on hover */}
                    <span
                      className={cn(
                        "absolute top-6 z-10 hidden h-3 w-3 rounded-full border-2 bg-page-wash transition-colors duration-300 group-hover:animate-[dot-pop_0.45s_ease-in-out] sm:block",
                        item.highlight ? "border-accent bg-accent" : "border-primary/60 bg-primary/60 group-hover:border-primary group-hover:bg-primary",
                        isLeftCol ? "-right-5" : "-left-5",
                      )}
                      aria-hidden="true"
                    />

                    <div
                      className={cn(
                        "flex-1 rounded-lg border p-5",
                        item.highlight ? "border-accent/50 bg-accent/5" : "border-border-sage bg-card hover:border-primary/40",
                      )}
                    >
                      <p className="text-body font-medium text-foreground">{item.title}</p>
                      <p className="mt-1.5 text-sm text-muted-foreground">{item.description}</p>
                      {item.highlight && (
                        <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-0.5 font-mono text-[0.65rem] font-medium uppercase tracking-wide text-accent-foreground">
                          <Zap className="h-3 w-3" aria-hidden="true" />
                          Advanced feature
                        </span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
