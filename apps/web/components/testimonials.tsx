import { Quote } from "lucide-react";

import { Avatar, AvatarFallback } from "@repo/ui/components/ui/avatar";
import { Card, CardContent } from "@repo/ui/components/ui/card";
import { cn } from "@repo/ui/lib/utils";

// Names supplied directly by the user (real people). Quotes are still
// PLACEHOLDER text — no actual interview/quote was collected from any of
// them, just written to reflect what our real current projects (POSPro,
// CareConnect, CCPC Registration) realistically solve. Swap the quotes for
// real, attributed feedback once we have it.
const TESTIMONIALS = [
  {
    quote:
      "Sales still come in even when the internet drops, and I can finally see what I'm actually making after expenses.",
    name: "Jerson Barandino",
    role: "Store owner, Calbayog City",
    initials: "JB",
  },
  {
    quote: "Stock counts update on their own now. I used to spend hours counting by hand every night.",
    name: "Emman Conquillo",
    role: "Store owner, Calbayog City",
    initials: "EC",
  },
  {
    quote: "Every register shows the same numbers instantly. No more end-of-day surprises.",
    name: "JDSON Hcs",
    role: "Store owner, Calbayog City",
    initials: "JH",
  },
  {
    quote:
      "Families call us already knowing what we offer. The site does half the explaining before we even pick up the phone.",
    name: "Renante Albelda",
    role: "Home care agency owner",
    initials: "RA",
  },
  {
    quote: "It finally looks like the trustworthy agency we actually are. Inquiries come in ready to book.",
    name: "Jerico Mancol",
    role: "Client care coordinator",
    initials: "JM",
  },
  {
    quote: "Registration and payments used to be a headache to track by hand. Now it's just one dashboard.",
    name: "Dale Pajarito",
    role: "Tournament organizer, Calbayog City Pickleball Club",
    initials: "DP",
  },
  {
    quote: "Players pay through GCash and we see it update right away. Tournament day runs so much smoother.",
    name: "Dabie So-Rabulan",
    role: "Club officer, Calbayog City Pickleball Club",
    initials: "DS",
  },
] as const;

function TestimonialCard({ t }: { t: (typeof TESTIMONIALS)[number] }) {
  return (
    <Card className="group flex w-full max-w-xs shrink-0 flex-col justify-between p-0">
      <CardContent className="p-6">
        <Quote
          className="h-6 w-6 text-sage-300 transition-colors duration-300 group-hover:text-primary"
          aria-hidden="true"
        />
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
// column cycles the same 7 testimonials at a different speed, since
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
    <section id="testimonials" className="bg-background py-14 lg:py-20">
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
