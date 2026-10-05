import type { Metadata } from "next";

import { BusinessGallery } from "@/components/pospro/documentation/businesses";

// Pure static businesses-data.ts content — no per-request state, force prerender.
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Carinderia",
  description: "How the POSPro One mobile app and web app look for a Carinderia business.",
};

export default function BusinessCarinderiaManualPage() {
  return <BusinessGallery id="carinderia" />;
}
