import { db } from "@/db"

export const usersData = async () => {
    const res = await db.query.users.findMany({})
    return res;
}