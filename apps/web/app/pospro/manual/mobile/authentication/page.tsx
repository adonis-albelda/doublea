import type { Metadata } from "next";

import { AuthenticationIndex } from "@/components/pospro/documentation/sections";

// Pure static auth-data.ts content — no per-request state, force prerender.
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Authentication",
  description:
    "Documentation for the POSPro One mobile app's registration, email verification, sign-in, and password reset screens.",
};

export default function AuthenticationManualPage() {
  return (
    <main className="h-full overflow-y-auto">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
        <AuthenticationIndex />
      </div>
    </main>
  );
}
