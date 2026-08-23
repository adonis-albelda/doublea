import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/ui/components/ui/accordion";

const STEPS = [
  {
    step: "01",
    title: "Discover",
    duration: "3-5 days",
    description:
      "We map what you actually need — the workflow, the constraints, the must-haves — before any code gets written.",
  },
  {
    step: "02",
    title: "Build",
    duration: "2-6 weeks, scope-dependent",
    description: "We work in short cycles and show you working software every week, not a mockup at the end.",
  },
  {
    step: "03",
    title: "Ship",
    duration: "3-5 days",
    description: "We deploy to production, test with real users, and fix what breaks before it becomes a fire.",
  },
  {
    step: "04",
    title: "Support",
    duration: "Ongoing",
    description:
      "We stay on after launch — bug fixes, small changes, and a direct line when something needs attention.",
  },
] as const;

export function Process() {
  return (
    <section id="process" className="bg-page-wash py-20 lg:py-28">
      <div className="container">
        <div className="max-w-2xl">
          <p className="font-mono text-caption uppercase tracking-[0.04em] text-slate-sage">
            Process
          </p>
          <h2 className="mt-3 font-display text-h2 text-foreground">How a project runs</h2>
        </div>

        {/* Desktop: horizontal stepper — a real sequence, so numbers earn their place. */}
        <ol className="mt-12 hidden gap-6 lg:grid lg:grid-cols-4">
          {STEPS.map((item, i) => (
            <li key={item.step} className="group relative">
              <div className="flex items-center gap-3">
                <span className="font-mono text-caption text-primary transition-transform duration-300 group-hover:scale-110">
                  {item.step}
                </span>
                {i < STEPS.length - 1 && (
                  <span className="h-px flex-1 bg-border-sage transition-colors duration-300 group-hover:bg-primary/50" aria-hidden="true" />
                )}
              </div>
              <h3 className="mt-4 font-display text-h3 text-foreground">{item.title}</h3>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.04em] text-slate-sage">
                {item.duration}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
            </li>
          ))}
        </ol>

        {/* Mobile: accordion */}
        <div className="mt-10 lg:hidden">
          <Accordion type="single" collapsible defaultValue="01">
            {STEPS.map((item) => (
              <AccordionItem key={item.step} value={item.step}>
                <AccordionTrigger>
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-caption text-primary">{item.step}</span>
                    {item.title}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="font-mono text-xs uppercase tracking-[0.04em] text-slate-sage">
                    {item.duration}
                  </p>
                  <p className="mt-2">{item.description}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
