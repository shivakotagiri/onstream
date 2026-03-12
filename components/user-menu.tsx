"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "@/lib/auth-client";
import {
  BadgeCheckIcon,
  LayoutDashboard,
  LogIn,
  LogOutIcon,
  Settings,
  SunMoon,
  User2Icon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// type User = {
//     id: string;
//     createdAt: Date;
//     updatedAt: Date;
//     email: string;
//     emailVerified: boolean;
//     name: string;
//     image?: string | null | undefined;
//     phoneNumber: string | null | undefined;
//     bio: string | null | undefined;
//     bannerImage: string | null | undefined;
//     sessionVersion: number | null | undefined;
//     dob?: Date | null | undefined;
//     username?: string | null | undefined;
//     displayUsername?: string | null | undefined;
//     phoneNumberVerified?: boolean | null | undefined;
// } | undefined

export function UserMenu() {
  const user = useSession().data?.user;
  const { theme, setTheme } = useTheme();
  const router = useRouter();
 
  async function handleSignout() {
    if (!user) return;

    await signOut({
      fetchOptions: {
        onSuccess: async() => {
          toast.success("Signed out");
          router.push("/");
          await router.refresh();
        },
        onError: async (error) => {
          toast.error(error?.error.message || "Failed to sign out");
        }
      }
    });

    // if (res?.error) {
    //   toast.error(res.error.message || "Failed to sign out");
    // } else {
    //   toast.success("Signed out");
    // }
  }

  const firstLetter = user?.name?.charAt(0)?.toUpperCase() ?? user?.email?.charAt(0)?.toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar key={user?.id ?? "guest"}>
            {user?.image && <AvatarImage src={user.image} />}
            <AvatarFallback>
              {firstLetter ?? <User2Icon size={18} />}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          {user && (
            <>
              <DropdownMenuItem
                onClick={() =>
                  user.username && router.push(`/user/${user.username}`)
                }
              >
                <BadgeCheckIcon size={16} />
                Profile
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                <LayoutDashboard size={16} />
                Dashboard
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => router.push("/settings")}>
                <Settings size={16} />
                Settings
              </DropdownMenuItem>
            </>
          )}

          <DropdownMenuItem
            onClick={() =>
              setTheme(theme === "light" ? "dark" : "light")
            }
          >
            <SunMoon size={16} />
            Theme
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {user ? (
          <DropdownMenuItem onClick={handleSignout}>
            <LogOutIcon size={16} />
            Sign Out
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => router.push("/auth/login")}>
            <LogIn size={16} />
            Log In
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


// bug: fix: avatar not updating after sign out without hard reload
// solution:- 

/*
  The issue is a **session sync problem** between the server component (`Navbar`) and the client component (`UserMenu`).

Here's what's happening:

1. `Navbar` is a **server component** that fetches the session once on render
2. After `signOut()`, you call `router.refresh()` — but `UserMenu` uses `useSession()` from the auth client, which updates reactively
3. The `Avatar` fallback shows `<User2Icon>` only when `user` is falsy, but the avatar component may be holding stale state or the `AvatarFallback` isn't re-rendering because the `Avatar` component tree doesn't fully unmount/remount

The fix is to **add a `key` prop tied to the user state** so React fully remounts the Avatar when the user changes, and ensure the fallback logic is clean:

```tsx
// In UserMenu - the core fix
<Avatar key={user?.id ?? "guest"}>  {// Forces remount on user change }
  {user?.image && <AvatarImage src={user.image} />}
  <AvatarFallback>
    {firstLetter ?? <User2Icon size={18} />}
  </AvatarFallback>
</Avatar>

The secondary issue is your `router.refresh()` after signout. Since `Navbar` reads session server-side, the refresh is correct — but if `useSession()` from `auth-client` updates *before* the router refresh completes, you get a flash of stale UI. Sequence the calls more carefully:

async function handleSignout() {
  if (!user) return;

  await signOut({
    fetchOptions: {
      onSuccess: async () => {
        toast.success("Signed out");
        router.push("/");
        await router.refresh(); // Wait for server state to sync
      }
    }
  });
}

The key={user?.id ?? "guest"} is the most important fix — it forces React to **destroy and recreate** the Avatar component when switching between authenticated and unauthenticated states, so the fallback icon renders immediately without needing a hard reload.
*/