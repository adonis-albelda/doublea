"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Briefcase,
  Building2,
  ChevronRight,
  CircleUser,
  House,
  LayoutGrid,
  KeyRound,
  Lock,
  LockKeyhole,
  LogIn,
  Mail,
  MapPin,
  Menu,
  Mic,
  Receipt,
  ScanBarcode,
  ScanQrCode,
  SearchCheck,
  ShoppingCart,
  ShieldCheck,
  Sparkles,
  Truck,
  UserPlus,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@repo/ui/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@repo/ui/components/ui/sheet";
import { cn } from "@repo/ui/lib/utils";

import { AUTH_SCREENS, type ManualScreenLink } from "@/lib/pospro/auth-data";
import { BACKOFFICE_SCREENS } from "@/lib/pospro/backoffice-data";
import { MOBILE_APP_SCREENS } from "@/lib/pospro/mobile-app-data";
import { FEATURE_SCREENS, FEATURE_SECTIONS, FEATURES_INDEX_HREF, type FeatureSection } from "@/lib/pospro/features-data";

const INDEX_HREF = "/pospro/manual";
const POSPRO_HREF = "/products/pospro";
const LOGO_SRC = "/projects/products/propos/logo.webp";

type NavGroup = {
  title: string;
  screens: ManualScreenLink[];
  // Keyed by screen id — ids only need to be unique within a group
  // (both groups have a "change-password").
  icons: Record<string, LucideIcon>;
};

// Persistent left rail on desktop; a top bar with a slide-out drawer below
// lg (matches the site's own Nav breakpoint). Categories render in this
// order: NAV_GROUPS, then Features (its own nested nav, FeaturesNav, since
// it mirrors the admin app's section → sub-group menu). Add more flat
// groups to NAV_GROUPS, same pattern.
const NAV_GROUPS: NavGroup[] = [
  {
    title: "Get Started",
    screens: AUTH_SCREENS,
    icons: {
      register: UserPlus,
      "verify-email": Mail,
      "sign-in": LogIn,
      "forgot-password": KeyRound,
      "verify-pin": ShieldCheck,
      "change-password": Lock,
    },
  },
  {
    title: "Mobile App Screens",
    screens: MOBILE_APP_SCREENS,
    icons: {
      pos: ShoppingCart,
      delivery: Truck,
      sales: Receipt,
      account: CircleUser,
      "price-inquiry": ScanBarcode,
      "table-planning": LayoutGrid,
      "barcode-qr-scan": ScanQrCode,
      "voice-search": Mic,
      "smart-search": SearchCheck,
    },
  },
  {
    title: "Backoffice",
    screens: BACKOFFICE_SCREENS,
    icons: {
      login: LogIn,
      "change-password": KeyRound,
      "session-locked": LockKeyhole,
      "account-details": CircleUser,
      "company-info": Building2,
      "ai-usage": Sparkles,
      security: ShieldCheck,
      businesses: Briefcase,
      locations: MapPin,
    },
  },
];


export function ManualSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // ~50 small static pages — cheap enough to prefetch all of them the moment
  // any manual page mounts, instead of waiting on next/link's viewport-based
  // prefetch (which Next also skips entirely in dev). Removes the visible
  // flicker/delay when the reader clicks a nav link or auto-advances.
  useEffect(() => {
    for (const group of NAV_GROUPS) {
      for (const screen of group.screens) {
        router.prefetch(screen.href);
      }
    }
    for (const screen of FEATURE_SCREENS) {
      router.prefetch(screen.href);
    }
  }, [router]);

  return (
    <>
      <div className="flex shrink-0 items-center justify-between border-b border-border-sage bg-card/40 px-4 py-3 lg:hidden">
        <ManualBrand />
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Open manual navigation">
              <Menu className="h-6 w-6" aria-hidden="true" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <Image src={LOGO_SRC} alt="" width={28} height={28} className="h-7 w-7 object-contain" />
                POSPro One Manual
              </SheetTitle>
            </SheetHeader>
            <nav aria-label="Manual" className="mt-6">
              <NavCategories pathname={pathname} onNavigate={() => setOpen(false)} />
            </nav>
            <Link
              href={POSPRO_HREF}
              onClick={() => setOpen(false)}
              className="mt-6 flex items-center gap-1.5 text-sm font-medium text-slate-sage transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to POSPro One
            </Link>
          </SheetContent>
        </Sheet>
      </div>

      {/* Brand header and "Back" footer stay pinned; only the category
          list between them scrolls. */}
      <nav className="hidden h-full w-64 shrink-0 flex-col border-r border-border-sage bg-card/40 lg:flex">
        <div className="shrink-0 border-b border-border-sage px-6 py-5">
          <ManualBrand />
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
          <NavCategories pathname={pathname} />
        </div>

        <Link
          href={POSPRO_HREF}
          className="flex shrink-0 items-center gap-1.5 border-t border-border-sage px-6 py-4 text-sm font-medium text-slate-sage transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to POSPro One
        </Link>
      </nav>
    </>
  );
}

function ManualBrand() {
  return (
    <Link href={INDEX_HREF} className="flex items-center gap-2.5">
      <Image src={LOGO_SRC} alt="POSPro One logo" width={32} height={32} className="h-8 w-8 object-contain" />
      <span className="font-display text-lg leading-tight text-foreground sm:text-h3">POSPro One Manual</span>
    </Link>
  );
}

