"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";

// Standalone shell for the POSPro One beta feedback page (app/pospro/feedback) —
// same force-light, no Nav/Footer treatment as pospro-legal-shell.tsx since
// this also opens inside the native app's webview, not the marketing site.
// Kept separate from the legal shell because it has no privacy/terms/faqs
// tab bar to share.
export function PosProFeedbackShell({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const isEmbedded = searchParams.get("embedded") === "1";

  return (
    <main className="force-light min-h-screen bg-white py-10 text-foreground [color-scheme:light]">
      <div className="container max-w-3xl">
        {!isEmbedded && (
          <div className="flex flex-col items-center text-center">
            <Image
              src="/projects/products/propos/logo.webp"
              alt="POSPro One logo"
              width={64}
              height={64}
              className="h-16 w-16 object-contain"
            />
            <h1 className="mt-4 font-display text-h2 text-foreground">POSPro One Beta Feedback</h1>
            <p className="mt-3 max-w-md text-sm text-muted-foreground">
              You&apos;re testing POSPro One before it&apos;s released. Check off what your feedback is about, pick a
              template to get started, and tell us what you noticed — a couple minutes now saves us bug reports
              later.
            </p>
          </div>
        )}

        <div className={isEmbedded ? "mt-0 embedded-compact" : "mt-8"}>{children}</div>
      </div>
    </main>
  );
}
