"use client";

import * as React from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useConvexAuth, useQuery } from "convex/react";
import { LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu";

import { api } from "@/convex/_generated/api";

function initials(name?: string | null, email?: string | null) {
  const source = name?.trim() || email?.trim() || "";
  if (!source) return "?";
  const parts = source.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return `${parts[0]![0]}${parts[1]![0]}`.toUpperCase();
  return source.slice(0, 2).toUpperCase();
}

// Signed-in Google identity, shown in the nav once Convex Auth has a
// session — see convex/users.ts `viewer`. Renders nothing while signed out.
export function UserMenu() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { signOut } = useAuthActions();
  const viewer = useQuery(api.users.viewer, isAuthenticated ? {} : "skip");

  // Temporary — remove once sign-in is confirmed reflecting correctly.
  React.useEffect(() => {
    console.log("[UserMenu] isLoading:", isLoading, "isAuthenticated:", isAuthenticated, "viewer:", viewer);
  }, [isLoading, isAuthenticated, viewer]);

  if (!isAuthenticated) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg outline-none ring-primary/40 transition-shadow focus-visible:ring-2">
        <Avatar>
          {viewer?.image && <AvatarImage src={viewer.image} alt={viewer.name ?? "Account"} />}
          <AvatarFallback>{initials(viewer?.name, viewer?.email)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="truncate">{viewer?.name ?? viewer?.email ?? "Account"}</DropdownMenuLabel>
        {viewer?.email && viewer.name && (
          <p className="truncate px-2 pb-1.5 text-xs text-muted-foreground">{viewer.email}</p>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => void signOut()} className="text-destructive focus:text-destructive">
          <LogOut className="h-4 w-4" aria-hidden="true" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
