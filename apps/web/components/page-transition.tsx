"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import { cn } from "@repo/ui/lib/utils";

type Direction = "forward" | "backward";

// Slides each new page in on navigation: forward from the left, backward
// from the right. Remounts children per pathname (key) so the CSS animation
// replays; nothing animates on first load.
//
// Direction: when `order` is given and both pages are in it, the one later
// in the list is "forward" (e.g. the manual's reading order, so clicking an
// earlier sidebar entry slides backward). Otherwise the browser's back /
// forward buttons count as backward, and every other navigation as forward.
export function PageTransition({
  children,
  order,
  className,
}: {
  children: React.ReactNode;
  order?: readonly string[];
  className?: string;
}) {
  const pathname = usePathname();
  const isHistoryNavRef = useRef(false);
  const [state, setState] = useState<{ pathname: string; direction: Direction | null }>({
    pathname,
    direction: null,
  });

  useEffect(() => {
    // Fires before Next's router re-renders with the new pathname.
    function handlePopState() {
      isHistoryNavRef.current = true;
    }
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Derive direction during render (React's "adjust state when a prop
  // changes" pattern) so the new page's very first paint already has the
  // animation class — an effect would flash it unanimated for a frame.
  if (pathname !== state.pathname) {
    const from = order?.indexOf(state.pathname) ?? -1;
    const to = order?.indexOf(pathname) ?? -1;
    let direction: Direction;
    if (from !== -1 && to !== -1) {
      direction = to > from ? "forward" : "backward";
    } else {
      direction = isHistoryNavRef.current ? "backward" : "forward";
    }
    isHistoryNavRef.current = false;
    setState({ pathname, direction });
  }

  return (
    <div className={cn("overflow-hidden", className)}>
      <div
        key={state.pathname}
        className={cn(
          "h-full",
          state.direction === "forward" && "page-slide-forward",
          state.direction === "backward" && "page-slide-backward",
        )}
      >
        {children}
      </div>
    </div>
  );
}
