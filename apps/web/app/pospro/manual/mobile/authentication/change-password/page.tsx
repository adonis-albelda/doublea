import type { Metadata } from "next";

import { ChangePasswordScreenDocs } from "@/components/pospro/documentation/auth";

// Pure static auth-data.ts content — no per-request state, force prerender.
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Change Password",
  description: "Documentation for the mobile app's new-password screen at the end of the forgot-password flow.",
};

export default function ChangePasswordManualPage() {
  return <ChangePasswordScreenDocs />;
}
