"use client";

import Link from "next/link";
import { Check, Users } from "lucide-react";

import { Badge } from "@repo/ui/components/ui/badge";
import { Button } from "@repo/ui/components/ui/button";
import { cn } from "@repo/ui/lib/utils";

import { useRevealEach } from "@/hooks/use-reveal";
import type { Project } from "@/lib/projects";
import { FACEBOOK_MESSENGER_URL } from "@/lib/social-links";

// DUMMY placeholder data — prices are real, "users" counts are made up
// (lib/projects.ts `pricingPlans`). Swap the counts for real subscriber
// numbers once there's real data to report.
export function PricingSection({ project }: { project: Project }) {
  const plans = project.pricingPlans;
  const { setRef, visible } = useRevealEach<HTMLDivElement>(plans?.length ?? 0);
  if (!plans || plans.length === 0) return null;

  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {plans.map((plan, i) => {
        const isHighlight = i === 1;
        const isContactTier = plan.price === null;
        const isVisible = visible[i];

        return (
          <div
            key={plan.name}
            ref={setRef(i)}
            className={cn(
              "flex flex-col rounded-2xl border p-6 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-xl hover:border-primary/60 sm:p-8",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
              isHighlight ? "border-primary bg-card shadow-lg" : "border-border-sage bg-card",
            )}
          >
            {isHighlight && (
              <Badge variant="status" className="mb-4 w-fit">
                Most popular
              </Badge>
            )}

            <h3 className="font-display text-h3 text-foreground">{plan.name}</h3>

            <div className="mt-4 flex items-baseline gap-1.5">
              {isContactTier ? (
                <span className="font-display text-h2 text-foreground">Let&apos;s talk</span>
              ) : (
                <>
                  <span className="font-display text-h2 text-foreground">{plan.price}</span>
                  {plan.priceNote && <span className="text-sm text-muted-foreground">{plan.priceNote}</span>}
                </>
              )}
            </div>
            {isContactTier && plan.priceNote && (
              <p className="mt-1 text-sm text-muted-foreground">{plan.priceNote}</p>
            )}

            <p className="mt-4 flex items-center gap-1.5 text-sm text-slate-sage">
              <Users className="h-3.5 w-3.5" aria-hidden="true" />
              {plan.users}
            </p>

            <ul className="mt-6 flex flex-1 flex-col gap-2.5">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>

            <Button
              variant={isHighlight ? "accent" : "outline"}
              size="lg"
              className="mt-6 w-full"
              asChild
            >
              {isContactTier ? (
                <Link href={FACEBOOK_MESSENGER_URL} target="_blank" rel="noopener noreferrer">
                  Talk to our team
                </Link>
              ) : (
                <Link href="#book-demo">
                  <Check className="h-4 w-4" aria-hidden="true" />
                  Get started
                </Link>
              )}
            </Button>
          </div>
        );
      })}
    </div>
  );
}
