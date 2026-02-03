"use server";

import { db } from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function checkUserForPasswordRequest(email: string) {
    const userData = await db.query.user.findFirst({
        where: eq(user.email, email)
    });

    return userData
}