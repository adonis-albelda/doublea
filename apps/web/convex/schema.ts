import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  ...authTables,
  demoAccess: defineTable({
    slug: v.string(),
    adminUrl: v.string(),
    apkUrl: v.string(),
    email: v.string(),
    password: v.string(),
  }).index("by_slug", ["slug"]),
  appointments: defineTable({
    projectSlug: v.string(),
    date: v.string(),
    time: v.string(),
    userId: v.id("users"),
  }).index("by_project", ["projectSlug"]),
  tickets: defineTable({
    projectSlug: v.string(),
    type: v.union(v.literal("bug"), v.literal("suggestion"), v.literal("question")),
    title: v.string(),
    description: v.string(),
    name: v.string(),
    storeName: v.optional(v.string()),
    userId: v.id("users"),
    createdAt: v.number(),
  }).index("by_project", ["projectSlug"]),
});
