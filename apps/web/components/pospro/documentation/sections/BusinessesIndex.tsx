import Link from "next/link";

import { BUSINESS_TYPES, BUSINESSES_INDEX_HREF } from "@/lib/pospro/businesses-data";

export function BusinessesIndex() {
  return (
    <div className="space-y-8">
      <div>
        <p className="font-display text-caption uppercase tracking-wide text-slate-sage">Manual</p>
        <h1 className="mt-2 font-display text-h2 text-foreground">Supported Businesses</h1>
        <p className="mt-2 max-w-2xl text-body-lg text-muted-foreground">
          See how the POSPro One mobile app and web app look for each type of business it supports.
        </p>
      </div>

      <ul className="grid gap-4 sm:grid-cols-2">
        {BUSINESS_TYPES.map(({ id, title, description, icon: Icon }) => (
          <li key={id}>
            <Link
              href={`${BUSINESSES_INDEX_HREF}/${id}`}
              className="flex h-full items-start gap-3 rounded-lg border border-border-sage bg-card p-5 transition-colors hover:border-primary"
            >
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-slate-sage" aria-hidden="true" />
              <span>
                <span className="block font-display text-h3 text-foreground">{title}</span>
                <span className="mt-1 block text-sm text-muted-foreground">{description}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
