import { NavigationLinks } from "../common/NavigationLinks";
import { ScreenHeader } from "../common/ScreenHeader";
import { ScreenScrollArea } from "../common/ScreenScrollArea";
import { ScreenshotsRail } from "../common/ScreenshotsRail";
import { ComponentsSection, EmailPreviewSection, OverviewSection } from "../sections";

import { getScreenHref, CHANGE_PASSWORD_SCREEN } from "@/lib/pospro/auth-data";

export function ChangePasswordScreenDocs() {
  return (
    <div className="flex h-full min-h-0">
      <ScreenScrollArea
        previousHref={getScreenHref(CHANGE_PASSWORD_SCREEN.previousScreen)}
        nextHref={getScreenHref(CHANGE_PASSWORD_SCREEN.nextScreen)}
      >
        <ScreenHeader title={CHANGE_PASSWORD_SCREEN.title} description={CHANGE_PASSWORD_SCREEN.description} />
        <OverviewSection {...CHANGE_PASSWORD_SCREEN.overview} />
        {CHANGE_PASSWORD_SCREEN.emailPreview && <EmailPreviewSection {...CHANGE_PASSWORD_SCREEN.emailPreview} />}
        <ComponentsSection components={CHANGE_PASSWORD_SCREEN.components} />
        <NavigationLinks
          previousScreen={CHANGE_PASSWORD_SCREEN.previousScreen}
          nextScreen={CHANGE_PASSWORD_SCREEN.nextScreen}
        />
      </ScreenScrollArea>

      {CHANGE_PASSWORD_SCREEN.screenshots.length > 0 && (
        <aside className="hidden w-[460px] shrink-0 overflow-y-auto border-l border-border-sage bg-card/30 px-6 py-10 xl:block">
          <ScreenshotsRail screenshots={CHANGE_PASSWORD_SCREEN.screenshots} />
        </aside>
      )}
    </div>
  );
}
