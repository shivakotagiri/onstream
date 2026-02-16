"use server";

import { db } from "@/db"
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

export const usersData = async () => {
    const res = await db.query.user.findMany({})
    return res;
}

export const userSearchData = async (username: string) => {
    const cleanUsername = username.trim().toLowerCase();
    const res = await db.query.user.findFirst({
        where: eq(user.username, cleanUsername)
    });

    return res;
}