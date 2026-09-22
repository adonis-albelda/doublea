import { NavigationLinks } from "../common/NavigationLinks";
import { ScreenHeader } from "../common/ScreenHeader";
import { ScreenScrollArea } from "../common/ScreenScrollArea";
import { ScreenshotsRail } from "../common/ScreenshotsRail";
import { ComponentsSection, EmailPreviewSection, OverviewSection } from "../sections";

import { getScreenHref, SIGN_IN_SCREEN } from "@/lib/pospro/auth-data";

export function SignInScreenDocs() {
  return (
    <div className="flex h-full min-h-0">
      <ScreenScrollArea
        previousHref={getScreenHref(SIGN_IN_SCREEN.previousScreen)}
        nextHref={getScreenHref(SIGN_IN_SCREEN.nextScreen)}
      >
        <ScreenHeader title={SIGN_IN_SCREEN.title} description={SIGN_IN_SCREEN.description} />
        <OverviewSection {...SIGN_IN_SCREEN.overview} />
        {SIGN_IN_SCREEN.emailPreview && <EmailPreviewSection {...SIGN_IN_SCREEN.emailPreview} />}
        <ComponentsSection components={SIGN_IN_SCREEN.components} />
        <NavigationLinks previousScreen={SIGN_IN_SCREEN.previousScreen} nextScreen={SIGN_IN_SCREEN.nextScreen} />
      </ScreenScrollArea>

      {SIGN_IN_SCREEN.screenshots.length > 0 && (
        <aside className="hidden w-[460px] shrink-0 overflow-y-auto border-l border-border-sage bg-card/30 px-6 py-10 xl:block">
          <ScreenshotsRail screenshots={SIGN_IN_SCREEN.screenshots} />
        </aside>
      )}
    </div>
  );
}
