"use client";

import * as React from "react";
import Link from "next/link";
import { useAuthActions } from "@convex-dev/auth/react";
import { SiApple, SiGoogle, SiGoogleplay } from "@icons-pack/react-simple-icons";
import { useConvexAuth, useQuery } from "convex/react";
import {
  Check,
  Copy,
  Download,
  Info,
  Loader2,
  MessageSquare,
  Printer,
  RefreshCw,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

import { Button } from "@repo/ui/components/ui/button";

import { api } from "@/convex/_generated/api";
import type { Project } from "@/lib/projects";

function useCopy() {
  const [copied, setCopied] = React.useState(false);

  const copy = React.useCallback(async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API can fail (permissions, insecure context) — button
      // just stays idle, value is still visible to select/copy by hand.
    }
  }, []);

  return { copied, copy };
}

function CopyIconButton({ value, label }: { value: string; label: string }) {
  const { copied, copy } = useCopy();
  return (
    <button
      type="button"
      onClick={() => copy(value)}
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border-sage text-slate-sage transition-colors hover:border-primary/40 hover:text-primary"
      aria-label={copied ? `${label} copied` : `Copy ${label}`}
    >
      {copied ? (
        <Check className="h-4 w-4 text-primary" aria-hidden="true" />
      ) : (
        <Copy className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  );
}

function FieldSkeleton() {
  return <div className="h-[58px] animate-pulse rounded-lg border border-border-sage bg-background" />;
}

// APK download only — admin dashboard login (email/password/PIN) removed
// per product decision: nothing to log into during closed testing, just
// install the build. getBySlug returns null for a signed-out visitor
// (server-enforced in the query itself), so the link never ships before
// Google sign-in.
export function DemoAccessCard({ project }: { project: Project }) {
  const { isAuthenticated } = useConvexAuth();
  const { signIn } = useAuthActions();
  const demo = useQuery(api.demoAccess.getBySlug, isAuthenticated ? { slug: project.slug } : "skip");
  const [signingIn, setSigningIn] = React.useState(false);

  if (!project.hasDemoAccess) return null;

  function handleSignIn() {
    setSigningIn(true);
    // Send the user back to this exact section (not Convex Auth's default
    // landing page) once Google hands control back.
    // Temporary logging — remove once sign-in is confirmed reflecting correctly.
    signIn("google", { redirectTo: `${window.location.pathname}#try-it` })
      .then((result) => console.log("[DemoAccessCard] signIn result:", result))
      .catch((err) => {
        console.error("[DemoAccessCard] signIn failed:", err);
        setSigningIn(false);
      });
  }

  return (
    <div className="relative overflow-hidden rounded-2xl p-px">
      {/* Rotating conic-gradient "running border" — oversized so the
          rotation never exposes a corner, clipped to the rounded rect by
          the parent's overflow-hidden. prefers-reduced-motion zeroes the
          animation globally (globals.css), so this freezes automatically. */}
      <div
        aria-hidden="true"
        className="absolute inset-[-150%] animate-[spin_5s_linear_infinite]"
        style={{
          backgroundImage:
            "conic-gradient(from 0deg, transparent 0deg, hsl(var(--primary)) 60deg, hsl(var(--accent)) 100deg, transparent 160deg, transparent 360deg)",
        }}
      />

      <div className="relative rounded-2xl border border-border-sage bg-card p-6 sm:p-8">
        <p className="font-mono text-caption uppercase tracking-[0.04em] text-slate-sage">Try it yourself</p>
        <h3 className="mt-2 font-display text-h3 text-foreground">Download the {project.name} app</h3>
        <p className="mt-4 text-sm text-muted-foreground">
          Install the app on your own device and try it out — add products, ring up a sale, and see how it runs
          day to day.
        </p>

        <ul className="mt-5 grid gap-3 sm:grid-cols-3">
          {[
            { icon: Smartphone, text: "Runs on Android phones and tablets" },
            { icon: Printer, text: "Prints receipts on Bluetooth printers" },
            { icon: RefreshCw, text: "Updates arrive through the store" },
          ].map((item) => (
            <li key={item.text} className="flex items-start gap-2.5 text-sm text-foreground">
              <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              {item.text}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {project.playStoreUrl && (
            <Button size="lg" className="gap-2.5" asChild>
              <Link href={project.playStoreUrl} target="_blank" rel="noopener noreferrer">
                <SiGoogleplay className="h-5 w-5" aria-hidden="true" />
                <span className="flex flex-col items-start leading-tight">
                  <span className="text-[10px] font-normal uppercase tracking-[0.04em] opacity-80">Get it on</span>
                  <span>Google Play</span>
                </span>
              </Link>
            </Button>
          )}
          {project.appStoreUrl ? (
            <Button size="lg" className="gap-2.5" asChild>
              <Link href={project.appStoreUrl} target="_blank" rel="noopener noreferrer">
                <SiApple className="h-5 w-5" aria-hidden="true" />
                <span className="flex flex-col items-start leading-tight">
                  <span className="text-[10px] font-normal uppercase tracking-[0.04em] opacity-80">Download on the</span>
                  <span>App Store</span>
                </span>
              </Link>
            </Button>
          ) : (
            <Button size="lg" variant="outline" className="gap-2.5" disabled aria-label="App Store — coming soon">
              <SiApple className="h-5 w-5" aria-hidden="true" />
              <span className="flex flex-col items-start leading-tight">
                <span className="text-[10px] font-normal uppercase tracking-[0.04em] opacity-80">Coming soon</span>
                <span>App Store</span>
              </span>
            </Button>
          )}
        </div>
        {!project.appStoreUrl && (
          <p className="mt-3 text-xs text-muted-foreground">
            The iPhone and iPad version is on the way — we&apos;ll post the App Store link here once it&apos;s live.
          </p>
        )}

        {project.slug === "pospro" && (
          <div className="mt-5 flex items-start gap-2.5 rounded-lg border border-border-sage bg-background px-4 py-3">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            <p className="text-xs text-muted-foreground">
              We work hard to keep {project.name} reliable, but no app is perfect. Please keep your own records
              and daily checks — we can&apos;t cover lost sales or profits if something goes wrong, though we&apos;ll
              always help you fix it fast. By installing, you agree to our{" "}
              <Link href="/pospro/terms-of-service" className="text-primary underline-offset-2 hover:underline">
                Terms of Service
              </Link>
              .
            </p>
          </div>
        )}

        <div className="mt-8 border-t border-border-sage pt-6">
          <p className="text-sm font-medium text-foreground">Prefer to install the APK directly?</p>
          <p className="mt-1 text-sm text-muted-foreground">
            For Android devices without Google Play, download the installer file instead.
          </p>
        </div>

        {!isAuthenticated ? (
          <div className="mt-6 flex flex-col items-center gap-3 rounded-lg border border-dashed border-border-sage bg-background px-6 py-8 text-center">
            <ShieldCheck className="h-6 w-6 text-primary" aria-hidden="true" />
            <p className="text-sm text-foreground">Sign in with Google to download the app.</p>
            <p className="max-w-xs text-xs text-muted-foreground">
              We verify you first to keep the download link from getting spammed.
            </p>
            <Button variant="outline" size="sm" className="mt-1 gap-2" disabled={signingIn} onClick={handleSignIn}>
              {signingIn ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
              ) : (
                <SiGoogle className="h-3.5 w-3.5" aria-hidden="true" />
              )}
              {signingIn ? "Redirecting…" : "Sign in with Google"}
            </Button>
          </div>
        ) : demo === undefined ? (
          <div className="mt-6">
            <FieldSkeleton />
          </div>
        ) : demo === null ? (
          <p className="mt-6 text-sm text-muted-foreground">
            The download link isn&apos;t set up for this project yet.
          </p>
        ) : (
          <>
            <div className="mt-6 flex items-center gap-2">
              <Button variant="accent" size="lg" asChild>
                <Link href={demo.apkUrl} target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Download APK
                </Link>
              </Button>
              <CopyIconButton value={demo.apkUrl} label="APK link" />
            </div>

            <div className="mt-4 grid gap-3 rounded-lg border border-border-sage bg-background p-4 sm:grid-cols-2">
              <div className="flex items-start gap-2.5">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <p className="text-xs text-muted-foreground">
                  Android will warn about installing outside the Play Store — allow it for this file. It&apos;s the
                  same app as the Play Store version.
                </p>
              </div>
              {project.slug === "pospro" && (
                <div className="flex items-start gap-2.5">
                  <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  <p className="text-xs text-muted-foreground">
                    Noticed something?{" "}
                    <Link href="/pospro/feedback" className="text-primary underline-offset-2 hover:underline">
                      Send feedback
                    </Link>{" "}
                    — it helps us make the app better.
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
