import type { Metadata } from "next";

import { ManualScreenDocs } from "@/components/pospro/documentation/common/ManualScreenDocs";
import { BACKOFFICE_LOCATIONS_SCREEN, BACKOFFICE_SCREENS } from "@/lib/pospro/backoffice-data";

// Pure static backoffice-data.ts content — no per-request state, force prerender.
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Locations",
  description: "Documentation for the Backoffice locations screen.",
};

export default function BackofficeLocationsManualPage() {
  return <ManualScreenDocs doc={BACKOFFICE_LOCATIONS_SCREEN} screens={BACKOFFICE_SCREENS} eyebrow="Backoffice" />;
}
