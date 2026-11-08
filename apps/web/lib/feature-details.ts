import {
  Activity,
  ArrowLeftRight,
  BadgePercent,
  Bike,
  BookOpen,
  Building2,
  Calculator,
  Camera,
  CheckCircle2,
  Clock,
  Coffee,
  Coins,
  Contact,
  Droplets,
  EyeOff,
  FileSpreadsheet,
  Gauge,
  Gift,
  Hammer,
  HandCoins,
  History,
  ImageUp,
  KeyRound,
  LayoutGrid,
  ListChecks,
  Lock,
  Mic,
  Pencil,
  PiggyBank,
  Pill,
  Printer,
  Receipt,
  Rocket,
  Ruler,
  ScanBarcode,
  Shapes,
  Shirt,
  ShoppingBasket,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  Store,
  Tag,
  TrendingDown,
  Truck,
  UtensilsCrossed,
  Users,
  WifiOff,
  Wrench,
  type LucideIcon,
} from "lucide-react";

// Extra detail for each card in the "Everything you need, already built in"
// section: a small floating icon, plus a real-life problem and how the
// product solves it (shown when the visitor taps "See how it helps").
// Keyed by the feature item's exact title in lib/projects.ts. Written in
// plain words so anyone — young or old — can follow along.
export type FeatureDetail = {
  icon: LucideIcon;
  problem: string;
  answer: string;
};

