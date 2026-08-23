"use client";

import * as React from "react";
import { Hand, MessageCircle, PhoneCall, Send } from "lucide-react";

// Rotates a CTA button's icon + text, meant to pair with the button's
// 5s cta-attention shake/glow pulse (globals.css) — a fresh word + icon
// each pulse. Shared between nav.tsx and hero.tsx so both CTAs stay in sync
// and swapping the message set only happens in one place.
const CTA_MESSAGES = [
  { text: "Contact Us", icon: MessageCircle },
  { text: "Let's Talk", icon: PhoneCall },
  { text: "Say Hello", icon: Hand },
  { text: "Get in Touch", icon: Send },
];

export function RotatingCtaLabel({
  textWidthClassName = "w-[6.75rem]",
}: {
  textWidthClassName?: string;
}) {
  const [index, setIndex] = React.useState(0);
  const [fading, setFading] = React.useState(false);

  React.useEffect(() => {
    let swapTimeout: ReturnType<typeof setTimeout>;
    const interval = setInterval(() => {
      setFading(true);
      swapTimeout = setTimeout(() => {
        setIndex((i) => (i + 1) % CTA_MESSAGES.length);
        setFading(false);
      }, 250);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(swapTimeout);
    };
  }, []);

  const { text, icon: Icon } = CTA_MESSAGES[index]!;

  return (
    <span
      aria-hidden="true"
      className={`flex items-center gap-1 transition-opacity duration-200 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span className={`inline-block text-center ${textWidthClassName}`}>{text}</span>
    </span>
  );
}
