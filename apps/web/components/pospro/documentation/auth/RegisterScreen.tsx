import { NavigationLinks } from "../common/NavigationLinks";
import { ScreenHeader } from "../common/ScreenHeader";
import { ScreenScrollArea } from "../common/ScreenScrollArea";
import { ScreenshotsRail } from "../common/ScreenshotsRail";
import { ComponentsSection, EmailPreviewSection, OverviewSection } from "../sections";

import { getScreenHref, REGISTER_SCREEN } from "@/lib/pospro/auth-data";

export function RegisterScreenDocs() {
  return (
    <div className="flex h-full min-h-0">
      <ScreenScrollArea
        previousHref={getScreenHref(REGISTER_SCREEN.previousScreen)}
        nextHref={getScreenHref(REGISTER_SCREEN.nextScreen)}
      >
        <ScreenHeader title={REGISTER_SCREEN.title} description={REGISTER_SCREEN.description} />
        <OverviewSection {...REGISTER_SCREEN.overview} />
        {REGISTER_SCREEN.emailPreview && <EmailPreviewSection {...REGISTER_SCREEN.emailPreview} />}
        <ComponentsSection components={REGISTER_SCREEN.components} />
        <NavigationLinks previousScreen={REGISTER_SCREEN.previousScreen} nextScreen={REGISTER_SCREEN.nextScreen} />
      </ScreenScrollArea>

      {REGISTER_SCREEN.screenshots.length > 0 && (
        <aside className="hidden w-[460px] shrink-0 overflow-y-auto border-l border-border-sage bg-card/30 px-6 py-10 xl:block">
          <ScreenshotsRail screenshots={REGISTER_SCREEN.screenshots} />
        </aside>
      )}
    </div>
  );
}
