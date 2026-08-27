// PLACEHOLDER CASE STUDIES — no real client work or product screenshots
// were supplied for this build. Swap for actual project details, real
// screenshots, and real outcomes before launch. Single source of truth for
// both the "What we've built" grid (components/products.tsx) and each
// project's detail page (app/products/[slug]/page.tsx).
export interface Project {
  slug: string;
  name: string;
  category: "client" | "personal";
  tagline: string;
  description: string;
  longDescription: string;
  // Optional — not shown in the UI anymore (dropped everywhere this
  // session), and left unset for real projects we don't actually know the
  // real stack of rather than guess.
  stack?: readonly string[];
  status: "Live" | "In build";
  timeline: string;
  features: readonly string[];
  // Exact text of entries in `features` — each marked "Advanced Feature" on
  // the detail page. Optional since not every project has an obvious one.
  highlightFeatures?: readonly string[];
  benefits: readonly string[];
  targetBusiness: string;
  // Real device screenshots, shown cycling inside the phone/laptop mockups
  // instead of the abstract placeholder screen. Ordered display sequence.
  screenshots?: readonly string[];
  screenshotsDesktop?: readonly string[];
  screenshotsTablet?: readonly string[];
  logo?: string;
  // Real client locations — update the count as new clients sign on.
  storeLocations?: readonly { city: string; stores: number }[];
  // Live demo access exists for this project — the actual admin dashboard
  // URL, APK link, and credentials live in Convex (convex/demoAccess.ts),
  // keyed by slug, and are only served to signed-in visitors. Not stored
  // here since anything in this file ships in the client bundle regardless
  // of sign-in state.
  hasDemoAccess?: boolean;
  // Tints the circle-wipe page-transition (project-transition.tsx) when
  // navigating into this project, to match its brand color. Falls back to
  // the site's own primary (sage) when unset.
  accentColor?: string;
  // Subscription pricing — prices are real, everything else (user counts,
  // per-plan feature tiering) is DUMMY placeholder data. Swap for the real
  // tier breakdown and subscriber numbers once they exist.
  pricingPlans?: readonly {
    name: string;
    price: string | null; // null = "Contact us" tier, no listed price
    priceNote?: string;
    users: string;
    features: readonly string[];
  }[];
}

