import { UserMenu } from "./user-menu";
import { SignupButton } from "./auth-buttons";
import { Search } from "./search";
import { Logo } from "./logo";
import { type Session } from "@/lib/auth-client"
import { getStreams } from "@/actions/stream";
import { User } from "@/db/schema";

interface NavbarProps {
    session: Session | null,
    streamData: {
        id: string;
        name: string;
        userId: string;
        thumbnailUrl: string | null;
        isLive: boolean;
        user: User
    }[]
}

export function Navbar({ session, streamData }: NavbarProps) { 
    return (
        <nav className="h-14 shadow-xl shadow-secondary/10 fixed left-1/2 -translate-x-1/2 bg-background w-full flex items-center gap-3 lg:gap-6 px-4 lg:px-6 z-10 border border-neutral-200 dark:border-neutral-800">
            <div className="shrink-0 flex items-center">
                <Logo />
            </div>

            <div className="flex-1 flex h-10 justify-center items-center w-full">
                <div className="w-full h-full max-w-3xl">
                    <Search data={streamData} />
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
