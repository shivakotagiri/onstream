"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export function LoginButton() {
    const router = useRouter();
    return (
        <Button
            className="cursor-pointer hover:bg-neutral-100"
            type="button"
            variant={"outline"}
            onClick={() => router.push("/auth/login")}
        >
            Log In
        </Button>
    )
}

export function SignupButton() {
    const router = useRouter();
    return (
        <Button
            className="cursor-pointer hover:bg-neutral-100"
            type="button"
            variant={"outline"}
            onClick={() => router.push("/auth/signup")}
        >
            Sign Up
        </Button>
    )
}
