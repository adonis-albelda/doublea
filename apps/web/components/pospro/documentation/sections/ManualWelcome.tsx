import Link from "next/link";
import { Check } from "lucide-react";

import { AUTH_SCREENS, type ManualScreenLink } from "@/lib/pospro/auth-data";
import { BACKOFFICE_INDEX_HREF, BACKOFFICE_SCREENS } from "@/lib/pospro/backoffice-data";
import { FEATURE_SECTIONS, FEATURES_INDEX_HREF } from "@/lib/pospro/features-data";
import { MOBILE_APP_SCREENS } from "@/lib/pospro/mobile-app-data";
import { getProjectBySlug } from "@/lib/projects";

// Marketing copy comes from the product page's own entry (lib/projects.ts)
// so the manual's welcome never drifts from what the site says.
const POSPRO = getProjectBySlug("pospro");

// Owner scenarios ("if you… then POSPro One is for you") lead the section;
// the product page's highlighted features follow. Scenarios are manual-only
// copy, grounded in the Company → Business → Location setup documented under
// Backoffice and Features.
const OWNER_SCENARIOS: { title: string; description: string }[] = [
  {
    title: "You run more than one business",
    description:
      "A hardware store, a café, a pharmacy — manage and monitor every business you own from one account and one platform, instead of juggling a separate system for each.",
  },
  {
    title: "You have several branches or a warehouse",
    description:
      "See sales and stock for every location side by side, and move stock between branches without spreadsheets or phone calls.",
  },
  {
    title: "You can't be at the store all day",
    description:
      "Check today's takings, stock levels, and reports from your phone or laptop, wherever you are.",
  },
  {
    title: "You rely on staff to run the counter",
    description:
      "Give each cashier their own PIN and only the access they need, so you always know who did what.",
  },
];

const HIGHLIGHTS = [
  ...OWNER_SCENARIOS,
  ...(POSPRO?.featureCategories ?? []).flatMap((category) => category.items.filter((item) => item.highlight)),
];

// Same category order as the sidebar (ManualSidebar) — keep the two in step.
const FLAT_CATEGORIES: {
  title: string;
  description: string;
  href?: string;
  screens: ManualScreenLink[];
}[] = [
  {
    title: "Get Started",
    description: "Create your account, verify your email, sign in, and recover a forgotten password.",
    href: "/pospro/manual/mobile/authentication",
    screens: AUTH_SCREENS,
  },
  {
    title: "Mobile App Screens",
    description: "Every screen inside the POSPro One mobile app — selling at the counter, deliveries, sales history, and more.",
    screens: MOBILE_APP_SCREENS,
  },
  {
    title: "Backoffice",
    description: "Sign in to the Backoffice and manage your account, company, security, businesses, and locations.",
    href: BACKOFFICE_INDEX_HREF,
    screens: BACKOFFICE_SCREENS,
  },
];

export function ManualWelcome() {
  return (
    <div className="space-y-12">
      <div>
        <p className="font-display text-caption uppercase tracking-wide text-slate-sage">POSPro One Manual</p>
        <h1 className="mt-2 font-display text-h2 text-foreground">Welcome to POSPro One</h1>
        {POSPRO?.tagline && <p className="mt-3 max-w-2xl text-body-lg text-foreground">{POSPRO.tagline}</p>}
        {POSPRO?.longDescription && (
          <p className="mt-3 max-w-2xl text-body-lg text-muted-foreground">{POSPRO.longDescription}</p>
        )}
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          This manual walks through every screen of POSPro One — from creating your account to running the counter
          — so you and your staff can find answers fast. Pick a chapter below, or use the menu on the left.
        </p>
      </div>

      {HIGHLIGHTS.length > 0 && (
        <section>
          <h2 className="font-display text-h3 text-foreground">Why store owners choose POSPro One</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {HIGHLIGHTS.map((item) => (
              <li key={item.title} className="flex gap-3 rounded-lg border border-border-sage bg-card p-4">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <span>
                  <span className="block font-medium text-foreground">{item.title}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{item.description}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h2 className="font-display text-h3 text-foreground">Table of Contents</h2>
        <ol className="mt-4 space-y-6">
          {FLAT_CATEGORIES.map((category, i) => (
            <TocChapter key={category.title} number={i + 1} {...category}>
              <TocLinks screens={category.screens} />
            </TocChapter>
          ))}

          <TocChapter
            number={FLAT_CATEGORIES.length + 1}
            title="Features"
            description="Every screen in the admin web app, in the same order as its menu."
            href={FEATURES_INDEX_HREF}
          >
            <div className="space-y-3">
              {FEATURE_SECTIONS.map((section) => (
                <div key={section.label}>
                  <p className="text-sm font-medium text-foreground">{section.label}</p>
                  <TocLinks
                    screens={section.groups.flatMap((group) =>
                      group.items.map((item) => ({
                        id: item.id,
                        href: `${FEATURES_INDEX_HREF}/${item.id}`,
                        title: item.title,
                        description: item.description,
                      })),
                    )}
                  />
                </div>
              ))}
            </div>
          </TocChapter>
        </ol>
      </section>
    </div>
  );
}

function TocChapter({
  number,
  title,
  description,
  href,
  children,
}: {
  number: number;
  title: string;
  description: string;
  href?: string;
  children: React.ReactNode;
}) {
  return (
    <li className="rounded-lg border border-border-sage bg-card p-5">
      <div className="flex items-baseline gap-3">
        <span className="font-display text-h3 text-slate-sage">{number}.</span>
        <div className="min-w-0">
          <h3 className="font-display text-h3 text-foreground">
            {href ? (
              <Link href={href} className="hover:text-primary">
                {title}
              </Link>
            ) : (
              title
            )}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          <div className="mt-3">{children}</div>
        </div>
      </div>
    </li>
  );
}

function TocLinks({ screens }: { screens: ManualScreenLink[] }) {
  return (
    <ul className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
      {screens.map((screen) => (
        <li key={screen.id}>
          <Link href={screen.href} className="text-sm text-primary hover:underline">
            {screen.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
