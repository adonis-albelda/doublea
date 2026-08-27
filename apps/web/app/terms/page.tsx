import type { Metadata } from "next";

import { LegalPage } from "@/components/legal-page";
import { FACEBOOK_MESSENGER_URL } from "@/lib/social-links";

export const metadata: Metadata = {
  title: "Terms & Conditions — Double A Digital Solutions",
  description: "Terms for using the Double A Digital Solutions website and product demos.",
};

// Grounded in what this site actually does — no payment processing on-site,
// demo accounts are for evaluation, delivered client work is client-owned
// (matches the services copy elsewhere on the site). Have this reviewed by
// a lawyer before treating it as a compliant legal document; a jurisdiction
// / governing-law clause is intentionally omitted rather than guessed.
export default function TermsPage() {
  return (
    <LegalPage title="Terms & Conditions" updated="August 27, 2026">
      <p>By using this website, you agree to the terms below.</p>

      <h2>Using this site</h2>
      <p>
        This site is for browsing our work, exploring product demos, and getting in touch about a
        project. There is no payment processing on this site — quotes, contracts, and payment are
        handled directly between you and Double A Digital Solutions via Facebook Messenger.
      </p>

      <h2>Product demo accounts</h2>
      <p>
        Demo admin dashboard access and access codes are provided for evaluation purposes only.
        Don&apos;t enter real customer, payment, or business data into a demo account — treat it as
        a sandbox, not production software.
      </p>

      <h2>Booking a demo</h2>
      <p>
        Picking a date and time on this site reserves that slot but isn&apos;t a confirmed
        appointment until we reply to you on Messenger.
      </p>

      <h2>Ownership of delivered work</h2>
      <p>
        For client projects we build, you own the final source code, documentation, and project
        files delivered to you, as agreed in your project engagement.
      </p>

      <h2>No warranty</h2>
      <p>
        This website and its demos are provided as-is, without warranty of any kind. We work to
        keep everything accurate and available, but don&apos;t guarantee uninterrupted access.
      </p>

      <h2>Questions</h2>
      <p>
        Message us on{" "}
        <a href={FACEBOOK_MESSENGER_URL} target="_blank" rel="noopener noreferrer" className="underline">
          Facebook
        </a>{" "}
        if anything here is unclear.
      </p>
    </LegalPage>
  );
}
