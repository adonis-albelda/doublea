import type { Metadata } from "next";

import { PosProFaqContent } from "@/components/pospro-faq-content";
import { PosProLegalShell } from "@/components/pospro-legal-shell";

export const metadata: Metadata = {
  title: "POSPro One FAQs",
  description: "Frequently asked questions about using POSPro One.",
};

export default function PosProFaqsPage() {
  return (
    <PosProLegalShell>
      <PosProFaqContent />
    </PosProLegalShell>
  );
}
