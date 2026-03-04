import { signIn } from "@/lib/auth-client";
import { GoogleIcon } from "./icons";
import { BetterAuthActionButton } from "./better-auth-action-button";

export function SignInWithGoogle() {
    return (
        <BetterAuthActionButton 
            className="w-full" 
            type="button"
            action={async () => {
                const res = await signIn.social({
                        provider: "google",
                        callbackURL: "/",
                    })
                if(!res) {
                    return { error: { message: "Something went wrong"} }
                } else {
                    return { error: null }
                }
            }}
        >
        Continue with Google <GoogleIcon />
        </BetterAuthActionButton>
    )
}