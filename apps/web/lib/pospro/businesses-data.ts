// Data for the POSPro One "Supported Businesses" manual (/pospro/manual/businesses/**):
// one page per business type POSPro One is set up for, showing how the
// mobile app and the web app look for that kind of store. Content is images
// only — no screen-by-screen copy.
//
// Adding images: drop them in
//   app/pospro/manual/businesses/<slug>/screenshots/mobile/  (phone captures)
//   app/pospro/manual/businesses/<slug>/screenshots/web/     (web app captures)
// import them here, and add them to the business's `mobile` / `web` list in
// display order. A business with no images yet shows a placeholder frame.
import type { StaticImageData } from "next/image";
import {
  AppWindow,
  Backpack,
  CookingPot,
  Droplets,
  Egg,
  Hammer,
  Store,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";

import type { ManualScreenLink } from "./auth-data";

const BASE_HREF = "/pospro/manual/businesses";

export const BUSINESSES_INDEX_HREF = BASE_HREF;

export type BusinessImage = {
  src: StaticImageData;
  caption: string;
};

export type BusinessType = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  mobile: BusinessImage[];
  web: BusinessImage[];
};

// Sidebar/index order — also the prev/next reading order.
export const BUSINESS_TYPES: BusinessType[] = [
  {
    id: "hardware",
    title: "Hardware",
    description: "POSPro One set up for a hardware store.",
    icon: Hammer,
    mobile: [],
    web: [],
  },
  {
    id: "restaurant",
    title: "Restaurant",
    description: "POSPro One set up for a restaurant.",
    icon: UtensilsCrossed,
    mobile: [],
    web: [],
  },
  {
    id: "silogan",
    title: "Silogan",
    description: "POSPro One set up for a silogan.",
    icon: Egg,
    mobile: [],
    web: [],
  },
  {
    id: "carinderia",
    title: "Carinderia",
    description: "POSPro One set up for a carinderia.",
    icon: CookingPot,
    mobile: [],
    web: [],
  },
  {
    id: "glass-and-aluminum",
    title: "Glass and Aluminum",
    description: "POSPro One set up for a glass and aluminum shop.",
    icon: AppWindow,
    mobile: [],
    web: [],
  },
  {
    id: "water-refilling-station",
    title: "Water Refilling Station",
    description: "POSPro One set up for a water refilling station.",
    icon: Droplets,
    mobile: [],
    web: [],
  },
  {
    id: "sari-sari-store",
    title: "Sari-Sari Store",
    description: "POSPro One set up for a sari-sari store.",
    icon: Store,
    mobile: [],
    web: [],
  },
  {
    id: "school-supplies",
    title: "School Supplies",
    description: "POSPro One set up for a school supplies store.",
    icon: Backpack,
    mobile: [],
    web: [],
  },
];

export const BUSINESS_SCREENS: ManualScreenLink[] = BUSINESS_TYPES.map((business) => ({
  id: business.id,
  href: `${BASE_HREF}/${business.id}`,
  title: business.title,
  description: business.description,
}));

export function getBusiness(id: string): { business: BusinessType; previous?: string; next?: string } {
  const index = BUSINESS_TYPES.findIndex((business) => business.id === id);
  const business = BUSINESS_TYPES[index];
  if (!business) {
    throw new Error(`Unknown business type: ${id}`);
  }
  return { business, previous: BUSINESS_TYPES[index - 1]?.id, next: BUSINESS_TYPES[index + 1]?.id };
}
