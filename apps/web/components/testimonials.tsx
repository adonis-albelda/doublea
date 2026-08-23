import { Quote } from "lucide-react";

import { Avatar, AvatarFallback } from "@repo/ui/components/ui/avatar";
import { Badge } from "@repo/ui/components/ui/badge";
import { Card, CardContent } from "@repo/ui/components/ui/card";

// PLACEHOLDER TESTIMONIALS — no real client quotes were supplied for this
// build. Swap for actual client feedback (with permission) before launch.
// Names/companies here match the placeholder projects in products.tsx.
const TESTIMONIALS = [
  {
    quote:
      "Our booking calls dropped almost in half within the first month. It just works, and support answers the same day.",
    name: "Priya Shah",
    role: "Owner, Fernbank Orthodontics",
    initials: "PS",
    result: "-40% calls",
  },
  {
    quote: "They shipped in six weeks what our last vendor quoted five months for.",
    name: "Marcus Alden",
    role: "Operations Lead, Loop Fulfillment",
    initials: "MA",
    result: "6 wks vs 5 mo",
  },
  {
    quote: "Checkout used to lose us customers. Now it doesn't. That's the whole review.",
    name: "Elena Vasquez",
    role: "Founder, Harbor & Vine",
    initials: "EV",
    result: "+22% orders",
  },
] as const;

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-background py-20 lg:py-28">
      <div className="container">
        <div className="max-w-2xl">
          <p className="font-mono text-caption uppercase tracking-[0.04em] text-slate-sage">
            Clients
          </p>
          <h2 className="mt-3 font-display text-h2 text-foreground">What it&apos;s like to work with us</h2>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <Card key={t.name} className="group flex flex-col justify-between p-0">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-2">
                  <Quote
                    className="h-6 w-6 text-sage-300 transition-colors duration-300 group-hover:text-primary"
                    aria-hidden="true"
                  />
                  <Badge variant="status" className="shrink-0">
                    {t.result}
                  </Badge>
                </div>
                <p className="mt-4 text-body text-foreground">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-6 flex items-center gap-3">
                  <Avatar className="transition-transform duration-300 group-hover:scale-105">
                    <AvatarFallback>{t.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-foreground">{t.name}</p>
                    <p className="text-xs text-slate-sage">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
