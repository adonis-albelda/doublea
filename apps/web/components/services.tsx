import { Check, Code2, Globe, LayoutDashboard, Workflow } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/ui/card";

const SERVICES = [
  {
    icon: Code2,
    title: "Custom Software",
    description:
      "You get a system built around how your team actually works, not a template stretched to fit.",
    details:
      "Best for teams whose workflow doesn't fit off-the-shelf tools — we design the system around your process, not the other way around.",
    includes: [
      "Requirements mapped before code",
      "Staging + rollback on every release",
      "Source code and docs handed over — yours to keep",
    ],
  },
  {
    icon: Globe,
    title: "Websites",
    description: "You get a fast, on-brand site that turns visitors into inquiries.",
    details:
      "Built to load fast and rank well from day one, with copy and structure aimed at turning visits into inquiries.",
    includes: [
      "Core Web Vitals in the green",
      "Analytics wired in before launch",
      "Mobile-first layout, tested on real devices",
    ],
  },
  {
    icon: LayoutDashboard,
    title: "Web Apps",
    description: "You get a login-protected app your customers or team can rely on daily.",
    details:
      "For internal tools or customer portals that need to hold up under daily use, not just look good in a demo.",
    includes: [
      "Role-based access from day one",
      "Built to handle real usage, not a demo",
      "Data backed up and monitored after launch",
    ],
  },
  {
    icon: Workflow,
    title: "Automation",
    description: "You get manual busywork replaced with workflows that run themselves.",
    details:
      "We connect the tools you already use so the manual step disappears — with alerts if something breaks, not silent failure.",
    includes: [
      "Mapped against your current tools",
      "Failure alerts, not silent breakage",
      "Handoff docs so your team can run it solo",
    ],
  },
] as const;

export function Services() {
  return (
    <section id="services" className="bg-background py-14 lg:py-20">
      <div className="container">
        <div className="max-w-2xl">
          <p className="font-mono text-caption uppercase tracking-[0.04em] text-slate-sage">
            Services
          </p>
          <h2 className="mt-3 font-display text-h2 text-foreground">What we build</h2>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {SERVICES.map((service) => (
            <Card key={service.title} className="group">
              <CardHeader>
                <service.icon
                  className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110"
                  aria-hidden="true"
                />
                <CardTitle className="mt-3">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{service.description}</p>
                <p className="mt-2 text-sm text-muted-foreground">{service.details}</p>
                <ul className="mt-3 flex flex-col gap-1.5">
                  {service.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
