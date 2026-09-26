import type { Metadata } from "next";

import { FeaturesIndex } from "@/components/pospro/documentation/sections";

// Pure static features-data.ts content — no per-request state, force prerender.
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Features",
  description: "Documentation for every screen in the POSPro One admin web app, in menu order.",
};

export default function FeaturesManualPage() {
  return (
    <main className="h-full overflow-y-auto">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
        <FeaturesIndex />
      </div>
    </main>
  );
}
