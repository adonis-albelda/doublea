import { convexAuthNextjsMiddleware } from "@convex-dev/auth/nextjs/server";

// verbose: true is temporary — logs the auth handshake to Vercel function
// logs so a broken redirect/cookie step is visible instead of just "signed
// out." Drop it once sign-in is confirmed working end-to-end.
export default convexAuthNextjsMiddleware(undefined, { verbose: true });

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
