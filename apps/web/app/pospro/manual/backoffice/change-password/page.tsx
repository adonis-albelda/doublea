import type { Metadata } from "next";

import { ManualScreenDocs } from "@/components/pospro/documentation/common/ManualScreenDocs";
import { BACKOFFICE_CHANGE_PASSWORD_SCREEN, BACKOFFICE_SCREENS } from "@/lib/pospro/backoffice-data";

// Pure static backoffice-data.ts content — no per-request state, force prerender.
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Backoffice Change Password",
  description: "Documentation for the Backoffice change password screen.",
};

export default function BackofficeChangePasswordManualPage() {
  return <ManualScreenDocs doc={BACKOFFICE_CHANGE_PASSWORD_SCREEN} screens={BACKOFFICE_SCREENS} eyebrow="Backoffice" />;
}
