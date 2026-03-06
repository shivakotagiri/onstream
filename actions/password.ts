"use server";

import { db } from "@/db";
import { user } from "@/db/schema";
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

export const setPassword = async (password: string) => {
    const res = await auth.api.setPassword({
        body: {
            newPassword: password
        },
        headers: await headers(),
    });

    return res.status;
}

export async function requestPasswordReset(email: string) {
    const res = await authClient.requestPasswordReset({
        email,
        redirectTo: "/auth/reset-password",
    });
    return res
}

export async function checkUserForPasswordRequest(email: string) {
    const userData = await db.query.user.findFirst({
        where: eq(user.email, email)
    });
    return userData
}

export async function changePassword(currentPassword: string, newPassword: string) {
    if(!currentPassword || !newPassword) return {
        status: false,
        message: "Password is missing",
    }

    if(currentPassword === newPassword) return {
        status: false,
        message: "New Password can't be same as current password",
    }

    try {
        const res = await auth.api.changePassword({
            body: {
                currentPassword,
                newPassword,
                revokeOtherSessions: true
            },
            headers: await headers()
        })

        return {
            status: !!res,
            message: "Password updated successfully"
        }

    } catch(err: unknown) {
        return {
            status: false,
            message: err instanceof Error ? err.message: "Something went wrong, Failed to update the password"
        }
    }
}
