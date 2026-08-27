"use client";

import {
  Database,
  Globe,
  Heart,
  Lightbulb,
  Puzzle,
  RefreshCw,
  Repeat,
  Zap,
} from "lucide-react";

import { cn } from "@repo/ui/lib/utils";

import { useReveal } from "@/hooks/use-reveal";

const AUDIENCE = [
  {
    icon: Globe,
    title: "Build a professional online presence",
    text: "A website that looks credible and works properly, wherever customers find you.",
  },
  {
    icon: RefreshCw,
    title: "Improve their existing website",
    text: "Refresh outdated design, speed, or content without starting from zero.",
  },
  {
    icon: Zap,
    title: "Automate repetitive tasks",
    text: "Free up hours spent on the same manual steps every day.",
  },
  {
    icon: Database,
    title: "Organize business information",
    text: "Turn scattered files and spreadsheets into one place you can trust.",
  },
  {
    icon: Repeat,
    title: "Replace manual processes",
    text: "Swap paper trails and sticky notes for a system that runs itself.",
  },
  {
    icon: Heart,
    title: "Improve customer experience",
    text: "Make it easier for customers to reach you, order, or get support.",
  },
  {
    icon: Puzzle,
    title: "Create a system tailored to their operations",
    text: "Software built around how your team actually works, not a generic template.",
  },
  {
    icon: Lightbulb,
    title: "Turn an idea into a working digital product",
    text: "Go from a rough idea to something real people can use.",
  },
] as const;

export function WhoWeHelp() {
  const { ref, visible } = useReveal<HTMLUListElement>();

  return (
    <section className="bg-page-wash py-14 lg:py-20">
      <div className="container">
        <div className="max-w-2xl">
          <p className="font-mono text-caption uppercase tracking-[0.04em] text-slate-sage">Who we help</p>
          <h2 className="mt-3 font-display text-h2 text-foreground">Digital solutions for growing businesses</h2>
          <p className="mt-4 text-body-lg text-muted-foreground">
            Our services are ideal for businesses that want to:
          </p>
        </div>

        <ul ref={ref} className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {AUDIENCE.map((item, i) => (
            <li
              key={item.title}
              style={{ transitionDelay: visible ? `${i * 80}ms` : "0ms" }}
              className={cn(
                "flex flex-col gap-3 rounded-lg border border-border-sage bg-card p-5 transition-all duration-500 ease-out hover:border-primary/40",
                visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
              )}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <item.icon className="h-5 w-5 text-primary" aria-hidden="true" />
              </span>
              <h3 className="font-display text-body font-medium text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
