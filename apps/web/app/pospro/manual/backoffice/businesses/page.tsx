import type { Metadata } from "next";

import { ManualScreenDocs } from "@/components/pospro/documentation/common/ManualScreenDocs";
import { BACKOFFICE_BUSINESSES_SCREEN, BACKOFFICE_SCREENS } from "@/lib/pospro/backoffice-data";

// Pure static backoffice-data.ts content — no per-request state, force prerender.
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Businesses",
  description: "Documentation for the Backoffice businesses screen.",
};

export default function BackofficeBusinessesManualPage() {
  return <ManualScreenDocs doc={BACKOFFICE_BUSINESSES_SCREEN} screens={BACKOFFICE_SCREENS} eyebrow="Backoffice" />;
}
