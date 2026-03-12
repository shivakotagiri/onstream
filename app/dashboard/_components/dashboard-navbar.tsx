"use client";

import { UserMenu } from "@/components/user-menu"; 
import { Search } from "@/components/search"; 
import { Logo } from "@/components/logo"; 
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function NavbarDashboard() {
    const router = useRouter();
    return (
        <nav className="h-14 shadow-xl shadow-secondary/10 fixed left-1/2 -translate-x-1/2 bg-background w-full flex items-center gap-3 lg:gap-6 px-4 lg:px-6 z-10 border border-neutral-200 dark:border-neutral-800">
            <div className="shrink-0 flex items-center">
                <Logo />
            </div>

            <div className="flex-1 flex h-8 justify-center items-center">
                <div className="w-full h-full max-w-2xl lg:max-w-3xl xl:max-w-4xl">
                    <Search />
                </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
                <div className="flex gap-2">
                    <Button 
                        className="px-5 py-2 cursor-pointer"
                        variant={"outline"} 
                        onClick={() => router.push("/")}
                    >
                        Exit
                    </Button>
                </div>
                <UserMenu />
            </div>
        </nav>
    );
}
