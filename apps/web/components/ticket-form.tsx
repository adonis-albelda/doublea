"use client";

import * as React from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { SiGoogle } from "@icons-pack/react-simple-icons";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { Bug, HelpCircle, Lightbulb, LifeBuoy, Loader2 } from "lucide-react";

import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { Label } from "@repo/ui/components/ui/label";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { cn } from "@repo/ui/lib/utils";

import { api } from "@/convex/_generated/api";
import { Toast } from "@/components/toast";

type TicketType = "bug" | "suggestion" | "question";

const TICKET_TYPES: { value: TicketType; label: string; hint: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { value: "bug", label: "Bug", hint: "Something isn't working the way it should.", icon: Bug },
  { value: "suggestion", label: "Suggestion", hint: "An idea to make it better.", icon: Lightbulb },
  { value: "question", label: "Question", hint: "Something you're not sure how to do.", icon: HelpCircle },
];

// Sign-in required — see convex/tickets.ts. The reporter's Google account is
// how we know who sent it and how to follow up, no separate email field.
export function TicketForm({ projectName, projectSlug }: { projectName: string; projectSlug: string }) {
  const [type, setType] = React.useState<TicketType | null>(null);
  const [name, setName] = React.useState("");
  const [storeName, setStoreName] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [signingIn, setSigningIn] = React.useState(false);
  const [showToast, setShowToast] = React.useState(false);

  const { isAuthenticated, isLoading } = useConvexAuth();
  const { signIn } = useAuthActions();
  const viewer = useQuery(api.users.viewer);
  const createTicket = useMutation(api.tickets.create);

  // Prefill the name field once we know who's signed in.
  React.useEffect(() => {
    if (viewer?.name) setName((current) => current || viewer.name!);
  }, [viewer?.name]);

  const canSubmit = type !== null && name.trim() !== "" && title.trim() !== "" && description.trim() !== "";

  function handleGoogleSignIn() {
    setSigningIn(true);
    signIn("google", { redirectTo: `${window.location.pathname}#submit-ticket` }).catch(() => {
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
        projectSlug,
        type,
        title: title.trim(),
        description: description.trim(),
        name: name.trim(),
        storeName: storeName.trim() || undefined,
      });
      setType(null);
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
        <LifeBuoy className="h-8 w-8 text-primary" aria-hidden="true" />
        <p className="mt-4 font-display text-h3 text-foreground">Sign in to submit a ticket</p>
        <p className="mt-2 max-w-xs text-sm text-muted-foreground">
          We ask for a sign-in so we know who to follow up with.
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
      <form
        onSubmit={handleSubmit}
        className="grid gap-6 rounded-2xl border border-border-sage bg-card p-6 sm:p-8"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10" aria-hidden="true">
          <LifeBuoy className="h-5 w-5 text-accent" aria-hidden="true" />
        </span>

        <div>
          <Label>What kind of ticket is this?</Label>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {TICKET_TYPES.map((option) => {
              const isSelected = type === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setType(option.value)}
                  aria-pressed={isSelected}
                  className={cn(
                    "flex flex-col items-start gap-1.5 rounded-lg border p-4 text-left transition-colors",
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border-sage bg-background hover:border-primary/40",
                  )}
                >
                  <option.icon
                    className={cn("h-5 w-5", isSelected ? "text-primary" : "text-slate-sage")}
                    aria-hidden="true"
                  />
                  <span className="text-sm font-medium text-foreground">{option.label}</span>
                  <span className="text-xs text-muted-foreground">{option.hint}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="ticket-title">What&apos;s the short version?</Label>
          <Input
            id="ticket-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Receipt printer stopped working after update"
            maxLength={120}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="ticket-description">Tell us more</Label>
          <Textarea
            id="ticket-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What happened, what you expected instead, and when it happens — as much detail as you can give helps us fix it faster."
            rows={5}
            required
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="ticket-name">Your name</Label>
            <Input id="ticket-name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="ticket-store">Store name (optional)</Label>
            <Input id="ticket-store" value={storeName} onChange={(e) => setStoreName(e.target.value)} />
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
            `Submit ticket for ${projectName}`
          )}
        </Button>
      </form>

      {showToast && (
        <Toast message="Ticket sent — we'll take a look and follow up if we need more details." onDismiss={() => setShowToast(false)} />
      )}
    </>
  );
}
