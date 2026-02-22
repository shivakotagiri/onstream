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

export function UserMenu() {
  const { theme, setTheme } = useTheme();
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const user = session?.user;

  if (isPending) {
    return null;
  }

  async function handleSignout() {
    if (!user) return;

    const res = await signOut();

    if (res?.error) {
      toast.error(res.error.message || "Failed to sign out");
    } else {
      toast.success("Signed out");
    }
  }

  const firstLetter =
    user?.email?.charAt(0)?.toUpperCase() ?? undefined;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar>
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

              <DropdownMenuItem>
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
