import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";

import { FACEBOOK_MESSENGER_URL } from "@/lib/social-links";

const NAV_LINKS = [
  { href: "/#services", label: "Services" },
  { href: "/#products", label: "Products" },
  { href: "/#process", label: "Process" },
  { href: "/#about", label: "About" },
  { href: "/#faqs", label: "FAQ" },
  { href: FACEBOOK_MESSENGER_URL, label: "Contact" },
];

const HELPFUL_LINKS = [
  { href: FACEBOOK_MESSENGER_URL, label: "Help" },
  { href: "/#faqs", label: "F.A.Q." },
  { href: "/terms", label: "Terms & Conditions" },
];

const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
];

const CONTACT_EMAIL = "doublea.itsolutions2026@gmail.com";
const CONTACT_PHONE = "+63 926 445 0238";
const DTI_REGISTRATION_NUMBER = "8454115";

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-caption uppercase tracking-[0.04em] text-slate-sage">{children}</p>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border-sage bg-sage-100 py-12">
      <div className="container grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div className="flex items-start gap-3">
          <Image src="/logo.png" alt="" width={28} height={28} className="mt-0.5 h-7 w-7 shrink-0" />
          <div>
            <p className="font-display text-sm font-medium text-foreground">
              Double-A IT Solutions
            </p>
            <p className="mt-1 text-xs text-slate-sage">
              Websites. Custom Software. Practical Digital Solutions.
            </p>
            <p className="mt-1 text-xs text-slate-sage">Built around your business. Designed for your goals.</p>
            <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-foreground">
              <BadgeCheck className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              DTI Registered Business No. {DTI_REGISTRATION_NUMBER}
            </p>
            <div className="mt-4 flex items-center gap-4">
              <Link
                href={`mailto:${CONTACT_EMAIL}`}
                aria-label="Email Double-A IT Solutions"
                className="text-slate-sage transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
              >
                <Mail className="h-5 w-5" aria-hidden="true" />
              </Link>
              <Link
                href="https://github.com"
                aria-label="Double-A IT Solutions on GitHub"
                className="text-slate-sage transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
              >
                <Github className="h-5 w-5" aria-hidden="true" />
              </Link>
              <Link
                href="https://linkedin.com"
                aria-label="Double-A IT Solutions on LinkedIn"
                className="text-slate-sage transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
              >
                <Linkedin className="h-5 w-5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        <div>
          <FooterHeading>Quick Links</FooterHeading>
          <nav aria-label="Footer" className="mt-3 flex flex-col gap-2">
            {NAV_LINKS.map((link) => {
              const isExternal = link.href.startsWith("http");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div>
          <FooterHeading>Helpful Links</FooterHeading>
          <nav aria-label="Helpful links" className="mt-3 flex flex-col gap-2">
            {HELPFUL_LINKS.map((link) => {
              const isExternal = link.href.startsWith("http");
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div>
          <FooterHeading>Contact Us</FooterHeading>
          <div className="mt-3 flex flex-col gap-2.5">
            <Link
              href={`mailto:${CONTACT_EMAIL}`}
              className="flex items-start gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-slate-sage" aria-hidden="true" />
              {CONTACT_EMAIL}
            </Link>
            <Link
              href={`tel:${CONTACT_PHONE.replace(/\s+/g, "")}`}
              className="flex items-start gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-slate-sage" aria-hidden="true" />
              {CONTACT_PHONE}
            </Link>
            <p className="flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-sage" aria-hidden="true" />
              Calbayog City, Samar, Philippines
            </p>
          </div>
        </div>
      </div>

      <div className="container mt-10 flex flex-col gap-3 border-t border-border-sage pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-slate-sage">
          &copy; {new Date().getFullYear()} Double-A IT Solutions. All rights reserved.
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {LEGAL_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs text-slate-sage underline-offset-2 transition-colors hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
