import type { Metadata } from "next";

import { ManualScreenDocs } from "@/components/pospro/documentation/common/ManualScreenDocs";
import { FEATURE_SCREENS, getFeatureDoc } from "@/lib/pospro/features-data";

// Pure static features-data.ts content — no per-request state, force prerender.
export const dynamic = "force-static";

const { doc, eyebrow } = getFeatureDoc("purchase-orders");

export const metadata: Metadata = {
  title: "Purchase orders",
  description: `Documentation for the admin web app's ${doc.title} screen.`,
};

export default function FeaturePurchaseOrdersManualPage() {
  return <ManualScreenDocs doc={doc} screens={FEATURE_SCREENS} eyebrow={eyebrow} />;
}
