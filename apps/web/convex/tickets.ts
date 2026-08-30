import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";

import { mutation } from "./_generated/server";

// Sign-in required — the reporter's account (and its email, via userId) is
// how we follow up, and it keeps the ticket table from being open to anyone
// with the URL.
export const create = mutation({
  args: {
    projectSlug: v.string(),
    type: v.union(v.literal("bug"), v.literal("suggestion"), v.literal("question")),
    title: v.string(),
    description: v.string(),
    name: v.string(),
    storeName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Sign in required to submit a ticket.");

    return await ctx.db.insert("tickets", { ...args, userId, createdAt: Date.now() });
  },
});
