"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut, useSession } from "@/lib/auth-client"
import {
  BadgeCheckIcon,
  BellIcon,
  LayoutDashboard,
  LogIn,
  LogOutIcon,
  SunMoon,
  User2Icon,
} from "lucide-react"
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function UserMenu() {
    const {theme, setTheme} = useTheme();
    const session = useSession();
    const router = useRouter();
    async function handleSignout() {
        if(!session || !session.data || !session.data.user) {
            return { error: { message: "User is already logged out" } }
        } 
        const res = await signOut();
        if(res.error) {
            toast.error(res.error.message || "Failed to Sign out")
        } else {
            toast.success("Signed out");
            router.refresh();
        }
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar>
                    <AvatarImage src={session.data?.user.image || "NA"} alt="shadcn" />
                    <AvatarFallback>{session.data?.user.email[0] || <User2Icon />}</AvatarFallback>
                </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {(session.data && session.data.user) ? <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <BadgeCheckIcon />
                        Account
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <LayoutDashboard />
                        Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <BellIcon />
                        Notifications
                    </DropdownMenuItem>
                </DropdownMenuGroup> : <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => setTheme(theme === "light" ? "dark": "light")}>
                        <SunMoon />
                        Theme
                    </DropdownMenuItem>
                </DropdownMenuGroup>}
                <DropdownMenuSeparator />
                {(session.data && session.data.user) ? <DropdownMenuItem onClick={handleSignout}>
                    <LogOutIcon />
                    Sign Out
                </DropdownMenuItem>: <DropdownMenuItem onClick={() => router.push("/auth/login")}>
                    <LogIn />
                    Log In
                </DropdownMenuItem>}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
