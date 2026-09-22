import Image, { type StaticImageData } from "next/image";

import type { ScreenshotDevice } from "@/lib/pospro/auth-data";

interface ScreenshotPlaceholderProps {
  title: string;
  device: ScreenshotDevice;
  path?: StaticImageData;
  size?: "sm" | "lg";
}

const FRAME_WIDTH: Record<ScreenshotDevice, Record<"sm" | "lg", string>> = {
  phone: { sm: "w-[90%]", lg: "w-[90%]" },
  tablet: { sm: "max-w-[320px]", lg: "max-w-[460px]" },
};

// Renders a device-shaped wireframe (phone: notch/side-buttons/home-indicator,
// tablet: bezel + camera dot) around either a real capture (`path`) or, when
// none exists yet for that device, a generic honestly-placeholder sample
// screen — never a fabricated capture. Pure device + screen, no caption or
// metadata underneath.
export function ScreenshotPlaceholder({ title, device, path, size = "sm" }: ScreenshotPlaceholderProps) {
  return device === "phone" ? (
    <PhoneFrame title={title} path={path} widthClass={FRAME_WIDTH.phone[size]} />
  ) : (
    <TabletFrame title={title} path={path} maxWidth={FRAME_WIDTH.tablet[size]} />
  );
}

function PhoneFrame({ title, path, widthClass }: { title: string; path?: StaticImageData; widthClass: string }) {
  return (
    <div className={`relative mx-auto ${widthClass}`}>
      {/* Side buttons — action button + volume rocker (left), power (right). */}
      <span className="absolute -left-[2px] top-16 z-10 h-6 w-[3px] rounded-l-sm bg-ink/80" />
      <span className="absolute -left-[2px] top-24 z-10 h-10 w-[3px] rounded-l-sm bg-ink/80" />
      <span className="absolute -right-[2px] top-20 z-10 h-14 w-[3px] rounded-r-sm bg-ink/80" />
      <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[2.25rem] border-[6px] border-ink bg-ink shadow-xl">
        {/* Dynamic Island */}
        <div className="absolute left-1/2 top-0 z-10 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-ink" />
        <div className="absolute inset-0 overflow-hidden rounded-[1.75rem]">
          {path ? (
            <Image src={path} alt={title} fill sizes="400px" className="object-cover" />
          ) : (
            <SampleScreen title={title} safeArea="pt-7 pb-5" />
          )}
        </div>
        {/* Home indicator */}
        <div className="absolute bottom-1.5 left-1/2 z-10 h-1 w-16 -translate-x-1/2 rounded-full bg-white/70" />
      </div>
    </div>
  );
}

function TabletFrame({ title, path, maxWidth }: { title: string; path?: StaticImageData; maxWidth: string }) {
  return (
    <div className={`relative mx-auto w-full ${maxWidth}`}>
      {/* Power button, top edge. */}
      <span className="absolute -top-[2px] left-1/3 z-10 h-[3px] w-10 rounded-t-sm bg-ink/80" />
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] border-[10px] border-ink bg-ink shadow-xl">
        <span className="absolute left-1/2 top-1 z-10 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-ink/40 ring-1 ring-slate-sage/40" />
        <div className="absolute inset-0 overflow-hidden rounded-xl">
          {path ? (
            <Image src={path} alt={title} fill sizes="460px" className="object-cover" />
          ) : (
            <SampleScreen title={title} />
          )}
        </div>
      </div>
    </div>
  );
}

function SampleScreen({ title, safeArea = "" }: { title: string; safeArea?: string }) {
  return (
    <div className={`flex h-full w-full flex-col bg-gradient-to-br from-sage-100 via-paper to-sage-100 ${safeArea}`}>
      <div className="flex items-center gap-2 border-b border-border-sage/60 bg-card/70 px-3 py-2">
        <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
        <span className="truncate text-[10px] font-medium text-foreground">{title}</span>
      </div>
      <div className="flex flex-1 flex-col justify-center gap-2 p-4">
        <span className="h-2 w-3/4 rounded-full bg-sage-300/70" />
        <span className="h-2 w-1/2 rounded-full bg-sage-300/50" />
        <span className="mt-3 h-8 w-full rounded-md bg-gradient-to-br from-sage-300/50 to-sage-500/30" />
        <span className="h-2 w-2/3 rounded-full bg-sage-300/70" />
      </div>
    </div>
  );
}
