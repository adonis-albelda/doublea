"use client";

import { useState } from "react";
import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@repo/ui/components/ui/dialog";

import { ContentInProgress } from "../common/ContentInProgress";
import { NavigationLinks } from "../common/NavigationLinks";
import { ScreenHeader } from "../common/ScreenHeader";
import { ScreenScrollArea } from "../common/ScreenScrollArea";
import { ScreenshotPlaceholder } from "../common/ScreenshotPlaceholder";

import { getScreenHref } from "@/lib/pospro/auth-data";
import {
  BUSINESS_SCREENS,
  getBusiness,
  type BusinessImage,
} from "@/lib/pospro/businesses-data";

// One business type's page: a gallery of mobile app and web app captures,
// no screen-by-screen copy. Tapping an image opens it full size.
export function BusinessGallery({ id }: { id: string }) {
  const { business, previous, next } = getBusiness(id);
  const [selected, setSelected] = useState<BusinessImage | null>(null);

  return (
    <div className="flex h-full min-h-0">
      <ScreenScrollArea
        previousHref={getScreenHref(previous, BUSINESS_SCREENS)}
        nextHref={getScreenHref(next, BUSINESS_SCREENS)}
      >
        <ScreenHeader
          title={business.title}
          description={business.description}
          eyebrow="Supported Businesses"
        />

        {business.mobile.length === 0 && business.web.length === 0 && <ContentInProgress />}

        <section>
          <h3 className="font-display text-h3 text-foreground">Mobile App</h3>
          <ul className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {business.mobile.length > 0 ? (
              business.mobile.map((image) => (
                <li key={image.src.src}>
                  <button
                    type="button"
                    onClick={() => setSelected(image)}
                    className="block w-full"
                    aria-label={`Open ${image.caption}`}
                  >
                    <ScreenshotPlaceholder
                      title={image.caption}
                      device="phone"
                      path={image.src}
                    />
                  </button>
                  <p className="mt-2 text-center text-xs text-muted-foreground">
                    {image.caption}
                  </p>
                </li>
              ))
            ) : (
              <li>
                <ScreenshotPlaceholder
                  title={`${business.title} — mobile app`}
                  device="phone"
                />
                <p className="mt-2 text-center text-xs text-muted-foreground">
                  Screenshots coming soon
                </p>
              </li>
            )}
          </ul>
        </section>

        <section>
          <h3 className="font-display text-h3 text-foreground">Web App</h3>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {business.web.length > 0 ? (
              business.web.map((image) => (
                <li key={image.src.src}>
                  <button
                    type="button"
                    onClick={() => setSelected(image)}
                    className="block w-full"
                    aria-label={`Open ${image.caption}`}
                  >
                    <BrowserFrame image={image} />
                  </button>
                  <p className="mt-2 text-center text-xs text-muted-foreground">
                    {image.caption}
                  </p>
                </li>
              ))
            ) : (
              <li>
                <BrowserFrame />
                <p className="mt-2 text-center text-xs text-muted-foreground">
                  Screenshots coming soon
                </p>
              </li>
            )}
          </ul>
        </section>

        <NavigationLinks
          previousScreen={previous}
          nextScreen={next}
          screens={BUSINESS_SCREENS}
        />

        <Dialog
          open={selected !== null}
          onOpenChange={(open) => !open && setSelected(null)}
        >
          <DialogContent className="flex max-h-[90vh] max-w-[calc(100%-2rem)] flex-col gap-3 overflow-hidden p-4 sm:max-w-2xl lg:max-w-5xl">
            <div>
              <DialogTitle>{selected?.caption}</DialogTitle>
              <DialogDescription>{business.title}</DialogDescription>
            </div>
            {selected && (
              <div className="relative min-h-0 flex-1">
                <Image
                  src={selected.src}
                  alt={selected.caption}
                  sizes="(min-width: 1024px) 1024px, 100vw"
                  className="mx-auto h-auto max-h-[75vh] w-auto rounded-md object-contain"
                />
              </div>
            )}
          </DialogContent>
        </Dialog>
      </ScreenScrollArea>
    </div>
  );
}

// Browser-window chrome around a web app capture — or, with no image yet,
// an honest empty placeholder (never a fabricated screenshot).
function BrowserFrame({ image }: { image?: BusinessImage }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border-sage bg-card shadow-sm">
      <div className="flex items-center gap-1.5 border-b border-border-sage bg-muted px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-border-sage" />
        <span className="h-2 w-2 rounded-full bg-border-sage" />
        <span className="h-2 w-2 rounded-full bg-border-sage" />
      </div>
      <div className="relative aspect-[16/10] w-full bg-gradient-to-br from-sage-100 via-paper to-sage-100">
        {image && (
          <Image
            src={image.src}
            alt={image.caption}
            fill
            sizes="(min-width: 640px) 400px, 100vw"
            className="object-cover object-top"
          />
        )}
      </div>
    </div>
  );
}
