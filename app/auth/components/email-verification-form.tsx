"use client";

import { checkUserForPasswordRequest } from "@/actions/password"; 
import { BetterAuthActionButton } from "@/components/better-auth-action-button";
import { SignInWithGoogle } from "@/components/signin-with-google";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TextSeparator from "@/components/ui/text-separator";
import { authClient, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import z from "zod";

const emailZod = z.email();
export function EmailVerificationForm() {
    const session = useSession()
    const router = useRouter();
    const [email, setEmail] = useState<string>("");
    const [timeToNextResend, setTimeToNextResend] = useState<number>(0);
    const interval = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

    function startResendCooldown(duration = 30) {
        clearInterval(interval.current);
        setTimeToNextResend(duration);

        interval.current = setInterval(() => {
            setTimeToNextResend(prev => {
                if(prev <= 1) {
                    clearInterval(interval.current);
                    return 0;
                } 
                return prev - 1;
            });
        }, 1000);
    }

    async function handleEmailVerification() {
        const { success } =  await emailZod.safeParseAsync(email);
        if(!success) {
            return { error: { message: "Invalid Email Format" } }
        }
        const userData = await checkUserForPasswordRequest(email.trim().toLowerCase());
        if(!userData || !userData.email) {
            return { error: { message: "User not found" } }
        }

        if(userData.email && userData.emailVerified) {
            return { error: { message: "Email is already verified, please try to login with your credentials."} }
        }

        const res = await authClient.sendVerificationEmail({
            callbackURL: "/",
            email: userData.email,
        });

        if(!res.error) {
            startResendCooldown();
        }

        return res;
    }


    useEffect(() => {
        if(session.data?.user.email) router.push("/");
    }, [router, session.data?.user.email]);

    return (
        <Card className="max-w-md w-full">
            <CardHeader>
                <CardTitle className="text-lg">Email Verification</CardTitle>
                <CardDescription>
                    Please check your email for a verification link within 24 hours to activate your account or else your account will be deleted.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
                <div className="flex flex-col gap-3">
                    <Label>Email</Label>
                    <Input value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
                </div>
                <BetterAuthActionButton 
                    disabled={timeToNextResend > 0} 
                    action={handleEmailVerification}
                    successMessage="Verification email sent"
                >
                    {timeToNextResend > 0  ? `Resend Email (${timeToNextResend})`: "Send Email"}
                </BetterAuthActionButton>
                <TextSeparator text="or" />
                <SignInWithGoogle />
                <CardFooter className="flex flex-col gap-3">
                    <CardDescription>
                        Join our onstream community, enjoy our members live streaming content.
                    </CardDescription>
                </CardFooter>
            </CardContent>
        </Card>
    )
}