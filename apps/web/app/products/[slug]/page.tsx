import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Building2, Check, Clock, Smartphone } from "lucide-react";

import { Badge } from "@repo/ui/components/ui/badge";
import { Button } from "@repo/ui/components/ui/button";

import { BookDemoCta } from "@/components/book-demo-cta";
import { BookDemoSection } from "@/components/book-demo-section";
import { PricingSection } from "@/components/pricing-section";
import { CtaBand } from "@/components/cta-band";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { ProjectLink } from "@/components/project-link";
import { ProjectShowcase } from "@/components/project-showcase";
import { ScrollReveal } from "@/components/scroll-reveal";
import { TypewriterText } from "@/components/typewriter-text";
import { ClientLocationsShowcase } from "@/components/client-locations-showcase";
import { DemoAccessCard } from "@/components/demo-access-card";
import { FeatureGrid } from "@/components/feature-grid";
import { getProjectBySlug, PROJECTS } from "@/lib/projects";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};
  return {
    title: `${project.name} — Double A Digital Solutions`,
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

              <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-start">
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
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <BookDemoCta projectName={project.name} />
                    {project.hasDemoAccess && (
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
                    )}
                  </div>
                </div>

                <ProjectShowcase project={project} />
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Features */}
        <ScrollReveal>
          <section className="bg-background py-14 lg:py-20">
            <div className="container">
              <p className="font-mono text-caption uppercase tracking-[0.04em] text-slate-sage">Features</p>
              <h2 className="mt-3 font-display text-h2 text-foreground">What it does</h2>
              <FeatureGrid features={project.features} highlightFeatures={project.highlightFeatures} />
            </div>
          </section>
        </ScrollReveal>

        {/* Benefits + target business */}
        <ScrollReveal>
          <section className="py-14 lg:py-20">
            <div className="container grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <p className="font-mono text-caption uppercase tracking-[0.04em] text-slate-sage">Benefits</p>
                <h2 className="mt-3 font-display text-h2 text-foreground">Why it matters</h2>
                <ul className="mt-6 flex flex-col gap-4">
                  {project.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                      <p className="text-body text-foreground">{benefit}</p>
                    </li>
                  ))}
                </ul>
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

        {/* Book a demo — inline calendar + time picker, see book-demo-section.tsx */}
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

        {/* More work */}
        {otherProjects.length > 0 && (
          <ScrollReveal>
            <section className="py-14 lg:py-20">
              <div className="container">
                <p className="font-mono text-caption uppercase tracking-[0.04em] text-slate-sage">More work</p>
                <h2 className="mt-3 font-display text-h2 text-foreground">Other projects</h2>
                <div className="mt-10 grid gap-6 sm:grid-cols-3">
                  {otherProjects.map((p) => (
                    <ProjectLink
                      key={p.slug}
                      href={`/products/${p.slug}`}
                      className="group rounded-xl border border-border-sage bg-card p-6 transition-colors hover:border-primary/40"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-display text-h3 text-foreground">{p.name}</h3>
                        <Badge variant="status" className="shrink-0">
                          {p.status}
                        </Badge>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
                      <span className="mt-4 inline-block text-sm font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        View project →
                      </span>
                    </ProjectLink>
                  ))}
                </div>
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
