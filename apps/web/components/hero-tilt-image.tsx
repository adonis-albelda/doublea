"use client";

import * as React from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@repo/ui/components/ui/dialog";

const MAX_TILT_DEG = 10;

// Hero picture that tilts in 3D toward the cursor (tracked across the whole
// window, not just while hovering the image). Click opens it full width in
// a dialog. prefers-reduced-motion and touch devices get a flat image.
export function HeroTiltImage({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  const ref = React.useRef<HTMLButtonElement>(null);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let frame = 0;
    function handleMove(event: MouseEvent) {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        // -1..1 from the image's center, clamped so far-off cursors don't over-rotate.
        const x = Math.max(-1, Math.min(1, (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)));
        const y = Math.max(-1, Math.min(1, (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)));
        el.style.setProperty("--rx", `${(-y * MAX_TILT_DEG).toFixed(2)}deg`);
        el.style.setProperty("--ry", `${(x * MAX_TILT_DEG).toFixed(2)}deg`);
      });
    }
    function handleLeave() {
      el?.style.setProperty("--rx", "0deg");
      el?.style.setProperty("--ry", "0deg");
    }

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseleave", handleLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <>
      <div className="[perspective:1400px]">
        <button
          ref={ref}
          type="button"
          onClick={() => setOpen(true)}
          aria-label="View larger"
          className="group relative block w-full cursor-zoom-in rounded-xl transition-transform duration-300 ease-out [transform-style:preserve-3d] [transform:rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes="(min-width: 1024px) 60vw, 100vw"
            quality={95}
            priority
            className="h-auto w-full drop-shadow-2xl"
          />
          <span className="absolute bottom-[12%] right-[12%] inline-flex items-center gap-1.5 rounded-full bg-ink/75 px-3 py-1.5 text-xs font-medium text-paper opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
            Click to enlarge
          </span>
        </button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[95vh] w-[96vw] max-w-[96vw] overflow-auto bg-card p-4 pt-10 sm:max-w-[96vw] sm:p-6 sm:pt-12">
          <DialogTitle className="sr-only">{alt}</DialogTitle>
          <DialogDescription className="sr-only">Full-size view</DialogDescription>
          <Image src={src} alt={alt} width={width} height={height} sizes="96vw" quality={95} className="h-auto w-full" />
        </DialogContent>
      </Dialog>
    </>
  );
}
