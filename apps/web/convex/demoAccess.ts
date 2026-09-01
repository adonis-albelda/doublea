import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";

import { api } from "./_generated/api";
import { action, internalMutation, query } from "./_generated/server";

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
    email: v.optional(v.string()),
    password: v.optional(v.string()),
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

// Fetches a per-user demo login (email + real password) from the Tally
// superadmin API — the URL and API key are Convex env vars (server-side
// only, never in client code). Requires sign-in since the call is keyed off
// the caller's email. This is the real demo login now, not the old fixed
// account in the `demoAccess` table.
export const fetchAccessCode = action({
  args: {},
  handler: async (
    ctx,
  ): Promise<{ code: string; demoEmail: string; password: string; validForDate: string | null }> => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Sign in required to fetch an access code.");

    const viewer = await ctx.runQuery(api.users.viewer, {});
    if (!viewer?.email) throw new Error("No email on your account — can't fetch an access code.");

    const apiUrl = process.env.TALLY_API_URL;
    const apiKey = process.env.TALLY_API_KEY;
    if (!apiUrl || !apiKey) throw new Error("Demo access codes aren't configured yet.");

    const url = new URL(apiUrl);
    url.searchParams.set("email", viewer.email);

    // POST + `X-Demo-Access-Key` header — confirmed via manual curl testing
    // against the real endpoint (GET / other header names all 401).
    const response = await fetch(url, {
      method: "POST",
      headers: { "X-Demo-Access-Key": apiKey },
    });
    if (!response.ok) {
      throw new Error(`Access code request failed (${response.status}).`);
    }

    const body: {
      data?: { code?: string; demo_email?: string; password?: string; valid_for_date?: string };
    } = await response.json();
    const code = body.data?.code;
    const demoEmail = body.data?.demo_email;
    const password = body.data?.password;
    if (!code) throw new Error("Access code response was missing `data.code`.");
    if (!demoEmail) throw new Error("Access code response was missing `data.demo_email`.");
    if (!password) throw new Error("Access code response was missing `data.password`.");

    return { code, demoEmail, password, validForDate: body.data?.valid_for_date ?? null };
  },
});
