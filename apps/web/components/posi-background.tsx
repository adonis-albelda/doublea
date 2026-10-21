"use client";

import * as React from "react";
import Image from "next/image";

const POSI_SRC = "/projects/products/propos/posi/posi-wave.webp";
const POSI_COUNT = 4;

type Placement = { top: number; left: number; size: number; rotate: number; delay: number; flip: boolean };

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

// Scatters a few faint POSI mascots across the page at random spots, picked
// fresh on every visit. Positions are chosen after mount so server and client
// markup match. They hug the left/right edges so they rarely sit on text, and
// pointer-events-none keeps them from blocking clicks.
export function PosiBackground() {
  const [placements, setPlacements] = React.useState<Placement[]>([]);

  React.useEffect(() => {
    setPlacements(
      Array.from({ length: POSI_COUNT }, (_, i) => {
        const onLeft = i % 2 === 0;
        return {
          // Spread down the page in bands so they don't clump together.
          top: randomBetween((i / POSI_COUNT) * 100 + 3, ((i + 1) / POSI_COUNT) * 100 - 8),
          left: onLeft ? randomBetween(0, 6) : randomBetween(88, 94),
          size: randomBetween(90, 140),
          rotate: randomBetween(-15, 15),
          delay: randomBetween(0, 6),
          flip: !onLeft,
        };
      }),
    );
  }, []);

  if (placements.length === 0) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 hidden overflow-hidden md:block">
      {placements.map((p, i) => (
        <div
          key={i}
          className="absolute opacity-20 motion-safe:animate-[hero-float_6s_ease-in-out_infinite] dark:opacity-15"
          style={{ top: `${p.top}%`, left: `${p.left}%`, width: p.size, animationDelay: `-${p.delay}s` }}
        >
          <Image
            src={POSI_SRC}
            alt=""
            width={400}
            height={410}
            sizes="140px"
            className="h-auto w-full"
            style={{ transform: `rotate(${p.rotate}deg)${p.flip ? " scaleX(-1)" : ""}` }}
          />
        </div>
      ))}
    </div>
  );
}
