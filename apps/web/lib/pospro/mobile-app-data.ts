// Data for the POSPro One "Mobile App Screens" manual (/pospro/manual/mobile-app/**).
//
// Each item is a stub for now (title + one-line description). To document
// one, add a `doc` with `overview` / `components` — the page renders those
// sections as soon as they're present, same as the auth screens.
// Screenshots follow the same convention as backoffice-data.ts: drop the
// capture in app/pospro/manual/mobile-app/<slug>/screenshots/, import it
// here, and set `doc.screenshots: [{ id, title, paths: { phone: <import> } }]`.
import type { AuthScreenDoc, ManualScreenLink } from "./auth-data";

const BASE_HREF = "/pospro/manual/mobile-app";

export const MOBILE_APP_INDEX_HREF = BASE_HREF;

type MobileAppItem = {
  id: string;
  title: string;
  description: string;
  doc?: Partial<Pick<AuthScreenDoc, "overview" | "components" | "screenshots" | "emailPreview">>;
};

// Sidebar/index order — also the prev/next reading order.
const MOBILE_APP_ITEMS: MobileAppItem[] = [
  { id: "pos", title: "POS", description: "Ring up sales and take payments at the counter." },
  { id: "delivery", title: "Delivery", description: "Manage orders going out for delivery." },
  { id: "sales", title: "Sales", description: "Look up past sales and receipts." },
  { id: "account", title: "Account", description: "Your profile, business, and app settings." },
  { id: "price-inquiry", title: "Price Inquiry", description: "Scan or search a product to check its price." },
  { id: "table-planning", title: "Table Planning", description: "Arrange tables and manage open tabs." },
  {
    id: "barcode-qr-scan",
    title: "Barcode and QR Code Scan",
    description: "Scan a product's barcode or QR code with the camera to find it or add it to a sale.",
  },
  {
    id: "voice-search",
    title: "Voice Search",
    description: "Say what you're looking for out loud and it gets added to the sale — no typing needed.",
  },
  {
    id: "smart-search",
    title: "Smart Search",
    description: "Find products fast even with typos, partial names, or nicknames.",
  },
];

export const MOBILE_APP_SCREENS: ManualScreenLink[] = MOBILE_APP_ITEMS.map((item) => ({
  id: item.id,
  href: `${BASE_HREF}/${item.id}`,
  title: item.title,
  description: item.description,
}));

export function getMobileAppDoc(id: string): AuthScreenDoc {
  const index = MOBILE_APP_ITEMS.findIndex((item) => item.id === id);
  const item = MOBILE_APP_ITEMS[index];
  if (!item) {
    throw new Error(`Unknown mobile app doc: ${id}`);
  }

  return {
    id: item.id,
    title: item.title,
    description: item.description,
    previousScreen: MOBILE_APP_ITEMS[index - 1]?.id,
    nextScreen: MOBILE_APP_ITEMS[index + 1]?.id,
    overview: item.doc?.overview ?? { purpose: item.description, userFlow: [] },
    components: item.doc?.components ?? [],
    screenshots: item.doc?.screenshots ?? [{ id: item.id, title: item.title, paths: {} }],
    emailPreview: item.doc?.emailPreview,
  };
}
