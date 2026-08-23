import { Quote } from "lucide-react";

import { Avatar, AvatarFallback } from "@repo/ui/components/ui/avatar";
import { Badge } from "@repo/ui/components/ui/badge";
import { Card, CardContent } from "@repo/ui/components/ui/card";
import { cn } from "@repo/ui/lib/utils";

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

function TestimonialCard({ t }: { t: (typeof TESTIMONIALS)[number] }) {
  return (
    <Card className="group flex w-full max-w-xs shrink-0 flex-col justify-between p-0">
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
  );
}

// Vertical marquee — track is duplicated once (translateY(-50%) in the
// marquee-vertical keyframe, globals.css) so the loop is seamless. Every
// column cycles the same 3 real testimonials at a different speed, since
// there isn't enough real client content yet to give each column a unique
// set. Pauses on hover; prefers-reduced-motion freezes it via the global
// rule in globals.css.
function TestimonialsColumn({
  duration,
  className,
}: {
  duration: number;
  className?: string;
}) {
  return (
    <div className={cn("overflow-hidden", className)}>
      <div
        className="flex animate-[marquee-vertical_linear_infinite] flex-col gap-6 hover:[animation-play-state:paused]"
        style={{ animationDuration: `${duration}s` }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex flex-col gap-6" aria-hidden={copy === 1}>
            {TESTIMONIALS.map((t) => (
              <TestimonialCard key={`${copy}-${t.name}`} t={t} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

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

        <div className="mt-10 flex max-h-[720px] justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]">
          <TestimonialsColumn duration={15} />
          <TestimonialsColumn duration={19} className="hidden md:block" />
          <TestimonialsColumn duration={17} className="hidden lg:block" />
        </div>
      </div>
    </section>
  );
}
