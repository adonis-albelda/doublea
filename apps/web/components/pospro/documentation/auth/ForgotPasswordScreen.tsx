import { NavigationLinks } from "../common/NavigationLinks";
import { ScreenHeader } from "../common/ScreenHeader";
import { ScreenScrollArea } from "../common/ScreenScrollArea";
import { ScreenshotsRail } from "../common/ScreenshotsRail";
import { ComponentsSection, EmailPreviewSection, OverviewSection } from "../sections";

import { getScreenHref, FORGOT_PASSWORD_SCREEN } from "@/lib/pospro/auth-data";

export function ForgotPasswordScreenDocs() {
  return (
    <div className="flex h-full min-h-0">
      <ScreenScrollArea
        previousHref={getScreenHref(FORGOT_PASSWORD_SCREEN.previousScreen)}
        nextHref={getScreenHref(FORGOT_PASSWORD_SCREEN.nextScreen)}
      >
        <ScreenHeader title={FORGOT_PASSWORD_SCREEN.title} description={FORGOT_PASSWORD_SCREEN.description} />
        <OverviewSection {...FORGOT_PASSWORD_SCREEN.overview} />
        {FORGOT_PASSWORD_SCREEN.emailPreview && <EmailPreviewSection {...FORGOT_PASSWORD_SCREEN.emailPreview} />}
        <ComponentsSection components={FORGOT_PASSWORD_SCREEN.components} />
        <NavigationLinks
          previousScreen={FORGOT_PASSWORD_SCREEN.previousScreen}
          nextScreen={FORGOT_PASSWORD_SCREEN.nextScreen}
        />
      </ScreenScrollArea>

      {FORGOT_PASSWORD_SCREEN.screenshots.length > 0 && (
        <aside className="hidden w-[460px] shrink-0 overflow-y-auto border-l border-border-sage bg-card/30 px-6 py-10 xl:block">
          <ScreenshotsRail screenshots={FORGOT_PASSWORD_SCREEN.screenshots} />
        </aside>
      )}
    </div>
  );
}
