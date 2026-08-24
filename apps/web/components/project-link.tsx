"use client";

import * as React from "react";
import Link from "next/link";

import { useProjectTransition } from "@/components/project-transition";

// Drop-in replacement for next/link's Link, used only for "go to a project"
// links — triggers the circle-wipe transition instead of navigating
// straight away. Modifier-clicks (open in new tab, etc.) fall through to
// normal Link behavior.
export function ProjectLink({
  href,
  onClick,
  ...props
}: React.ComponentProps<typeof Link>) {
  const start = useProjectTransition();

  return (
    <Link
      href={href}
      onClick={(e) => {
        if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
          onClick?.(e);
          return;
        }
        e.preventDefault();
        start(href.toString(), { x: e.clientX, y: e.clientY });
        onClick?.(e);
      }}
      {...props}
    />
  );
}
