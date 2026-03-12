"use server"

import { headers } from "next/headers";
import { auth } from "./auth";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { user } from "@/db/schema";

export async function getSession() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if(!session || !session.user) return null;

    const currentUser = await db.query.user.findFirst({
        where: eq(user.id, session.user.id)
    });
    
    if(currentUser && session.user.sessionVersion === currentUser.sessionVersion) {
        return session;
    } else {
        return null;
    }
}