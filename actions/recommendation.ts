import { db } from "@/db";
import { getCurrentUser } from "./user"
import { and, eq, exists, not, or } from "drizzle-orm";
import { blocklist, user } from "@/db/schema";

export const recommendationUsers = async () => {
    const currentUser = await getCurrentUser();
    
    if(!currentUser) return await db.query.user.findMany({
        where: eq(user.emailVerified, true)
    });

    const res = await db.select().from(user).where(
        and(
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
        )
    );

    return res;
}