import Link from "next/link";

import { AUTH_SCREENS, type ManualScreenLink } from "@/lib/pospro/auth-data";

interface NavigationLinksProps {
  previousScreen?: string;
  nextScreen?: string;
  screens?: ManualScreenLink[];
}

export function NavigationLinks({ previousScreen, nextScreen, screens = AUTH_SCREENS }: NavigationLinksProps) {
  const prev = screens.find((screen) => screen.id === previousScreen);
  const next = screens.find((screen) => screen.id === nextScreen);

  if (!prev && !next) {
    return null;
  }

  return (
    <div className="flex items-center justify-between border-t border-border-sage pt-6">
      {prev ? (
        <Link href={prev.href} className="text-sm font-medium text-primary hover:underline">
          ← {prev.title}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={next.href} className="text-sm font-medium text-primary hover:underline">
          {next.title} →
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
}
