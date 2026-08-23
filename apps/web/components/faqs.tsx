import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/ui/components/ui/accordion";

// PLACEHOLDER FAQS — written to answer the questions a founder/ops lead
// would actually have before hiring a dev shop. Swap for real FAQs (pricing
// specifics, contract terms) before launch.
const FAQS = [
  {
    question: "How much does a project cost?",
    answer:
      "It depends on scope — a marketing site runs a few thousand dollars, a custom web app with integrations runs more. You get a fixed quote after the discovery call, before any code gets written, not an hourly estimate that drifts.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Websites usually ship in 4-5 weeks. Custom software and web apps run 6-8 weeks depending on scope. You'll know the real timeline after discovery, not a generic range.",
  },
  {
    question: "Who owns the code when we're done?",
    answer:
      "You do. Full source, repo access, and infrastructure credentials transfer to you at handoff. No vendor lock-in, no holding the code hostage for support fees.",
  },
  {
    question: "Do you work with our existing tools and stack?",
    answer:
      "Usually, yes. We build new work in TypeScript/Next.js by default, but automation and integrations get built around whatever you already run — QuickBooks, Shopify, Slack, your CRM.",
  },
  {
    question: "What happens after launch?",
    answer:
      "You get a support window included (bug fixes, small changes) and a direct line to the engineer who built it. Ongoing retainers are available if you want us on call past that.",
  },
  {
    question: "Where does the AI-assisted part fit in?",
    answer:
      "We use AI tooling for scaffolding, code review, and test coverage — it speeds up the parts that don't need judgment. Architecture, code review, and client communication stay with a senior engineer.",
  },
  {
    question: "How does payment work?",
    answer:
      "Projects are billed in milestones — a deposit at kickoff, a payment at the build midpoint, and the balance at launch. No surprise invoices between those.",
  },
  {
    question: "What if scope changes mid-project?",
    answer:
      "We reprice the specific change and get sign-off before touching it. The rest of the timeline and quote stays untouched.",
  },
  {
    question: "Will you sign an NDA before we share details?",
    answer:
      "Yes — before the discovery call if you want one in place first. We'll sign yours or send ours.",
  },
  {
    question: "Can you work alongside our in-house developers?",
    answer:
      "Yes. We've slotted in as the senior engineer on a specific feature or system without replacing anyone already on your team.",
  },
  {
    question: "How many rounds of revisions do we get?",
    answer:
      "Two structured revision rounds are built into every milestone. Beyond that, changes get scoped and quoted like any other request.",
  },
  {
    question: "Do you offer maintenance after the support window ends?",
    answer:
      "Yes, as a monthly retainer — priority response time, a set number of hours, and no per-ticket invoicing.",
  },
] as const;

function faqColumn(faqs: readonly (typeof FAQS)[number][], startIndex: number) {
  return (
    <Accordion type="single" collapsible>
      {faqs.map((faq, i) => (
        <AccordionItem key={faq.question} value={`faq-${startIndex + i}`}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function Faqs() {
  const midpoint = Math.ceil(FAQS.length / 2);
  const left = FAQS.slice(0, midpoint);
  const right = FAQS.slice(midpoint);

  return (
    <section id="faqs" className="py-20 lg:py-28">
      <div className="container">
        <div className="max-w-2xl">
          <p className="font-mono text-caption uppercase tracking-[0.04em] text-slate-sage">
            FAQ
          </p>
          <h2 className="mt-3 font-display text-h2 text-foreground">Questions you probably have</h2>
        </div>

        <div className="mt-10 grid gap-x-12 lg:grid-cols-2">
          {faqColumn(left, 0)}
          {faqColumn(right, midpoint)}
        </div>
      </div>
    </section>
  );
}
