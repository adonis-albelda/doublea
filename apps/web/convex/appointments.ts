import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";

import { mutation, query } from "./_generated/server";

// Public — the calendar needs to know which slots are taken before a
// visitor signs in, so it can grey them out up front instead of only
// rejecting on submit.
export const listByProject = query({
  args: { projectSlug: v.string() },
  handler: async (ctx, { projectSlug }) => {
    const rows = await ctx.db
      .query("appointments")
      .withIndex("by_project", (q) => q.eq("projectSlug", projectSlug))
      .collect();
    return rows.map((r) => ({ date: r.date, time: r.time }));
  },
});

export const create = mutation({
  args: {
    projectSlug: v.string(),
    date: v.string(),
    time: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Sign in required to schedule an appointment.");

    // Re-check server-side — the client's slot list can be a beat stale if
    // two visitors race for the same time.
    const existing = await ctx.db
      .query("appointments")
      .withIndex("by_project", (q) => q.eq("projectSlug", args.projectSlug))
      .filter((q) => q.and(q.eq(q.field("date"), args.date), q.eq(q.field("time"), args.time)))
      .first();
    if (existing) throw new Error("That slot was just booked — pick another time.");

    return await ctx.db.insert("appointments", { ...args, userId });
  },
});
