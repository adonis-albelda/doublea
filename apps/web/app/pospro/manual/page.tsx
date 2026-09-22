import { redirect } from "next/navigation";

// /pospro/manual has no content of its own — the manual always opens on a
// feature group. Redirect keeps the sidebar shell (app/pospro/manual/layout.tsx)
// mounted instead of 404ing at the bare root.
export default function ManualRootPage() {
  redirect("/pospro/manual/mobile/authentication");
}