export const PROJECTS: readonly Project[] = [
  {
    slug: "pospro",
    name: "POSPro",
    logo: "/projects/products/propos/logo.webp",
    category: "personal",
    tagline: "Monitor sales and inventory live — even offline, even away from the store.",
    description: "Sales, inventory, and reports stay in sync across every terminal — even without internet. Check in on your store anytime, from anywhere.",
    longDescription:
      "POSPro keeps your register and stockroom connected in real time — sales, stock counts, receipts, and reports stay accurate across every terminal, whether you're on the floor, at home, or the internet drops. Check in anytime, from anywhere, and always know exactly where your store stands.",
    status: "Live",
    timeline: "Built for store owners",
    features: [
      "Real-time sales tracking across every terminal",
      "Inventory that updates itself as stock moves",
      "Cashier accounts, PIN unlock, and shift history",
      "Bluetooth printer support for instant receipts",
      "Custom receipt layout, footer, and branding",
      "Voice search to find and add products hands-free",
      "Barcode and QR code scanning and generation",
      "Reports and margins, always up to date",
      "Purchase orders and supplier payment terms",
      "Customer accounts with delivery tracking",
      "Expense logging and true net profit, not just gross",
      "Runs the floor even when the internet doesn't",
    ],
    highlightFeatures: [
      "Real-time sales tracking across every terminal",
      "Barcode and QR code scanning and generation",
      "Runs the floor even when the internet doesn't",
    ],
    benefits: [
      "One system for every terminal — no more comparing registers at closing",
      "Stock numbers you can trust, no manual recounts",
      "Keeps selling through spotty internet, syncs once back online",
      "See true net profit, not just what came through the register",
    ],
    targetBusiness:
      "Retail store owners running one or more registers who need real inventory and sales numbers, not a guess at closing time.",
    screenshots: [
      "/projects/products/propos/mobile/Screenshot_1787557053.webp",
      "/projects/products/propos/mobile/Screenshot_1787557068.webp",
      "/projects/products/propos/mobile/Screenshot_1787557072.webp",
      "/projects/products/propos/mobile/Screenshot_1787557077.webp",
      "/projects/products/propos/mobile/Screenshot_1787557256.webp",
      "/projects/products/propos/mobile/Screenshot_1787557266.webp",
      "/projects/products/propos/mobile/Screenshot_1787557268.webp",
      "/projects/products/propos/mobile/Screenshot_1787557272.webp",
      "/projects/products/propos/mobile/Screenshot_1787557304.webp",
      "/projects/products/propos/mobile/Screenshot_1787557366.webp",
    ],
    screenshotsDesktop: [
      "/projects/products/propos/laptop/pospro-laptop-01.webp",
      "/projects/products/propos/laptop/pospro-laptop-02.webp",
      "/projects/products/propos/laptop/pospro-laptop-03.webp",
      "/projects/products/propos/laptop/pospro-laptop-04.webp",
      "/projects/products/propos/laptop/pospro-laptop-05.webp",
    ],
    screenshotsTablet: [
      "/projects/products/propos/tablet/Screenshot_1787559173.webp",
      "/projects/products/propos/tablet/Screenshot_1787559196.webp",
      "/projects/products/propos/tablet/Screenshot_1787559239.webp",
      "/projects/products/propos/tablet/Screenshot_1787559253.webp",
      "/projects/products/propos/tablet/Screenshot_1787559263.webp",
      "/projects/products/propos/tablet/Screenshot_1787559268.webp",
      "/projects/products/propos/tablet/Screenshot_1787559275.webp",
    ],
    storeLocations: [{ city: "Calbayog City", stores: 2 }],
    hasDemoAccess: true,
    pricingPlans: [
      {
        name: "Starter",
        price: "₱500",
        priceNote: "/month",
        users: "120+ stores",
        features: [
          "1 register terminal",
          "Real-time sales tracking",
          "Basic inventory management",
          "Bluetooth receipt printing",
          "Email support",
        ],
      },
      {
        name: "Business",
        price: "₱1,000",
        priceNote: "/month",
        users: "45+ stores",
        features: [
          "Up to 5 register terminals",
          "Everything in Starter",
          "Barcode & QR scanning and generation",
          "Purchase orders and supplier payments",
          "Voice search",
          "Priority chat support",
        ],
      },
      {
        name: "Enterprise",
        price: null,
        priceNote: "Custom pricing",
        users: "12+ stores",
        features: [
          "Unlimited terminals",
          "Everything in Business",
          "Multi-location reporting",
          "Custom receipt branding",
          "Dedicated account manager",
        ],
      },
    ],
  },
  {
    slug: "careconnect",
    name: "CareConnect",
    logo: "/projects/clients/careconnect/logo.webp",
    category: "client",
    accentColor: "#2563eb",
    tagline: "The people they love most, cared for close to home.",
    description:
      "A caregiving website giving families three clear reasons to trust CareConnect with the people they love most.",
    longDescription:
      "CareConnect specializes in care and daily living assistance for an array of individuals — feeling better happens in the comfort of your own home, not a facility. The site is built around three things that earn a family's trust before they ever pick up the phone: caregivers you can trust, an individualized care plan instead of a one-size-fits-all package, and real companionship, not just task completion. We take the time to get to know each family and build a plan around their specific needs, then back it with one-on-one attention that can't be matched in other settings.",
    status: "Live",
    timeline: "Built for a home care agency",
    features: [
      "Daily or weekly assistance for aging, illness, recovery, or rehabilitation",
      "Individualized care plans, not one-size-fits-all",
      "Meal preparation",
      "Hygiene assistance",
      "Home cleaning",
      "Supervision and daily check-ins",
      "One-on-one companionship with the same caregivers",
      "Experienced home health aides",
    ],
    highlightFeatures: ["One-on-one companionship with the same caregivers"],
    benefits: [
      "Care and daily living assistance in the comfort of your own home, not a facility",
      "Individualized care plans built around what each person actually needs, not a fixed package",
      "Daily support covering meal preparation, hygiene, cleaning, and supervision",
      "We take the time to get to know each family before building their care plan",
      "One-on-one companionship — the same caregivers, not rotating facility staff",
      "Attention and care that can't compare in other settings",
    ],
    targetBusiness: "Home care and caregiving agencies who want families to trust them before the first call.",
    screenshots: [
      "/projects/clients/careconnect/mobile/careconnect-mobile-01.webp",
      "/projects/clients/careconnect/mobile/careconnect-mobile-02.webp",
      "/projects/clients/careconnect/mobile/careconnect-mobile-03.webp",
    ],
    screenshotsDesktop: [
      "/projects/clients/careconnect/desktop/careconnect-desktop-01.webp",
      "/projects/clients/careconnect/desktop/careconnect-desktop-02.webp",
    ],
    screenshotsTablet: [
      "/projects/clients/careconnect/tablet/careconnect-tablet-01.webp",
      "/projects/clients/careconnect/tablet/careconnect-tablet-02.webp",
      "/projects/clients/careconnect/tablet/careconnect-tablet-03.webp",
    ],
  },
  {
    slug: "pickleball-registration",
    name: "CCPC Registration",
    logo: "/projects/clients/pickleball-registration/logo.webp",
    category: "client",
    tagline: "Tournament registration, payment, and check-in in one place.",
    description:
      "A tournament registration system for the Calbayog City Pickleball Club — players sign up and pay online, organizers track everything from one dashboard.",
    longDescription:
      "Built for the Calbayog City Pickleball Club's (CCPC) tournaments, this system takes players through a 6-step registration — event, partner, division, and shirt size — then collects payment over GCash with proof-of-payment upload. Organizers get one dashboard to see registration counts by status and division, manage shirt orders, and filter, search, print, or export the full player list.",
    status: "Live",
    timeline: "Built for a pickleball tournament organizer",
    features: [
      "6-step guided player registration",
      "Doubles and mixed-doubles partner pairing",
      "Skill-division categories — Beginner-Novice through Intermediate High-Advance, plus age brackets",
      "GCash payment with proof-of-payment upload",
      "Optional site-wide and per-event access codes",
      "Registration status tracking — pending, payment verified, confirmed, rejected",
      "Tournament shirt size ordering and totals",
      "Filter, search, print, and export the full registration list",
    ],
    highlightFeatures: ["GCash payment with proof-of-payment upload"],
    benefits: [
      "Players register and pay without a spreadsheet or a manual sign-up sheet",
      "Organizers see registration and shirt-order counts at a glance instead of tallying by hand",
      "Every registration is filterable and searchable by event, division, status, or shirt size",
      "Access codes keep registration limited to the players who should see it",
    ],
    targetBusiness: "Tournament and league organizers who need online registration and payment without building it themselves.",
    screenshots: [
      "/projects/clients/pickleball-registration/mobile/pickleball-mobile-01.webp",
      "/projects/clients/pickleball-registration/mobile/pickleball-mobile-02.webp",
      "/projects/clients/pickleball-registration/mobile/pickleball-mobile-03.webp",
      "/projects/clients/pickleball-registration/mobile/pickleball-mobile-04.webp",
      "/projects/clients/pickleball-registration/mobile/pickleball-mobile-05.webp",
    ],
    screenshotsDesktop: [
      "/projects/clients/pickleball-registration/laptop/pickleball-laptop-01.webp",
      "/projects/clients/pickleball-registration/laptop/pickleball-laptop-02.webp",
      "/projects/clients/pickleball-registration/laptop/pickleball-laptop-03.webp",
    ],
    screenshotsTablet: [
      "/projects/clients/pickleball-registration/tablet/pickleball-tablet-01.webp",
      "/projects/clients/pickleball-registration/tablet/pickleball-tablet-02.webp",
    ],
  },
  {
    slug: "harbor-and-vine",
    name: "Harbor & Vine",
    category: "client",
    tagline: "A checkout that doesn't lose the sale.",
    description: "Grew online orders 22% after a full checkout rebuild.",
    longDescription:
      "The old checkout was slow and dropped mobile customers before payment. We rebuilt it on Shopify and Stripe as a one-page mobile-first flow.",
    stack: ["Next.js", "Shopify", "Stripe"],
    status: "Live",
    timeline: "5-week build",
    features: [
      "Rebuilt checkout flow on Shopify and Stripe",
      "One-page mobile checkout",
      "Abandoned cart recovery emails",
      "Real-time shipping rate calculation",
    ],
    benefits: ["+22% online orders after launch", "Lower cart abandonment", "Faster page loads on mobile"],
    targetBusiness: "Ecommerce brands losing sales at an outdated or slow checkout.",
  },
  {
    slug: "northline-logistics",
    name: "Northline Logistics",
    category: "client",
    tagline: "Invoices that match themselves.",
    description: "Automated invoice matching, saving the finance team six hours a week.",
    longDescription:
      "The finance team manually matched every invoice against its purchase order. We automated the matching and routed mismatches straight to Slack.",
    stack: ["n8n", "QuickBooks API", "Slack"],
    status: "Live",
    timeline: "3-week build",
    features: [
      "Automated invoice-to-PO matching",
      "Slack alerts on mismatches",
      "Direct QuickBooks sync",
      "Weekly reconciliation summary",
    ],
    benefits: [
      "Saves the finance team about six hours a week",
      "Fewer manual entry errors",
      "Mismatches caught same-day, not at month-end",
    ],
    targetBusiness: "Logistics or finance teams manually matching invoices against purchase orders.",
  },
  {
    slug: "kestrel-coworking",
    name: "Kestrel Coworking",
    category: "client",
    tagline: "Book a room, skip the front-desk email.",
    description: "Members book rooms and manage billing without emailing the front desk.",
    longDescription:
      "Members were emailing the front desk to book rooms and get billed. We're building a self-serve booking calendar with automated Stripe billing to replace that.",
    stack: ["React", "Stripe", "PostgreSQL"],
    status: "In build",
    timeline: "8-week build",
    features: [
      "Self-serve room booking calendar",
      "Automated member billing via Stripe",
      "Usage-based invoicing",
      "Member portal for booking history",
    ],
    benefits: [
      "Removes the front-desk booking bottleneck",
      "Predictable automated billing",
      "Members self-manage their own bookings",
    ],
    targetBusiness: "Coworking spaces still booking rooms and billing members by email.",
  },
  {
    slug: "ledgerline",
    name: "Ledgerline",
    category: "personal",
    tagline: "Invoicing automation, now a product.",
    description: "Started as our own invoicing automation, now a lightweight billing tool for small teams.",
    longDescription:
      "We built Ledgerline to solve our own invoicing pain point — chasing payments by hand — then turned it into a lightweight billing tool other small teams can use.",
    stack: ["Next.js", "Stripe", "PostgreSQL"],
    status: "Live",
    timeline: "Built in-house, 2023",
    features: [
      "Recurring and one-off invoicing",
      "Stripe-powered payment collection",
      "Client payment status dashboard",
      "Automated payment reminders",
    ],
    benefits: [
      "Started as our own invoicing pain point, now battle-tested",
      "Cuts time spent chasing payments",
      "One dashboard for every client invoice",
    ],
    targetBusiness: "Small teams and freelancers billing multiple clients who need to stop chasing payments by hand.",
  },
  {
    slug: "fieldnote",
    name: "Fieldnote",
    category: "personal",
    tagline: "Every call note and Slack thread, one search bar.",
    description: "Turns scattered call notes and Slack threads into one searchable project log.",
    longDescription:
      "Project history was scattered across calls, Slack threads, and memory. Fieldnote pulls it into one searchable log so nobody has to dig for context.",
    stack: ["Next.js", "tRPC", "PostgreSQL"],
    status: "In build",
    timeline: "Built in-house, 2025",
    features: [
      "Central searchable project log",
      "Ingests notes from calls and Slack threads",
      "Tagging by client or project",
      "Full-text search across everything",
    ],
    benefits: [
      "No more digging through Slack history",
      "One place new team members can catch up from",
      "Fewer repeated questions on project status",
    ],
    targetBusiness: "Small teams whose project history is scattered across calls, Slack, and someone's memory.",
  },
] as const;

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}
