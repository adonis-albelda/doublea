import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Bot, Building2, CheckCircle2, Clock, Layers, ShieldCheck, Smartphone, Sparkles, Zap } from "lucide-react";

import { Badge } from "@repo/ui/components/ui/badge";
import { Button } from "@repo/ui/components/ui/button";

import { AiSpotlight } from "@/components/ai-spotlight";
import { AnimatedCounter } from "@/components/animated-counter";
import { BenefitsList } from "@/components/benefits-list";
import { BookDemoCta } from "@/components/book-demo-cta";
import { BookDemoSection } from "@/components/book-demo-section";
import { PricingSection } from "@/components/pricing-section";
import { CtaBand } from "@/components/cta-band";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { OtherProjectsGrid } from "@/components/other-projects-grid";
import { ProjectShowcase } from "@/components/project-showcase";
import { ScrollReveal } from "@/components/scroll-reveal";
import { TypewriterText } from "@/components/typewriter-text";
import { ClientLocationsShowcase } from "@/components/client-locations-showcase";
import { DemoAccessCard } from "@/components/demo-access-card";
import { TicketForm } from "@/components/ticket-form";
import { FeatureCategories } from "@/components/feature-categories";
import { FeatureGrid } from "@/components/feature-grid";
import { getProjectBySlug, PROJECTS } from "@/lib/projects";

