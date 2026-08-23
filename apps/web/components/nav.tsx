"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";

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

import { ThemeToggle } from "@/components/theme-toggle";

const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#products", label: "Products" },
  { href: "#process", label: "Process" },
  { href: "#about", label: "About" },
  { href: "#faqs", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

// Section ids tracked for scroll-spy, in document order.
const SECTION_IDS = NAV_LINKS.map((link) => link.href.slice(1));

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
        <Link href="#top" className="flex items-center gap-3" aria-label="Double A Digital Solutions, home">
          <Image src="/logo.png" alt="" width={40} height={40} className="h-10 w-10" priority />
          <span className="font-display text-lg font-medium tracking-tight">
            Double A Digital Solutions
          </span>
        </Link>

        <div className="hidden items-center gap-2 lg:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {NAV_LINKS.map((link) => {
                const isActive = activeId === link.href.slice(1);
                return (
                  <NavigationMenuItem key={link.href}>
                    <NavigationMenuLink
                      href={link.href}
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
          <Button variant="accent" size="default" asChild>
            <Link href="#contact">Start a project</Link>
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
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
                  const isActive = activeId === link.href.slice(1);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
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
                  <Link href="#contact" onClick={() => setOpen(false)}>
                    Start a project
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
