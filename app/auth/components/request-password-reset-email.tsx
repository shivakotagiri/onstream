"use client";

import { BetterAuthActionButton } from "@/components/better-auth-action-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { Label } from "@radix-ui/react-label";
import { ChangeEvent, useRef, useState } from "react";

export function RequestResetPasswordEmail({ email, setEmail }: {
    email: string,
    setEmail: (email: string) => void,
}) {
    const interval = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
    const [resetTimeToResend, setResetTimeResend] = useState<number>(0);

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
                    action={async () => {
                        const res = await authClient.requestPasswordReset({
                            email: email.trim().toLowerCase(),
                            redirectTo: "/auth/reset-password",
                        });

                        if(!res.error) {
                            startResendCooldown();
                        }
                        return res;
                    }} 
                    successMessage="Password Reset link sent successfully"
                >
                    {resetTimeToResend > 0 ? `Reset Password (${resetTimeToResend})`: "Reset Password"}
                </BetterAuthActionButton>
            </CardContent>
        </Card>
    )
}