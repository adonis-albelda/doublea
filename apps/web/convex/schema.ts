import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  ...authTables,
  demoAccess: defineTable({
    slug: v.string(),
    adminUrl: v.string(),
    apkUrl: v.string(),
    // Kept optional for backward-compat with the already-seeded row — no
    // longer used for login. The demo email + password shown to users now
    // come live from the Tally access-code API (fetchAccessCode below).
    email: v.optional(v.string()),
    password: v.optional(v.string()),
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
  // Closed-beta feedback from app/pospro/feedback (pospro-feedback-form.tsx)
  // — own table instead of reusing `tickets` since it carries the area
  // checklist and isn't tied to the generic per-project ticket form.
  feedback: defineTable({
    projectSlug: v.string(),
    type: v.union(v.literal("bug"), v.literal("suggestion"), v.literal("question")),
    title: v.string(),
    description: v.string(),
    name: v.string(),
    storeName: v.optional(v.string()),
    areas: v.optional(v.array(v.string())),
    userId: v.id("users"),
    createdAt: v.number(),
  }).index("by_project", ["projectSlug"]),
});
