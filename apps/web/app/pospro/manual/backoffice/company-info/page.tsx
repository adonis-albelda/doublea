import type { Metadata } from "next";

import { ManualScreenDocs } from "@/components/pospro/documentation/common/ManualScreenDocs";
import { BACKOFFICE_COMPANY_INFO_SCREEN, BACKOFFICE_SCREENS } from "@/lib/pospro/backoffice-data";

// Pure static backoffice-data.ts content — no per-request state, force prerender.
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Company Info",
  description: "Documentation for the Backoffice company info screen.",
};

export default function BackofficeCompanyInfoManualPage() {
  return <ManualScreenDocs doc={BACKOFFICE_COMPANY_INFO_SCREEN} screens={BACKOFFICE_SCREENS} eyebrow="Backoffice" />;
}
