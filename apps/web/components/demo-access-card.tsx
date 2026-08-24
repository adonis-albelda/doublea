"use client";

import * as React from "react";
import Link from "next/link";
import { Check, Copy, Download, KeyRound, LayoutDashboard, Mail } from "lucide-react";

import { Button } from "@repo/ui/components/ui/button";

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

// Real demo access for the project's live app — admin dashboard login +
// APK download, each with a copy button (lib/projects.ts `demoAccess`).
export function DemoAccessCard({ project }: { project: Project }) {
  const demo = project.demoAccess;
  if (!demo) return null;

  return (
    <div className="rounded-2xl border border-border-sage bg-card p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono text-caption uppercase tracking-[0.04em] text-slate-sage">Try it yourself</p>
          <h3 className="mt-2 font-display text-h3 text-foreground">Log in to the {project.name} demo</h3>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="accent" size="lg" asChild>
            <Link href={demo.apkUrl} target="_blank" rel="noopener noreferrer">
              <Download className="h-4 w-4" aria-hidden="true" />
              Download APK
            </Link>
          </Button>
          <CopyIconButton value={demo.apkUrl} label="APK link" />
        </div>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        Install the app, then sign in to the admin dashboard below to add products, suppliers, and inventory —
        everything a real store owner sets up.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <CopyField icon={LayoutDashboard} label="Admin dashboard" value={demo.adminUrl} href={demo.adminUrl} />
        </div>
        <CopyField icon={Mail} label="Email" value={demo.email} />
        <CopyField icon={KeyRound} label="Password" value={demo.password} />
      </div>
    </div>
  );
}
