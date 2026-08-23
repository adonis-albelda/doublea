import { Facebook, Linkedin, Twitter } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/ui/avatar";
import { Badge } from "@repo/ui/components/ui/badge";
import { Card, CardContent } from "@repo/ui/components/ui/card";

// Social links are "#" placeholders — fill in real profile URLs.
const TEAM = [
  {
    name: "Angelica Cordova",
    role: "CEO",
    credential: "Professional Teacher",
    tagline: "Turning big visions into things people can actually use.",
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
    image: "/team/ivan.png",
    facebook: "https://www.facebook.com/vhanz.turla",
    linkedin: "#",
    twitter: "#",
  },
] as const;

export function Team() {
  return (
    <section id="team" className="bg-page-wash py-20 lg:py-28">
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

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {TEAM.map((member) => (
            <Card key={member.name} className="group relative p-0">
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
