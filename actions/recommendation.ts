"use server"

import { db } from "@/db";
import { and, eq, exists, not, or } from "drizzle-orm";
import { blocklist, user } from "@/db/schema";
import { getInfo } from "@/lib/get-session";

export const recommendedUsers = async () => {
    const data = await getInfo();
    const currentUser = data?.currentUser || null;
    
    if(!currentUser) return await db.query.user.findMany({
        where: eq(user.emailVerified, true),
        with: {
            stream: true
        }
    });

    
    const res = await db.query.user.findMany({
        where: and(
            not(eq(user.id, currentUser.id)),
            eq(user.emailVerified, true),
            not(
                exists(
                    db.select().from(blocklist).where(
                        or(
                            and(
                                eq(blocklist.blockerId, currentUser.id),
                                eq(blocklist.blockedId, user.id)
                            ),
                            and(
                                eq(blocklist.blockerId, user.id),
                                eq(blocklist.blockedId, currentUser.id)
                            )
                        )
                    )
                )
            )
        ),
        with: {
            stream: true
        }
    });

    return res;
}