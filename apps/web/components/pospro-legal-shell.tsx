"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@repo/ui/lib/utils";

const TABS = [
  { href: "/pospro/privacy-policy", label: "Privacy Policy" },
  { href: "/pospro/terms-of-service", label: "Terms of Service" },
  { href: "/pospro/faqs", label: "FAQs" },
] as const;

// Standalone legal shell for the POSPro app itself (opened inside the app's
// webview, not the marketing site) — no Nav/Footer on purpose. Tabs are real
// navigation (Link), so the URL changes when switching documents, not just
// local state.
export function PosProLegalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <main className="min-h-screen bg-page-wash py-10">
      <div className="container max-w-3xl">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/projects/products/propos/logo.webp"
            alt="POSPro logo"
            width={64}
            height={64}
            className="h-16 w-16 object-contain"
          />
          <h1 className="mt-4 font-display text-h2 text-foreground">POSPro Privacy</h1>
        </div>

        <div className="mt-8 flex justify-center gap-2 border-b border-border-sage">
          {TABS.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "-mb-px border-b-2 px-4 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-slate-sage hover:text-foreground",
                )}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>

        <div className="mt-8 pb-16">{children}</div>
      </div>
    </main>
  );
}
