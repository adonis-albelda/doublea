"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/ui/components/ui/accordion";
import { cn } from "@repo/ui/lib/utils";

import { useRevealEach } from "@/hooks/use-reveal";

const STEPS = [
  {
    step: "01",
    title: "Tell Us What You Need",
    description: "We'll learn about your business, your goals, and the challenges you're trying to solve.",
  },
  {
    step: "02",
    title: "We Plan the Solution",
    description:
      "We'll turn your ideas into a clear plan, including the features, design, and functionality your project needs.",
  },
  {
    step: "03",
    title: "We Build",
    description: "Our team develops your website or software based on the agreed plan.",
  },
  {
    step: "04",
    title: "We Test",
    description: "Before launch, we carefully check the system to make sure everything works as expected.",
  },
  {
    step: "05",
    title: "We Launch",
    description: "Once everything is ready and approved, we help bring your project live.",
  },
  {
    step: "06",
    title: "We Hand It Over",
    description:
      "You'll receive the necessary files, documentation, and access so you can take ownership of your project.",
  },
] as const;

export function Process() {
  const { setRef, visible } = useRevealEach<HTMLLIElement>(STEPS.length);

  return (
    <section id="process" className="bg-page-wash py-14 lg:py-20">
      <div className="container">
        <div className="max-w-2xl">
          <p className="font-mono text-caption uppercase tracking-[0.04em] text-slate-sage">
            Process
          </p>
          <h2 className="mt-3 font-display text-h2 text-foreground">From idea to launch, made simple</h2>
        </div>

        {/* Desktop: 3x2 grid — six steps, no natural single-row layout. */}
        <ol className="mt-12 hidden gap-x-6 gap-y-10 lg:grid lg:grid-cols-3">
          {STEPS.map((item, i) => (
            <li
              key={item.step}
              ref={setRef(i)}
              className={cn(
                "group transition-all duration-500 ease-out",
                visible[i] ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
              )}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-primary/40 bg-card font-mono text-caption text-primary transition-transform duration-300 group-hover:scale-110">
                {item.step}
              </span>
              <h3 className="mt-4 font-display text-h3 text-foreground">{item.title}</h3>
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
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-primary/40 bg-card font-mono text-xs text-primary">
                      {item.step}
                    </span>
                    {item.title}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <p>{item.description}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
