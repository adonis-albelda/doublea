import type { Metadata } from "next";

import { ManualWelcome } from "@/components/pospro/documentation/sections";

// Manual home: welcome, product highlights, and the table of contents. It's
// the sidebar's default active entry ("Welcome").
//
// All manual content is static data — nothing here reads per-request state,
// so force this to prerender at build time (avoids Convex's auth provider
// higher up the tree opting the route into SSR).
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Welcome",
  description: "Welcome to the POSPro One manual — product highlights and a table of contents for every screen.",
};

export default function ManualRootPage() {
  return (
    <main className="h-full overflow-y-auto">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
        <ManualWelcome />
      </div>
    </main>
  );
}
