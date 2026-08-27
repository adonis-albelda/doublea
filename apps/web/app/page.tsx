import { About } from "@/components/about";
import { CtaBand } from "@/components/cta-band";
import { Faqs } from "@/components/faqs";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Nav } from "@/components/nav";
import { PixelAscent } from "@/components/pixel-ascent";
import { Process } from "@/components/process";
import { Products } from "@/components/products";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Services } from "@/components/services";
import { Team } from "@/components/team";
import { Testimonials } from "@/components/testimonials";
import { TrustedBy } from "@/components/trusted-by";
import { WhoWeHelp } from "@/components/who-we-help";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <ScrollReveal>
          <Hero />
        </ScrollReveal>
        <ScrollReveal>
          <Services />
        </ScrollReveal>
        <ScrollReveal>
          <Products />
        </ScrollReveal>
        <ScrollReveal>
          <TrustedBy />
        </ScrollReveal>
        <ScrollReveal>
          <Testimonials />
        </ScrollReveal>

        {/* Second (and last) use of PixelAscent — a section-divider punctuation
            mark, not a repeating background. design-system.md §5. */}
        <ScrollReveal>
          <div className="container">
            <PixelAscent variant="divider" className="py-4" />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <Process />
        </ScrollReveal>
        <ScrollReveal>
          <About />
        </ScrollReveal>
        <ScrollReveal>
          <WhoWeHelp />
        </ScrollReveal>
        <ScrollReveal>
          <Team />
        </ScrollReveal>
        <ScrollReveal>
          <Faqs />
        </ScrollReveal>
        <ScrollReveal>
          <CtaBand />
        </ScrollReveal>
      </main>
      <Footer />
    </>
  );
}
