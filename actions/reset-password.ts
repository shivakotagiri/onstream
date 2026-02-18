"use server";

import { db } from "@/db";
import { user } from "@/db/schema";
import { authClient } from "@/lib/auth-client";
import { eq } from "drizzle-orm";

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
