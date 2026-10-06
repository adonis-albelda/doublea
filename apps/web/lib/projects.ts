// Single source of truth for both the "What we've built" grid
// (components/products.tsx) and each project's detail page
// (app/products/[slug]/page.tsx).
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
  // How many kinds of business this project is set up for — shown as its
  // own tile in the detail page's stats strip when set.
  businessTypesSupported?: number;
  // Richer, grouped feature list (title + description per item, grouped
  // under categories like "Core"/"AI-powered"/"Security"). When set, the
  // detail page renders this instead of the flat `features` list — `features`
  // stays populated too (flattened) for type-compat and as a fallback.
  featureCategories?: readonly {
    category: string;
    description: string;
    // Every highlight, plus any item with a `screenshot` (path under /public),
    // appears in the detail page's device showcase, in a phone (default) or
    // laptop frame per `device`.
    items: readonly {
      title: string;
      description: string;
      highlight?: boolean;
      screenshot?: string;
      device?: "phone" | "laptop";
    }[];
  }[];
  // Concrete "ask in plain language" examples for AI-powered features — each
  // shown as its own mini chat mock (what the user does -> what the system
  // gives back). Rendered as a carousel when there's more than one.
  aiSpotlight?: readonly {
    eyebrow: string;
    title: string;
    description: string;
    example: { query: string; response: readonly string[] };
    note?: string;
  }[];
}

