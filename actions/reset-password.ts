"use server";

import { authClient } from "@/lib/auth-client";

export async function requestPasswordReset(email: string) {
    const res = await authClient.requestPasswordReset({
        email,
        redirectTo: "/auth/reset-password",
    });
    return res
}
