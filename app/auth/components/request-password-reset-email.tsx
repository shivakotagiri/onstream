"use client";

import { checkUserForPasswordRequest } from "@/actions/check-user-for-password-reset";
import { BetterAuthActionButton } from "@/components/better-auth-action-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import z from "zod";

const emailZod = z.email();

export function RequestResetPasswordEmail() {
    const interval = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
    const [resetTimeToResend, setResetTimeResend] = useState<number>(0);
    const router = useRouter();
    const [email, setEmail] = useState<string>("");

    function startResendCooldown(time = 30) {
        clearInterval(interval.current);
        setResetTimeResend(time)
        interval.current = setInterval(() => {
            setResetTimeResend(prev => {
                if(prev <= 1) {
                    clearInterval(interval.current);
                    return 0;
                }
                return prev - 1;
            })
        }, 1000);
    }

    async function handleRequest() {
        const { success } = await emailZod.safeParseAsync(email)
        if(!success) {
            return { error: { message: "Invalid Email Format" } }
        }
        const res = await checkUserForPasswordRequest(email);
        if(!res || !res.email) {
            return {
                error: {
                    message: "User not found, Please signup first"
                }
            };
        }
        
        if(!res.emailVerified) {
            router.push("/auth/email-verification");
            return {
                error: {
                    message: "Email not verified, Please verify your email"
                }
            };
        }

        const result = await authClient.requestPasswordReset({
            email: email.trim().toLowerCase(),
            redirectTo: "/auth/reset-password",
        });

        if(!result.error) {
            startResendCooldown();
        }

        if(result.error) {
            return { error: { message: result.error.message } }
        }

        return result;
    }

    useEffect(() => {
        return () => clearInterval(interval.current);
    }, [])

    return (
        <Card className="max-w-md w-full">
            <CardHeader>
                <CardTitle className="text-lg">
                    Reset your password
                </CardTitle>
                <CardDescription>Please enter your email to reset the password</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <Label>Email</Label>
                    <Input
                        value={email}
                        onChange={(e:ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    />
                </div>
                <BetterAuthActionButton 
                    disabled={resetTimeToResend > 0}
                    action={handleRequest} 
                    successMessage="Password Reset link sent successfully"
                >
                    {resetTimeToResend > 0 ? `Reset Password (${resetTimeToResend})`: "Reset Password"}
                </BetterAuthActionButton>
            </CardContent>
        </Card>
    )
}