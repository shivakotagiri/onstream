"use client";

import { BetterAuthActionButton } from "@/components/better-auth-action-button";
import { SignInWithGoogle } from "@/components/signin-with-google";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TextSeparator from "@/components/ui/text-separator";
import { authClient, useSession } from "@/lib/auth-client";
import { useSignupStore } from "@/lib/form-state";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";


export function EmailVerificationForm() {
    const { email } = useSignupStore();
    const session = useSession()
    const router = useRouter();
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


    useEffect(() => {
        if(session.data?.user.email) router.push("/");
        else if(!email) router.push("/auth/signup");
    }, [router, email, session.data?.user.email]);

    if(!email) return null;

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
                    <Input value={email} readOnly />
                </div>
                <BetterAuthActionButton 
                    disabled={timeToNextResend > 0} 
                    action={async () => {
                        const res = await authClient.sendVerificationEmail({
                            callbackURL: "/",
                            email,
                        });

                        if(!res.error) {
                            startResendCooldown();
                        }

                        return res;
                    }}
                    successMessage="Verification email sent"
                >
                    {timeToNextResend > 0  ? `Resend Email (${timeToNextResend})`: "Resend Email"}
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