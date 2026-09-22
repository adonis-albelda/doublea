import type { Metadata } from "next";

import { SignInScreenDocs } from "@/components/pospro/documentation/auth";

// Pure static auth-data.ts content — no per-request state, force prerender.
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Sign-In",
  description: "Documentation for the mobile app's sign-in screen.",
};

export default function SignInManualPage() {
  return <SignInScreenDocs />;
}
