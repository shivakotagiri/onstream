"use client";

import { BetterAuthActionButton } from "@/components/better-auth-action-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import InputPassword from "@/components/ui/input-password"
import { authClient } from "@/lib/auth-client"
import { Label } from "@radix-ui/react-label"
import { useRouter } from "next/navigation"
import { ChangeEvent, useState } from "react"

export function PasswordResetForm({ token }: {
    token: string
}) {
    const [password, setPassword] = useState<string>("");
    const router = useRouter();
    return (
        <Card className="max-w-sm w-full">
            <CardHeader>
                <CardTitle className="text-xl">Reset Password</CardTitle>
                <CardDescription>
                    Please enter the new password to change the current password
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <Label>Password</Label>
                    <InputPassword 
                        value={password} 
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} 
                        placeholder="" 
                    />
                </div>
                <BetterAuthActionButton
                    action={async () => {
                        const newPassword = password.trim();
                        if(!newPassword) return { error: { message: "Password is required" } }
                        const res = await authClient.resetPassword({
                            newPassword: newPassword,
                            token,
                        });
                        router.push("/auth/login");
                        return res;
                    }}
                    successMessage="Reset Password Successful"
                >
                    Reset Password
                </BetterAuthActionButton>
            </CardContent>
        </Card>
    )
}