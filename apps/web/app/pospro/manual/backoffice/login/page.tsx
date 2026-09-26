import type { Metadata } from "next";

import { ManualScreenDocs } from "@/components/pospro/documentation/common/ManualScreenDocs";
import { BACKOFFICE_LOGIN_SCREEN, BACKOFFICE_SCREENS } from "@/lib/pospro/backoffice-data";

// Pure static backoffice-data.ts content — no per-request state, force prerender.
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Backoffice Login",
  description: "Documentation for the Backoffice login screen.",
};

export default function BackofficeLoginManualPage() {
  return <ManualScreenDocs doc={BACKOFFICE_LOGIN_SCREEN} screens={BACKOFFICE_SCREENS} eyebrow="Backoffice" />;
}
