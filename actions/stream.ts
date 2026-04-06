import { db } from "@/db"
import { stream } from "@/db/schema";
import { eq } from "drizzle-orm"

export const getStreamByUserId = async (userId: string) => {
    if(!userId) return null;
    
    const res = await db.query.stream.findFirst({
        where: eq(stream.userId, userId),
    });

    return res;
}