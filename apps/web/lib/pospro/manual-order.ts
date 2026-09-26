// Every manual page in sidebar order (Welcome, Get Started, Mobile App
// Screens, Backoffice, Features) — used as the reading order that decides
// whether a page transition slides forward or backward. Keep in step with
// ManualSidebar's category order.
import { AUTH_SCREENS } from "./auth-data";
import { BACKOFFICE_INDEX_HREF, BACKOFFICE_SCREENS } from "./backoffice-data";
import { FEATURE_SCREENS, FEATURES_INDEX_HREF } from "./features-data";
import { MOBILE_APP_SCREENS } from "./mobile-app-data";

export const MANUAL_PAGE_ORDER: readonly string[] = [
  "/pospro/manual",
  "/pospro/manual/mobile/authentication",
  ...AUTH_SCREENS.map((screen) => screen.href),
  ...MOBILE_APP_SCREENS.map((screen) => screen.href),
  BACKOFFICE_INDEX_HREF,
  ...BACKOFFICE_SCREENS.map((screen) => screen.href),
  FEATURES_INDEX_HREF,
  ...FEATURE_SCREENS.map((screen) => screen.href),
];
