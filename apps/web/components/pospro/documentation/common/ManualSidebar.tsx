"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@repo/ui/lib/utils";

import { AUTH_SCREENS } from "@/lib/pospro/auth-data";

const INDEX_HREF = "/pospro/manual/mobile/authentication";

// Persistent left rail for the whole /pospro/manual app shell. One feature group
// (Get Started) exists today — add more groups here as more features get
// documented, same pattern.
export function ManualSidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex h-full w-64 shrink-0 flex-col overflow-y-auto border-r border-border-sage bg-card/40 px-4 py-6">
      <Link href={INDEX_HREF} className="px-2 font-display text-h3 text-foreground">
        POSPro One Manual
      </Link>

      <div className="mt-8">
        <p className="px-2 text-caption uppercase tracking-wide text-slate-sage">Get Started</p>
        <ul className="mt-2 space-y-1 border-l border-border-sage pl-3">
          {AUTH_SCREENS.map((screen) => {
            const isActive = pathname === screen.href;
            return (
              <li key={screen.id}>
                <Link
                  href={screen.href}
                  className={cn(
                    "block rounded-md px-2 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-slate-sage hover:bg-muted hover:text-foreground",
                  )}
                >
                  {screen.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
