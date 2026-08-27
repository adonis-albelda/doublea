import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@repo/ui/components/ui/button";

import { FACEBOOK_MESSENGER_URL } from "@/lib/social-links";

export function CtaBand() {
  return (
    <section className="bg-accent py-12">
      <div className="container flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
        <div>
          <h2 className="font-display text-h2 text-white">Have an Idea? Let&apos;s Talk.</h2>
          <p className="mt-2 text-body text-white">
            You don&apos;t need to have everything figured out before contacting us. Tell us what
            you&apos;re trying to achieve, what&apos;s currently challenging your business, or what
            you&apos;d like to improve — we&apos;ll help you explore the right digital solution for
            your needs.
          </p>
        </div>
        {/* --primary fill here, not clay-on-clay, per design-system.md §2. */}
        <Button variant="default" size="lg" className="group shrink-0" asChild>
          <Link href={FACEBOOK_MESSENGER_URL} target="_blank" rel="noopener noreferrer" aria-label="Message us on Facebook">
            Start a Conversation
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
