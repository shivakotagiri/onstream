"use server"

/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from "@/db"
import { blocklist, stream } from "@/db/schema";
import { and, eq, ne, notExists } from "drizzle-orm";
import { Stream } from "@/db/schemas/auth-schema"
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/actions/user";

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


export const getStreams = async () => {
    const currentUser = await getCurrentUser();
    const userId = currentUser?.id || null;

    let stream = [];

    if(userId) {
        stream = await db.query.stream.findMany({
            with: {
                user: true
            },
            where: (stream) => and(
                ne(stream.userId, userId),
                notExists(
                    db.select().from(blocklist).where(
                        and(eq(blocklist.blockerId, stream.userId), eq(blocklist.blockedId, userId))
                    ),
                ),
            ),
            orderBy: (stream, { desc, asc }) => [desc(stream.isLive), asc(stream.updatedAt)],
        })
    } else {
        stream = await db.query.stream.findMany({
            with: {
                user: true,
            },
            orderBy: (stream, { desc, asc }) => [desc(stream.isLive), asc(stream.updatedAt)],
        });
    }

    return stream;
}


