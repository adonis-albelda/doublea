import Link from "next/link";

import { FEATURE_SECTIONS, FEATURES_INDEX_HREF } from "@/lib/pospro/features-data";

// Same section → sub-group → item structure as the admin web app's sidebar.
export function FeaturesIndex() {
  return (
    <div className="space-y-10">
      <div>
        <p className="font-display text-caption uppercase tracking-wide text-slate-sage">Manual</p>
        <h1 className="mt-2 font-display text-h2 text-foreground">Features</h1>
        <p className="mt-2 max-w-2xl text-body-lg text-muted-foreground">
          Screen-by-screen reference for the POSPro One admin web app, in the same order as its menu.
        </p>
      </div>

      {FEATURE_SECTIONS.map((section) => (
        <section key={section.label}>
          <h2 className="font-display text-h3 text-foreground">{section.label}</h2>
          {section.groups.map((group, i) => (
            <div key={group.label ?? `group-${i}`} className="mt-4">
              {group.label && (
                <p className="text-caption uppercase tracking-wide text-slate-sage">{group.label}</p>
              )}
              <ul className="mt-2 grid gap-3 sm:grid-cols-2">
                {group.items.map(({ id, title, description, icon: Icon }) => (
                  <li key={id}>
                    <Link
                      href={`${FEATURES_INDEX_HREF}/${id}`}
                      className="flex h-full items-start gap-3 rounded-lg border border-border-sage bg-card p-4 transition-colors hover:border-primary"
                    >
                      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-slate-sage" aria-hidden="true" />
                      <span>
                        <span className="block font-medium text-foreground">{title}</span>
                        <span className="mt-1 block text-sm text-muted-foreground">{description}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}
