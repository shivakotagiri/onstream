"use client";

import { updateSessionVersion } from "@/actions/user";
import { BetterAuthActionButton } from "@/components/better-auth-action-button";
import { Button } from "@/components/ui/button";
import { ChangePasswordDialog } from "@/components/ui/dialogs/change-password-dialog";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { User } from "@/db/schema";

export function SecuritySection({ currentUser, isCurrentUserHasPassword }: { currentUser: User, isCurrentUserHasPassword: boolean }) {
    const router = useRouter();
    async function handleSignoutEveryWhere() {
        // https://github.com/better-auth/better-auth/discussions/5526
        //TODO:- fix delay in signout of all users

        /* 
            when the user clicks the "sign out everywhere" -> it actually revokes all the devices session but the problem is 
            -> since we cached the session cookies for 5mins, the devices cant be signed out for 5 mins eventhough the sessions are revoked in the DB

            -> if we remove the cache the DB hits increases per each user request
            -> if we ensure the cache, the user from different devices cant be signed out
            
            -> SOLUTION:- https://chatgpt.com/c/6999e60a-8d8c-8320-ad74-151157ec9c21
                Session Version Pattern (try to search about it in google)
        */
        const updateSessionVersionRes = await updateSessionVersion(currentUser.id);
        if(updateSessionVersionRes) {
            const res = await authClient.revokeSessions();
            if(!res) {
                return { error: { message: "Unable to signout from all the devices" } }
            } else {
                router.refresh();
                toast.success("Signed out from all devices");
                return { error: null }
            }
        } else {
            toast.success("Something went wrong");
            return { error: null }
        }
    }

    return (
        <div className="flex md:flex-row w-full h-full justify-between mt-10 flex-col gap-5 border-b pb-10">
            <div className="flex flex-col w-full md:max-w-1/3 gap-1 md:border-0 border-b">
                <div className="text-base font-semibold">
                    Security
                </div>
                <span className="text-muted-foreground text-sm mb-5">
                    Manage your security settings to keep your account safe.
                </span>
            </div>
            <div className="flex flex-col gap-5 w-full">
                <div className="flex flex-col gap-3 w-full">
                    <div className="flex flex-col">
                        <div className="">Password</div>
                        <span className="text-sm text-muted-foreground">
                            Improve your security with a strong password.
                        </span>
                    </div>
                    { isCurrentUserHasPassword ? <ChangePasswordDialog currentUser={currentUser} text="Change Password" /> : <span className="text-red-500 text-sm hover:underline underline-offset-4 cursor-pointer">Add Password</span>}
                </div>
                <hr />
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1">
                        <div>Two Factor Authentication</div>
                        <span className="text-sm text-muted-foreground">
                            Add an extra layer of security to your Onstream account by using your password and a security code on your mobile phone to log in.
                        </span>
                    </div>
                    <Button className="max-w-xs">Set up Two-Factor Authentication</Button>
                </div>
                <hr />
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1">
                        <div>Sign out everywhere</div>
                        <span className="inline-block text-sm text-muted-foreground">
                            This will log out you of Onstream everywhere you&apos;re logged in, including third party applications. If you believe your account has been compromised, we recommend you{" "}
                            
                            <span className="inline">
                                <ChangePasswordDialog text="change your password" currentUser={currentUser}/>
                            </span>
                        </span>
                    </div>
                    <BetterAuthActionButton action={handleSignoutEveryWhere} className="max-w-xs cursor-pointer">Sign out Everywhere</BetterAuthActionButton>
                </div>
            </div>
        </div>
    )
}