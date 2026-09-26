import type { Metadata } from "next";

import { ManualScreenDocs } from "@/components/pospro/documentation/common/ManualScreenDocs";
import { getMobileAppDoc, MOBILE_APP_SCREENS } from "@/lib/pospro/mobile-app-data";

// Pure static mobile-app-data.ts content — no per-request state, force prerender.
export const dynamic = "force-static";

const doc = getMobileAppDoc("pos");

export const metadata: Metadata = {
  title: "POS",
  description: `Documentation for the mobile app's ${doc.title} screen.`,
};

export default function MobileAppPosManualPage() {
  return <ManualScreenDocs doc={doc} screens={MOBILE_APP_SCREENS} eyebrow="Mobile App Screens" />;
}
