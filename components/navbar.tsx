import { UserMenu } from "./user-menu";
import { SignupButton } from "./auth-buttons";
import { Search } from "./search";
import { Logo } from "./logo";
import { getSession } from "@/lib/get-session";

export async function Navbar() {
    const session = await getSession();
    // max-w-[90%] lg:max-w-[80%] top-3 rounded-3xl

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
                {!session?.user && (
                    <div className="hidden md:flex gap-2">
                        <SignupButton />
                    </div>
                )}
                <UserMenu />
            </div>
        </nav>
    );
}
