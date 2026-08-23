import { Check, Code2, Globe, LayoutDashboard, Workflow } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/ui/card";

import { TechBadge } from "@/components/tech-badge";

const SERVICES = [
  {
    icon: Code2,
    title: "Custom Software",
    description:
      "You get a system built around how your team actually works, not a template stretched to fit.",
    includes: ["Requirements mapped before code", "Staging + rollback on every release"],
    stack: ["TypeScript", "PostgreSQL", "Node.js"],
  },
  {
    icon: Globe,
    title: "Websites",
    description: "You get a fast, on-brand site that turns visitors into inquiries.",
    includes: ["Core Web Vitals in the green", "Analytics wired in before launch"],
    stack: ["Next.js", "Tailwind CSS", "Vercel"],
  },
  {
    icon: LayoutDashboard,
    title: "Web Apps",
    description: "You get a login-protected app your customers or team can rely on daily.",
    includes: ["Role-based access from day one", "Built to handle real usage, not a demo"],
    stack: ["React", "tRPC", "PostgreSQL"],
  },
  {
    icon: Workflow,
    title: "Automation",
    description: "You get manual busywork replaced with workflows that run themselves.",
    includes: ["Mapped against your current tools", "Failure alerts, not silent breakage"],
    stack: ["n8n", "Zapier", "REST APIs"],
  },
] as const;

export function Services() {
  return (
    <section id="services" className="bg-background py-20 lg:py-28">
      <div className="container">
        <div className="max-w-2xl">
          <p className="font-mono text-caption uppercase tracking-[0.04em] text-slate-sage">
            Services
          </p>
          <h2 className="mt-3 font-display text-h2 text-foreground">What we build</h2>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
                <ul className="mt-3 flex flex-col gap-1.5">
                  {service.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  {service.stack.map((tech) => (
                    <TechBadge key={tech} name={tech} />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
