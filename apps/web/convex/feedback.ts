import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";

import { mutation } from "./_generated/server";

// Sign-in required — same reasoning as convex/tickets.ts: the reporter's
// account is how we follow up, and it keeps the table from being open to
// anyone with the URL.
export const create = mutation({
  args: {
    projectSlug: v.string(),
    type: v.union(v.literal("bug"), v.literal("suggestion"), v.literal("question")),
    title: v.string(),
    description: v.string(),
    name: v.string(),
    storeName: v.optional(v.string()),
    areas: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Sign in required to send feedback.");

    return await ctx.db.insert("feedback", { ...args, userId, createdAt: Date.now() });
  },
});
