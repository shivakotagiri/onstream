"use client";
import { signOut } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function Signout() {
    const router = useRouter();
    async function handleSignout() {
        await signOut();
        router.push("/auth/login");
    }
    return (
        <Button
            variant={"destructive"} 
            className="cursor-pointer" 
            type="button"
            onClick={handleSignout}
        >
            Sign out
        </Button>
    )
}