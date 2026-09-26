import type { Metadata } from "next";

import { PosProLegalShell } from "@/components/pospro-legal-shell";
import { PosProTermsContent } from "@/components/pospro-terms-content";

export const metadata: Metadata = {
  title: "POSPro One Terms of Service",
  description: "Terms and conditions for using POSPro One.",
};

export default function PosProTermsOfServicePage() {
  return (
    <PosProLegalShell>
      <PosProTermsContent />
    </PosProLegalShell>
  );
}
