import type { Metadata } from "next";

import { ManualSidebar } from "@/components/pospro/documentation/common/ManualSidebar";

export const metadata: Metadata = {
  title: { template: "%s — POSPro One Manual", default: "POSPro One Manual" },
};

export default function ManualLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background text-foreground lg:flex-row">
      <ManualSidebar />
      <div className="min-h-0 min-w-0 flex-1">{children}</div>
    </div>
  );
}
