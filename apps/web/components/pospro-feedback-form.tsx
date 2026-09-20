"use client";

import * as React from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { SiGoogle } from "@icons-pack/react-simple-icons";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { Bug, Check, HelpCircle, Lightbulb, Loader2, Sparkles } from "lucide-react";

import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { Label } from "@repo/ui/components/ui/label";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { cn } from "@repo/ui/lib/utils";

import { api } from "@/convex/_generated/api";
import { Toast } from "@/components/toast";

type FeedbackType = "bug" | "suggestion" | "question";

const FEEDBACK_TYPES: { value: FeedbackType; label: string; hint: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { value: "bug", label: "Bug", hint: "Something broke, crashed, or looked wrong.", icon: Bug },
  { value: "suggestion", label: "Suggestion", hint: "An idea to make it better.", icon: Lightbulb },
  { value: "question", label: "Question", hint: "Something you're not sure how to do.", icon: HelpCircle },
];

// Real POSPro modules, grounded in lib/projects.ts featureCategories and the
// FAQ categories (pospro-faq-content.tsx) — so testers pick from areas that
// actually exist instead of typing free text.
const APP_AREAS = [
  "POS & Checkout",
  "Products & Variants",
  "Inventory & Stock Counts",
  "Stock Transfers & Purchase Orders",
  "Customers & Loyalty",
  "Employees, Roles & PIN Login",
  "Terminals & Schedules",
  "Expenses & Cash Flow",
  "Reports & Dashboard",
  "Offline Mode & Syncing",
  "AI Tools (photo/CSV import, voice search)",
  "Receipts & Printing",
  "Account & Login Security",
  "Something else / not sure",
] as const;

// Ready-made starter lines — click one and it drops into the description
// box so a tester fills in the blanks instead of writing from scratch.
const QUICK_TEMPLATES = [
  {
    label: "Steps to reproduce",
    text: "Steps to reproduce:\n1. \n2. \n3. \n\nExpected: \nActual: ",
  },
  {
    label: "Crash or freeze",
    text: "The app crashed / froze when I: ",
  },
  {
    label: "Looks wrong on my screen",
    text: "Screen: \nWhat looks wrong (misaligned, cut off, overlapping): ",
  },
  {
    label: "Confusing to use",
    text: "This was confusing or hard to find: \nWhat I expected instead: ",
  },
  {
    label: "Improvement idea",
    text: "Idea to make this better: \nWhy it would help: ",
  },
  {
    label: "Device & version",
    text: "Device: \nOS version: \nApp version: \n\n",
  },
] as const;

