import type { Metadata } from "next";

import { BusinessGallery } from "@/components/pospro/documentation/businesses";

// Pure static businesses-data.ts content — no per-request state, force prerender.
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Sari-Sari Store",
  description: "How the POSPro One mobile app and web app look for a Sari-Sari Store business.",
};

export default function BusinessSariSariStoreManualPage() {
  return <BusinessGallery id="sari-sari-store" />;
}
