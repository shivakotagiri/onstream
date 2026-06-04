import { GoogleIcon } from "./icons";
import { BetterAuthActionButton } from "./better-auth-action-button";
import { signIn } from "@/lib/auth-client";

export function SignInWithGoogle() {
    return (
        <BetterAuthActionButton 
            className="w-full" 
            type="button"
            action={async () => {
                const res = await signIn.social({
                    provider: "google",
                    callbackURL: "/",
                    newUserCallbackURL: "/welcome",
                });

                if(!res) return { error: { message: "Something went wrong" } }
                else { return { error: null } }
            }}
        >
        Continue with Google <GoogleIcon />
        </BetterAuthActionButton>
    )
}