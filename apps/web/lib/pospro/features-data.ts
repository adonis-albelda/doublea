// Data for the POSPro One Features manual (/pospro/manual/features/**).
//
// Mirrors the admin web app's sidebar (pos-inventory apps/admin/lib/nav.ts,
// NAV_SECTIONS) — same sections, sub-groups, labels, icons, and order — so
// the manual reads like the menu the admin actually sees. Keep the two in
// step when the admin menu changes.
//
// Each item is a stub for now (title + the menu's blurb). To document one,
// add a `doc` to its item with `overview` / `components` — the page renders
// those sections as soon as they're present, same as the auth screens.
// Screenshots follow the same convention as backoffice-data.ts: drop the
// capture in app/pospro/manual/features/<slug>/screenshots/, import it here,
// and set `doc.screenshots: [{ id, title, paths: { phone: <import> } }]`.
import {
  ArrowLeftRight,
  BadgePercent,
  Banknote,
  BookCopy,
  Boxes,
  Briefcase,
  CalendarClock,
  ChartColumn,
  ClipboardList,
  ContactRound,
  Download,
  FolderTree,
  Gift,
  Images,
  Layers,
  LayoutDashboard,
  LayoutGrid,
  Package,
  PackageCheck,
  Plus,
  Printer,
  QrCode,
  Receipt,
  Shield,
  Store,
  Tags,
  Truck,
  UserRound,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";

import type { AuthScreenDoc, ManualScreenLink } from "./auth-data";

const BASE_HREF = "/pospro/manual/features";

export const FEATURES_INDEX_HREF = BASE_HREF;

export type FeatureItem = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  doc?: Partial<Pick<AuthScreenDoc, "overview" | "components" | "screenshots" | "emailPreview">>;
};

/** A sub-heading inside a section (e.g. "Catalog"), or null for a bare list with no sub-heading. */
export type FeatureGroup = {
  label: string | null;
  items: FeatureItem[];
};

/** Top-level heading inside Features (e.g. "Product Management"). */
export type FeatureSection = {
  label: string;
  groups: FeatureGroup[];
};

