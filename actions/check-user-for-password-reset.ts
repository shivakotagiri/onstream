"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function checkUserForPasswordRequest(email: string) {
    const userData = await db.query.users.findFirst({
        where: eq(users.email, email)
    });

    return userData
}