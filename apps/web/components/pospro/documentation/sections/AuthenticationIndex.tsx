import Link from "next/link";

import { AUTH_SCREENS } from "@/lib/pospro/auth-data";

export function AuthenticationIndex() {
  return (
    <div className="space-y-8">
      <div>
        <p className="font-display text-caption uppercase tracking-wide text-slate-sage">Mobile Manual</p>
        <h1 className="mt-2 font-display text-h2 text-foreground">Authentication</h1>
        <p className="mt-2 max-w-2xl text-body-lg text-muted-foreground">
          Screen-by-screen reference for the POSPro One mobile app&apos;s sign-up and login flow: register,
          verify email, sign in, and forgot password.
        </p>
      </div>

      <ol className="grid gap-4 sm:grid-cols-2">
        {AUTH_SCREENS.map((screen, i) => (
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
