"use client";

import Image from "next/image";

import { Badge } from "@repo/ui/components/ui/badge";
import { cn } from "@repo/ui/lib/utils";

import { ProjectLink } from "@/components/project-link";
import { useRevealEach } from "@/hooks/use-reveal";
import type { Project } from "@/lib/projects";

export function OtherProjectsGrid({ projects }: { projects: readonly Project[] }) {
  const { setRef, visible } = useRevealEach<HTMLAnchorElement>(projects.length);

  return (
    <div className="mt-10 grid gap-6 sm:grid-cols-3">
      {projects.map((p, i) => (
        <ProjectLink
          key={p.slug}
          href={`/products/${p.slug}`}
          transitionColor={p.accentColor}
          ref={setRef(i)}
          className={cn(
            "group rounded-xl border border-border-sage bg-card p-6 transition-all duration-500 ease-out hover:border-primary/40",
            visible[i] ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
          )}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              {p.logo && (
                <Image
                  src={p.logo}
                  alt=""
                  width={28}
                  height={28}
                  className="h-7 w-7 shrink-0 rounded-md object-contain"
                />
              )}
              <h3 className="font-display text-h3 text-foreground">{p.name}</h3>
            </div>
            <Badge variant="status" className="shrink-0">
              {p.status}
            </Badge>
          </div>
          <Badge variant="outline" className="mt-2 w-fit">
            {p.category === "personal" ? "Our Product" : "Client"}
          </Badge>
          <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
          <span className="mt-4 inline-block text-sm font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            View project →
          </span>
        </ProjectLink>
      ))}
    </div>
  );
}
