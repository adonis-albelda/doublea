"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@repo/ui/components/ui/button";

import { RotatingCtaLabel } from "@/components/rotating-cta-label";
import { FACEBOOK_MESSENGER_URL } from "@/lib/social-links";

const HEADLINE = "Digital Solutions Built Around Your Business";
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
      <div className="container grid gap-12 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-24">
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
              We design and build websites and software that make your business easier to run,
              easier to manage, and easier for your customers to connect with. Whether you need a
              professional website or a custom system, we create practical digital solutions
              tailored to your goals.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                variant="accent"
                size="lg"
                className="animate-[cta-attention_5s_ease-in-out_infinite]"
                asChild
              >
                <Link
                  href={FACEBOOK_MESSENGER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Message us on Facebook"
                >
                  <RotatingCtaLabel textWidthClassName="w-[7.5rem]" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/#products">
                  See our products
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
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
