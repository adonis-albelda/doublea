import {
  AlertTriangle,
  BellRing,
  Boxes,
  CalendarDays,
  ClipboardCheck,
  CreditCard,
  FileSearch,
  FileText,
  History,
  KeyRound,
  LayoutDashboard,
  Mail,
  MessagesSquare,
  Mic,
  Palette,
  Printer,
  Receipt,
  RefreshCw,
  Repeat,
  ScanBarcode,
  Search,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Tag,
  TrendingUp,
  Truck,
  Users,
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

  // Loop Fulfillment
  "Live inventory dashboard": LayoutDashboard,
  "Role-based warehouse and office views": Users,
  "Automated low-stock alerts": BellRing,
  "Daily pick-list export": FileText,

  // Harbor & Vine
  "Rebuilt checkout flow on Shopify and Stripe": ShoppingCart,
  "One-page mobile checkout": Smartphone,
  "Abandoned cart recovery emails": Mail,
  "Real-time shipping rate calculation": Truck,

  // Northline Logistics
  "Automated invoice-to-PO matching": Receipt,
  "Slack alerts on mismatches": AlertTriangle,
  "Direct QuickBooks sync": RefreshCw,
  "Weekly reconciliation summary": ClipboardCheck,

  // Kestrel Coworking
  "Self-serve room booking calendar": CalendarDays,
  "Automated member billing via Stripe": CreditCard,
  "Usage-based invoicing": Receipt,
  "Member portal for booking history": History,

  // Ledgerline
  "Recurring and one-off invoicing": Repeat,
  "Stripe-powered payment collection": CreditCard,
  "Client payment status dashboard": LayoutDashboard,
  "Automated payment reminders": BellRing,

  // Fieldnote
  "Central searchable project log": Search,
  "Ingests notes from calls and Slack threads": MessagesSquare,
  "Tagging by client or project": Tag,
  "Full-text search across everything": FileSearch,
};

export const DEFAULT_FEATURE_ICON: LucideIcon = Sparkles;
