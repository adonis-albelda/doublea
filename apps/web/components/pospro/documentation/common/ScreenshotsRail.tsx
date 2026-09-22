"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

import { cn } from "@repo/ui/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@repo/ui/components/ui/dialog";

import { ScreenshotPlaceholder } from "./ScreenshotPlaceholder";

import type { ScreenshotDevice, ScreenshotSpec } from "@/lib/pospro/auth-data";

const AUTOPLAY_INTERVAL_MS = 2500;
const DEVICES: ScreenshotDevice[] = ["phone", "tablet"];

// One screenshot at a time instead of a stacked list. Hitting Play pops a
// fullscreen dialog and starts autoplay there — easier to follow the
// sequence than a small thumbnail in the sidebar rail.
export function ScreenshotsRail({ screenshots }: { screenshots: ScreenshotSpec[] }) {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [device, setDevice] = useState<ScreenshotDevice>("phone");

  useEffect(() => {
    if (!isPlaying || screenshots.length < 2) return;

    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % screenshots.length);
    }, AUTOPLAY_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [isPlaying, screenshots.length]);

  if (screenshots.length === 0) {
    return null;
  }

  const current = screenshots[index] ?? screenshots[0];

  if (!current) {
    return null;
  }

  function goTo(nextIndex: number) {
    setIsPlaying(false);
    setIndex((nextIndex + screenshots.length) % screenshots.length);
  }

  function togglePlay() {
    setIsPlaying((playing) => {
      const next = !playing;
      if (next) setIsDialogOpen(true);
      return next;
    });
  }

  function handleDialogOpenChange(open: boolean) {
    setIsDialogOpen(open);
    if (!open) setIsPlaying(false);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-caption uppercase tracking-wide text-slate-sage">Screenshots</p>
        <span className="text-xs text-muted-foreground">
          {index + 1} / {screenshots.length}
        </span>
      </div>

      <DeviceToggle device={device} onChange={setDevice} />

      <div className="mt-4">
        <ScreenshotPlaceholder title={current.title} device={device} path={current.paths[device]} />
      </div>

      <div className="mt-4">
        <PlayerControls
          total={screenshots.length}
          isPlaying={isPlaying}
          onPrev={() => goTo(index - 1)}
          onNext={() => goTo(index + 1)}
          onTogglePlay={togglePlay}
        />
      </div>

      <div className="mt-3 flex items-center justify-center gap-1.5">
        {screenshots.map((screenshot, i) => (
          <button
            key={screenshot.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to ${screenshot.title}`}
            className={cn("h-1.5 rounded-full transition-all", i === index ? "w-5 bg-primary" : "w-1.5 bg-border-sage")}
          />
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
        <DialogContent className="flex max-h-[90vh] max-w-[calc(100%-2rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-2xl lg:max-w-4xl">
          <div className="flex shrink-0 flex-col items-center gap-3 border-b border-border-sage px-6 pb-4 pt-6">
            <div className="text-center">
              <DialogTitle>{current.title}</DialogTitle>
              <DialogDescription>
                Step {index + 1} of {screenshots.length}
              </DialogDescription>
            </div>

            <DeviceToggle device={device} onChange={setDevice} className="mt-0 w-56" />
          </div>

          <div className="flex flex-1 items-center justify-center overflow-y-auto px-6 py-4">
            <ScreenshotPlaceholder title={current.title} device={device} path={current.paths[device]} size="lg" />
          </div>

          <div className="shrink-0 border-t border-border-sage px-6 pb-6 pt-4">
            <PlayerControls
              total={screenshots.length}
              isPlaying={isPlaying}
              onPrev={() => goTo(index - 1)}
              onNext={() => goTo(index + 1)}
              onTogglePlay={togglePlay}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function DeviceToggle({
  device,
  onChange,
  className,
}: {
  device: ScreenshotDevice;
  onChange: (device: ScreenshotDevice) => void;
  className?: string;
}) {
  return (
    <div className={cn("mt-3 flex items-center gap-1 rounded-full border border-border-sage bg-muted p-1", className)}>
      {DEVICES.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={cn(
            "flex-1 rounded-full px-3 py-1 text-xs font-medium capitalize transition-colors",
            device === option ? "bg-primary text-primary-foreground" : "text-slate-sage hover:text-foreground",
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

function PlayerControls({
  total,
  isPlaying,
  onPrev,
  onNext,
  onTogglePlay,
}: {
  total: number;
  isPlaying: boolean;
  onPrev: () => void;
  onNext: () => void;
  onTogglePlay: () => void;
}) {
  const disabled = total < 2;

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        type="button"
        onClick={onPrev}
        disabled={disabled}
        aria-label="Previous screenshot"
        className="flex h-8 w-8 items-center justify-center rounded-full border border-border-sage text-slate-sage transition-colors hover:bg-muted disabled:opacity-40"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      <button
        type="button"
        onClick={onTogglePlay}
        disabled={disabled}
        aria-label={isPlaying ? "Pause autoplay" : "Autoplay screenshots"}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
      >
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 translate-x-0.5" />}
      </button>

      <button
        type="button"
        onClick={onNext}
        disabled={disabled}
        aria-label="Next screenshot"
        className="flex h-8 w-8 items-center justify-center rounded-full border border-border-sage text-slate-sage transition-colors hover:bg-muted disabled:opacity-40"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
