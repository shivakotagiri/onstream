import { db } from "@/db";
import { getCurrentUser } from "./user"
import { eq, not } from "drizzle-orm";
import { blocklist, user } from "@/db/schema";

export const recommendationUsers = async () => {
    const currentUser = await getCurrentUser();
    if(!currentUser) return db.query.user.findMany({
        where: eq(user.emailVerified, true)
    });

    // const res = await db.select().from(blocklist).where(
        
    // )
}