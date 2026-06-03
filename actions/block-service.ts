/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { db } from "@/db";
import { blocklist } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { RoomServiceClient } from "livekit-server-sdk";
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


export const blockedByUser = async (blockerId: string) => {

    const currentUser = await getCurrentUser();
    if(!currentUser) return;
    if(!blockerId) return false;

    if(blockerId === currentUser.id) return false;

    const blockedByUser = await db.query.blocklist.findFirst({
        where: and(
            eq(blocklist.blockerId, blockerId),
            eq(blocklist.blockedId, currentUser.id),
        )
    });

    return !!blockedByUser;
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

    revalidatePath("/u/path:*");

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

    revalidatePath("/user/path:*");

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

const roomService = new RoomServiceClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
);


export async function onBlock(id: string) {
    const currentUser = await getCurrentUser();

    if(!currentUser?.id) return null;

    let blockedUser;

    try {
        blockedUser = await blockUser(id);
    } catch (err) {

    }
    
    try {
        await roomService.removeParticipant(currentUser?.id, id);
    } catch(err) {
        
    }

    revalidatePath(`/u/${currentUser.username}/community`);
    revalidatePath("/u/path:*");
    revalidatePath("/*");

    return blockedUser;
};


