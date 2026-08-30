"use client";

import * as React from "react";
import Link from "next/link";

import { useProjectTransition } from "@/components/project-transition";

// Drop-in replacement for next/link's Link, used only for "go to a project"
// links — triggers the circle-wipe transition instead of navigating
// straight away. Modifier-clicks (open in new tab, etc.) fall through to
// normal Link behavior.
export const ProjectLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<typeof Link> & { transitionColor?: string }
>(function ProjectLink({ href, onClick, transitionColor, ...props }, ref) {
  const start = useProjectTransition();

  return (
    <Link
      ref={ref}
      href={href}
      onClick={(e) => {
        if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
          onClick?.(e);
          return;
        }
        e.preventDefault();
        start(href.toString(), { x: e.clientX, y: e.clientY }, transitionColor);
        onClick?.(e);
      }}
      {...props}
    />
  );
});
