"use server";

import { db } from "@/db";
import { blocklist } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { getCurrentUser } from "./user";


export const blockedUsersList = async () => {
    const currentUser = await getCurrentUser();
    if(!currentUser) return [];

    const blockedUsers = await db.query.blocklist.findMany({
        where: eq(blocklist.blockerId, currentUser.id),
        with: {
            blockedUser: true
        }
    });

    return blockedUsers;
}


export const isUserBlocked = async (blockerId: string, blockedId: string) => {
    if(!blockerId || !blockedId) return false;

    if(blockerId === blockedId) return false;

    const isUserBlocked = await db.query.blocklist.findFirst({
        where: and(
            eq(blocklist.blockerId, blockerId),
            eq(blocklist.blockedId, blockedId),
        )
    });

    return !!isUserBlocked;
}

export const blockUser = async (blockedId: string) => {
    const currentUser = await getCurrentUser();
    if(!currentUser) return {
        status: false,
        message: "Login first",
    }
    const blockerId = currentUser.id;
    if(!blockerId || !blockedId) return {
        status: false,
        message: "User not found",
    }
    if(blockerId === blockedId) return {
        status: false,
        message: "User can't be same",
    }

    const res = await db.insert(blocklist)
        .values({ blockerId, blockedId })
        .onConflictDoNothing()
        .returning();

    if(res.length === 0) {
        return { 
            status: false, 
            message: "User already blocked" 
        }
    }

    return {
        status: !!res,
        message: "Blocked the user"
    }
}

export const unBlockUser = async (blockerId: string, blockedId: string) => {
    if(!blockerId || !blockedId) return {
        status: false,
        message: "User not found",
        res: null
    }
    if(blockerId === blockedId) return {
        status: false,
        message: "Invalid user",
        res: null
    }

    const res = await db.delete(blocklist).where(
        and(
            eq(blocklist.blockerId, blockerId),
            eq(blocklist.blockedId, blockedId)
        )
    ).returning();

    if(res.length === 0) {
        return {
            status: false,
            message: "User is not blocked",
            res: null
        }
    }

    return {
        status: !!res,
        message: "Unblocked user",
        res
    }
}


