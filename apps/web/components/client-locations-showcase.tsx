import { MapPin } from "lucide-react";

import type { Project } from "@/lib/projects";

// Real Google Maps embed (keyless "output=embed" — no API key configured in
// this repo, so custom JSON map styling isn't available; a CSS filter tints
// it toward the brand palette instead of leaving the default Google
// gray/blue look). A transparent overlay blocks drag/scroll/click so it
// reads as a polished static visual, not an interactive widget. The client
// badge overlaid on top uses real data (lib/projects.ts).
const MAP_QUERY = "Calbayog City, Samar, Philippines";

export function ClientLocationsShowcase({ project }: { project: Project }) {
  const locations = project.storeLocations;
  if (!locations || locations.length === 0) return null;

  const totalClients = locations.reduce((sum, l) => sum + l.stores, 0);
  const primary = locations[0]!;

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border-sage shadow-lg sm:aspect-[16/9]">
      <iframe
        src={`https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=13&output=embed`}
        className="h-full w-full border-0 [filter:grayscale(0.25)_sepia(0.3)_hue-rotate(52deg)_saturate(1.6)_brightness(1.03)]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`${project.name} service area map`}
      />
      {/* Swallows drag/scroll/click so the live embed reads as a static, curated visual. */}
      <div className="absolute inset-0" aria-hidden="true" />

      {/* Vignette so the overlay card below stays legible over the map. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-ink/50 to-transparent" />

      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border-sage bg-card/95 px-5 py-4 shadow-md backdrop-blur">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/20">
            <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
          </span>
          <div>
            <p className="font-display text-h3 leading-none text-foreground">{primary.city}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {totalClients} {totalClients === 1 ? "client" : "clients"} running {project.name}
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-border-sage bg-background px-3 py-1">
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-wide text-slate-sage">Actively expanding</span>
        </span>
      </div>
    </div>
  );
}
