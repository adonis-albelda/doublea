import type { Metadata } from "next";

import { RegisterScreenDocs } from "@/components/pospro/documentation/auth";

export const metadata: Metadata = {
  title: "Register",
  description: "Documentation for the mobile app's account registration screen.",
};

export default function RegisterManualPage() {
  return <RegisterScreenDocs />;
}
