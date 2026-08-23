"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@repo/ui/components/ui/button";

// H1 options considered:
// 1. "We turn your idea into software that ships, runs, and keeps working."
// 2. "Your idea, built into software people actually use."
// 3. "From sketch to shipped product, without the agency runaround."
// Went with #1 — it's the only one that names the full arc (idea → shipped →
// maintained) in one active-voice sentence, which is the actual promise.
const HEADLINE = "We turn your idea into software that ships, runs, and keeps working.";
const TYPE_SPEED_MS = 28;

export function Hero() {
  const [typedLength, setTypedLength] = React.useState(0);
  const [typingDone, setTypingDone] = React.useState(false);

  React.useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setTypedLength(HEADLINE.length);
      setTypingDone(true);
      return;
    }

    const interval = setInterval(() => {
      setTypedLength((length) => {
        if (length >= HEADLINE.length) {
          clearInterval(interval);
          setTypingDone(true);
          return length;
        }
        return length + 1;
      });
    }, TYPE_SPEED_MS);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="top" className="relative overflow-hidden bg-page-wash">
      <div className="container grid gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-32">
        <div>
          <p className="font-mono text-caption uppercase tracking-[0.04em] text-slate-sage">
            Custom software · Websites · Web apps · Automation
          </p>
          <h1 className="mt-4 font-display text-display-lg text-foreground sm:text-display-xl">
            <span aria-hidden="true">
              {HEADLINE.slice(0, typedLength)}
              <span
                className={`ml-0.5 inline-block h-[0.9em] w-[2px] translate-y-[0.1em] bg-primary align-middle ${
                  typingDone ? "opacity-0" : "animate-pulse"
                }`}
              />
            </span>
            <span className="sr-only">{HEADLINE}</span>
          </h1>
          <div
            className={`transition-opacity duration-500 ${typingDone ? "opacity-100" : "opacity-0"}`}
          >
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
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-md [perspective:1200px] lg:max-w-none">
          <Image
            src="/logo-3d.png"
            alt="Double A Digital Solutions"
            fill
            priority
            className="animate-[spin-y_9s_linear_infinite] object-contain [transform-style:preserve-3d]"
          />
        </div>
      </div>
    </section>
  );
}
