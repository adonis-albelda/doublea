import type { Metadata } from "next";

import { VerifyEmailScreenDocs } from "@/components/pospro/documentation/auth";

// Pure static auth-data.ts content — no per-request state, force prerender.
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Account Verification",
  description: "Documentation for the mobile app's email verification (OTP) screen.",
};

export default function VerifyEmailManualPage() {
  return <VerifyEmailScreenDocs />;
}
