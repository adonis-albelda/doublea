import { NavigationLinks } from "../common/NavigationLinks";
import { ScreenHeader } from "../common/ScreenHeader";
import { ScreenScrollArea } from "../common/ScreenScrollArea";
import { ScreenshotsRail } from "../common/ScreenshotsRail";
import { ComponentsSection, EmailPreviewSection, OverviewSection } from "../sections";

import { getScreenHref, VERIFY_PIN_SCREEN } from "@/lib/pospro/auth-data";

export function VerifyPinScreenDocs() {
  return (
    <div className="flex h-full min-h-0">
      <ScreenScrollArea
        previousHref={getScreenHref(VERIFY_PIN_SCREEN.previousScreen)}
        nextHref={getScreenHref(VERIFY_PIN_SCREEN.nextScreen)}
      >
        <ScreenHeader title={VERIFY_PIN_SCREEN.title} description={VERIFY_PIN_SCREEN.description} />
        <OverviewSection {...VERIFY_PIN_SCREEN.overview} />
        {VERIFY_PIN_SCREEN.emailPreview && <EmailPreviewSection {...VERIFY_PIN_SCREEN.emailPreview} />}
        <ComponentsSection components={VERIFY_PIN_SCREEN.components} />
        <NavigationLinks previousScreen={VERIFY_PIN_SCREEN.previousScreen} nextScreen={VERIFY_PIN_SCREEN.nextScreen} />
      </ScreenScrollArea>

      {VERIFY_PIN_SCREEN.screenshots.length > 0 && (
        <aside className="hidden w-[460px] shrink-0 overflow-y-auto border-l border-border-sage bg-card/30 px-6 py-10 xl:block">
          <ScreenshotsRail screenshots={VERIFY_PIN_SCREEN.screenshots} />
        </aside>
      )}
    </div>
  );
}
