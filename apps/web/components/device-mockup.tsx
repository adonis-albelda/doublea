import { cn } from "@repo/ui/lib/utils";

import { PhoneTrioMockup } from "@/components/phone-trio-mockup";
import { ScreenshotCarousel } from "@/components/screenshot-carousel";
import type { Project } from "@/lib/projects";

// No real product screenshots exist for these placeholder case studies — the
// "screen" content below is an abstract, honestly-placeholder skeleton UI
// (initials + bar chrome), not a fabricated screenshot of software that
// doesn't exist. Swap PlaceholderScreen's children for real <Image> captures
// once real screenshots are available.

export function LaptopMockup({ project, className }: { project: Project; className?: string }) {
  return (
    <div className={cn("mx-auto w-full max-w-xl", className)}>
      <div className="overflow-hidden rounded-t-xl border border-b-0 border-border-sage bg-card shadow-2xl">
        <div className="flex items-center gap-1.5 border-b border-border-sage bg-sage-100 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="aspect-[3024/1720] overflow-hidden">
          {project.screenshotsDesktop && project.screenshotsDesktop.length > 0 ? (
            <ScreenshotCarousel
              images={project.screenshotsDesktop}
              alt={`${project.name} desktop screenshot`}
              sizes="(min-width: 1024px) 576px, 90vw"
            />
          ) : (
            <PlaceholderScreen project={project} variant="desktop" />
          )}
        </div>
      </div>
      {/* Base/keyboard deck — reads as a laptop, not just a browser window. */}
      <div className="relative h-3 rounded-b-md bg-ink/80">
        <div className="absolute left-1/2 top-0 h-1.5 w-1/4 -translate-x-1/2 rounded-b-sm bg-ink/60" />
      </div>
      <div className="mx-auto h-1.5 w-2/3 rounded-b-2xl bg-ink/50" />
    </div>
  );
}

export function TabletMockup({ project, className }: { project: Project; className?: string }) {
  const hasRealScreenshots = project.screenshotsTablet && project.screenshotsTablet.length > 0;
  return (
    <div
      className={cn(
        "relative mx-auto w-full overflow-hidden rounded-[1.5rem] border-[10px] border-ink bg-ink shadow-2xl",
        // Landscape (16:10, matches the real captures) once real screenshots
        // exist; portrait phone-ish shape otherwise, to keep the abstract
        // placeholder distinct from a phone.
        hasRealScreenshots ? "max-w-lg" : "max-w-xs",
        className,
      )}
    >
      <span className="absolute left-1/2 top-1 z-10 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-ink/40 ring-1 ring-slate-sage/40" />
      <div className={cn("overflow-hidden rounded-xl", hasRealScreenshots ? "aspect-[2560/1600]" : "aspect-[3/4]")}>
        {hasRealScreenshots ? (
          <ScreenshotCarousel
            images={project.screenshotsTablet!}
            alt={`${project.name} tablet screenshot`}
            sizes="(min-width: 640px) 512px, 90vw"
          />
        ) : (
          <PlaceholderScreen project={project} variant="tablet" />
        )}
      </div>
    </div>
  );
}

export function PhoneMockup({ project, className }: { project: Project; className?: string }) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[220px] overflow-hidden rounded-[2.25rem] border-[6px] border-ink bg-ink shadow-2xl",
        className,
      )}
    >
      <div className="absolute left-1/2 top-0 z-10 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-ink" />
      <div className="aspect-[9/19.5] overflow-hidden rounded-[1.75rem]">
        {project.screenshots && project.screenshots.length > 0 ? (
          <ScreenshotCarousel
            images={project.screenshots}
            alt={`${project.name} app screenshot`}
            sizes="220px"
          />
        ) : (
          <PlaceholderScreen project={project} variant="mobile" />
        )}
      </div>
    </div>
  );
}

// Picks the trio layout when there's enough real screenshots to fill 3
// frames meaningfully; falls back to the single-phone mockup otherwise
// (placeholder projects, or a project with only 1-2 real captures).
export function PhoneSlot({ project, className }: { project: Project; className?: string }) {
  if (project.screenshots && project.screenshots.length >= 3) {
    return <PhoneTrioMockup project={project} className={className} />;
  }
  return <PhoneMockup project={project} className={className} />;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
}

function PlaceholderScreen({
  project,
  variant,
}: {
  project: Project;
  variant: "desktop" | "tablet" | "mobile";
}) {
  const skeletonWidths =
    variant === "desktop" ? ["70%", "45%", "85%", "55%"] : variant === "tablet" ? ["75%", "50%"] : ["80%", "55%", "70%"];
  const stacked = variant !== "desktop";

  return (
    <div className="flex h-full w-full flex-col bg-gradient-to-br from-sage-100 via-paper to-sage-100">
      <div className="flex items-center gap-2 border-b border-border-sage/60 bg-card/70 px-3 py-2">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary font-mono text-[0.6rem] font-semibold text-primary-foreground">
          {initials(project.name)}
        </span>
        <span className="truncate text-xs font-medium text-foreground">{project.name}</span>
      </div>
      <div className={cn("flex-1 p-3", stacked ? "flex flex-col gap-3" : "grid grid-cols-3 gap-3")}>
        {stacked ? (
          <>
            <span className="h-20 w-full rounded-md bg-gradient-to-br from-sage-300/50 to-sage-500/30" />
            {skeletonWidths.map((w, i) => (
              <span key={i} className="h-2 rounded-full bg-sage-300/70" style={{ width: w }} />
            ))}
          </>
        ) : (
          <>
            <div className="col-span-1 flex flex-col gap-2 rounded-lg bg-card/70 p-2">
              {skeletonWidths.map((w, i) => (
                <span key={i} className="h-2 rounded-full bg-sage-300/70" style={{ width: w }} />
              ))}
            </div>
            <div className="col-span-2 flex flex-col gap-2 rounded-lg bg-card/70 p-3">
              <span className="h-16 w-full rounded-md bg-gradient-to-br from-sage-300/50 to-sage-500/30" />
              <span className="h-2 w-2/3 rounded-full bg-sage-300/70" />
              <span className="h-2 w-1/2 rounded-full bg-sage-300/50" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
