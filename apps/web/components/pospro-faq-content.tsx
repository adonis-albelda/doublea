import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/ui/components/ui/accordion";

// Full FAQ list supplied by the user, verbatim, grouped by category so a
// visitor can expand one category at a time instead of scrolling a huge
// flat list.
const FAQ_CATEGORIES = [
  {
    category: "General",
    items: [
      {
        question: "What is POSPro One?",
        answer:
          "POSPro One is a point-of-sale and business management system that helps businesses manage sales, inventory, products, customers, employees, expenses, cash flow, and other day-to-day operations.",
      },
      {
        question: "What types of businesses can use POSPro One?",
        answer:
          "POSPro One is designed for different types of businesses, including retail stores, hardware stores, groceries, restaurants, cafés, laundry shops, salons, automotive businesses, wholesalers, and other businesses that need POS and business management tools.",
      },
      {
        question: "Can POSPro One be used for small businesses?",
        answer: "Yes. POSPro One is designed to support small businesses and can also scale as your business grows.",
      },
      {
        question: "Can POSPro One support multiple branches or locations?",
        answer:
          "Yes. POSPro One can manage multiple business locations and organize sales, inventory, employees, and terminals by location.",
      },
      {
        question: "Can I use POSPro One on mobile?",
        answer:
          "Yes. POSPro One provides mobile functionality for supported business operations. Availability of specific features may depend on the version of the application.",
      },
      {
        question: "Can I use POSPro One on a computer?",
        answer: "Yes. POSPro One can be accessed through supported web and desktop environments.",
      },
    ],
  },
  {
    category: "Products & Inventory",
    items: [
      {
        question: "Can I create products with different variants?",
        answer: "Yes. POSPro One supports product variants such as different sizes, colors, models, or other options.",
      },
      {
        question: "Can I use POSPro One for products without variants?",
        answer: "Yes. Simple products can be sold without requiring the cashier to select a variant.",
      },
      {
        question: "Can I track inventory?",
        answer: "Yes. POSPro One can track inventory and stock movements based on your business configuration.",
      },
      {
        question: "Can I manage inventory by location?",
        answer: "Yes. Inventory can be managed according to your business locations.",
      },
      {
        question: "Can I transfer stock between branches?",
        answer: "Yes. POSPro One supports stock transfers between locations, including transfer and receiving workflows.",
      },
      {
        question: "Can I manage suppliers?",
        answer: "Yes. You can maintain supplier information and use suppliers when managing purchasing and inventory.",
      },
      {
        question: "Can I create purchase orders?",
        answer:
          "Yes. POSPro One supports purchase orders for ordering products from suppliers and receiving the ordered items into inventory.",
      },
      {
        question: "Does receiving a purchase order update inventory?",
        answer: "Yes. Inventory is updated when products are actually received according to the receiving workflow.",
      },
      {
        question: "Can I use POSPro One for hardware stores?",
        answer:
          "Yes. Hardware and construction supply stores are a good fit for POSPro One because they often need product variants, SKUs, inventory tracking, suppliers, purchase orders, and stock transfers.",
      },
    ],
  },
  {
    category: "Sales & POS",
    items: [
      {
        question: "Can I accept different payment methods?",
        answer:
          "Yes. POSPro One can support payment methods such as cash, cards, e-wallets, bank transfers, and other configured payment methods.",
      },
      {
        question: "What e-wallets can I accept?",
        answer:
          "Depending on your configuration and available integrations, POSPro One can support commonly used payment methods such as GCash, Maya, MariBank, GrabPay, and ShopeePay.",
      },
      {
        question: "Can a customer pay using multiple payment methods?",
        answer:
          "POSPro One can support split or multiple payment methods where enabled, allowing a transaction to be divided between methods such as cash and an e-wallet.",
      },
      {
        question: "Can I apply discounts?",
        answer: "Yes. POSPro One supports discounts that can be configured according to your business requirements.",
      },
      {
        question: "Can I refund a transaction?",
        answer: "Yes. Authorized users can process refunds according to the available refund workflow and permissions.",
      },
      {
        question: "Can I void a transaction?",
        answer: "Yes. POSPro One can support transaction voids for authorized users.",
      },
      {
        question: "Can I see my sales history?",
        answer: "Yes. Sales and transaction records can be reviewed through the appropriate sales and transaction screens.",
      },
      {
        question: "Can I search for products quickly at checkout?",
        answer: "Yes. POSPro One is designed to allow cashiers to quickly find sellable products and variants during checkout.",
      },
    ],
  },
  {
    category: "Customers & Loyalty",
    items: [
      {
        question: "Can I manage customers in POSPro One?",
        answer: "Yes. You can create and manage customer records and associate transactions with customers where applicable.",
      },
      {
        question: "Can I see a customer's purchase history?",
        answer:
          "Where customer tracking is enabled, POSPro One can associate sales with customer records so businesses can review their transaction history.",
      },
      {
        question: "Does POSPro One have a loyalty program?",
        answer: "Yes. POSPro One can support customer loyalty points and rewards.",
      },
      {
        question: "Can I create rewards using existing discounts?",
        answer:
          "Yes. Loyalty rewards can be connected to configured discounts so that loyalty manages eligibility and points while the existing discount system handles the actual discount.",
      },
      {
        question: "Are loyalty points automatically redeemed?",
        answer:
          "Loyalty rewards can require the cashier to explicitly select the available reward rather than automatically applying it.",
      },
    ],
  },
  {
    category: "Employees, Roles & Terminals",
    items: [
      {
        question: "Can I create employee accounts?",
        answer: "Yes. Businesses can manage employees and assign appropriate system access.",
      },
      {
        question: "Can I control what employees can access?",
        answer:
          "Yes. POSPro One supports roles and permissions so administrators can control access to features such as POS, expenses, inventory, and other modules.",
      },
      {
        question: "Can I have different roles for employees?",
        answer: "Yes. You can create roles appropriate for your business, such as administrator, manager, cashier, or other roles.",
      },
      {
        question: "Can I manage POS terminals?",
        answer: "Yes. POSPro One can associate users and cashiers with terminals and locations.",
      },
      {
        question: "Can I control when a cashier can use the POS?",
        answer:
          "POSPro One can support employee schedules and shift-based access so that businesses can control when users are allowed to operate a POS terminal.",
      },
      {
        question: "Can I assign employees to work schedules?",
        answer:
          "Yes. Businesses can configure schedules such as 8 AM–5 PM or 10 AM–7 PM and use them for attendance and shift management.",
      },
      {
        question: "Can I manage attendance?",
        answer: "POSPro One can provide attendance-related functionality depending on your enabled features and configuration.",
      },
    ],
  },
  {
    category: "Expenses & Cash Flow",
    items: [
      {
        question: "Can I record business expenses?",
        answer: "Yes. POSPro One includes expense management for recording and tracking business expenses.",
      },
      {
        question: "What is the difference between Expenses and Cash Flow?",
        answer: "Expenses explain what the business spent money on, while Cash Flow focuses on money coming into and going out of the business.",
      },
      {
        question: "Can POSPro One track cash coming in and going out?",
        answer:
          "Yes. Cash Flow can track operational cash movements such as cash sales, expenses, refunds, withdrawals, deposits, and adjustments.",
      },
      {
        question: "Can I track cash per terminal?",
        answer:
          "Yes. Where terminal cash management is enabled, you can track opening cash, cash sales, cash expenses, withdrawals, expected cash, and actual cash.",
      },
      {
        question: "Can I compare expected cash with actual cash?",
        answer: "Yes. Cash reconciliation can help identify differences between the expected cash balance and the actual amount counted.",
      },
    ],
  },
  {
    category: "Reports & Dashboard",
    items: [
      {
        question: "Does POSPro One have a sales dashboard?",
        answer:
          "Yes. The Sales Dashboard provides an overview of sales performance and can include metrics such as total sales, transactions, average order value, items sold, payment methods, and top-selling products.",
      },
      {
        question: "Can I print a sales report?",
        answer: "Yes. POSPro One can generate a sales report based on your selected filters.",
      },
      {
        question: "Can I print a daily sales report?",
        answer: "Yes. Select the appropriate date range, such as Today, and generate the Sales Report.",
      },
      {
        question: "Can I print a monthly sales report?",
        answer: "Yes. You can select a custom date range, such as the first through last day of the month.",
      },
      {
        question: "Can I generate a report for a specific branch?",
        answer: "Yes. If you have access to multiple locations, you can filter the report by location.",
      },
      {
        question: "Can I generate a report for a specific cashier or terminal?",
        answer: "Yes. Where supported, reports can be filtered by cashier and terminal.",
      },
      {
        question: "Does the Sales Report include payment methods?",
        answer: "Yes. The report can show the sales amount associated with each payment method.",
      },
    ],
  },
  {
    category: "Security & Privacy",
    items: [
      {
        question: "Is my business data secure?",
        answer: "POSPro One uses reasonable organizational, physical, and technical safeguards designed to protect business and personal information.",
      },
      {
        question: "Who can access my business data?",
        answer:
          "Access is controlled through authentication, roles, permissions, and other security mechanisms. Your employees should only be given the access necessary for their responsibilities.",
      },
      {
        question: "Does POSPro One sell my business data?",
        answer: "No. POSPro One does not sell personal information to third parties.",
      },
      {
        question: "How does POSPro One handle customer information?",
        answer:
          "Customer information is processed to provide POSPro One functionality such as customer management, transaction history, and loyalty features, subject to applicable privacy laws and the POSPro One Privacy Policy.",
      },
      {
        question: "Can I request deletion of my personal information?",
        answer:
          "You may request deletion or blocking of personal information where applicable under privacy laws. Some information may need to be retained when required by law or for legitimate business purposes.",
      },
      {
        question: "Where can I read the Privacy Policy?",
        answer: "You can review the full POSPro One Privacy Policy through the Privacy Policy section of the application or website.",
      },
      {
        question: "Where can I read the Terms of Service?",
        answer: "You can review the POSPro One Terms of Service through the Terms of Service section of the application or website.",
      },
    ],
  },
  {
    category: "Account & Support",
    items: [
      {
        question: "How do I create a POSPro One account?",
        answer: "Download or access POSPro One through a supported platform and follow the account registration process.",
      },
      {
        question: "I forgot my password. What should I do?",
        answer: "Use the password recovery option on the login screen and follow the instructions provided.",
      },
      {
        question: "Can I change my business information?",
        answer: "Business information can be updated through the appropriate account or business settings, depending on your permissions.",
      },
      {
        question: "Can I add more employees later?",
        answer: "Yes. You can add employees and users as your business grows, subject to your account and plan limitations.",
      },
      {
        question: "Can I add another location later?",
        answer: "Yes. Additional locations can be added if supported by your account or subscription plan.",
      },
      {
        question: "How do I contact POSPro One support?",
        answer: "Contact POSPro One through the support channel provided in the application or on the official POSPro One website.",
      },
    ],
  },
] as const;

export function PosProFaqContent() {
  return (
    <div className="flex flex-col gap-10">
      {FAQ_CATEGORIES.map((group) => (
        <div key={group.category}>
          <h2 className="font-display text-h3 text-foreground">{group.category}</h2>
          <Accordion type="single" collapsible className="mt-3">
            {group.items.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}
    </div>
  );
}
