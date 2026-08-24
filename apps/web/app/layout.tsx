import type { Metadata } from "next";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";

import { ConvexClientProvider } from "@/components/convex-client-provider";
import { CustomCursor } from "@/components/custom-cursor";
import { ProjectTransitionProvider } from "@/components/project-transition";
import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";

export const metadata: Metadata = {
  title: "Double A Digital Solutions — Custom software, websites, web apps, automation",
  description:
    "Double A Digital Solutions builds custom software, websites, web apps, and automations for founders and ops teams who need working product, not a pitch deck.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en" suppressHydrationWarning>
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
