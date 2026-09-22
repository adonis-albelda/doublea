import type { Metadata } from "next";

import { VerifyPinScreenDocs } from "@/components/pospro/documentation/auth";

export const metadata: Metadata = {
  title: "Verify PIN",
  description: "Documentation for the mobile app's forgot-password PIN verification screen.",
};

export default function VerifyPinManualPage() {
  return <VerifyPinScreenDocs />;
}
