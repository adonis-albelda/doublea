"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ImageIcon, Laptop, Smartphone } from "lucide-react";

import { cn } from "@repo/ui/lib/utils";

const ADVANCE_MS = 9000;

export interface ShowcaseItem {
  title: string;
  problem: string;
  solution: string;
  points: readonly string[];
  // Path under /public. Unset = a labelled placeholder screen, so a feature
  // can be listed before its capture exists.
  screenshot?: string;
  // Which frame the screenshot sits in. Phone captures are 1080×2400,
  // laptop captures ~3024×1720.
  device?: "phone" | "laptop";
  manualHref?: string;
}

// Flagship features told as problem -> solution, each shown in a phone or
// laptop frame. Advances on its own until the visitor picks one.
export function FeatureShowcase({ items, name }: { items: readonly ShowcaseItem[]; name: string }) {
  const [index, setIndex] = React.useState(0);
  const [pinned, setPinned] = React.useState(false);

  React.useEffect(() => {
    if (pinned || items.length <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = setInterval(() => setIndex((i) => (i + 1) % items.length), ADVANCE_MS);
    return () => clearInterval(interval);
  }, [pinned, items.length]);

  const active = items[index];
  if (!active) return null;
  const device = active.device ?? "phone";
  // Only screens for the frame on show — the frame itself is remounted
  // (key) when the device changes, so it animates in.
  const screens = items.map((item, i) => ({ item, i })).filter(({ item }) => (item.device ?? "phone") === device);

  return (
    <div className="mt-10">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label={`${name} features`}>
        {items.map((item, i) => {
          const DeviceIcon = (item.device ?? "phone") === "laptop" ? Laptop : Smartphone;
          return (
            <button
              key={item.title}
              type="button"
              role="tab"
              aria-selected={i === index}
              onClick={() => {
                setIndex(i);
                setPinned(true);
              }}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-300",
                i === index
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border-sage bg-card text-foreground hover:border-primary/40",
              )}
            >
              <DeviceIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
              {item.title}
            </button>
          );
        })}
      </div>

      <div className="mt-10 grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-14">
        <div key={active.title} role="tabpanel" className="motion-safe:animate-[device-in_0.45s_ease-out]">
          <h3 className="font-display text-h3 text-foreground">{active.title}</h3>

          <p className="mt-6 font-mono text-caption uppercase tracking-[0.04em] text-slate-sage">The problem</p>
          <p className="mt-2 text-body text-muted-foreground">{active.problem}</p>

          <p className="mt-6 font-mono text-caption uppercase tracking-[0.04em] text-primary">How {name} fixes it</p>
          <p className="mt-2 text-body text-foreground">{active.solution}</p>

          <ul className="mt-5 flex flex-col gap-2.5">
            {active.points.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-body text-foreground">
                <Check className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>

          {active.manualHref && (
            <Link
              href={active.manualHref}
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              Read how it works
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          )}
        </div>

        {/* Fixed height so the page doesn't jump when the frame changes size. */}
        <div className="flex items-center justify-center lg:min-h-[790px]">
          <div key={device} className="w-full motion-safe:animate-[device-in_0.45s_ease-out]">
            {device === "laptop" ? (
              <LaptopFrame>
                <Screens screens={screens} index={index} name={name} sizes="(min-width: 1024px) 680px, 90vw" />
              </LaptopFrame>
            ) : (
              <PhoneFrame>
                <Screens screens={screens} index={index} name={name} sizes="340px" />
              </PhoneFrame>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Screens({
  screens,
  index,
  name,
  sizes,
}: {
  screens: { item: ShowcaseItem; i: number }[];
  index: number;
  name: string;
  sizes: string;
}) {
  return (
    <>
      {screens.map(({ item, i }) => (
        <div
          key={item.title}
          className={cn("absolute inset-0 transition-opacity duration-500", i === index ? "opacity-100" : "opacity-0")}
          aria-hidden={i !== index}
        >
          {item.screenshot ? (
            <Image
              src={item.screenshot}
              alt={`${name}: ${item.title}`}
              fill
              sizes={sizes}
              className="object-cover object-top"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-sage-100 via-paper to-sage-100 p-6 text-center">
              <ImageIcon className="h-8 w-8 text-primary/60" aria-hidden="true" />
              <p className="text-sm font-medium text-foreground">{item.title}</p>
            </div>
          )}
        </div>
      ))}
    </>
  );
}

// Android: even thin bezel, centered punch-hole camera, buttons on the right
// edge only — deliberately unlike the notched PhoneMockup.
function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-[340px]">
      <span className="absolute -right-[3px] top-28 z-10 h-20 w-[3px] rounded-r-sm bg-ink/80" />
      <span className="absolute -right-[3px] top-52 z-10 h-12 w-[3px] rounded-r-sm bg-ink/80" />
      <div className="relative overflow-hidden rounded-[2.5rem] border-[8px] border-ink bg-ink shadow-2xl">
        <span className="absolute left-1/2 top-3 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-ink ring-2 ring-slate-sage/30" />
        <div className="relative aspect-[9/20] overflow-hidden rounded-[2rem] bg-paper">{children}</div>
      </div>
    </div>
  );
}

// Same body as device-mockup.tsx's LaptopMockup, but takes any screen.
function LaptopFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[680px]">
      <div className="relative rounded-t-2xl border-[10px] border-b-0 border-ink bg-ink shadow-2xl">
        <span className="absolute left-1/2 top-1 z-10 h-1 w-1 -translate-x-1/2 rounded-full bg-slate-sage/50" />
        <div className="relative aspect-[3024/1720] overflow-hidden bg-paper">{children}</div>
      </div>
      <div className="h-[5px] bg-gradient-to-b from-ink to-ink/70" />
      <div className="relative h-4 rounded-b-lg bg-gradient-to-b from-slate-sage/50 to-slate-sage/70 shadow-inner">
        <div className="absolute left-1/2 top-0 h-1.5 w-1/6 -translate-x-1/2 rounded-b-full bg-ink/30" />
      </div>
      <div className="mx-auto h-1 w-3/4 rounded-b-2xl bg-ink/40" />
    </div>
  );
}
