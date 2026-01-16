import { uuid, pgTable, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const userTable = pgTable("users", {
    id: uuid().defaultRandom().primaryKey(),
    username: varchar({ length: 255 }).notNull().unique(),
    externalUserId: varchar().notNull().unique(),
    imageUrl: text().notNull(),
    bio: text(),

    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp().defaultNow().$onUpdate(() => new Date())
})