// Welcome (manual home, the default active entry) then every top-level
// category in order, tightly stacked — each is a one-line
// accordion header until opened, so they read as one list.
function NavCategories({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <div className="space-y-1">
      <Link
        href={INDEX_HREF}
        onClick={onNavigate}
        aria-current={pathname === INDEX_HREF ? "page" : undefined}
        // text-caption kept outside cn(): tailwind-merge doesn't know the
        // custom `caption` font size, reads it as a text color, and drops it
        // in favour of the text-* color below — leaving Welcome at 16px.
        className={`text-caption ${cn(
          "flex items-center gap-2 rounded-md px-2 py-1 uppercase tracking-wide transition-colors",
          pathname === INDEX_HREF ? "bg-primary text-primary-foreground" : "text-slate-sage hover:text-primary",
        )}`}
      >
        <House className="h-4 w-4 shrink-0" aria-hidden="true" />
        Welcome
      </Link>
      {NAV_GROUPS.map((group) => (
        <NavGroupAccordion key={group.title} group={group} pathname={pathname} onNavigate={onNavigate} />
      ))}
      <FeaturesNav pathname={pathname} onNavigate={onNavigate} />
    </div>
  );
}

// Top-level category (Get Started, Mobile App Screens, Backoffice) as an accordion — closed by
// default so the sidebar opens compact. The category holding the current
// page opens on its own, so a reader landing on a screen still sees where
// it lives.
function NavGroupAccordion({
  group,
  pathname,
  onNavigate,
  className,
}: {
  group: NavGroup;
  pathname: string;
  onNavigate?: () => void;
  className?: string;
}) {
  const containsActive = group.screens.some((screen) => pathname === screen.href);
  const [isOpen, setIsOpen] = useState(containsActive);

  // Auto-expand when navigation (prev/next, scroll-advance) lands inside a
  // collapsed category.
  useEffect(() => {
    if (containsActive) setIsOpen(true);
  }, [containsActive]);

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between rounded-md px-2 py-1 text-left text-caption uppercase tracking-wide text-slate-sage transition-colors hover:text-primary"
      >
        {group.title}
        <ChevronRight
          className={cn("h-4 w-4 shrink-0 transition-transform", isOpen && "rotate-90")}
          aria-hidden="true"
        />
      </button>
      {isOpen && <NavList group={group} pathname={pathname} onNavigate={onNavigate} className="my-2" />}
    </div>
  );
}

function NavList({
  group,
  pathname,
  onNavigate,
  className,
}: {
  group: NavGroup;
  pathname: string;
  onNavigate?: () => void;
  className?: string;
}) {
  return (
    <ul className={cn("space-y-1 border-l border-border-sage pl-3", className)}>
      {group.screens.map((screen) => {
        const isActive = pathname === screen.href;
        const Icon = group.icons[screen.id];
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

// Features category: collapsible sections (Dashboards, Product Management,
// …) with optional sub-group headings (Catalog, Stock, …), mirroring the
// admin web app's sidebar. Only the section holding the current page starts
// open, so the long list doesn't bury the other categories.
function FeaturesNav({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <div>
      <Link
        href={FEATURES_INDEX_HREF}
        onClick={onNavigate}
        className="block px-2 py-1 text-caption uppercase tracking-wide text-slate-sage transition-colors hover:text-primary"
      >
        Features
      </Link>
      <div className="my-2 space-y-1">
        {FEATURE_SECTIONS.map((section) => (
          <FeatureSectionNav key={section.label} section={section} pathname={pathname} onNavigate={onNavigate} />
        ))}
      </div>
    </div>
  );
}

function FeatureSectionNav({
  section,
  pathname,
  onNavigate,
}: {
  section: FeatureSection;
  pathname: string;
  onNavigate?: () => void;
}) {
  const containsActive = section.groups.some((group) =>
    group.items.some((item) => pathname === `${FEATURES_INDEX_HREF}/${item.id}`),
  );
  const [isOpen, setIsOpen] = useState(containsActive);

  // Auto-expand when navigation (prev/next, scroll-advance) lands inside a
  // collapsed section.
  useEffect(() => {
    if (containsActive) setIsOpen(true);
  }, [containsActive]);

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        className="flex w-full items-center gap-1.5 rounded-md px-2 py-1.5 text-left text-sm font-medium text-foreground transition-colors hover:bg-muted"
      >
        <ChevronRight
          className={cn("h-4 w-4 shrink-0 text-slate-sage transition-transform", isOpen && "rotate-90")}
          aria-hidden="true"
        />
        {section.label}
      </button>

      {isOpen && (
        <div className="mb-2 ml-2">
          {section.groups.map((group, i) => (
            <div key={group.label ?? `group-${i}`} className="mt-1">
              {group.label && (
                <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wide text-slate-sage">
                  {group.label}
                </p>
              )}
              <NavList
                group={{
                  title: group.label ?? section.label,
                  screens: group.items.map((item) => ({
                    id: item.id,
                    href: `${FEATURES_INDEX_HREF}/${item.id}`,
                    title: item.title,
                    description: item.description,
                  })),
                  icons: Object.fromEntries(group.items.map((item) => [item.id, item.icon])),
                }}
                pathname={pathname}
                onNavigate={onNavigate}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
