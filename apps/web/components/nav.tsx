"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, MessageCircle } from "lucide-react";

import { Button } from "@repo/ui/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@repo/ui/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@repo/ui/components/ui/sheet";
import { cn } from "@repo/ui/lib/utils";

import { FACEBOOK_MESSENGER_URL } from "@/lib/social-links";
import { RotatingCtaLabel } from "@/components/rotating-cta-label";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/user-menu";

const NAV_LINKS = [
  { href: "/#services", label: "Services" },
  { href: "/#products", label: "Products" },
  { href: "/#process", label: "Process" },
  { href: "/#about", label: "About" },
  { href: "/#faqs", label: "FAQ" },
];

// Section ids tracked for scroll-spy, in document order — only in-page
// anchors are sections; the Facebook link isn't one. Scroll-spy only makes
// sense while actually on the homepage, so this stays inert on other routes
// (no element with a matching id exists to observe).
const SECTION_IDS = NAV_LINKS.filter((link) => link.href.startsWith("/#")).map((link) =>
  link.href.slice(2),
);

export function Nav() {
  const [open, setOpen] = React.useState(false);
  const [activeId, setActiveId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );

    // Trigger line sits near the vertical center of the viewport — whichever
    // section is crossing it counts as "current."
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-border-sage bg-card/95 backdrop-blur">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/#top" className="flex items-center gap-3" aria-label="Double A Digital Solutions, home">
          <Image src="/logo.png" alt="" width={40} height={40} className="h-10 w-10" priority />
          <span className="font-display text-lg font-medium tracking-tight">
            Double A Digital Solutions
          </span>
        </Link>

        <div className="hidden items-center gap-2 lg:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {NAV_LINKS.map((link) => {
                const isExternal = !link.href.startsWith("/#");
                const isActive = !isExternal && activeId === link.href.slice(2);
                return (
                  <NavigationMenuItem key={link.href}>
                    <NavigationMenuLink
                      href={link.href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(isActive && "text-primary font-semibold")}
                    >
                      {link.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
          <ThemeToggle />
          <Button
            variant="accent"
            size="sm"
            className="animate-[cta-attention_5s_ease-in-out_infinite]"
            asChild
          >
            <Link
              href={FACEBOOK_MESSENGER_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Message us on Facebook"
            >
              <RotatingCtaLabel />
            </Link>
          </Button>
          <UserMenu />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <UserMenu />
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-6 w-6" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col gap-1" aria-label="Mobile">
                {NAV_LINKS.map((link) => {
                  const isExternal = !link.href.startsWith("#");
                  const isActive = !isExternal && activeId === link.href.slice(1);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      onClick={() => setOpen(false)}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "rounded-md px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        isActive && "text-primary font-semibold bg-secondary",
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <Button variant="accent" size="default" className="mt-4" asChild>
                  <Link
                    href={FACEBOOK_MESSENGER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    aria-label="Message us on Facebook"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    Contact Us
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