export const PROJECTS: readonly Project[] = [
  {
    slug: "pospro",
    name: "POSPro One",
    logo: "/projects/products/propos/logo.webp",
    category: "personal",
    tagline:
      "One system for all your businesses — sell, track your stock, and see your real profit, even without internet.",
    description:
      "Run your stores, branches, and different kinds of businesses from one account. Sales, stock, and reports stay up to date on every register — even without internet.",
    longDescription:
      "POSPro One puts all your businesses in one place. A hardware store, a water station, and a carinderia can all run on the same account, each with its own branches, prices, and rules. Your registers and stockrooms stay connected — sales, stock counts, receipts, and reports stay correct, whether you're at the counter, at home, or the internet is down.",
    status: "Live",
    timeline: "Built for store owners",
    features: [
      "All your businesses in one place",
      "Every branch, side by side",
      "Each business keeps its own rules",
      "Move stock between branches",
      "Different prices per branch",
      "Check your shop from anywhere",
      "Still works with no internet",
      "See sales from every register",
      "Easy price changes at the counter",
      "Senior and PWD discounts built in",
      "Sizes, flavors, and add-ons",
      "Print receipts right away",
      "Your shop's name on every receipt",
      "Scan barcodes and QR codes",
      "Find products by talking",
      "Know who has paid and who hasn't",
      "Stock counts update themselves",
      "Know what's running low",
      "Order from your suppliers",
      "Every stock change is written down",
      "Start with a ready-made product list",
      "See your true take-home profit",
      "See your real profit on every sale",
      "Money in and money out",
      "VAT done for you",
      "Download your reports",
      "Remember your regular customers",
      "Reward loyal customers",
      "Keep track of deliveries",
      "Staff clock in from their phone",
      "Cashiers unlock with a PIN",
      "Water refilling stations",
      "Windows, doors, and cabinets",
      "Restaurants and carinderias",
      "Turn a photo into a product list",
      "Set up your shop faster",
      "You approve everything AI adds",
      "AI help fits your plan",
      "Extra login check for safety",
      "Cashiers need a PIN to sell",
      "Staff only see what they need",
      "Your shop's data stays private",
      "Safe photo uploads",
    ],
    highlightFeatures: [
      "All your businesses in one place",
      "Still works with no internet",
      "See your true take-home profit",
      "Staff clock in from their phone",
      "Water refilling stations",
      "Windows, doors, and cabinets",
      "Turn a photo into a product list",
      "Extra login check for safety",
    ],
    businessTypesSupported: 8,
    featureCategories: [
      {
        category: "All your businesses",
        description:
          "One account for everything you own — every business, every branch, every register. No more jumping between different systems.",
        items: [
          {
            title: "All your businesses in one place",
            description:
              "Run your hardware store, water station, and carinderia from one account. Switch between them with one tap.",
            highlight: true,
          },
          {
            title: "Every branch, side by side",
            description: "Look at one branch at a time, or see all your branches added together.",
          },
          {
            title: "Each business keeps its own rules",
            description:
              "Discounts, tax, receipts, and customer rewards can be set up differently for each business.",
          },
          {
            title: "Move stock between branches",
            description:
              "Send items from one branch or warehouse to another. Both sides update once the items arrive.",
          },
          {
            title: "Different prices per branch",
            description: "Add a small price increase for one branch without changing your main price list.",
          },
          {
            title: "Check your shop from anywhere",
            description: "See your sales and stock from your phone or computer, even when you're not at the store.",
          },
        ],
      },
      {
        category: "Selling",
        description: "Everything your cashier needs at the counter — fast, simple, and it never stops working.",
        items: [
          {
            title: "Still works with no internet",
            description:
              "Keep selling even when the internet is down. Your sales are kept safe and sent once you're back online.",
            highlight: true,
            screenshot: "/projects/products/propos/mobile/Screenshot_1787557268.webp",
            device: "phone",
          },
          {
            title: "See sales from every register",
            description: "Watch sales come in from all your registers at once, as they happen.",
          },
          {
            title: "Easy price changes at the counter",
            description:
              "Give a customer a lower price when you need to. Every change is saved so you can check it later.",
          },
          {
            title: "Senior and PWD discounts built in",
            description: "The right discount and VAT are worked out for you — no need to compute by hand.",
          },
          {
            title: "Sizes, flavors, and add-ons",
            description: "Sell one product in different sizes or with extras — like large or small, or with an extra egg.",
          },
          {
            title: "Print receipts right away",
            description: "Print a receipt the moment a sale is done, with or without internet.",
          },
          {
            title: "Your shop's name on every receipt",
            description: "Add your logo, address, and a thank-you message so every receipt looks like it came from you.",
          },
          {
            title: "Scan barcodes and QR codes",
            description: "Scan an item to ring it up fast, or print your own labels for your shelves.",
            screenshot: "/projects/products/propos/laptop/pospro-laptop-05.webp",
            device: "laptop",
          },
          {
            title: "Find products by talking",
            description: "Say what you're looking for out loud and it gets added to the sale — no typing needed.",
            screenshot: "/projects/products/propos/mobile/Screenshot_1787557304.webp",
            device: "phone",
          },
          {
            title: "Know who has paid and who hasn't",
            description: "Cash, GCash, card, or pay later — you always know which customers still owe you.",
          },
        ],
      },
      {
        category: "Stock",
        description: "Always know what you have on your shelves, without counting by hand.",
        items: [
          {
            title: "Stock counts update themselves",
            description: "Every sale, delivery, or correction changes your stock count for you.",
          },
          {
            title: "Know what's running low",
            description: "See which items you need to order again before they run out.",
            screenshot: "/projects/products/propos/laptop/pospro-laptop-03.webp",
            device: "laptop",
          },
          {
            title: "Order from your suppliers",
            description: "Keep track of your orders, what has arrived, what you still owe, and when it's due.",
            screenshot: "/projects/products/propos/laptop/pospro-laptop-04.webp",
            device: "laptop",
          },
          {
            title: "Every stock change is written down",
            description: "See what changed, who changed it, and when — so nothing goes missing without a trace.",
          },
          {
            title: "Start with a ready-made product list",
            description:
              "Pick from common items for sari-sari stores, hardware stores, school supplies, and more — no need to type them all in.",
          },
        ],
      },
      {
        category: "Money & reports",
        description: "Clear numbers that tell you how your business is really doing.",
        items: [
          {
            title: "See your true take-home profit",
            description:
              "Write down your rent, wages, and bills, and see what you actually keep — not just what came in.",
            highlight: true,
            screenshot: "/projects/products/propos/laptop/pospro-laptop-02.webp",
            device: "laptop",
          },
          {
            title: "See your real profit on every sale",
            description:
              "The cost of each item is saved at the moment you sell it, so your old reports never change on you.",
          },
          {
            title: "Money in and money out",
            description: "See all the money that came into and went out of your business, in one list.",
          },
          {
            title: "VAT done for you",
            description: "VAT is worked out on every sale and shown on a ready-made report.",
          },
          {
            title: "Download your reports",
            description: "Save your sales and stock reports as a spreadsheet you can open on your computer.",
          },
        ],
      },
      {
        category: "Customers & staff",
        description: "Take care of the people who buy from you and the people who work for you.",
        items: [
          {
            title: "Remember your regular customers",
            description: "Save their names, addresses, and phone numbers so checkout is faster next time.",
          },
          {
            title: "Reward loyal customers",
            description: "Customers earn points every time they buy, and can use them for discounts.",
          },
          {
            title: "Keep track of deliveries",
            description: "See which orders still need to go out, and who is delivering them.",
          },
          {
            title: "Staff clock in from their phone",
            description:
              "A simple attendance page where staff clock in with a PIN — and it can check that they're really at the shop.",
            highlight: true,
          },
          {
            title: "Cashiers unlock with a PIN",
            description: "Each cashier has their own PIN, so you always know who made each sale.",
            screenshot: "/projects/products/propos/mobile/Screenshot_1787557077.webp",
            device: "phone",
          },
        ],
      },
      {
        category: "Made for your business",
        description:
          "Some businesses need special tools. Turn them on for the business that needs them — the rest stay simple.",
        items: [
          {
            title: "Water refilling stations",
            description:
              "Keep track of borrowed containers and deposits, plan regular deliveries by route, and get reminded when water tests are due.",
            highlight: true,
          },
          {
            title: "Windows, doors, and cabinets",
            description:
              "Make price quotes from measurements, take deposits, plan your cuts, and keep usable leftover pieces.",
            highlight: true,
          },
          {
            title: "Restaurants and carinderias",
            description: "Set up your tables and see which ones are taken at a glance.",
          },
        ],
      },
      {
        category: "AI-powered",
        description:
          "A helping hand that saves you time — instead of typing in every product by hand, let it do the boring work for you.",
        items: [
          {
            title: "Turn a photo into a product list",
            description: "Take a photo of your products and it reads the names for you, ready to add to your shop.",
            highlight: true,
          },
          {
            title: "Set up your shop faster",
            description: "Skip typing in hundreds of products one by one from your notebook or invoices.",
          },
          {
            title: "You approve everything AI adds",
            description: "Nothing gets added until you check it and say yes — you're always in control.",
          },
          {
            title: "AI help fits your plan",
            description: "A basic amount of AI help is free. Bigger shops can add more if they need it.",
          },
        ],
      },
      {
        category: "Security",
        description:
          "Keeps your shop's information safe, and makes sure only the right people can see or change it.",
        items: [
          {
            title: "Extra login check for safety",
            description: "A second check on top of your password, using an app on your phone, so no one else can get in even if they know your password.",
            highlight: true,
          },
          {
            title: "Cashiers need a PIN to sell",
            description: "No shared passwords on the counter — each cashier signs in with their own PIN.",
            screenshot: "/projects/products/propos/mobile/Screenshot_1787557072.webp",
            device: "phone",
          },
          {
            title: "Staff only see what they need",
            description: "Owners, managers, and cashiers each see only the parts of the system that are meant for them.",
          },
          {
            title: "Your shop's data stays private",
            description: "Your shop's information is kept separate from every other shop using POSPro One. No one else can see it.",
          },
          {
            title: "Safe photo uploads",
            description: "Every picture you upload is checked and cleaned before it's saved, so nothing harmful gets in.",
          },
        ],
      },
    ],
    aiSpotlight: [
      {
        eyebrow: "AI-Powered POS",
        title: "Just describe what you need — no need to know the exact product name",
        description:
          "Your customers won't always know the exact product name. Just type or say what they're looking for in plain words, and POSPro One finds the closest matches for you.",
        example: {
          query: "Do you have paint for metal?",
          response: [
            "Rust-Oleum Metal Primer",
            "Enamel Spray Paint — Metal & Wood",
            "Anti-Rust Coating 1L",
          ],
        },
      },
      {
        eyebrow: "AI-Powered POS",
        title: "Snap a photo of the supplier invoice, skip the manual typing",
        description:
          "When a new delivery comes in, take a photo of the supplier's invoice instead of typing every item by hand. AI reads it and pulls out the items and quantities for you to restock.",
        example: {
          query: "📷 Photo uploaded: supplier invoice",
          response: [
            "12x Rust-Oleum Metal Primer",
            "6x Enamel Spray Paint — Metal & Wood",
            "20x Anti-Rust Coating 1L",
          ],
        },
        note: "Nothing updates your stock until you check it over and approve it.",
      },
      {
        eyebrow: "AI-Powered POS",
        title: "Import your product list, AI cleans up the messy parts",
        description:
          "Onboarding products from a spreadsheet? Upload your CSV file and AI fixes entries that don't match the format — wrong columns, missing units, inconsistent names — so you don't have to clean it up by hand.",
        example: {
          query: "📄 CSV uploaded: 214 products",
          response: [
            "\"red shirt,m\" → Red Shirt — Size M",
            "\"12pcs\" → Quantity: 12",
            "\"150\" → Price: ₱150.00",
          ],
        },
        note: "You can review every fix before it's saved.",
      },
    ],
    benefits: [
      "One system for every business, branch, and register — no more comparing numbers by hand at closing",
      "Stock counts you can trust, no need to recount by hand",
      "Keeps selling even when the internet is spotty, catches up once it's back",
      "See your real take-home profit, not just what came in at the register",
    ],
    targetBusiness:
      "Owners with one or more stores, branches, or kinds of business who want to see everything in one place — real stock, real sales, and real profit, not a guess at closing time.",
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
        priceNote: "every month",
        users: "120+ stores use this",
        features: [
          "1 terminal account",
          "1 admin account",
          "1 store branch",
          "No AI features",
          "See your sales as they happen",
          "See what's in your stock",
          "Print receipts with a Bluetooth printer",
          "Help by email",
        ],
      },
      {
        name: "Business",
        price: "₱1,000",
        priceNote: "every month",
        users: "45+ stores use this",
        features: [
          "As many terminal accounts as you need",
          "3 admin accounts",
          "2 store branches",
          "Everything in Starter",
          "Scan and print barcodes",
          "Keep track of orders to your suppliers",
          "Find products by talking to it (limited uses, resets every week)",
          "Faster help through chat",
        ],
      },
      {
        name: "Enterprise",
        price: null,
        priceNote: "Talk to us about the price",
        users: "12+ stores use this",
        features: [
          "As many terminal accounts as you need",
          "Everything in Business",
          "See reports for all your store locations",
          "Your shop's name and logo on every receipt",
          "A real person to help you, anytime",
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
] as const;

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}
