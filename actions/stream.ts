"use server"

/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from "@/db"
import { stream } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Stream } from "@/db/schemas/auth-schema"
import { revalidatePath } from "next/cache";

export const getStreamByUserId = async (userId: string) => {
    if(!userId) return null;
    
    const res = await db.query.stream.findFirst({
        where: eq(stream.userId, userId),
    });

    return res;
}

export async function updateStream(data: Partial<Stream>) {
    if(!data || !data.userId) return null;
    
    const current = await db.query.stream.findFirst({
        where: eq(stream.userId, data.userId),
    });

    if(!current) return null;

    try {
        const updateData = Object.fromEntries(
            Object.entries({
                name: data.name,
                isChatDelayed: data.isChatDelayed,
                isChatEnabled: data.isChatEnabled,
                isChatFollowersOnly: data.isChatFollowersOnly,
                isLive: data.isLive,
                thumbnailUrl: data.thumbnailUrl,
                serverUrl: data.serverUrl,
                ingressId: data.ingressId,
                streamKey: data.streamKey,
            }).filter(([_, value]) => value !== undefined)
        );
        
        const res = await db
            .update(stream)
            .set(updateData)
            .where(eq(stream.userId, current.userId))
            .returning();

        revalidatePath("/u/*");

        return res;
    } catch(err) {
        console.error(err);
        return null;
    }
}