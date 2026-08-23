import { Github, Linkedin, Mail } from "lucide-react";

import { Avatar } from "@repo/ui/components/ui/avatar";
import { Card, CardContent } from "@repo/ui/components/ui/card";

import { TechBadge } from "@/components/tech-badge";

// PLACEHOLDER TEAM — no real roster or photos were supplied for this build.
// Swap for actual names/roles/bios before launch. Avatars are a generated
// mosaic (seeded from name) rather than fake headshots, since no real photos
// exist yet — swap MosaicAvatar for <AvatarImage src="/team/*.jpg" /> once
// real photos are available. Social links are "#" placeholders — wire up
// real profile URLs before launch. Kept to a small senior team on purpose,
// matching the claim made in about.tsx.
const TEAM = [
  {
    name: "Alex Reyes",
    role: "Founder, Full-Stack Engineer",
    bio: "Leads architecture and writes the first commit on every project.",
    focus: ["TypeScript", "PostgreSQL"],
  },
  {
    name: "Jordan Lee",
    role: "Product & Automation",
    bio: "Builds the integrations and workflow automations that replace manual busywork.",
    focus: ["n8n", "REST APIs"],
  },
  {
    name: "Sam Okafor",
    role: "Design & Frontend",
    bio: "Owns the UI layer, from component library to the accessibility pass.",
    focus: ["React", "Tailwind CSS"],
  },
] as const;

// Deterministic (name-seeded) mosaic — same person always gets the same
// pattern, no two names collide in practice, no external image needed.
function hashSeed(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) >>> 0;
  }
  return h;
}

function MosaicAvatar({ seed }: { seed: string }) {
  const h = hashSeed(seed);
  const tones = ["hsl(var(--sage-700))", "hsl(var(--sage-500))", "hsl(var(--sage-300))"];
  const cells = Array.from({ length: 9 }, (_, i) => {
    const bits = (h >> (i * 3)) & 0b111;
    return { tone: tones[bits % tones.length], opacity: 0.35 + ((bits % 4) / 4) * 0.65 };
  });

  return (
    <svg viewBox="0 0 3 3" className="h-full w-full" aria-hidden="true">
      {cells.map((cell, i) => (
        <rect key={i} x={i % 3} y={Math.floor(i / 3)} width={1} height={1} fill={cell.tone} opacity={cell.opacity} />
      ))}
    </svg>
  );
}

export function Team() {
  return (
    <section id="team" className="py-20 lg:py-28">
      <div className="container">
        <div className="max-w-2xl">
          <p className="font-mono text-caption uppercase tracking-[0.04em] text-slate-sage">
            Team
          </p>
          <h2 className="mt-3 font-display text-h2 text-foreground">Who you&apos;ll work with</h2>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {TEAM.map((member) => (
            <Card key={member.name} className="group p-0">
              <CardContent className="p-6">
                <Avatar className="h-16 w-16 transition-transform duration-300 group-hover:-translate-y-1">
                  <MosaicAvatar seed={member.name} />
                </Avatar>
                <p className="mt-4 font-display text-h3 text-foreground">{member.name}</p>
                <p className="mt-1 text-sm font-medium text-primary">{member.role}</p>
                <p className="mt-3 text-sm text-muted-foreground">{member.bio}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {member.focus.map((tech) => (
                    <TechBadge key={tech} name={tech} />
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <a
                    href="#"
                    aria-label={`Email ${member.name}`}
                    className="text-slate-sage transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <a
                    href="#"
                    aria-label={`${member.name} on GitHub`}
                    className="text-slate-sage transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                  >
                    <Github className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <a
                    href="#"
                    aria-label={`${member.name} on LinkedIn`}
                    className="text-slate-sage transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                  >
                    <Linkedin className="h-4 w-4" aria-hidden="true" />
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
