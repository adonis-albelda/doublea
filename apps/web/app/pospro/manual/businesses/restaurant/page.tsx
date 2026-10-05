import type { Metadata } from "next";

import { BusinessGallery } from "@/components/pospro/documentation/businesses";

// Pure static businesses-data.ts content — no per-request state, force prerender.
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Restaurant",
  description: "How the POSPro One mobile app and web app look for a Restaurant business.",
};

export default function BusinessRestaurantManualPage() {
  return <BusinessGallery id="restaurant" />;
}
