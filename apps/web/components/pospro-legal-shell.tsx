"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

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
//
// When the native app opens this in its own webview (?embedded=1 on the
// URL), the logo and tabs are redundant — the app already has its own
// chrome/back button and doesn't need a second set of navigation.
export function PosProLegalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isEmbedded = searchParams.get("embedded") === "1";

  return (
    <main className="force-light min-h-screen bg-white py-10 [color-scheme:light]">
      <div className="container max-w-3xl">
        {!isEmbedded && (
          <>
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
          </>
        )}

        <div className={cn("pb-16", isEmbedded ? "mt-0" : "mt-8")}>{children}</div>
      </div>
    </main>
  );
}
