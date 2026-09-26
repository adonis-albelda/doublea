import type { Metadata } from "next";

import { PosProLegalShell } from "@/components/pospro-legal-shell";
import { PosProPrivacyContent } from "@/components/pospro-privacy-content";

export const metadata: Metadata = {
  title: "POSPro One Privacy Policy",
  description: "How POSPro One collects, uses, and protects personal information.",
};

export default function PosProPrivacyPolicyPage() {
  return (
    <PosProLegalShell>
      <PosProPrivacyContent />
    </PosProLegalShell>
  );
}
