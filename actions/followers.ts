import { db } from "@/db"
import { followers } from "@/db/schema"
import { and, eq } from "drizzle-orm"

export const userFollowers = async (userId: string) => {
    if(!userId) return [];
    const res = await db.query.followers.findMany({
        where: eq(followers.followingId, userId)
    });
    return res;
}

export const isCurrentUserFollowing = async (followerId: string, followingId: string) => {
    if(!followerId || followingId) return false;
    const res = await db.query.followers.findFirst({
        where: and(
            eq(followers.followerId, followerId),
            eq(followers.followingId, followingId)
        )
    });

    return res;
}