"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft, KeyRound, Lock, LogIn, Mail, Menu, ShieldCheck, UserPlus, type LucideIcon } from "lucide-react";

import { Button } from "@repo/ui/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@repo/ui/components/ui/sheet";
import { cn } from "@repo/ui/lib/utils";

import { AUTH_SCREENS } from "@/lib/pospro/auth-data";

const INDEX_HREF = "/pospro/manual/mobile/authentication";
const POSPRO_HREF = "/products/pospro";

const SCREEN_ICONS: Record<string, LucideIcon> = {
  register: UserPlus,
  "verify-email": Mail,
  "sign-in": LogIn,
  "forgot-password": KeyRound,
  "verify-pin": ShieldCheck,
  "change-password": Lock,
};

// Persistent left rail on desktop; a top bar with a slide-out drawer below
// lg (matches the site's own Nav breakpoint). One feature group (Get
// Started) exists today — add more groups here as more features get
// documented, same pattern.
export function ManualSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // Only 6 screens today — cheap enough to prefetch all of them the moment
  // any manual page mounts, instead of waiting on next/link's viewport-based
  // prefetch (which Next also skips entirely in dev). Removes the visible
  // flicker/delay when the reader clicks a nav link or auto-advances.
  useEffect(() => {
    for (const screen of AUTH_SCREENS) {
      router.prefetch(screen.href);
    }
  }, [router]);

  return (
    <>
      <div className="flex shrink-0 items-center justify-between border-b border-border-sage bg-card/40 px-4 py-3 lg:hidden">
        <Link href={INDEX_HREF} className="font-display text-h3 text-foreground">
          POSPro One Manual
        </Link>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Open manual navigation">
              <Menu className="h-6 w-6" aria-hidden="true" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Get Started</SheetTitle>
            </SheetHeader>
            <nav aria-label="Manual">
              <NavList pathname={pathname} onNavigate={() => setOpen(false)} className="mt-6" />
            </nav>
            <Link
              href={POSPRO_HREF}
              onClick={() => setOpen(false)}
              className="mt-6 flex items-center gap-1.5 text-sm font-medium text-slate-sage transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to POSPro
            </Link>
          </SheetContent>
        </Sheet>
      </div>

      <nav className="hidden h-full w-64 shrink-0 flex-col overflow-y-auto border-r border-border-sage bg-card/40 px-4 py-6 lg:flex">
        <Link href={INDEX_HREF} className="px-2 font-display text-h3 text-foreground">
          POSPro One Manual
        </Link>

        <div className="mt-8">
          <p className="px-2 text-caption uppercase tracking-wide text-slate-sage">Get Started</p>
          <NavList pathname={pathname} className="mt-2" />
        </div>

        <Link
          href={POSPRO_HREF}
          className="mt-auto flex items-center gap-1.5 px-2 pt-6 text-sm font-medium text-slate-sage transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to POSPro
        </Link>
      </nav>
    </>
  );
}

function NavList({
  pathname,
  onNavigate,
  className,
}: {
  pathname: string;
  onNavigate?: () => void;
  className?: string;
}) {
  return (
    <ul className={cn("space-y-1 border-l border-border-sage pl-3", className)}>
      {AUTH_SCREENS.map((screen) => {
        const isActive = pathname === screen.href;
        const Icon = SCREEN_ICONS[screen.id];
        return (
          <li key={screen.id}>
            <Link
              href={screen.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-2 rounded-md px-2 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-slate-sage hover:bg-muted hover:text-foreground",
              )}
            >
              {Icon && <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />}
              {screen.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
