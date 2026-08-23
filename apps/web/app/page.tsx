import { About } from "@/components/about";
import { ContactForm } from "@/components/contact-form";
import { CtaBand } from "@/components/cta-band";
import { Faqs } from "@/components/faqs";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Nav } from "@/components/nav";
import { PixelAscent } from "@/components/pixel-ascent";
import { Process } from "@/components/process";
import { Products } from "@/components/products";
import { Services } from "@/components/services";
import { Team } from "@/components/team";
import { Testimonials } from "@/components/testimonials";
import { TrustedBy } from "@/components/trusted-by";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TrustedBy />
        <Services />
        <Products />
        <Testimonials />

        {/* Second (and last) use of PixelAscent — a section-divider punctuation
            mark, not a repeating background. design-system.md §5. */}
        <div className="container">
          <PixelAscent variant="divider" className="py-4" />
        </div>

        <Process />
        <About />
        <Team />
        <Faqs />
        <CtaBand />

        <section id="contact" className="bg-page-wash py-20 lg:py-28">
          <div className="container grid gap-12 lg:grid-cols-2">
            <div>
              <p className="font-mono text-caption uppercase tracking-[0.04em] text-slate-sage">
                Contact
              </p>
              <h2 className="mt-3 font-display text-h2 text-foreground">Tell us what you&apos;re building</h2>
              <p className="mt-4 max-w-md text-body text-muted-foreground">
                Send a few details and we&apos;ll reply within one business day with next steps.
              </p>
              <ol className="mt-6 flex flex-col gap-4">
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary font-mono text-xs text-primary">
                    1
                  </span>
                  <p className="text-sm text-muted-foreground">You send a few details about what you&apos;re building.</p>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary font-mono text-xs text-primary">
                    2
                  </span>
                  <p className="text-sm text-muted-foreground">We reply within one business day to set up a discovery call.</p>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary font-mono text-xs text-primary">
                    3
                  </span>
                  <p className="text-sm text-muted-foreground">You get a fixed quote and timeline — no pressure to commit on the call.</p>
                </li>
              </ol>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
