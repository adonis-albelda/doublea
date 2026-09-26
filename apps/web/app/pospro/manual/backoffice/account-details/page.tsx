import type { Metadata } from "next";

import { ManualScreenDocs } from "@/components/pospro/documentation/common/ManualScreenDocs";
import { BACKOFFICE_ACCOUNT_DETAILS_SCREEN, BACKOFFICE_SCREENS } from "@/lib/pospro/backoffice-data";

// Pure static backoffice-data.ts content — no per-request state, force prerender.
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Account Details",
  description: "Documentation for the Backoffice account details screen.",
};

export default function BackofficeAccountDetailsManualPage() {
  return <ManualScreenDocs doc={BACKOFFICE_ACCOUNT_DETAILS_SCREEN} screens={BACKOFFICE_SCREENS} eyebrow="Backoffice" />;
}