export const FEATURE_DETAILS: Record<string, Record<string, FeatureDetail>> = {
  pospro: {
    // All your businesses
    "All your businesses in one place": {
      icon: Building2,
      problem:
        "Aling Nena owns a hardware store and a water station. She uses two notebooks and two apps, and she never knows how much she earned in total.",
      answer:
        "With POSPro One, both stores live in one account. One tap switches between them, and she can see everything added together in seconds.",
    },
    "Every branch, side by side": {
      icon: LayoutGrid,
      problem:
        "You have three branches. To know which one sells the most, you have to call each branch and wait for them to count.",
      answer:
        "Open POSPro One and see each branch on its own — or all of them together. No calls, no waiting.",
    },
    "Each business keeps its own rules": {
      icon: SlidersHorizontal,
      problem:
        "Your carinderia gives a free drink with every meal, but your hardware store doesn't. One system usually forces the same rules on both.",
      answer:
        "Each business gets its own discounts, tax, receipts, and rewards. What happens in one store stays in that store.",
    },
    "Move stock between branches": {
      icon: Truck,
      problem:
        "Branch A has too much rice, Branch B has none. You move a few sacks, but nobody writes it down — and now both counts are wrong.",
      answer:
        "Send the items in POSPro One. When Branch B says they arrived, both stock counts update by themselves.",
    },
    "Different prices per branch": {
      icon: Tag,
      problem:
        "Your mall branch pays higher rent, so you want prices a little higher there. Changing every item by hand would take all day.",
      answer:
        "Add a small increase for just that branch. Your main price list stays the same everywhere else.",
    },
    "Check your shop from anywhere": {
      icon: Smartphone,
      problem: "You're on vacation, or stuck in traffic, and you wonder: is my store selling today?",
      answer: "Open POSPro One on your phone. Today's sales and stock are right there, wherever you are.",
    },

    // Selling
    "Still works with no internet": {
      icon: WifiOff,
      problem:
        "The internet goes down during your busiest hour. Customers are lining up, and your system stops working.",
      answer:
        "POSPro One keeps selling with no internet. Every sale is kept safe and sent the moment you're back online. Nothing is lost.",
    },
    "See sales from every register": {
      icon: Activity,
      problem: "You have three cashiers. You only find out how the day went after closing, when everyone counts.",
      answer: "Watch every sale from every register as it happens — live, on one screen.",
    },
    "Easy price changes at the counter": {
      icon: Pencil,
      problem:
        "A regular customer asks for a small discount. You give it, but later you can't remember who got what or why.",
      answer:
        "Change the price right at the counter. POSPro One saves every change, so you can check it anytime.",
    },
    "Senior and PWD discounts built in": {
      icon: BadgePercent,
      problem:
        "A senior citizen is buying. Your cashier grabs a calculator to figure out the 20% discount and VAT — and the line keeps growing.",
      answer: "One tap. POSPro One works out the right discount and VAT for you. No math, no mistakes.",
    },
    "Sizes, flavors, and add-ons": {
      icon: Coffee,
      problem:
        "A customer wants a large milk tea with extra pearls. You'd need a separate product for every mix — that's hundreds of items.",
      answer: "Add one product, then pick the size and extras when you sell. Simple and neat.",
    },
    "Print receipts right away": {
      icon: Printer,
      problem: "A customer asks for a receipt, but the internet is down and the system can't print.",
      answer: "POSPro One prints receipts the moment the sale is done — with or without internet.",
    },
    "Your shop's name on every receipt": {
      icon: Receipt,
      problem: "Your receipts look plain, like they came from any store. Customers forget where they bought from.",
      answer:
        "Put your logo, address, and a thank-you note on every receipt. Customers remember you and come back.",
    },
    "Scan barcodes and QR codes": {
      icon: ScanBarcode,
      problem: "Typing every item by hand is slow, and one wrong number means the wrong price.",
      answer:
        "Just scan it. The item is added in a blink. You can even print your own barcode labels for your shelves.",
    },
    "Find products by talking": {
      icon: Mic,
      problem: "You have thousands of items and can't remember the exact name to search for.",
      answer: "Just say it out loud — like \"two sardines\" — and POSPro One adds it to the sale for you.",
    },
    "Know who has paid and who hasn't": {
      icon: HandCoins,
      problem:
        "Customers say \"Pa-utang muna.\" The list is in a notebook, and you can't remember who still owes you.",
      answer:
        "Cash, GCash, card, or pay later — POSPro One keeps track. You always know who still owes you, and how much.",
    },

    // Stock
    "Stock counts update themselves": {
      icon: CheckCircle2,
      problem: "Every week you count your shelves by hand, and the numbers still don't match.",
      answer: "Every sale, delivery, and correction changes your count for you. Your numbers stay right, every day.",
    },
    "Know what's running low": {
      icon: TrendingDown,
      problem: "A customer asks for your best seller, and it's gone. You didn't notice it was running out.",
      answer: "POSPro One shows what's running low so you can order again before it runs out.",
    },
    "Order from your suppliers": {
      icon: ListChecks,
      problem: "You forgot what you ordered, what arrived, and when you have to pay the supplier.",
      answer: "Every order is listed — what you asked for, what came in, what you owe, and when it's due.",
    },
    "Every stock change is written down": {
      icon: History,
      problem: "Five boxes are missing, and nobody knows what happened.",
      answer: "POSPro One records every change: what, who, and when. Nothing goes missing without a trace.",
    },
    "Start with a ready-made product list": {
      icon: Rocket,
      problem: "You're opening a sari-sari store, but typing 500 items into a new system feels impossible.",
      answer: "Pick from ready-made lists of common items. Your shop is set up in minutes, not weeks.",
    },

    // Money & reports
    "See your true take-home profit": {
      icon: PiggyBank,
      problem:
        "Sales look great, but at the end of the month, there's almost nothing left. Where did the money go?",
      answer:
        "Add your rent, wages, and bills. POSPro One shows what you really keep — your true profit, not just sales.",
    },
    "See your real profit on every sale": {
      icon: Coins,
      problem: "Your supplier raised prices, and now your old reports show the wrong profit.",
      answer: "The cost is saved the moment you sell, so your old reports always stay correct.",
    },
    "Money in and money out": {
      icon: ArrowLeftRight,
      problem: "Money comes in from sales and goes out for bills. It's hard to see it all in one place.",
      answer: "One simple list shows every peso that came in and went out of your business.",
    },
    "VAT done for you": {
      icon: Calculator,
      problem: "Computing VAT by hand is confusing and easy to get wrong.",
      answer: "POSPro One works out VAT on every sale and gives you a ready-made report.",
    },
    "Download your reports": {
      icon: FileSpreadsheet,
      problem: "Your accountant asks for your sales and stock records. You have to copy them by hand.",
      answer: "Download your reports as a spreadsheet in one click, and send them right away.",
    },

    // Customers & staff
    "Remember your regular customers": {
      icon: Contact,
      problem: "Your loyal customer orders every week, and you have to ask for their address again every time.",
      answer: "Save their name, address, and phone once. Checkout is faster every time after that.",
    },
    "Reward loyal customers": {
      icon: Gift,
      problem: "Customers buy from you, then try the new store down the street.",
      answer: "They earn points every time they buy and use them for discounts. They keep coming back to you.",
    },
    "Keep track of deliveries": {
      icon: Bike,
      problem: "Orders pile up, and you're not sure which ones were delivered or who took them.",
      answer: "See which orders still need to go out, and who is delivering each one.",
    },
    "Staff clock in from their phone": {
      icon: Clock,
      problem: "Staff write their own time on a paper log. Some come in late but write \"8:00\".",
      answer:
        "Staff clock in with a PIN on their phone, and POSPro One can check they're really at the shop. Fair for everyone.",
    },
    "Cashiers unlock with a PIN": {
      icon: KeyRound,
      problem: "The cash drawer is short, but three people used the same register. Who made the mistake?",
      answer: "Each cashier has their own PIN, so every sale shows exactly who made it.",
    },

    // Made for your business
    "Water refilling stations": {
      icon: Droplets,
      problem: "Gallons go missing, deliveries are messy, and you forget when the water test is due.",
      answer:
        "Track borrowed gallons and deposits, plan delivery routes, and get reminded before water tests are due.",
    },
    "Windows, doors, and cabinets": {
      icon: Ruler,
      problem: "Making a quote from measurements takes forever, and leftover materials get thrown away.",
      answer: "Turn measurements into a price quote fast, take deposits, plan your cuts, and save usable leftovers.",
    },
    "Restaurants, carinderias, and silogan": {
      icon: UtensilsCrossed,
      problem: "The lunch rush hits. Which tables are taken? Who ordered extra rice?",
      answer: "See your tables at a glance, and add extra rice or egg with one tap.",
    },
    "Coffee and milk tea shops": {
      icon: Coffee,
      problem: "Small, medium, large, plus pearls, plus an extra shot — the mix gets confusing fast.",
      answer: "Pick the size and add-ons in a tap. The right price is worked out for you.",
    },
    "Sari-sari stores": {
      icon: Store,
      problem: "You run the store alone. The utang list is in a notebook, and you only notice empty shelves too late.",
      answer: "Sell fast, see what needs restocking, and keep a clear list of who owes you.",
    },
    "Clothing shops and boutiques": {
      icon: Shirt,
      problem: "One shirt comes in five sizes and four colors. Keeping track by hand is a headache.",
      answer: "Sell one item in every size and color, and print barcode price tags for each one.",
    },
    "Ukay-ukay": {
      icon: Shapes,
      problem: "Every piece is one of a kind. You can't add each one to a system before selling it.",
      answer: "Type in the price right at the counter. You still see your total sales for the day.",
    },
    "Pharmacies and drugstores": {
      icon: Pill,
      problem: "Medicine names are hard to spell, and senior and PWD discounts slow down the line.",
      answer: "Scan the box or search by name. Discounts are worked out for you automatically.",
    },
    "Hardware and construction supplies": {
      icon: Hammer,
      problem: "Thousands of items, some sold by the piece, some by the meter, some by the box.",
      answer: "Sell any way you need — piece, meter, or box — and keep your supplier orders in order.",
    },
    "Motorcycle parts and repair shops": {
      icon: Wrench,
      problem: "The customer says \"that small thing near the chain.\" You need the part fast, plus a repair fee.",
      answer: "Find parts even without the exact name, and add labor fees that don't touch your stock.",
    },
    "Grocery stores and mini marts": {
      icon: ShoppingBasket,
      problem: "Many counters, long lines, and no idea how the whole store is doing until closing.",
      answer: "Scan barcodes at every counter and watch all sales add up in one place, live.",
    },
    "School and office supplies": {
      icon: BookOpen,
      problem: "Back-to-school rush is next week, and you haven't added your items yet.",
      answer: "Start with a ready-made list of common supplies. You're ready before the rush.",
    },
    "And many more": {
      icon: Sparkles,
      problem: "Your business is different. Will a store system even fit you?",
      answer: "Bakeries, gift shops, pet supplies, farm supplies — if you sell it, POSPro One can keep track of it.",
    },

    // AI-powered
    "Turn a photo into a product list": {
      icon: Camera,
      problem: "You have a whole shelf of products and dread typing every single name.",
      answer: "Take a photo. POSPro One reads the names for you, ready to add to your shop.",
    },
    "Set up your shop faster": {
      icon: Rocket,
      problem: "Your products are written in notebooks and invoices. Typing them in could take days.",
      answer: "Let AI do the boring part, so you can start selling sooner.",
    },
    "You approve everything AI adds": {
      icon: CheckCircle2,
      problem: "What if the AI gets something wrong and messes up your list?",
      answer: "Nothing is added until you check it and say yes. You're always the boss.",
    },
    "AI help fits your plan": {
      icon: Gauge,
      problem: "AI sounds expensive. Will you pay for something you barely use?",
      answer: "A basic amount of AI help is free. Bigger shops can add more only if they need it.",
    },

    // Security
    "Extra login check for safety": {
      icon: Lock,
      problem: "Someone found out your password. Now they can get into your shop's records.",
      answer:
        "POSPro One asks for a second code from your phone. Even with your password, no one else can get in.",
    },
    "Cashiers need a PIN to sell": {
      icon: KeyRound,
      problem: "The owner's password is written on a sticky note at the counter. Anyone can use it.",
      answer: "Each cashier signs in with their own PIN. No shared passwords, no guessing.",
    },
    "Staff only see what they need": {
      icon: EyeOff,
      problem: "You don't want cashiers seeing your profits or changing prices.",
      answer: "Owners, managers, and cashiers each see only what's meant for them.",
    },
    "Your shop's data stays private": {
      icon: Users,
      problem: "Can other stores using the same system see your sales?",
      answer: "Never. Your shop's information is kept separate. Only you and your team can see it.",
    },
    "Safe photo uploads": {
      icon: ImageUp,
      problem: "Could a bad file sneak into your system through a product photo?",
      answer: "Every picture is checked and cleaned before it's saved, so nothing harmful gets in.",
    },
  },
};
