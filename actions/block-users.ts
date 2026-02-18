"use server";

import { db } from "@/db";
import { blocklist } from "@/db/schema";
import { and, eq } from "drizzle-orm";

interface blockUsersProps {
    blockerId: string,
    blockingId: string
}

export const blockUsers = async ({ blockerId, blockingId }: blockUsersProps) => {
    if(!blockerId || blockingId) return false;
    if(blockerId === blockingId) return false;

    const res = await db.insert(blocklist).values({
        blockerId,
        blockingId
    }).returning();

    return !!res;
}

export const unBlockUsers = async ({ blockerId, blockingId }: blockUsersProps) => {
    if(!blockerId || !blockingId) return false;
    if(blockerId === blockingId) return false;

    const res = await db.delete(blocklist).where(and(
        eq(blocklist.blockerId, blockerId),
        eq(blocklist.blockingId, blockingId) 
    ));

    return !!res;
}