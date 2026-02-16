"use server"

import { db } from "@/db"
import { user } from "@/db/schema"
import { eq } from "drizzle-orm"

export const checkUsernameAvailability = async (username: string) => {
    if(!username || username.length < 3) {
        return { available: false }
    }
    const res = await db.query.user.findFirst({
        where: eq(user.username, username),
    });

    if(res && res.id) {
        return { available: false }
    }
    return { available: true };
}