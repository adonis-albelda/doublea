import type { Metadata } from "next";

import { ForgotPasswordScreenDocs } from "@/components/pospro/documentation/auth";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Documentation for the mobile app's password reset screen.",
};

export default function ForgotPasswordManualPage() {
  return <ForgotPasswordScreenDocs />;
}