const FEATURE_STAT_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Core: Layers,
  "AI-powered": Bot,
  Security: ShieldCheck,
};

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};
  return {
    title: `${project.name} — Double-A IT Solutions`,
    description: project.description,
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const otherProjects = PROJECTS.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <>
      <Nav />
      <main className="bg-page-wash">
        {/* Hero — name + interactive device showcase, per the brief. */}
        <ScrollReveal>
          <section className="py-14 lg:py-20">
            <div className="container">
              <Link
                href="/#products"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-sage transition-colors hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back to work
              </Link>

              <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center">
                <div>
                  {project.logo && (
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-border-sage bg-card p-2 shadow-sm">
                      <Image
                        src={project.logo}
                        alt={`${project.name} logo`}
                        width={56}
                        height={56}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  )}
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="status">{project.status}</Badge>
                    <span className="flex items-center gap-1.5 font-mono text-xs text-slate-sage">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                      {project.timeline}
                    </span>
                  </div>
                  <h1 className="mt-4 font-display text-display-lg text-foreground">
                    <TypewriterText text={project.name} />
                  </h1>
                  <p className="mt-3 text-h3 font-display text-primary">{project.tagline}</p>
                  <p className="mt-5 max-w-xl text-body-lg text-muted-foreground">{project.longDescription}</p>
                  {project.hasDemoAccess && (
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <BookDemoCta projectName={project.name} />
                      <Button
                        variant="outline"
                        size="lg"
                        className="bg-primary text-primary-foreground border-primary hover:bg-primary/90 dark:bg-transparent dark:text-foreground dark:border-border-sage dark:hover:bg-secondary"
                        asChild
                      >
                        <Link href="#try-it">
                          <Smartphone className="h-4 w-4" aria-hidden="true" />
                          Try the App
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>

                <ProjectShowcase project={project} />
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Features */}
        <section className="bg-background py-14 lg:py-20">
          <div className="container">
            <div className="mb-20">
              {project.featureCategories && (
                <div className="mb-8 grid w-full grid-cols-1 divide-y divide-border-sage rounded-xl border border-border-sage bg-card sm:grid-cols-2 lg:grid-cols-5 lg:divide-x lg:divide-y-0">
                  {[
                    ...project.featureCategories.map((group) => ({
                      key: group.category,
                      icon: FEATURE_STAT_ICONS[group.category] ?? CheckCircle2,
                      value: group.items.length,
                      label: `${group.category} features`,
                    })),
                    {
                      key: "advanced",
                      icon: Zap,
                      value: project.featureCategories.reduce(
                        (sum, group) => sum + group.items.filter((item) => item.highlight).length,
                        0,
                      ),
                      label: "Advanced features",
                    },
                    {
                      key: "total",
                      icon: Sparkles,
                      value: project.featureCategories.reduce((sum, group) => sum + group.items.length, 0),
                      label: "Total features",
                    },
                  ].map((stat) => (
                    <div key={stat.key} className="flex flex-col items-center gap-2 px-6 py-6 text-center">
                      <stat.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                      <AnimatedCounter value={stat.value} />
                      <p className="font-mono text-xs uppercase tracking-[0.04em] text-slate-sage">{stat.label}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <p className="mt-6 font-mono text-caption uppercase tracking-[0.04em] text-slate-sage">Features</p>
            <h2 className="mt-3 font-display text-h2 text-foreground">Everything you need, already built in</h2>
            {project.featureCategories ? (
              <FeatureCategories categories={project.featureCategories} />
            ) : (
              <FeatureGrid features={project.features} highlightFeatures={project.highlightFeatures} />
            )}
          </div>
        </section>

        {/* AI spotlight — concrete "ask in plain language" example */}
        {project.aiSpotlight && (
          <ScrollReveal>
            <section className="py-14 lg:py-20">
              <div className="container">
                <div className="max-w-2xl">
                  <p className="font-mono text-caption uppercase tracking-[0.04em] text-slate-sage">
                    AI, put to work
                  </p>
                  <h2 className="mt-3 font-display text-h2 text-foreground">See it in action</h2>
                  <p className="mt-3 text-body text-muted-foreground">
                    A few real ways the AI in {project.name} saves you from typing, searching, and cleaning up
                    data by hand.
                  </p>
                </div>
                <div className="mt-10">
                  <AiSpotlight spotlight={project.aiSpotlight} />
                </div>
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* Benefits + target business */}
        <ScrollReveal>
          <section className="py-14 lg:py-20">
            <div className="container grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <p className="font-mono text-caption uppercase tracking-[0.04em] text-slate-sage">Benefits</p>
                <h2 className="mt-3 font-display text-h2 text-foreground">Why it matters</h2>
                <BenefitsList benefits={project.benefits} />
              </div>

              <div className="rounded-xl border border-border-sage bg-card p-8">
                <Building2 className="h-8 w-8 text-primary" aria-hidden="true" />
                <p className="mt-4 font-mono text-caption uppercase tracking-[0.04em] text-slate-sage">
                  Built for
                </p>
                <p className="mt-2 font-display text-h3 text-foreground">{project.targetBusiness}</p>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Pricing — dummy user counts, see pricing-section.tsx */}
        {project.pricingPlans && (
          <ScrollReveal>
            <section className="bg-background py-14 lg:py-20">
              <div className="container">
                <p className="font-mono text-caption uppercase tracking-[0.04em] text-slate-sage">Pricing</p>
                <h2 className="mt-3 font-display text-h2 text-foreground">Plans for every store size</h2>
                <div className="mt-10">
                  <PricingSection project={project} />
                </div>
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* Book a demo — only for our own product (POSPro), not one-off
            client sites like CareConnect. See book-demo-section.tsx. */}
        {project.hasDemoAccess && (
          <ScrollReveal>
            <section id="book-demo" className="scroll-mt-24 bg-background py-14 lg:py-20">
              <div className="container">
                <p className="font-mono text-caption uppercase tracking-[0.04em] text-slate-sage">Book a demo</p>
                <h2 className="mt-3 font-display text-h2 text-foreground">Pick a date and time</h2>
                <div className="mt-10">
                  <BookDemoSection projectName={project.name} projectSlug={project.slug} />
                </div>
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* Try it — live demo access, see demo-access-card.tsx */}
        {project.hasDemoAccess && (
          <ScrollReveal>
            <section id="try-it" className="scroll-mt-24 py-14 lg:py-20">
              <div className="container">
                <DemoAccessCard project={project} />
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* Submit a ticket — bug/suggestion/question, see ticket-form.tsx */}
        {project.hasDemoAccess && (
          <ScrollReveal>
            <section id="submit-ticket" className="scroll-mt-24 bg-background py-14 lg:py-20">
              <div className="container grid gap-10 lg:grid-cols-2 lg:gap-16">
                <div>
                  <p className="font-mono text-caption uppercase tracking-[0.04em] text-slate-sage">Support</p>
                  <h2 className="mt-3 font-display text-h2 text-foreground">Found a bug? Have an idea?</h2>
                  <p className="mt-3 text-body text-muted-foreground">
                    Tell us what happened, and we&apos;ll take a look. Sign in with Google first so we know who to
                    follow up with.
                  </p>
                </div>
                <div>
                  <TicketForm projectName={project.name} projectSlug={project.slug} />
                </div>
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* Client hub — real client locations, see client-locations-showcase.tsx */}
        {project.storeLocations && (
          <ScrollReveal>
            <section className="bg-background py-14 lg:py-20">
              <div className="container">
                <p className="font-mono text-caption uppercase tracking-[0.04em] text-slate-sage">
                  Clients
                </p>
                <h2 className="mt-3 font-display text-h2 text-foreground">Where it&apos;s already live</h2>
                <div className="mt-10">
                  <ClientLocationsShowcase project={project} />
                </div>
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* More work */}
        {otherProjects.length > 0 && (
          <ScrollReveal>
            <section className="py-14 lg:py-20">
              <div className="container">
                <p className="font-mono text-caption uppercase tracking-[0.04em] text-slate-sage">More work</p>
                <h2 className="mt-3 font-display text-h2 text-foreground">Other projects</h2>
                <OtherProjectsGrid projects={otherProjects} />
                <Button variant="outline" size="lg" className="mt-10" asChild>
                  <Link href="/#products">
                    See all work
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </section>
          </ScrollReveal>
        )}

        <ScrollReveal>
          <CtaBand />
        </ScrollReveal>
      </main>
      <Footer />
    </>
  );
}
