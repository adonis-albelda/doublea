import type { Metadata } from "next";

import { VerifyEmailScreenDocs } from "@/components/pospro/documentation/auth";

export const metadata: Metadata = {
  title: "Account Verification",
  description: "Documentation for the mobile app's email verification (OTP) screen.",
};

export default function VerifyEmailManualPage() {
  return <VerifyEmailScreenDocs />;
}
