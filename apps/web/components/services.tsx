"use client";

import { Check, Code2, Globe, LayoutDashboard, Workflow } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/ui/card";
import { cn } from "@repo/ui/lib/utils";

import { useReveal } from "@/hooks/use-reveal";

const SERVICES = [
  {
    icon: Code2,
    title: "Custom Software",
    description: "Your business is unique. Your software should be, too.",
    details:
      "We build custom software around your actual processes, helping you save time, reduce repetitive work, organize information, and manage your operations more efficiently. Whether you need a simple internal system or a more advanced business application, we create a solution that fits your needs — not the other way around.",
    includes: [
      "We understand your needs before development begins",
      "A solution designed specifically for your workflow",
      "We test carefully before launch so your business can keep running smoothly",
      "Clear documentation and support",
      "You own your project, including the source code and documentation",
    ],
  },
  {
    icon: Globe,
    title: "Websites",
    description: "Your website is often the first impression customers have of your business.",
    details:
      "We create modern, fast, mobile-friendly websites that clearly communicate what you offer and make it easy for customers to take the next step. Whether you're starting a new business, updating an existing website, or looking to generate more inquiries, we'll build a website that represents your brand professionally.",
    includes: [
      "Clean, modern design",
      "Mobile-friendly experience",
      "Fast and user-friendly pages",
      "Design tailored to your brand",
      "Clear calls-to-action that encourage inquiries",
      "Easy-to-manage content",
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
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="services" className="bg-background py-14 lg:py-20">
      <div className="container">
        <div className="max-w-2xl">
          <p className="font-mono text-caption uppercase tracking-[0.04em] text-slate-sage">
            Services
          </p>
          <h2 className="mt-3 font-display text-h2 text-foreground">What we build</h2>
        </div>

        <div ref={ref} className="mt-10 grid gap-6 sm:grid-cols-2">
          {SERVICES.map((service, i) => (
            <Card
              key={service.title}
              style={{ transitionDelay: visible ? `${i * 100}ms` : "0ms" }}
              className={cn(
                "group transition-all duration-500 ease-out",
                visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
              )}
            >
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
