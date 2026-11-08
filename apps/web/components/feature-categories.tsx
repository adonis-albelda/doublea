"use client";

import * as React from "react";
import Image from "next/image";
import {
  ArrowRight,
  Bot,
  ChevronLeft,
  ChevronRight,
  Boxes,
  Building2,
  Layers,
  ShieldCheck,
  ShoppingCart,
  Store,
  Users,
  Wallet,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@repo/ui/components/ui/dialog";
import { cn } from "@repo/ui/lib/utils";

import { useRevealEach } from "@/hooks/use-reveal";
import { FEATURE_DETAILS, type FeatureDetail } from "@/lib/feature-details";

const POSI_SRC = "/projects/products/propos/posi/posi-wave.webp";

// Categories with many short, similar items (one per kind of business) show
// as a swipeable carousel instead of the timeline grid, to save space.
const CAROUSEL_CATEGORIES = new Set(["Made for your business"]);

const CATEGORY_ICONS: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  Core: Layers,
  "All your businesses": Building2,
  Selling: ShoppingCart,
  Stock: Boxes,
  "Money & reports": Wallet,
  "Customers & staff": Users,
  "Made for your business": Store,
  "AI-powered": Bot,
  Security: ShieldCheck,
};

export function FeatureCategories({
  categories,
  projectSlug,
  projectName,
}: {
  // Picks the per-card icon + problem/answer detail from FEATURE_DETAILS.
  // Looked up here (not passed from the server page) because icon components
  // can't cross the server -> client boundary.
  projectSlug?: string;
  projectName?: string;
  categories: readonly {
    category: string;
    description: string;
    items: readonly {
      title: string;
      description: string;
      highlight?: boolean;
    }[];
  }[];
}) {
  const totalItems = categories.reduce(
    (sum, group) =>
      CAROUSEL_CATEGORIES.has(group.category) ? sum : sum + group.items.length,
    0,
  );
  const { setRef, visible } = useRevealEach<HTMLLIElement>(totalItems);
  const details = projectSlug ? FEATURE_DETAILS[projectSlug] : undefined;
  const showPosi = projectSlug === "pospro";
  const [openTitle, setOpenTitle] = React.useState<string | null>(null);
  const openDetail = openTitle && details ? details[openTitle] : undefined;
  let index = 0;

  return (
    <div className="mt-10 flex flex-col gap-12">
      {categories.map((group) => {
        const CategoryIcon = CATEGORY_ICONS[group.category] ?? Layers;
        return (
          <div key={group.category}>
            <div className="flex items-center gap-2">
              <CategoryIcon
                className="h-5 w-5 text-primary"
                aria-hidden="true"
              />
              <h3 className="font-mono text-caption uppercase tracking-[0.04em] text-slate-sage">
                {group.category}
              </h3>
            </div>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              {group.description}
            </p>

            {CAROUSEL_CATEGORIES.has(group.category) ? (
              <FeatureCarousel
                items={group.items}
                details={details}
                onOpen={setOpenTitle}
                label={group.category}
              />
            ) : (
              /* 2-per-row grid, tied together by a center spine on sm+ (each
                card's dot lands on it) and a left-edge line on mobile. */
              <ul className="relative mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
                <div
                  className="absolute left-[15px] top-2 bottom-2 w-px bg-border-sage sm:left-1/2 sm:-translate-x-1/2"
                  aria-hidden="true"
                />
                {group.items.map((item) => {
                  const i = index++;
                  const detail = details?.[item.title];
                  const FloatIcon = detail?.icon;
                  const isLeftCol = i % 2 === 0;
                  return (
                    <li
                      key={item.title}
                      ref={setRef(i)}
                      className={cn(
                        "group relative flex items-start gap-4 transition-all duration-500 ease-out sm:block sm:gap-0",
                        visible[i]
                          ? "translate-x-0 opacity-100"
                          : "-translate-x-3 opacity-0",
                      )}
                    >
                      {/* mobile dot — inline, left edge; pops/shakes on hover */}
                      <span
                        className={cn(
                          "relative z-10 mt-1.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 bg-page-wash transition-colors duration-300 group-hover:animate-[dot-pop_0.45s_ease-in-out] sm:hidden",
                          item.highlight
                            ? "border-accent bg-accent/10"
                            : "border-primary/50 group-hover:border-primary",
                        )}
                        aria-hidden="true"
                      >
                        <span
                          className={cn(
                            "h-2.5 w-2.5 rounded-full",
                            item.highlight ? "bg-accent" : "bg-primary/60",
                          )}
                        />
                      </span>

                      {/* desktop dot — sits on the center spine, tying every card to it; pops/shakes on hover */}
                      <span
                        className={cn(
                          "absolute top-6 z-10 hidden h-3 w-3 rounded-full border-2 bg-page-wash transition-colors duration-300 group-hover:animate-[dot-pop_0.45s_ease-in-out] sm:block",
                          item.highlight
                            ? "border-accent bg-accent"
                            : "border-primary/60 bg-primary/60 group-hover:border-primary group-hover:bg-primary",
                          isLeftCol ? "-right-5" : "-left-5",
                        )}
                        aria-hidden="true"
                      />

                      <div
                        className={cn(
                          "relative flex-1 rounded-lg border p-5",
                          FloatIcon && "pr-12",
                          item.highlight
                            ? "border-accent/50 bg-accent/5"
                            : "border-border-sage bg-card hover:border-primary/40",
                        )}
                      >
                        {/* floating icon, top-right — gently bobs, pops on card hover */}
                        {FloatIcon && (
                          <span
                            className="absolute -right-3 -top-4 z-10 motion-safe:animate-[hero-float_5s_ease-in-out_infinite]"
                            style={{ animationDelay: `-${(i % 5) * 0.9}s` }}
                            aria-hidden="true"
                          >
                            <span
                              className={cn(
                                "flex h-11 w-11 items-center justify-center rounded-full border shadow-md transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110",
                                item.highlight
                                  ? "border-accent/60 bg-accent text-accent-foreground"
                                  : "border-border-sage bg-card text-primary",
                              )}
                            >
                              <FloatIcon className="h-5 w-5" />
                            </span>
                          </span>
                        )}
                        <p className="text-body font-medium text-foreground">
                          {item.title}
                        </p>
                        <p className="mt-1.5 text-sm text-muted-foreground">
                          {item.description}
                        </p>
                        {detail && (
                          <button
                            type="button"
                            onClick={() => setOpenTitle(item.title)}
                            className="mt-3 inline-flex items-center gap-1 rounded-full text-sm font-medium text-primary underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          >
                            See how it helps
                            <ArrowRight
                              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                              aria-hidden="true"
                            />
                          </button>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}

      <Dialog
        open={!!openDetail}
        onOpenChange={(open) => !open && setOpenTitle(null)}
      >
        {openDetail && openTitle && (
          <DialogContent className="max-w-lg">
            <div className="flex items-center gap-3 pr-8">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <openDetail.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <DialogTitle className="text-xl leading-snug">
                {openTitle}
              </DialogTitle>
            </div>
            <DialogDescription className="sr-only">
              A real-life problem and how {projectName ?? "we"} solves it.
            </DialogDescription>

            <div className="mt-5 rounded-lg border border-border-sage bg-page-wash p-4">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.06em] text-slate-sage">
                The problem
              </p>
              <p className="mt-1.5 text-body text-foreground">
                {openDetail.problem}
              </p>
            </div>

            <div className="mt-3 flex items-end gap-3 rounded-lg border border-primary/30 bg-primary/5 p-4">
              <div className="flex-1">
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.06em] text-primary">
                  How {projectName ?? "we"} helps
                </p>
                <p className="mt-1.5 text-body text-foreground">
                  {openDetail.answer}
                </p>
              </div>
              {showPosi && (
                <Image
                  src={POSI_SRC}
                  alt="POSI, the POSPro One mascot, waving"
                  width={400}
                  height={410}
                  sizes="72px"
                  className="h-auto w-16 shrink-0 motion-safe:animate-[hero-float_4s_ease-in-out_infinite] sm:w-[72px]"
                />
              )}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}

// Horizontal, swipeable row of compact cards with prev/next arrows. Uses
// native scroll-snap, so touch swipe and trackpad scroll work for free.
function FeatureCarousel({
  items,
  details,
  onOpen,
  label,
}: {
  items: readonly { title: string; description: string; highlight?: boolean }[];
  details?: Record<string, FeatureDetail>;
  onOpen: (title: string) => void;
  label: string;
}) {
  const trackRef = React.useRef<HTMLUListElement>(null);
  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(true);

  const updateArrows = React.useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  React.useEffect(() => {
    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => window.removeEventListener("resize", updateArrows);
  }, [updateArrows]);

  const scrollByPage = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: "smooth" });
  };

  const arrowClass =
    "flex h-9 w-9 items-center justify-center rounded-full border border-border-sage bg-card text-foreground shadow-sm transition hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <div
      className="mt-6"
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
    >
      <div className="mb-3 flex items-center justify-between gap-4">
        <p className="text-xs text-slate-sage">
          Swipe or use the arrows to see more
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            className={arrowClass}
            onClick={() => scrollByPage(-1)}
            disabled={!canPrev}
            aria-label="Previous"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            className={arrowClass}
            onClick={() => scrollByPage(1)}
            disabled={!canNext}
            aria-label="Next"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <ul
        ref={trackRef}
        onScroll={updateArrows}
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-3 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => {
          const detail = details?.[item.title];
          const Icon = detail?.icon ?? Store;
          return (
            <li
              key={item.title}
              className="group flex w-[78%] shrink-0 snap-start sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)]"
            >
              <div
                className={cn(
                  "flex w-full flex-col rounded-lg border p-5 transition-colors",
                  item.highlight
                    ? "border-accent/50 bg-accent/5"
                    : "border-border-sage bg-card hover:border-primary/40",
                )}
              >
                <span
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-lg transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110",
                    item.highlight
                      ? "bg-accent text-accent-foreground"
                      : "bg-primary/10 text-primary",
                  )}
                  aria-hidden="true"
                >
                  <Icon className="h-5 w-5" />
                </span>
                <p className="mt-4 text-body font-medium text-foreground">
                  {item.title}
                </p>
                <p className="mt-1.5 line-clamp-3 flex-1 text-sm text-muted-foreground">
                  {item.description}
                </p>
                {detail && (
                  <button
                    type="button"
                    onClick={() => onOpen(item.title)}
                    className="mt-4 inline-flex items-center gap-1 self-start text-sm font-medium text-primary underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    See how it helps
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
