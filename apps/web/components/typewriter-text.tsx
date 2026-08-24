"use client";

import * as React from "react";

// Types `text` out character-by-character on mount/change, with a blinking
// caret once done. Screen readers get the full string immediately via a
// visually-hidden span — the animated chars are aria-hidden so nothing
// reads out mid-type. Skips straight to full text under
// prefers-reduced-motion (no interval started).
export function TypewriterText({
  text,
  className,
  speed = 55,
}: {
  text: string;
  className?: string;
  speed?: number;
}) {
  const [count, setCount] = React.useState(0);
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setCount(text.length);
      setDone(true);
      return;
    }

    setCount(0);
    setDone(false);
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= text.length) {
        window.clearInterval(id);
        setDone(true);
      }
    }, speed);
    return () => window.clearInterval(id);
  }, [text, speed]);

  return (
    <span className={className}>
      <span aria-hidden="true">
        {text.slice(0, count)}
        <span
          className={`ml-0.5 inline-block w-[2px] -translate-y-[0.05em] bg-current align-middle ${
            done ? "animate-pulse" : ""
          }`}
          style={{ height: "0.85em" }}
        />
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
