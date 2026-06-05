"use client";

import { GoogleIcon } from "./icons";
import { signIn } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export function SignInWithGoogle() {
    async function handleSignInWithGoogle() {
        await signIn.social({
            provider: "google",
            newUserCallbackURL: "/welcome",
            callbackURL: "/",
        })
    }
    return (
        <Button onClick={handleSignInWithGoogle} className="w-full" type="button">
            <span>Continue with Google </span>
            <GoogleIcon />
        </Button>
    )
}
