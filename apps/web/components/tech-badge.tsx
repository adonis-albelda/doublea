import {
  type IconType,
  SiCaldotcom,
  SiN8n,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiQuickbooks,
  SiReact,
  SiShopify,
  SiStripe,
  SiTailwindcss,
  SiTrpc,
  SiTypescript,
  SiVercel,
  SiZapier,
} from "@icons-pack/react-simple-icons";

import { Badge } from "@repo/ui/components/ui/badge";

// design-system.md §6 calls for mono-caps text badges for tech-stack tags.
// Extended here to icon+label using real brand marks (simple-icons) at the
// user's request — icons render in `currentColor` (not brand color) so the
// restrained, single-accent palette still holds; unmapped tools (e.g. "REST
// APIs" — not a brand) fall back to text-only, same as before.
const ICONS: Record<string, IconType> = {
  React: SiReact,
  "Next.js": SiNextdotjs,
  "Tailwind CSS": SiTailwindcss,
  PostgreSQL: SiPostgresql,
  "Node.js": SiNodedotjs,
  TypeScript: SiTypescript,
  Vercel: SiVercel,
  tRPC: SiTrpc,
  n8n: SiN8n,
  Zapier: SiZapier,
  Shopify: SiShopify,
  Stripe: SiStripe,
  "Cal.com": SiCaldotcom,
  "QuickBooks API": SiQuickbooks,
};

export function TechBadge({ name }: { name: string }) {
  const Icon = ICONS[name];
  return (
    <Badge variant="outline" className="gap-1.5">
      {Icon && <Icon size={12} color="currentColor" />}
      {name}
    </Badge>
  );
}
