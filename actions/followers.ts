"use server";

import { db } from "@/db"
import { followers } from "@/db/schema"
import { and, eq } from "drizzle-orm"

export const userFollowers = async (userId: string) => {
    if(!userId) return [];
    const res = await db.query.followers.findMany({
        where: eq(followers.followingId, userId),
        with: {
            follower: true,
        }
    });
    return res;
}

export const usersFollowed = async (userId: string) => {
    if(!userId) return [];
    const res = await db.query.followers.findMany({
        where: eq(followers.followerId, userId),
        with: {
            following: true
        }
    })

    return res;
}

export const isCurrentUserFollowing = async (followerId: string, followingId: string) => {
    if(!followerId || !followingId) return false;
    const res = await db.query.followers.findFirst({
        where: and(
            eq(followers.followerId, followerId),
            eq(followers.followingId, followingId)
        )
    });

    if(!res || !res.followerId) return false

    return true;
}

export const followUser = async (followerId: string, followingId: string) => {
    if(!followingId || !followerId) return null;
    if(followingId === followerId) return null;
    const res = await db.insert(followers).values({
        followerId,
        followingId
    }).returning();

    return res;
}

export const unFollowUser = async (followerId: string, followingId: string) => {
    if(!followerId || !followingId) return null;
    if(followerId === followingId) return null;
    await db.delete(followers).where(and(
        eq(followers.followerId, followerId),
        eq(followers.followingId, followingId)
    ))
}