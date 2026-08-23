import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";

import { Badge } from "@repo/ui/components/ui/badge";
import { Card, CardContent } from "@repo/ui/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/components/ui/tabs";

import { TechBadge } from "@/components/tech-badge";

// PLACEHOLDER PROJECTS — no real client work was supplied for this build.
// Swap for actual case studies (name, result, stack, link) before launch.
const CLIENT_WORK = [
  {
    name: "Fernbank Orthodontics",
    description: "Cut phone scheduling calls 40% after moving booking online.",
    stack: ["Next.js", "Cal.com", "Tailwind CSS"],
    status: "Live",
    timeline: "4-week build",
    href: "#",
  },
  {
    name: "Loop Fulfillment",
    description: "Replaced three spreadsheets with one dashboard the warehouse team checks every morning.",
    stack: ["React", "tRPC", "PostgreSQL"],
    status: "Live",
    timeline: "6-week build",
    href: "#",
  },
  {
    name: "Harbor & Vine",
    description: "Grew online orders 22% after a full checkout rebuild.",
    stack: ["Next.js", "Shopify", "Stripe"],
    status: "Live",
    timeline: "5-week build",
    href: "#",
  },
  {
    name: "Northline Logistics",
    description: "Automated invoice matching, saving the finance team six hours a week.",
    stack: ["n8n", "QuickBooks API", "Slack"],
    status: "Live",
    timeline: "3-week build",
    href: "#",
  },
  {
    name: "Kestrel Coworking",
    description: "Members book rooms and manage billing without emailing the front desk.",
    stack: ["React", "Stripe", "PostgreSQL"],
    status: "In build",
    timeline: "8-week build",
    href: "#",
  },
] as const;

// PLACEHOLDER PERSONAL PRODUCTS — in-house tools we built for our own use
// and now offer directly. No real roadmap/pricing implied; swap for actual
// products before launch.
const PERSONAL_PRODUCTS = [
  {
    name: "Ledgerline",
    description: "Started as our own invoicing automation, now a lightweight billing tool for small teams.",
    stack: ["Next.js", "Stripe", "PostgreSQL"],
    status: "Live",
    timeline: "Built in-house, 2023",
    href: "#",
  },
  {
    name: "Fieldnote",
    description: "Turns scattered call notes and Slack threads into one searchable project log.",
    stack: ["Next.js", "tRPC", "PostgreSQL"],
    status: "In build",
    timeline: "Built in-house, 2025",
    href: "#",
  },
] as const;

interface Project {
  name: string;
  description: string;
  stack: readonly string[];
  status: string;
  timeline: string;
  href: string;
}

function ProjectGrid({ projects }: { projects: readonly Project[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <Card key={project.name} className="group overflow-hidden p-0">
          <Link href={project.href} aria-label={`View project: ${project.name}`}>
            <div
              className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-sage-100"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-sage-300/60 via-sage-100 to-paper transition-transform duration-300 group-hover:scale-105" />
              <span className="relative font-display text-3xl font-medium text-sage-700/70">
                {project.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2)}
              </span>
            </div>
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-display text-h3 text-foreground">{project.name}</h3>
                <Badge variant="status" className="shrink-0">
                  {project.status}
                </Badge>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{project.description}</p>
              <p className="mt-2 flex items-center gap-1.5 font-mono text-xs text-slate-sage">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {project.timeline}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <TechBadge key={tech} name={tech} />
                ))}
              </div>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100 group-focus-visible:opacity-100">
                View project
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </CardContent>
          </Link>
        </Card>
      ))}
    </div>
  );
}

export function Products() {
  return (
    <section id="products" className="bg-page-wash py-20 lg:py-28">
      <div className="container">
        <div className="max-w-2xl">
          <p className="font-mono text-caption uppercase tracking-[0.04em] text-slate-sage">
            Products
          </p>
          <h2 className="mt-3 font-display text-h2 text-foreground">What we&apos;ve built</h2>
        </div>

        <Tabs defaultValue="client" className="mt-10">
          <TabsList>
            <TabsTrigger value="client">Client work</TabsTrigger>
            <TabsTrigger value="personal">Personal products</TabsTrigger>
          </TabsList>
          <TabsContent value="client">
            <ProjectGrid projects={CLIENT_WORK} />
          </TabsContent>
          <TabsContent value="personal">
            <ProjectGrid projects={PERSONAL_PRODUCTS} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
