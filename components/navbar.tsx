import { UserMenu } from "./user-menu";
import { LoginButton, SignupButton } from "./auth-buttons";
import { Search } from "./search";
import { Logo } from "./logo";
import { getSession } from "@/lib/get-session";

export async function Navbar() {
    const session = await getSession();

    return (
        <nav className="h-16 shadow-xl shadow-secondary/10 max-w-[90%] lg:max-w-[80%] mt-3 fixed top-0 left-1/2 -translate-x-1/2 bg-background w-full flex items-center gap-3 lg:gap-6 rounded-3xl px-4 lg:px-6">
            <div className="shrink-0">
                <Logo />
            </div>

            <div className="flex-1 flex h-10 justify-center">
                <div className="w-full h-full max-w-2xl lg:max-w-3xl xl:max-w-4xl">
                    <Search />
                </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
                {!session?.user && (
                    <div className="hidden md:flex gap-2">
                        <LoginButton />
                        <SignupButton />
                    </div>
                )}
                <UserMenu />
            </div>
        </nav>
    );
}
