import type { Metadata } from "next";

import { PosProFeedbackShell } from "@/components/pospro-feedback-shell";
import { PosProFeedbackForm } from "@/components/pospro-feedback-form";

export const metadata: Metadata = {
  title: "POSPro One Beta Feedback",
  description: "Send feedback while testing POSPro One during closed beta.",
};

export default function PosProFeedbackPage() {
  return (
    <PosProFeedbackShell>
      <PosProFeedbackForm />
    </PosProFeedbackShell>
  );
}
