import Link from "next/link";

import { BACKOFFICE_SCREENS } from "@/lib/pospro/backoffice-data";

export function BackofficeIndex() {
  return (
    <div className="space-y-8">
      <div>
        <p className="font-display text-caption uppercase tracking-wide text-slate-sage">Manual</p>
        <h1 className="mt-2 font-display text-h2 text-foreground">Backoffice</h1>
        <p className="mt-2 max-w-2xl text-body-lg text-muted-foreground">
          Screen-by-screen reference for the POSPro One Backoffice: signing in, account and company settings, AI
          usage, security, businesses, and locations.
        </p>
      </div>

      <ol className="grid gap-4 sm:grid-cols-2">
        {BACKOFFICE_SCREENS.map((screen, i) => (
          <li key={screen.id}>
            <Link
              href={screen.href}
              className="block rounded-lg border border-border-sage bg-card p-5 transition-colors hover:border-primary"
            >
              <span className="text-caption uppercase tracking-wide text-slate-sage">Screen {i + 1}</span>
              <h2 className="mt-1 font-display text-h3 text-foreground">{screen.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{screen.description}</p>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
