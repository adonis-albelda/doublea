import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";

import { internalMutation, query } from "./_generated/server";

// Server-enforced gate — an unauthenticated caller gets null back, so
// credentials never leave the deployment for a signed-out visitor (unlike
// the old lib/projects.ts version, which shipped them in the client bundle
// regardless of sign-in state).
export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    return await ctx.db
      .query("demoAccess")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();
  },
});

// One-off seed/update, run via `npx convex run demoAccess:seed '{...}'`.
// internalMutation — not reachable from the client, only from the CLI/dashboard.
export const seed = internalMutation({
  args: {
    slug: v.string(),
    adminUrl: v.string(),
    apkUrl: v.string(),
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("demoAccess")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
    if (existing) {
      await ctx.db.patch(existing._id, args);
      return existing._id;
    }
    return await ctx.db.insert("demoAccess", args);
  },
});
