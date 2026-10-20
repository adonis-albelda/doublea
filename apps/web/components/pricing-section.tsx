"use client";

import Link from "next/link";
import { Check, Heart, MessageCircle } from "lucide-react";

import { Badge } from "@repo/ui/components/ui/badge";
import { Button } from "@repo/ui/components/ui/button";
import { cn } from "@repo/ui/lib/utils";

import { useRevealEach } from "@/hooks/use-reveal";
import type { Project } from "@/lib/projects";
import { FACEBOOK_MESSENGER_URL } from "@/lib/social-links";

// Plans come from lib/projects.ts `pricingPlans`. The note below the cards
// (this year's pricing, pioneer price lock, trial extension) is POSPro One's.
export function PricingSection({ project }: { project: Project }) {
  const plans = project.pricingPlans;
  const { setRef, visible } = useRevealEach<HTMLDivElement>(plans?.length ?? 0);
  if (!plans || plans.length === 0) return null;

  return (
    <div>
      <div className={cn("grid gap-6", plans.length === 2 ? "mx-auto max-w-4xl sm:grid-cols-2" : "sm:grid-cols-3")}>
        {plans.map((plan, i) => {
          const isHighlight = plans.length > 2 && i === 1;
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

              <ul className="mt-6 flex flex-1 flex-col gap-2.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button variant={isHighlight ? "accent" : "outline"} size="lg" className="mt-6 w-full" asChild>
                {isContactTier ? (
                  <Link href={FACEBOOK_MESSENGER_URL} target="_blank" rel="noopener noreferrer">
                    Talk to our team
                  </Link>
                ) : (
                  <Link href={plan.cta?.href ?? "#book-demo"}>
                    <Check className="h-4 w-4" aria-hidden="true" />
                    {plan.cta?.label ?? "Get started"}
                  </Link>
                )}
              </Button>
            </div>
          );
        })}
      </div>

      <div className="mx-auto mt-8 max-w-4xl rounded-2xl border border-border-sage bg-card p-6 sm:p-8">
        <div className="flex items-start gap-3">
          <Heart className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
          <div>
            <p className="text-body font-medium text-foreground">A thank-you to our first users</p>
            <p className="mt-2 text-sm text-muted-foreground">
              These prices are for {new Date().getFullYear()} and may be updated next year as {project.name} grows. But
              if you join us now, your price stays the same — forever. It&apos;s our way of saying thank you to the
              pioneers who believed in {project.name} from the very beginning and helped shape it into what it is today.
            </p>
          </div>
        </div>
        <div className="mt-5 flex items-start gap-3 border-t border-border-sage pt-5">
          <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
          <p className="text-sm text-muted-foreground">
            Need more than 14 days to try everything out? We&apos;re happy to extend your free trial —{" "}
            <Link
              href={FACEBOOK_MESSENGER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline-offset-2 hover:underline"
            >
              message us
            </Link>{" "}
            and let&apos;s talk about what works for you.
          </p>
        </div>
      </div>
    </div>
  );
}
