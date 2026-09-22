import { redirect } from "next/navigation";

// /pospro/manual has no content of its own — the manual always opens on a
// feature group. Redirect keeps the sidebar shell (app/pospro/manual/layout.tsx)
// mounted instead of 404ing at the bare root.
//
// All manual content is static auth-data.ts — nothing here reads
// per-request state, so force this to prerender at build time (avoids
// Convex's auth provider higher up the tree opting the route into SSR).
export const dynamic = "force-static";

export default function ManualRootPage() {
  redirect("/pospro/manual/mobile/authentication");
}
