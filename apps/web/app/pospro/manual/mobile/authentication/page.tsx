import type { Metadata } from "next";

import { AuthenticationIndex } from "@/components/pospro/documentation/sections";

export const metadata: Metadata = {
  title: "Authentication",
  description:
    "Documentation for the POSPro One mobile app's registration, email verification, sign-in, and password reset screens.",
};

export default function AuthenticationManualPage() {
  return (
    <main className="h-full overflow-y-auto">
      <div className="mx-auto max-w-3xl px-10 py-12">
        <AuthenticationIndex />
      </div>
    </main>
  );
}
