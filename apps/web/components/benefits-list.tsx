"use client";

import { Check } from "lucide-react";

import { cn } from "@repo/ui/lib/utils";

import { useRevealEach } from "@/hooks/use-reveal";

export function BenefitsList({ benefits }: { benefits: readonly string[] }) {
  const { setRef, visible } = useRevealEach<HTMLLIElement>(benefits.length);

  return (
    <ul className="mt-6 flex flex-col gap-4">
      {benefits.map((benefit, i) => (
        <li
          key={benefit}
          ref={setRef(i)}
          className={cn(
            "flex items-start gap-3 transition-all duration-500 ease-out",
            visible[i] ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
          )}
        >
          <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
          <p className="text-body text-foreground">{benefit}</p>
        </li>
      ))}
    </ul>
  );
}
