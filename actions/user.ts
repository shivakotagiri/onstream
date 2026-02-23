"use server";

import { db } from "@/db"
import { user } from "@/db/schema";
import { getSession } from "@/lib/get-session";
import { eq } from "drizzle-orm";
import { cache } from "react";

export type currentUserType = {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
    username: string | null;
    displayUsername: string | null;
    phoneNumber: string | null;
    phoneNumberVerified: boolean | null;
    bio: string | null;
    bannerImage: string | null;
    dob: Date | null;
}

export const usersData = async () => {
    const res = await db.query.user.findMany({})
    return res;
}

export const userSearchData = (async (username: string) => {
    const cleanUsername = username.trim();
    const res = await db.query.user.findFirst({
        where: eq(user.username, cleanUsername)
    });

    return res;
});

export const currentUserData = async () => {
    const session = await getSession();
    if(!session || !session.user) return null;
    
    const currentUserData = await db.select().from(user).where(eq(user.id, session.user.id));
    return currentUserData[0];
}




