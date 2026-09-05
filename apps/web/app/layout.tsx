import type { Metadata } from "next";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";

import { ConvexClientProvider } from "@/components/convex-client-provider";
import { CustomCursor } from "@/components/custom-cursor";
import { ProjectTransitionProvider } from "@/components/project-transition";
import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";

const SITE_URL = "https://www.doubleadigitalsolutions.store";
const SITE_NAME = "Double-A IT Solutions";
const SITE_DESCRIPTION =
  "Double-A IT Solutions builds custom software, websites, web apps, and automations for founders and ops teams who need working product, not a pitch deck.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Custom software, websites, web apps, automation`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "custom software development Philippines",
    "web app development",
    "website design Calbayog City",
    "business automation",
    "POSPro point of sale system",
  ],
  authors: [{ name: SITE_NAME }],
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Custom software, websites, web apps, automation`,
    description: SITE_DESCRIPTION,
    images: [{ url: "/logo-3d.png", width: 1204, height: 1204, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Custom software, websites, web apps, automation`,
    description: SITE_DESCRIPTION,
    images: ["/logo-3d.png"],
  },
  alternates: {
    canonical: "/",
  },
};

const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo-3d.png`,
  email: "doublea.itsolutions2026@gmail.com",
  telephone: "+639264450238",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Calbayog City",
    addressRegion: "Samar",
    addressCountry: "PH",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ConvexAuthNextjsServerProvider verbose>
      {/* verbose logs the auth handshake to the browser console — temporary
          while diagnosing why sign-in isn't sticking in production. */}
      <html lang="en" suppressHydrationWarning>
        <head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
          />
        </head>
        <body className="font-body antialiased">
          <ConvexClientProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <CustomCursor />
              <ProjectTransitionProvider>{children}</ProjectTransitionProvider>
            </ThemeProvider>
          </ConvexClientProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
