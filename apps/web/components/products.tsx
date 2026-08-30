"use client";

import Image from "next/image";
import { ArrowUpRight, Clock, Sparkles } from "lucide-react";

import { Badge } from "@repo/ui/components/ui/badge";
import { Button } from "@repo/ui/components/ui/button";
import { Card, CardContent } from "@repo/ui/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/components/ui/tabs";
import { cn } from "@repo/ui/lib/utils";

import { ProjectCover } from "@/components/project-cover";
import { ProjectLink } from "@/components/project-link";
import { useRevealEach } from "@/hooks/use-reveal";
import { PROJECTS, type Project } from "@/lib/projects";

const CLIENT_WORK = PROJECTS.filter((p) => p.category === "client");
const PERSONAL_PRODUCTS = PROJECTS.filter((p) => p.category === "personal");

// Not real projects — no slug, no build, nothing to link to. Just a signal
// that we're actively building more for the community. Swap for a real
// project card once one of these actually ships.
const COMING_SOON = [
  {
    name: "Something new",
    tagline: "We're building another tool for the community. Details soon.",
  },
  {
    name: "Still cooking",
    tagline: "Another idea in the works, made for the people who need it most.",
  },
] as const;

function ComingSoonCard({ name, tagline }: { name: string; tagline: string }) {
  return (
    <div className="relative">
      <Card className="flex flex-col overflow-hidden border-dashed p-0">
        <div
          className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-sage-100"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-sage-300/40 via-sage-100 to-paper" />
          <Sparkles className="relative h-8 w-8 text-sage-700/50" aria-hidden="true" />
        </div>
        <CardContent className="p-6">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-h3 text-muted-foreground">{name}</h3>
            <Badge variant="status" className="shrink-0">
              Coming soon
            </Badge>
          </div>
          <p className="mt-2 text-sm text-slate-sage">{tagline}</p>
        </CardContent>
      </Card>
    </div>
  );
}

function ProjectGrid({ projects }: { projects: readonly Project[] }) {
  const { setRef, visible } = useRevealEach<HTMLDivElement>(projects.length);

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {/* .group lives on the outer wrapper, not Card itself — group-has-*
          targets descendants of .group, and Card can't target itself.
          Entrance fade applied only to this wrapper's own opacity/transform —
          the hover scale/z-index escape trick lives one level deeper and is
          untouched. */}
      {projects.map((project, i) => (
        <div
          key={project.slug}
          ref={setRef(i)}
          className={cn(
            "group relative hover:z-20 transition-[opacity,transform] duration-500 ease-out",
            visible[i] ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
          )}
        >
          <Card className="flex flex-col overflow-hidden p-0 group-hover:overflow-visible">
            <ProjectLink
              href={`/products/${project.slug}`}
              aria-label={`View project: ${project.name}`}
              transitionColor={project.accentColor}
            >
              <div
                className="relative z-0 flex aspect-[4/3] items-center justify-center overflow-hidden bg-sage-100 transition-all duration-300 ease-out group-hover:z-20 group-hover:scale-125 group-hover:overflow-visible group-hover:shadow-2xl"
                aria-hidden="true"
              >
                <ProjectCover project={project} />
                {!project.screenshotsDesktop?.[0] && !project.screenshots?.[0] && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-sage-300/60 via-sage-100 to-paper" />
                    <span className="relative font-display text-3xl font-medium text-sage-700/70">
                      {project.name
                        .split(" ")
                        .map((w) => w[0])
                        .join("")
                        .slice(0, 2)}
                    </span>
                  </>
                )}
              </div>
              <CardContent className="p-6 pb-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {project.logo && (
                      <Image
                        src={project.logo}
                        alt=""
                        width={24}
                        height={24}
                        className="h-6 w-6 shrink-0 object-contain"
                      />
                    )}
                    <h3 className="font-display text-h3 text-foreground">{project.name}</h3>
                  </div>
                  <Badge variant="status" className="shrink-0">
                    {project.status}
                  </Badge>
                </div>
                <p className="mt-2 text-sm font-medium text-primary">{project.tagline}</p>
                <p className="mt-2 flex items-center gap-1.5 font-mono text-xs text-slate-sage">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  {project.timeline}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100 group-focus-visible:opacity-100 group-has-[[data-cta=view-project]:hover]:!opacity-0">
                  View project
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </CardContent>
            </ProjectLink>
            <div className="mt-auto p-6 pt-4">
              <Button variant="outline" size="sm" className="w-full" asChild>
                <ProjectLink
                  href={`/products/${project.slug}`}
                  data-cta="view-project"
                  transitionColor={project.accentColor}
                >
                  View Project
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </ProjectLink>
              </Button>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
}

export function Products() {
  return (
    <section id="products" className="bg-page-wash py-14 lg:py-20">
      <div className="container">
        <div className="max-w-2xl">
          <p className="font-mono text-caption uppercase tracking-[0.04em] text-slate-sage">
            Products
          </p>
          <h2 className="mt-3 font-display text-h2 text-foreground">What we&apos;ve built</h2>
        </div>

        <Tabs defaultValue="personal" className="mt-10">
          <TabsList>
            <TabsTrigger value="personal">Personal products</TabsTrigger>
            <TabsTrigger value="client">Client work</TabsTrigger>
          </TabsList>
          <TabsContent value="personal">
            <ProjectGrid projects={PERSONAL_PRODUCTS} />
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {COMING_SOON.map((item) => (
                <ComingSoonCard key={item.name} name={item.name} tagline={item.tagline} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="client">
            <ProjectGrid projects={CLIENT_WORK} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
