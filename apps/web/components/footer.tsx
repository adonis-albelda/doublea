import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#products", label: "Products" },
  { href: "#process", label: "Process" },
  { href: "#about", label: "About" },
  { href: "#faqs", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-border-sage bg-sage-100 py-12">
      <div className="container flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="" width={28} height={28} className="h-7 w-7" />
          <div>
            <p className="font-display text-sm font-medium text-foreground">
              Double A Digital Solutions
            </p>
            <p className="mt-1 text-xs text-slate-sage">
              Custom software, websites, web apps, and automation.
            </p>
            <p className="mt-1 text-xs text-slate-sage">
              &copy; {new Date().getFullYear()} Double A Digital Solutions. All rights reserved.
            </p>
          </div>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="mailto:hello@doubleadigital.com"
            aria-label="Email Double A Digital Solutions"
            className="text-slate-sage transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            <Mail className="h-5 w-5" aria-hidden="true" />
          </Link>
          <Link
            href="https://github.com"
            aria-label="Double A Digital Solutions on GitHub"
            className="text-slate-sage transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            <Github className="h-5 w-5" aria-hidden="true" />
          </Link>
          <Link
            href="https://linkedin.com"
            aria-label="Double A Digital Solutions on LinkedIn"
            className="text-slate-sage transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            <Linkedin className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
