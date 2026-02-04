"use client";
import { signOut, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { BetterAuthActionButton } from "./better-auth-action-button";

export default function Signout() {
    const router = useRouter();
    const session = useSession();
    async function handleSignout() {
        if(!session || !session.data || !session.data.user) {
            return { error: { message: "User is already logged out" } }
        } 
        const res = await signOut();
        router.push("/auth/login");
        return res;
    }
    return (
        <BetterAuthActionButton
            variant={"destructive"} 
            className="cursor-pointer" 
            type="button"
            action={handleSignout}
        >
            Sign out
        </BetterAuthActionButton>
    )
}