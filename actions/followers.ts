"use server";

import { db } from "@/db"
import { followers } from "@/db/schema"
import { getSession } from "@/lib/get-session";
import { and, eq } from "drizzle-orm"
import { cache } from "react";

export const userFollowers = cache(async (userId: string) => {
    if(!userId) return [];
    const res = await db.query.followers.findMany({
        where: eq(followers.followingId, userId),
        with: {
            follower: true,
        }
    });
    return res;
})

export const usersFollowed = cache(async (userId: string) => {
    if(!userId) return [];
    const res = await db.query.followers.findMany({
        where: eq(followers.followerId, userId),
        with: {
            following: true
        }
    })

    return res;
})

export const isCurrentUserFollowing = async (followingId: string) => {
    if(!followingId) return false;

    const session = await getSession();
    if(!session || !session.user) return false;

    const followerId = session.user.id;
    const res = await db.query.followers.findFirst({
        where: and(
            eq(followers.followerId, followerId),
            eq(followers.followingId, followingId)
        )
    });

    if(!res || !res.followerId) return false

    return true;
}

export const followUser = async (followingId: string) => {
    const session = await getSession();
    if(!session || !session.user) return false;

    const followerId = session.user.id;

    if(!followingId || !followerId) return null;
    if(followingId === followerId) return null;

    const res = await db.insert(followers)
        .values({ followerId, followingId })
        .onConflictDoNothing()
        .returning();

    if(res.length === 0) return null;

    return res;
}

export const unFollowUser = async (followingId: string) => {
    const session = await getSession();
    if(!session || !session.user) return false;

    const followerId = session.user.id;
    
    if(!followerId || !followingId) return null;
    if(followerId === followingId) return null;

    const res = await db.delete(followers)
        .where(
            and(
                eq(followers.followerId, followerId),
                eq(followers.followingId, followingId)
            )
        ).returning();

    if(res.length === 0) return null;
}