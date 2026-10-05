import type { Metadata } from "next";

import { BusinessGallery } from "@/components/pospro/documentation/businesses";

// Pure static businesses-data.ts content — no per-request state, force prerender.
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Glass and Aluminum",
  description: "How the POSPro One mobile app and web app look for a Glass and Aluminum business.",
};

export default function BusinessGlassAndAluminumManualPage() {
  return <BusinessGallery id="glass-and-aluminum" />;
}
