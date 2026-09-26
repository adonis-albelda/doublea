import type { Metadata } from "next";

import { BackofficeIndex } from "@/components/pospro/documentation/sections";

// Pure static backoffice-data.ts content — no per-request state, force prerender.
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Backoffice",
  description:
    "Documentation for the POSPro One Backoffice: login, account and company settings, AI usage, security, businesses, and locations.",
};

export default function BackofficeManualPage() {
  return (
    <main className="h-full overflow-y-auto">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
        <BackofficeIndex />
      </div>
    </main>
  );
}
