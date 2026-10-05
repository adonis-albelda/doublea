import type { Metadata } from "next";

import { BusinessesIndex } from "@/components/pospro/documentation/sections";

// Pure static businesses-data.ts content — no per-request state, force prerender.
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Supported Businesses",
  description: "How the POSPro One mobile app and web app look for each type of business.",
};

export default function BusinessesManualPage() {
  return (
    <main className="h-full overflow-y-auto">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
        <BusinessesIndex />
      </div>
    </main>
  );
}
