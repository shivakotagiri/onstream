import { headers } from "next/headers";
import { auth } from "./auth";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { user } from "@/db/schema";
import { cache } from "react";


export const getInfo = cache(async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if(!session || !session.user) return null;

    const currentUser = await db.query.user.findFirst({
        where: eq(user.id, session.user.id),
    });
    
    if(currentUser && session.user.sessionVersion === currentUser.sessionVersion) {
        return {
            session,
            currentUser
        }
    } else {
        return null;
    }
});