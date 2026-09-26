import type { Metadata } from "next";

import { PageTransition } from "@/components/page-transition";
import { ManualSidebar } from "@/components/pospro/documentation/common/ManualSidebar";
import { MANUAL_PAGE_ORDER } from "@/lib/pospro/manual-order";

export const metadata: Metadata = {
  title: { template: "%s — POSPro One Manual", default: "POSPro One Manual" },
};

export default function ManualLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-background text-foreground lg:flex-row">
      <ManualSidebar />
      <PageTransition order={MANUAL_PAGE_ORDER} className="min-h-0 min-w-0 flex-1">
        {children}
      </PageTransition>
    </div>
  );
}
