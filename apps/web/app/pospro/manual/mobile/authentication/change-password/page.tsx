import type { Metadata } from "next";

import { ChangePasswordScreenDocs } from "@/components/pospro/documentation/auth";

export const metadata: Metadata = {
  title: "Change Password",
  description: "Documentation for the mobile app's new-password screen at the end of the forgot-password flow.",
};

export default function ChangePasswordManualPage() {
  return <ChangePasswordScreenDocs />;
}
