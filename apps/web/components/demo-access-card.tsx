"use client";

import * as React from "react";
import Link from "next/link";
import { useAuthActions } from "@convex-dev/auth/react";
import { SiGoogle } from "@icons-pack/react-simple-icons";
import { useAction, useConvexAuth, useQuery } from "convex/react";
import { Check, Copy, Download, Hash, KeyRound, LayoutDashboard, Loader2, Mail, ShieldCheck } from "lucide-react";

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

function CopyField({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-border-sage bg-background px-4 py-3">
      <div className="flex min-w-0 items-center gap-3">
        <Icon className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
        <div className="min-w-0">
          <p className="font-mono text-[0.7rem] uppercase tracking-wide text-slate-sage">{label}</p>
          {href ? (
            <Link
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="block truncate text-sm text-foreground underline-offset-2 hover:text-primary hover:underline"
            >
              {value}
            </Link>
          ) : (
            <p className="truncate text-sm text-foreground">{value}</p>
          )}
        </div>
      </div>
      <CopyIconButton value={value} label={label} />
    </div>
  );
}

function FieldSkeleton() {
  return <div className="h-[58px] animate-pulse rounded-lg border border-border-sage bg-background" />;
}

function accessCodeStorageKey(slug: string) {
  return `demo-access-code:${slug}`;
}

// Fetches the signed-in user's demo access code from the Tally superadmin
// API (convex/demoAccess.ts `fetchAccessCode`) once, then caches it in
// localStorage so it survives reloads without hitting the API again.
function useDemoAccessCode(slug: string, isAuthenticated: boolean) {
  const fetchAccessCode = useAction(api.demoAccess.fetchAccessCode);
  const [code, setCode] = React.useState<string | null>(null);
  const [validForDate, setValidForDate] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!isAuthenticated) return;

    const storageKey = accessCodeStorageKey(slug);
    try {
      const cached = localStorage.getItem(storageKey);
      if (cached) {
        const parsed = JSON.parse(cached) as { code: string; validForDate: string | null };
        setCode(parsed.code);
        setValidForDate(parsed.validForDate);
        return;
      }
    } catch {
      // Storage can fail (private mode, quota) or hold a stale/invalid
      // shape — fall through and fetch fresh.
    }

    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchAccessCode({})
      .then((result) => {
        if (cancelled) return;
        setCode(result.code);
        setValidForDate(result.validForDate);
        try {
          localStorage.setItem(storageKey, JSON.stringify(result));
        } catch {
          // Non-fatal — code still shows for this session.
        }
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Couldn't load access code.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug, isAuthenticated, fetchAccessCode]);

  return { code, validForDate, loading, error };
}

// Real demo access for the project's live app — admin dashboard login, APK
// link, and credentials live in Convex (convex/demoAccess.ts), not in this
// bundle. getBySlug returns null for a signed-out visitor (server-enforced
// in the query itself), so nothing sensitive ships before Google sign-in.
export function DemoAccessCard({ project }: { project: Project }) {
  const { isAuthenticated } = useConvexAuth();
  const { signIn } = useAuthActions();
  const demo = useQuery(api.demoAccess.getBySlug, isAuthenticated ? { slug: project.slug } : "skip");
  const [signingIn, setSigningIn] = React.useState(false);
  const accessCode = useDemoAccessCode(project.slug, isAuthenticated);

  if (!project.hasDemoAccess) return null;

  function handleSignIn() {
    setSigningIn(true);
    // Send the user back to this exact section (not Convex Auth's default
    // landing page) once Google hands control back.
    void signIn("google", { redirectTo: `${window.location.pathname}#try-it` });
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
        <h3 className="mt-2 font-display text-h3 text-foreground">Log in to the {project.name} demo</h3>
        <p className="mt-4 text-sm text-muted-foreground">
          Install the app, then sign in to the admin dashboard below to add products, suppliers, and inventory —
          everything a real store owner sets up.
        </p>

        {!isAuthenticated ? (
          <div className="mt-6 flex flex-col items-center gap-3 rounded-lg border border-dashed border-border-sage bg-background px-6 py-8 text-center">
            <ShieldCheck className="h-6 w-6 text-primary" aria-hidden="true" />
            <p className="text-sm text-foreground">Sign in with Google to view the demo credentials.</p>
            <p className="max-w-xs text-xs text-muted-foreground">
              We verify you first to keep the demo account from getting spammed.
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
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <FieldSkeleton />
            <div className="sm:col-span-2">
              <FieldSkeleton />
            </div>
            <FieldSkeleton />
            <FieldSkeleton />
          </div>
        ) : demo === null ? (
          <p className="mt-6 text-sm text-muted-foreground">
            Demo credentials aren&apos;t set up for this project yet.
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

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <CopyField icon={LayoutDashboard} label="Admin dashboard" value={demo.adminUrl} href={demo.adminUrl} />
              </div>
              <CopyField icon={Mail} label="Email" value={demo.email} />
              <CopyField icon={KeyRound} label="Password" value={demo.password} />
              {accessCode.code ? (
                <div className="sm:col-span-2">
                  <CopyField icon={Hash} label="Access code" value={accessCode.code} />
                  {accessCode.validForDate && (
                    <p className="mt-1.5 px-1 text-xs text-muted-foreground">
                      Valid for {accessCode.validForDate}
                    </p>
                  )}
                </div>
              ) : accessCode.loading ? (
                <div className="sm:col-span-2">
                  <FieldSkeleton />
                </div>
              ) : accessCode.error ? (
                <p className="sm:col-span-2 text-sm text-destructive">{accessCode.error}</p>
              ) : null}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
