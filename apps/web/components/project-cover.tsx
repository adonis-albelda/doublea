import Image from "next/image";

import { ScrollReveal } from "@/components/scroll-reveal";
import type { Project } from "@/lib/projects";

// Static composite cover for the homepage grid card — the laptop screenshot
// inside an actual laptop-mockup frame (browser chrome), with the tablet and
// phone mockups nested inside that laptop's screen area rather than pinned
// to the card's corners. No carousel/state here (that's the detail page's
// job); this is just a still "cover photo". Returns null when a project has
// none of these real assets, so the caller falls back to the initials
// placeholder.
export function ProjectCover({ project }: { project: Project }) {
  const background = project.screenshotsDesktop?.[0] ?? project.screenshots?.[0];
  if (!background) return null;

  return (
    <div className="flex h-full w-full items-center justify-center bg-sage-100 p-4">
      <div className="relative w-full max-w-[320px] overflow-hidden rounded-lg border border-border-sage bg-card shadow-lg">
        {/* Laptop chrome */}
        <div className="flex items-center gap-1 border-b border-border-sage bg-sage-100 px-3 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ff5f57]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#febc2e]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]" />
        </div>
        {/* Blurred until scrolled into view, then sharpens once. */}
        <ScrollReveal className="relative aspect-[3024/1720] overflow-hidden">
          <Image
            src={background}
            alt={`${project.name} preview`}
            fill
            sizes="(min-width: 1024px) 33vw, 50vw"
            className="object-cover"
          />

          {/* Tablet + phone, nested inside the laptop's own screen area */}
          {project.screenshotsTablet?.[0] && (
            <div className="absolute bottom-1.5 left-1.5 h-12 w-[4.5rem] overflow-hidden rounded-[4px] border border-ink shadow-md">
              <Image src={project.screenshotsTablet[0]} alt="" fill sizes="72px" className="object-cover" />
            </div>
          )}
          {project.screenshots?.[0] && (
            <div className="absolute bottom-1.5 right-1.5 h-[4.5rem] w-9 overflow-hidden rounded-[4px] border border-ink shadow-md">
              <Image src={project.screenshots[0]} alt="" fill sizes="36px" className="object-cover" />
            </div>
          )}
        </ScrollReveal>
      </div>
    </div>
  );
}
