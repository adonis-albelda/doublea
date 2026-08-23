import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@repo/ui/components/ui/button";

import { PixelAscent } from "@/components/pixel-ascent";

// H1 options considered:
// 1. "We turn your idea into software that ships, runs, and keeps working."
// 2. "Your idea, built into software people actually use."
// 3. "From sketch to shipped product, without the agency runaround."
// Went with #1 — it's the only one that names the full arc (idea → shipped →
// maintained) in one active-voice sentence, which is the actual promise.

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-page-wash">
      <div className="container grid gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-32">
        <div>
          <p className="font-mono text-caption uppercase tracking-[0.04em] text-slate-sage">
            Custom software · Websites · Web apps · Automation
          </p>
          <h1 className="mt-4 font-display text-display-lg text-foreground sm:text-display-xl">
            We turn your idea into software that ships, runs, and keeps working.
          </h1>
          <p className="mt-6 max-w-xl text-body-lg text-muted-foreground">
            We work with founders and ops teams who need a working product, not a pitch deck.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button variant="accent" size="lg" asChild>
              <Link href="#contact">
                Start a project
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="#products">See our products</Link>
            </Button>
          </div>
        </div>

        <div className="relative mx-auto aspect-[8/5] w-full max-w-md lg:max-w-none">
          <PixelAscent variant="hero" className="h-full w-full" />
        </div>
      </div>
    </section>
  );
}
