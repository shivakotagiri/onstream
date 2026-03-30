import { db } from "@/db"
import { user } from "@/db/schema"
import { eq } from "drizzle-orm"

export const getStreamByUserId = async (userId: string) => {
    const stream = await db.query.stream.findFirst({
        where: eq(user.id, userId),
    });

    return stream;
}