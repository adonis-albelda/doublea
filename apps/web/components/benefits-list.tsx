"use client";

import { Check } from "lucide-react";

import { cn } from "@repo/ui/lib/utils";

import { useReveal } from "@/hooks/use-reveal";

export function BenefitsList({ benefits }: { benefits: readonly string[] }) {
  const { ref, visible } = useReveal<HTMLUListElement>();

  return (
    <ul ref={ref} className="mt-6 flex flex-col gap-4">
      {benefits.map((benefit, i) => (
        <li
          key={benefit}
          style={{ transitionDelay: visible ? `${i * 80}ms` : "0ms" }}
          className={cn(
            "flex items-start gap-3 transition-all duration-500 ease-out",
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
          )}
        >
          <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
          <p className="text-body text-foreground">{benefit}</p>
        </li>
      ))}
    </ul>
  );
}
