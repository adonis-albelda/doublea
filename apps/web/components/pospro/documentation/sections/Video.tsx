import { PlayCircle } from "lucide-react";

import type { ScreenVideo } from "@/lib/pospro/auth-data";

// youtube-nocookie keeps YouTube from setting tracking cookies until the
// visitor actually plays the video.
export function VideoSection({ youtubeId, title, intro }: ScreenVideo) {
  return (
    <section>
      <h3 className="font-display text-h3 text-foreground">Watch How It&apos;s Done</h3>

      <div className="mt-4 flex items-start gap-2 rounded-md border border-primary/30 bg-primary/5 px-3 py-2 text-sm text-foreground">
        <PlayCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
        <span>{intro}</span>
      </div>

      <div className="relative mt-4 aspect-video w-full overflow-hidden rounded-lg border border-border-sage bg-ink shadow-sm">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 h-full w-full"
        />
      </div>
    </section>
  );
}