// Closed-beta feedback form for POSPro testers. Builds on the same
// sign-in-required ticket pipeline as ticket-form.tsx (convex/tickets.ts),
// with an extra area checklist and quick-insert templates so testers spend
// their time describing what they noticed, not writing from a blank page.
export function PosProFeedbackForm() {
  const [type, setType] = React.useState<FeedbackType | null>(null);
  const [areas, setAreas] = React.useState<string[]>([]);
  const [name, setName] = React.useState("");
  const [storeName, setStoreName] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [signingIn, setSigningIn] = React.useState(false);
  const [showToast, setShowToast] = React.useState(false);

  const descriptionRef = React.useRef<HTMLTextAreaElement>(null);

  const { isAuthenticated, isLoading } = useConvexAuth();
  const { signIn } = useAuthActions();
  const viewer = useQuery(api.users.viewer);
  const createTicket = useMutation(api.tickets.create);

  React.useEffect(() => {
    if (viewer?.name) setName((current) => current || viewer.name!);
  }, [viewer?.name]);

  const canSubmit = type !== null && name.trim() !== "" && title.trim() !== "" && description.trim() !== "";

  function toggleArea(area: string) {
    setAreas((current) => (current.includes(area) ? current.filter((a) => a !== area) : [...current, area]));
  }

  function insertTemplate(text: string) {
    setDescription((current) => (current.trim() === "" ? text : `${current.trim()}\n\n${text}`));
    descriptionRef.current?.focus();
  }

  function handleGoogleSignIn() {
    setSigningIn(true);
    signIn("google", { redirectTo: `${window.location.pathname}${window.location.search}` }).catch(() => {
      setSigningIn(false);
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || !type) return;
    setSubmitting(true);
    setError(null);
    try {
      await createTicket({
        projectSlug: "pospro",
        type,
        title: title.trim(),
        description: description.trim(),
        name: name.trim(),
        storeName: storeName.trim() || undefined,
        areas: areas.length > 0 ? areas : undefined,
      });
      setType(null);
      setAreas([]);
      setStoreName("");
      setTitle("");
      setDescription("");
      setShowToast(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong — try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!isLoading && !isAuthenticated) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-border-sage bg-card p-8 text-center sm:p-10">
        <Sparkles className="h-8 w-8 text-primary" aria-hidden="true" />
        <p className="mt-4 font-display text-h3 text-foreground">Sign in to send feedback</p>
        <p className="mt-2 max-w-xs text-sm text-muted-foreground">
          We ask for a sign-in so we know who to follow up with if we need more details.
        </p>
        <Button
          variant="outline"
          size="lg"
          className="mt-6 w-full max-w-xs gap-2"
          disabled={signingIn}
          onClick={handleGoogleSignIn}
        >
          {signingIn ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <SiGoogle className="h-4 w-4" aria-hidden="true" />
          )}
          {signingIn ? "Redirecting…" : "Sign in with Google"}
        </Button>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="grid gap-6 rounded-2xl border border-border-sage bg-card p-6 sm:p-8">
        <div>
          <Label>What kind of feedback is this?</Label>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {FEEDBACK_TYPES.map((option) => {
              const isSelected = type === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setType(option.value)}
                  aria-pressed={isSelected}
                  className={cn(
                    "flex flex-col items-start gap-1.5 rounded-lg border p-4 text-left transition-colors",
                    isSelected ? "border-primary bg-primary/5" : "border-border-sage bg-background hover:border-primary/40",
                  )}
                >
                  <option.icon className={cn("h-5 w-5", isSelected ? "text-primary" : "text-slate-sage")} aria-hidden="true" />
                  <span className="text-sm font-medium text-foreground">{option.label}</span>
                  <span className="text-xs text-muted-foreground">{option.hint}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <Label>Which part of the app is this about? (check all that apply)</Label>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {APP_AREAS.map((area) => {
              const isChecked = areas.includes(area);
              return (
                <label
                  key={area}
                  className={cn(
                    "flex cursor-pointer items-center gap-2.5 rounded-lg border px-3 py-2.5 text-sm transition-colors",
                    isChecked ? "border-primary bg-primary/5 text-foreground" : "border-border-sage bg-background text-foreground hover:border-primary/40",
                  )}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleArea(area)}
                    className="sr-only"
                  />
                  <span
                    className={cn(
                      "flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded border",
                      isChecked ? "border-primary bg-primary text-primary-foreground" : "border-border-sage bg-background",
                    )}
                    aria-hidden="true"
                  >
                    {isChecked && <Check className="h-3 w-3" strokeWidth={3} />}
                  </span>
                  {area}
                </label>
              );
            })}
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="feedback-title">What&apos;s the short version?</Label>
          <Input
            id="feedback-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Checkout screen freezes after applying a discount"
            maxLength={120}
            required
          />
        </div>

        <div className="grid gap-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Label htmlFor="feedback-description">Tell us more</Label>
          </div>
          <div className="flex flex-wrap gap-2">
            {QUICK_TEMPLATES.map((template) => (
              <button
                key={template.label}
                type="button"
                onClick={() => insertTemplate(template.text)}
                className="rounded-full border border-border-sage bg-background px-3 py-1.5 text-xs font-medium text-slate-sage transition-colors hover:border-primary/40 hover:text-foreground"
              >
                + {template.label}
              </button>
            ))}
          </div>
          <Textarea
            id="feedback-description"
            ref={descriptionRef}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Pick a template above to get started, or just describe what happened, what you expected instead, and when it happens."
            rows={7}
            required
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="feedback-name">Your name</Label>
            <Input id="feedback-name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="feedback-store">Store name (optional)</Label>
            <Input id="feedback-store" value={storeName} onChange={(e) => setStoreName(e.target.value)} />
          </div>
        </div>

        <p className="text-xs text-slate-sage">
          Signed in as {viewer?.email ?? viewer?.name ?? "you"} — we&apos;ll follow up there if we need more details.
        </p>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <Button type="submit" variant="accent" size="lg" disabled={!canSubmit || submitting}>
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            "Send feedback"
          )}
        </Button>
      </form>

      {showToast && (
        <Toast message="Feedback sent — thanks for testing POSPro. We'll take a look." onDismiss={() => setShowToast(false)} />
      )}
    </>
  );
}
