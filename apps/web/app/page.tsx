import { About } from "@/components/about";
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
        <Services />
        <Products />
        <TrustedBy />
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
      </main>
      <Footer />
    </>
  );
}
