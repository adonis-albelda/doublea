import { Bot, GitBranch, MessageSquare, Rows3 } from "lucide-react";

import { TechBadge } from "@/components/tech-badge";

const STACK = ["TypeScript", "Next.js", "PostgreSQL", "n8n", "Tailwind CSS"] as const;

const PROOF_POINTS = [
  {
    icon: GitBranch,
    text: "Every project ships with a staging environment and a rollback plan before it touches production.",
  },
  {
    icon: MessageSquare,
    text: "Support requests get a reply within one business day — not a ticket queue.",
  },
  {
    icon: Rows3,
    text: "You get read access to the same project board we build from, so status is never a guess.",
  },
  {
    icon: Bot,
    text: "We use AI-assisted tooling in our own workflow — for scaffolding, code review, and test coverage — so timelines stay short without cutting corners on the code you inherit.",
  },
] as const;

export function About() {
  return (
    <section id="about" className="py-20 lg:py-28">
      <div className="container grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="font-mono text-caption uppercase tracking-[0.04em] text-slate-sage">
            About
          </p>
          <h2 className="mt-3 font-display text-h2 text-foreground">Why teams work with us</h2>
          <p className="mt-6 font-display text-h3 text-primary">8 years building production software</p>
          <p className="mt-4 text-body-lg text-muted-foreground">
            We&apos;ve spent eight years shipping custom software, sites, and internal tools for
            founders and ops teams — long enough that most of our work now comes from past
            clients referring the next one, not cold outreach.
          </p>
          <p className="mt-4 text-body-lg text-muted-foreground">
            We keep every project on a small, senior team — no account manager relaying
            messages, no junior developer learning on your invoice. You talk directly to the
            person writing your code, from kickoff to launch and after.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {STACK.map((tech) => (
              <TechBadge key={tech} name={tech} />
            ))}
          </div>
        </div>

        <ul className="flex flex-col gap-6">
          {PROOF_POINTS.map((point) => (
            <li key={point.text} className="flex gap-4">
              <point.icon className="mt-0.5 h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
              <p className="text-body text-foreground">{point.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
