import type { Metadata } from "next";

import { PosProLegalShell } from "@/components/pospro-legal-shell";
import { PosProPrivacyContent } from "@/components/pospro-privacy-content";

export const metadata: Metadata = {
  title: "POSPro Privacy Policy",
  description: "How POSPro collects, uses, and protects personal information.",
};

export default function PosProPrivacyPolicyPage() {
  return (
    <PosProLegalShell>
      <PosProPrivacyContent />
    </PosProLegalShell>
  );
}
