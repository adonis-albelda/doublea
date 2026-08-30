import {
  Boxes,
  FileText,
  KeyRound,
  Mic,
  Palette,
  Printer,
  ScanBarcode,
  Sparkles,
  TrendingUp,
  Truck,
  Wallet,
  WifiOff,
  type LucideIcon,
} from "lucide-react";

// Exact-match lookup, keyed by the feature copy in lib/projects.ts — picked
// by hand per feature rather than keyword-guessed, since the full list is
// small and finite. Falls back to Sparkles for anything not (yet) mapped,
// e.g. a new feature added without updating this file.
export const FEATURE_ICONS: Record<string, LucideIcon> = {
  // POSPro
  "Real-time sales tracking across every terminal": TrendingUp,
  "Inventory that updates itself as stock moves": Boxes,
  "Cashier accounts, PIN unlock, and shift history": KeyRound,
  "Bluetooth printer support for instant receipts": Printer,
  "Custom receipt layout, footer, and branding": Palette,
  "Voice search to find and add products hands-free": Mic,
  "Barcode and QR code scanning and generation": ScanBarcode,
  "Reports and margins, always up to date": TrendingUp,
  "Purchase orders and supplier payment terms": FileText,
  "Customer accounts with delivery tracking": Truck,
  "Expense logging and true net profit, not just gross": Wallet,
  "Runs the floor even when the internet doesn't": WifiOff,
};

export const DEFAULT_FEATURE_ICON: LucideIcon = Sparkles;
