import { signIn } from "@/lib/auth-client";
import { GoogleIcon } from "./icons";
import { BetterAuthActionButton } from "./better-auth-action-button";

export function SignInWithGoogle() {
    return (
        <BetterAuthActionButton 
            className="w-full" 
            type="button"
            onClick={() => signIn.social({ provider: "google" })}
            action={() => {
                return signIn.social({
                    provider: "google" 
                })
            }}
            successMessage="Login Successfull"
        >
            Continue with Google <GoogleIcon />
        </BetterAuthActionButton>
    )
}