export const FEATURE_SECTIONS: FeatureSection[] = [
  {
    label: "Dashboards",
    groups: [
      {
        label: null,
        items: [
          { id: "dashboard", title: "Dashboard", icon: LayoutDashboard, description: "Today's takings at a glance" },
          {
            id: "sales-dashboard",
            title: "Sales Dashboard",
            icon: ChartColumn,
            description: "Revenue, top products, cashiers",
          },
        ],
      },
    ],
  },
  {
    label: "Product Management",
    groups: [
      {
        label: "Catalog",
        items: [
          { id: "products", title: "Products", icon: Package, description: "Prices, cost, barcodes" },
          { id: "categories", title: "Categories", icon: FolderTree, description: "Shelf tree and markup" },
          {
            id: "variant-options",
            title: "Variant Options",
            icon: Tags,
            description: "Size, color — build the vocabulary for variants",
          },
          {
            id: "add-on-groups",
            title: "Add-on groups",
            icon: Layers,
            description: "Toppings, accessories — merchant-configurable extras",
          },
        ],
      },
      {
        label: null,
        items: [{ id: "product-qr-codes", title: "Product QR codes", icon: QrCode, description: "Print SKU QR sheets" }],
      },
    ],
  },
  {
    label: "Ready Catalog",
    groups: [
      {
        label: null,
        items: [
          {
            id: "ready-catalog",
            title: "Ready Catalog",
            icon: BookCopy,
            description: "Import starter products by store type",
          },
        ],
      },
    ],
  },
  {
    label: "Files",
    groups: [
      {
        label: null,
        items: [{ id: "gallery", title: "Gallery", icon: Images, description: "Shared folders and files" }],
      },
    ],
  },
  {
    label: "Inventory Management",
    groups: [
      {
        label: "Stock",
        items: [
          { id: "inventory", title: "Inventory", icon: Boxes, description: "Stock counts and movements" },
          {
            id: "stock-transfers",
            title: "Stock transfers",
            icon: ArrowLeftRight,
            description: "Move stock between locations",
          },
        ],
      },
      {
        label: "Purchasing",
        items: [
          { id: "suppliers", title: "Suppliers", icon: Truck, description: "Who you buy stock from" },
          {
            id: "purchase-orders",
            title: "Purchase orders",
            icon: ClipboardList,
            description: "Terms, balances, receiving",
          },
          {
            id: "receive-orders",
            title: "Receive orders",
            icon: PackageCheck,
            description: "Log a delivery, restock, adjust prices",
          },
        ],
      },
    ],
  },
  {
    label: "Sales Management",
    groups: [
      {
        label: null,
        items: [
          { id: "sales", title: "Sales", icon: Receipt, description: "Every receipt on file" },
          { id: "new-sale", title: "New sale", icon: Plus, description: "Ring up a phone order" },
          { id: "customers", title: "Customers", icon: ContactRound, description: "Names, addresses, contacts" },
          { id: "table-plans", title: "Table plans", icon: LayoutGrid, description: "Tables per branch, open tabs" },
        ],
      },
      {
        label: "Promotions",
        items: [
          { id: "discounts", title: "Discounts", icon: BadgePercent, description: "Senior/PWD, promos, VAT rules" },
          { id: "loyalty", title: "Loyalty", icon: Gift, description: "Points, rewards, redemptions" },
        ],
      },
    ],
  },
  {
    label: "Finance Management",
    groups: [
      {
        label: null,
        items: [
          { id: "cash-flow", title: "Cash Flow", icon: Banknote, description: "Cash in, cash out, expected cash" },
          { id: "expenses", title: "Expenses", icon: Wallet, description: "Rent, wages, utilities" },
          { id: "reports", title: "Reports", icon: ChartColumn, description: "Profit, discounts, dead stock" },
          { id: "export-data", title: "Export data", icon: Download, description: "CSV, Excel or PDF backup" },
        ],
      },
    ],
  },
  {
    label: "People Management",
    groups: [
      {
        label: null,
        items: [
          { id: "users", title: "Users", icon: Users, description: "Logins, roles, PINs" },
          { id: "employees", title: "Employees", icon: ContactRound, description: "HR profiles linked to users" },
          {
            id: "attendance",
            title: "Attendance",
            icon: CalendarClock,
            description: "Schedules, clock-in/out, POS access",
          },
          { id: "access", title: "Access", icon: Shield, description: "Roles and permissions per user" },
        ],
      },
    ],
  },
  {
    label: "Organization",
    groups: [
      {
        label: null,
        items: [
          { id: "company", title: "Company", icon: Store, description: "Shop name, logo, receipt footer" },
          { id: "businesses", title: "Businesses", icon: Briefcase, description: "Manage the company's businesses" },
          { id: "locations", title: "Locations", icon: Store, description: "Branches and warehouses" },
        ],
      },
    ],
  },
  {
    label: "Settings",
    groups: [
      {
        label: null,
        items: [
          { id: "my-profile", title: "My Profile", icon: UserRound, description: "Name, email, password, photo" },
          { id: "receipt-layout", title: "Receipt layout", icon: Printer, description: "PT-210 blocks and preview" },
        ],
      },
    ],
  },
];

// Flattened in menu order — also the prev/next reading order.
const FEATURE_ITEMS: { item: FeatureItem; section: FeatureSection; group: FeatureGroup }[] =
  FEATURE_SECTIONS.flatMap((section) =>
    section.groups.flatMap((group) => group.items.map((item) => ({ item, section, group }))),
  );

export const FEATURE_SCREENS: ManualScreenLink[] = FEATURE_ITEMS.map(({ item }) => ({
  id: item.id,
  href: `${BASE_HREF}/${item.id}`,
  title: item.title,
  description: item.description,
}));

export function getFeatureDoc(id: string): { doc: AuthScreenDoc; eyebrow: string } {
  const index = FEATURE_ITEMS.findIndex((entry) => entry.item.id === id);
  const entry = FEATURE_ITEMS[index];
  if (!entry) {
    throw new Error(`Unknown feature doc: ${id}`);
  }
  const { item, section, group } = entry;

  return {
    eyebrow: ["Features", section.label, group.label].filter(Boolean).join(" · "),
    doc: {
      id: item.id,
      title: item.title,
      description: item.description,
      previousScreen: FEATURE_ITEMS[index - 1]?.item.id,
      nextScreen: FEATURE_ITEMS[index + 1]?.item.id,
      overview: item.doc?.overview ?? { purpose: item.description, userFlow: [] },
      components: item.doc?.components ?? [],
      screenshots: item.doc?.screenshots ?? [{ id: item.id, title: item.title, paths: {} }],
      emailPreview: item.doc?.emailPreview,
    },
  };
}
