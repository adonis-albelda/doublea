import type { Metadata } from "next";

import { LegalPage } from "@/components/legal-page";
import { FACEBOOK_MESSENGER_URL } from "@/lib/social-links";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Double-A IT Solutions collects, uses, and protects your information.",
  alternates: { canonical: "/privacy" },
};

// Grounded in what this site actually does (Google sign-in via Convex Auth,
// demo booking, Messenger contact) — reflects real behavior in this
// codebase. Have this reviewed by a lawyer before treating it as a
// compliant legal document; it isn't drafted by one.
export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="August 27, 2026">
      <p>
        This page explains what information Double-A IT Solutions collects when you use this
        website, and how it&apos;s used.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li>
          <strong>Google account sign-in.</strong> If you sign in with Google to view a product
          demo or book an appointment, we receive your name, email address, and profile photo from
          Google. We use this to identify you and to keep the demo credentials and booking system
          from being spammed by anonymous visitors.
        </li>
        <li>
          <strong>Appointment details.</strong> If you book a demo, we store the date, time, and
          the project you booked for, linked to your Google account.
        </li>
        <li>
          <strong>Messages sent via Facebook Messenger.</strong> Every &quot;Contact us&quot; or
          &quot;Book a demo&quot; action on this site hands off to Facebook Messenger. Messages you
          send there are handled under Meta&apos;s own privacy policy, not this one.
        </li>
      </ul>

      <h2>Cookies</h2>
      <p>
        Once you sign in with Google, we set a cookie that keeps you signed in on return visits.
        This site does not use advertising or tracking cookies.
      </p>

      <h2>Who we share information with</h2>
      <p>
        We use Google (for sign-in) and Convex (for hosting our application backend and database)
        to run this site. We don&apos;t sell your information to anyone.
      </p>

      <h2>Your choices</h2>
      <p>
        You can sign out at any time from the account menu in the site header. To request that we
        delete information we hold about you, message us on{" "}
        <a href={FACEBOOK_MESSENGER_URL} target="_blank" rel="noopener noreferrer" className="underline">
          Facebook
        </a>
        .
      </p>

      <h2>Changes to this policy</h2>
      <p>
        If how this site collects or uses information changes, this page will be updated and the
        date at the top will reflect that.
      </p>
    </LegalPage>
  );
}
