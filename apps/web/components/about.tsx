"use client";

import { Bot, GitBranch, MessageSquare, Rows3, Target } from "lucide-react";

import { cn } from "@repo/ui/lib/utils";

import { useReveal } from "@/hooks/use-reveal";

const WHY_US_POINTS = [
  {
    icon: Target,
    title: "Built Around Your Needs",
    text: "We don't force your business into a template. We create solutions based on how you actually work.",
  },
  {
    icon: MessageSquare,
    title: "Clear Communication",
    text: "You talk directly to the person writing your code, from kickoff to launch and after — no account manager relaying messages, no junior developer learning on your invoice.",
  },
  {
    icon: GitBranch,
    title: "Quality You Can Trust",
    text: "Every project ships with a staging environment and a rollback plan before it touches production, so nothing reaches your customers untested.",
  },
  {
    icon: Rows3,
    title: "You Own What We Build",
    text: "Your website, software, source code, and documentation are yours — full ownership, no lock-in.",
  },
  {
    icon: Bot,
    title: "Built for the Long Term",
    text: "We use AI-assisted tooling in our own workflow — for scaffolding, code review, and test coverage — so timelines stay short without cutting corners on the code you inherit.",
  },
] as const;

export function About() {
  const { ref, visible } = useReveal<HTMLUListElement>();

  return (
    <section id="about" className="bg-background py-14 lg:py-20">
      <div className="container">
        <div className="max-w-2xl">
          <p className="font-mono text-caption uppercase tracking-[0.04em] text-slate-sage">About</p>
          <h2 className="mt-3 font-display text-h2 text-foreground">Technology with a personal approach</h2>
          <p className="mt-6 font-display text-h3 text-primary">8 years building production software</p>
          <p className="mt-4 text-body-lg text-muted-foreground">
            We&apos;re a team of professionals based in Calbayog City. We believe technology should
            make business simpler — not more complicated — so instead of a one-size-fits-all
            solution, we take the time to understand your business, your challenges, and what you
            want to achieve. Every project stays on a small, senior team from kickoff to launch.
          </p>
        </div>

        <ul ref={ref} className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_US_POINTS.map((point, i) => (
            <li
              key={point.title}
              style={{ transitionDelay: visible ? `${i * 100}ms` : "0ms" }}
              className={cn(
                "flex flex-col gap-3 rounded-lg border border-border-sage bg-card p-5 transition-all duration-500 ease-out hover:border-primary/40",
                visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
              )}
            >
              <point.icon className="h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
              <h3 className="font-display text-h3 text-foreground">{point.title}</h3>
              <p className="text-sm text-muted-foreground">{point.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
