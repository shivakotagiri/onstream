"use server";

import { db } from "@/db"
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export const usersData = async () => {
    const res = await db.query.users.findMany({})
    return res;
}

export const userSearchData = async (username: string) => {
    const cleanUsername = username.trim().toLowerCase();
    const res = await db.query.users.findFirst({
        where: eq(users.username, cleanUsername)
    });

    return res;
}