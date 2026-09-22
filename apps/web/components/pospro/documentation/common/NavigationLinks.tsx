import Link from "next/link";

import { AUTH_SCREENS } from "@/lib/pospro/auth-data";

interface NavigationLinksProps {
  previousScreen?: string;
  nextScreen?: string;
}

export function NavigationLinks({ previousScreen, nextScreen }: NavigationLinksProps) {
  const prev = AUTH_SCREENS.find((screen) => screen.id === previousScreen);
  const next = AUTH_SCREENS.find((screen) => screen.id === nextScreen);

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
