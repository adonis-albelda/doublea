import type { Metadata } from "next";

import { ManualScreenDocs } from "@/components/pospro/documentation/common/ManualScreenDocs";
import { BACKOFFICE_AI_USAGE_SCREEN, BACKOFFICE_SCREENS } from "@/lib/pospro/backoffice-data";

// Pure static backoffice-data.ts content — no per-request state, force prerender.
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "AI Usage",
  description: "Documentation for the Backoffice AI usage screen.",
};

export default function BackofficeAiUsageManualPage() {
  return <ManualScreenDocs doc={BACKOFFICE_AI_USAGE_SCREEN} screens={BACKOFFICE_SCREENS} eyebrow="Backoffice" />;
}
