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
      {/* Screen — thin bezel + camera dot, not a browser-window title bar,
          so this reads as the physical device rather than an app window. */}
      <div className="relative rounded-t-2xl border-[10px] border-b-0 border-ink bg-ink shadow-2xl">
        <span className="absolute left-1/2 top-1 z-10 h-1 w-1 -translate-x-1/2 rounded-full bg-slate-sage/50" />
        <div className="aspect-[3024/1720] overflow-hidden">
          {project.screenshotsDesktop && project.screenshotsDesktop.length > 0 ? (
            <ScreenshotCarousel
              images={project.screenshotsDesktop}
              alt={`${project.name} desktop screenshot`}
              sizes="(min-width: 1024px) 576px, 90vw"
              fit="contain"
            />
          ) : (
            <PlaceholderScreen project={project} variant="desktop" />
          )}
        </div>
      </div>
      {/* Hinge + keyboard deck + base plate, tapered like a real laptop body. */}
      <div className="h-[5px] bg-gradient-to-b from-ink to-ink/70" />
      <div className="relative h-4 rounded-b-lg bg-gradient-to-b from-slate-sage/50 to-slate-sage/70 shadow-inner">
        <div className="absolute left-1/2 top-0 h-1.5 w-1/6 -translate-x-1/2 rounded-b-full bg-ink/30" />
      </div>
      <div className="mx-auto h-1 w-3/4 rounded-b-2xl bg-ink/40" />
    </div>
  );
}

export function TabletMockup({ project, className }: { project: Project; className?: string }) {
  const hasRealScreenshots = project.screenshotsTablet && project.screenshotsTablet.length > 0;
  return (
    <div
      className={cn(
        "relative mx-auto w-full",
        // Landscape (16:10, matches the real captures) once real screenshots
        // exist; portrait phone-ish shape otherwise, to keep the abstract
        // placeholder distinct from a phone.
        hasRealScreenshots ? "max-w-lg" : "max-w-xs",
        className,
      )}
    >
      {/* Power button, top edge. */}
      <span className="absolute -top-[2px] left-1/3 z-10 h-[3px] w-10 rounded-t-sm bg-ink/80" />
      <div className="relative overflow-hidden rounded-[1.5rem] border-[10px] border-ink bg-ink shadow-2xl">
        <span className="absolute left-1/2 top-1 z-10 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-ink/40 ring-1 ring-slate-sage/40" />
        <div className={cn("overflow-hidden rounded-xl", hasRealScreenshots ? "aspect-[2560/1600]" : "aspect-[3/4]")}>
          {hasRealScreenshots ? (
            <ScreenshotCarousel
              images={project.screenshotsTablet!}
              alt={`${project.name} tablet screenshot`}
              sizes="(min-width: 640px) 512px, 90vw"
              fit="contain"
            />
          ) : (
            <PlaceholderScreen project={project} variant="tablet" />
          )}
        </div>
      </div>
    </div>
  );
}

export function PhoneMockup({ project, className }: { project: Project; className?: string }) {
  return (
    <div className={cn("relative mx-auto w-full max-w-[220px]", className)}>
      {/* Side buttons — volume rocker (left), power button (right). */}
      <span className="absolute -left-[2px] top-16 z-10 h-6 w-[3px] rounded-l-sm bg-ink/80" />
      <span className="absolute -left-[2px] top-24 z-10 h-10 w-[3px] rounded-l-sm bg-ink/80" />
      <span className="absolute -right-[2px] top-20 z-10 h-14 w-[3px] rounded-r-sm bg-ink/80" />
      <div className="relative overflow-hidden rounded-[2.25rem] border-[6px] border-ink bg-ink shadow-2xl">
        <div className="absolute left-1/2 top-0 z-10 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-ink" />
        <div className="aspect-[9/19.5] overflow-hidden rounded-[1.75rem]">
          {project.screenshots && project.screenshots.length > 0 ? (
            <ScreenshotCarousel
              images={project.screenshots}
              alt={`${project.name} app screenshot`}
              sizes="220px"
              fit="contain"
            />
          ) : (
            <PlaceholderScreen project={project} variant="mobile" />
          )}
        </div>
        {/* Home indicator. */}
        <div className="absolute bottom-1.5 left-1/2 z-10 h-1 w-16 -translate-x-1/2 rounded-full bg-white/70" />
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
