import type { Metadata } from "next";

import { ForgotPasswordScreenDocs } from "@/components/pospro/documentation/auth";

// Pure static auth-data.ts content — no per-request state, force prerender.
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Documentation for the mobile app's password reset screen.",
};

export default function ForgotPasswordManualPage() {
  return <ForgotPasswordScreenDocs />;
}
