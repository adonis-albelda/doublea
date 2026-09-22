import { Mail } from "lucide-react";
import Image from "next/image";

import type { EmailPreview } from "@/lib/pospro/auth-data";

export function EmailPreviewSection({ title, path }: EmailPreview) {
  return (
    <section>
      <h3 className="font-display text-h3 text-foreground">What Happens Next</h3>

      <div className="mt-4 flex items-start gap-2 rounded-md border border-clay/40 bg-clay/10 px-3 py-2 text-xs text-ink">
        <Mail className="mt-0.5 h-4 w-4 shrink-0 text-clay" />
        <span>
          Didn&apos;t get this email? Check your <strong>spam or junk</strong> folder.
        </span>
      </div>

      <div className="relative mt-3 aspect-[16/10] w-full overflow-hidden rounded-lg border border-border-sage bg-muted shadow-sm">
        <Image src={path} alt={title} fill sizes="700px" className="object-contain" />
      </div>
    </section>
  );
}
