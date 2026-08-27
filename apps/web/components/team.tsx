"use client";

import * as React from "react";
import { Facebook, Linkedin, Twitter } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/ui/avatar";
import { Badge } from "@repo/ui/components/ui/badge";
import { Card, CardContent } from "@repo/ui/components/ui/card";
import { cn } from "@repo/ui/lib/utils";

import { useReveal } from "@/hooks/use-reveal";

// Social links are "#" placeholders — fill in real profile URLs.
const TEAM = [
  {
    name: "Angelica Cañete",
    role: "CEO",
    credential: "Professional Teacher, Certified Guidance Councilor",
    tagline: "Turning big visions into things people can actually use.",
    messages: ["Hi, I'm Angelica.", "I turn big visions into things people actually use.", "Got an idea? Let's talk."],
    image: "/team/angelica.jpg",
    facebook: "https://www.facebook.com/gelic.cute",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Adonis Albelda",
    role: "CTO",
    credential: "Software Engineer, 8+ years",
    tagline: "Writing code that ships, and keeps working.",
    messages: ["Hey, I'm Adonis.", "I write the code that ships.", "And keeps working after."],
    image: "/team/adonis.png",
    facebook: "https://www.facebook.com/roberto.albelda.5/",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Ivan Turla",
    role: "Marketing Head",
    credential: "Professional Teacher",
    tagline: "Making sure the right people hear about what we build.",
    messages: ["Hi, I'm Ivan.", "I make sure people hear about what we build.", "Let's get your story out there."],
    image: "/team/ivan.png",
    facebook: "https://www.facebook.com/vhanz.turla",
    linkedin: "#",
    twitter: "#",
  },
] as const;

// Types out each message, holds, erases, then moves to the next — loops
// through all 3 continuously once triggered. Doesn't start until `active`
// (section scrolled into view) plus its own per-card stagger delay, so
// cards read as introducing themselves one after another. Decorative only
// (aria-hidden — the tagline below already gives the same info to screen
// readers), and skips straight to the first message, fully typed, static,
// under prefers-reduced-motion.
function SpeechBubble({
  messages,
  active,
  startDelayMs,
}: {
  messages: readonly string[];
  active: boolean;
  startDelayMs: number;
}) {
  const [started, setStarted] = React.useState(false);
  const [msgIndex, setMsgIndex] = React.useState(0);
  const [typedLength, setTypedLength] = React.useState(0);
  const [phase, setPhase] = React.useState<"typing" | "erasing">("typing");

  React.useEffect(() => {
    if (!active || started) return;
    const timeout = setTimeout(() => setStarted(true), startDelayMs);
    return () => clearTimeout(timeout);
  }, [active, started, startDelayMs]);

  React.useEffect(() => {
    if (!started) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTypedLength(messages[0]!.length);
      return;
    }

    const current = messages[msgIndex]!;
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (typedLength < current.length) {
        timeout = setTimeout(() => setTypedLength((l) => l + 1), 35);
      } else {
        timeout = setTimeout(() => setPhase("erasing"), 1800);
      }
    } else {
      if (typedLength > 0) {
        timeout = setTimeout(() => setTypedLength((l) => l - 1), 18);
      } else {
        timeout = setTimeout(() => {
          setMsgIndex((idx) => (idx + 1) % messages.length);
          setPhase("typing");
        }, 300);
      }
    }

    return () => clearTimeout(timeout);
  }, [started, phase, typedLength, msgIndex, messages]);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute left-24 top-5 z-10 w-max max-w-[12rem] rounded-xl border border-border-sage bg-card px-3.5 py-2 text-sm text-foreground shadow-lg transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
        started ? "scale-100 opacity-100" : "scale-90 opacity-0",
      )}
    >
      {messages[msgIndex]!.slice(0, typedLength)}
      <span className="ml-0.5 inline-block h-3.5 w-[2px] -translate-y-[0.05em] animate-pulse bg-primary/70 align-middle" />
      <span className="absolute -left-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 border-b border-l border-border-sage bg-card" />
    </div>
  );
}

export function Team() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="team" className="bg-page-wash py-14 lg:py-20">
      <div className="container">
        <div className="max-w-2xl">
          <p className="font-mono text-caption uppercase tracking-[0.04em] text-slate-sage">
            Team
          </p>
          <h2 className="mt-3 font-display text-h2 text-foreground">Meet Our Team</h2>
          <p className="mt-4 text-body text-muted-foreground">
            Small crew, no middlemen — the people who scope your project are the same ones writing the code.
          </p>
        </div>

        <div ref={ref} className="mt-10 grid gap-6 sm:grid-cols-3">
          {TEAM.map((member, i) => (
            <Card
              key={member.name}
              style={{ transitionDelay: visible ? `${i * 100}ms` : "0ms" }}
              className={cn(
                "group relative p-0 transition-all duration-500 ease-out",
                visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
              )}
            >
              <SpeechBubble messages={member.messages} active={visible} startDelayMs={i * 100 + 350} />

              <Badge variant="status" className="absolute right-4 top-4">
                {member.role}
              </Badge>
              <CardContent className="p-6">
                <Avatar className="h-16 w-16 transition-transform duration-300 group-hover:-translate-y-1">
                  <AvatarImage src={member.image} alt={member.name} className="object-cover" />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <p className="mt-4 font-display text-h3 text-foreground">{member.name}</p>
                {member.credential ? (
                  <p className="mt-0.5 text-sm font-medium text-primary">{member.credential}</p>
                ) : null}
                <p className="mt-3 text-sm text-muted-foreground">{member.tagline}</p>
                <div className="mt-4 flex items-center gap-3">
                  <a
                    href={member.facebook}
                    aria-label={`${member.name} on Facebook`}
                    className="text-slate-sage transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                  >
                    <Facebook className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <a
                    href={member.linkedin}
                    aria-label={`${member.name} on LinkedIn`}
                    className="text-slate-sage transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                  >
                    <Linkedin className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <a
                    href={member.twitter}
                    aria-label={`${member.name} on Twitter`}
                    className="text-slate-sage transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                  >
                    <Twitter className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
