import { NavigationLinks } from "./NavigationLinks";
import { ScreenHeader } from "./ScreenHeader";
import { ScreenScrollArea } from "./ScreenScrollArea";
import { ScreenshotsRail } from "./ScreenshotsRail";
import { ComponentsSection, EmailPreviewSection, OverviewSection } from "../sections";

import { getScreenHref, type AuthScreenDoc, type ManualScreenLink } from "@/lib/pospro/auth-data";

// Shared screen-doc layout for every manual group (auth, Mobile App Screens,
// Backoffice, Features) — each route just passes its doc, its group's screen
// list (for prev/next), and the header eyebrow.
//
// Responsive: on xl+ screenshots sit in a right-hand rail next to the text;
// below xl (phones, tablets, small laptops) there's no room for the rail, so
// they render inline after the Overview instead of disappearing. Overview/Components only
// render once they have content, so stub docs show a "coming soon" note.
export function ManualScreenDocs({
  doc,
  screens,
  eyebrow,
}: {
  doc: AuthScreenDoc;
  screens: ManualScreenLink[];
  eyebrow: string;
}) {
  const hasContent = doc.overview.userFlow.length > 0 || doc.components.length > 0;

  return (
    <div className="flex h-full min-h-0">
      <ScreenScrollArea
        previousHref={getScreenHref(doc.previousScreen, screens)}
        nextHref={getScreenHref(doc.nextScreen, screens)}
      >
        <ScreenHeader title={doc.title} description={doc.description} eyebrow={eyebrow} />
        {doc.overview.userFlow.length > 0 && <OverviewSection {...doc.overview} />}
        {doc.screenshots.length > 0 && (
          <section className="xl:hidden">
            <div className="mx-auto max-w-[280px] sm:max-w-xs">
              <ScreenshotsRail screenshots={doc.screenshots} />
            </div>
          </section>
        )}
        {doc.emailPreview && <EmailPreviewSection {...doc.emailPreview} />}
        {doc.components.length > 0 && <ComponentsSection components={doc.components} />}
        {!hasContent && (
          <p className="rounded-lg border border-dashed border-border-sage bg-card/40 p-6 text-sm text-muted-foreground">
            Documentation for this screen is coming soon.
          </p>
        )}
        <NavigationLinks previousScreen={doc.previousScreen} nextScreen={doc.nextScreen} screens={screens} />
      </ScreenScrollArea>

      {doc.screenshots.length > 0 && (
        <aside className="hidden w-[460px] shrink-0 overflow-y-auto border-l border-border-sage bg-card/30 px-6 py-10 xl:block">
          <ScreenshotsRail screenshots={doc.screenshots} />
        </aside>
      )}
    </div>
  );
}
