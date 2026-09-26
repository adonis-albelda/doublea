import type { Metadata } from "next";

import { ManualScreenDocs } from "@/components/pospro/documentation/common/ManualScreenDocs";
import { BACKOFFICE_SECURITY_SCREEN, BACKOFFICE_SCREENS } from "@/lib/pospro/backoffice-data";

// Pure static backoffice-data.ts content — no per-request state, force prerender.
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Security",
  description: "Documentation for the Backoffice security screen.",
};

export default function BackofficeSecurityManualPage() {
  return <ManualScreenDocs doc={BACKOFFICE_SECURITY_SCREEN} screens={BACKOFFICE_SCREENS} eyebrow="Backoffice" />;
}
