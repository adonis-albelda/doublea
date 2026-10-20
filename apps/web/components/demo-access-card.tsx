import Link from "next/link";
import { SiApple, SiGoogleplay } from "@icons-pack/react-simple-icons";
import { MessageSquare, Printer, RefreshCw, Smartphone } from "lucide-react";

import { Button } from "@repo/ui/components/ui/button";

import type { Project } from "@/lib/projects";

// Store download links only — the sign-in-gated APK download was removed
// once the app went live on Google Play.
export function DemoAccessCard({ project }: { project: Project }) {
  if (!project.hasDemoAccess) return null;

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
          <p className="mt-4 flex items-start gap-2.5 text-xs text-muted-foreground">
            <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            <span>
              Noticed something?{" "}
              <Link href="/pospro/feedback" className="text-primary underline-offset-2 hover:underline">
                Send feedback
              </Link>{" "}
              — it helps us make the app better.
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
