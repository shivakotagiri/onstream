import { boolean, index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";


export const stream = pgTable("stream", {
    id: uuid("stream_id").defaultRandom().primaryKey(),
    name: text("name").notNull(),

    serverId: text("server_id").notNull().default(""),
    ingressId: text("ingress_id").notNull().default(""),
    secretKey: text("secret_key").notNull().default(""),

    isChatDelayed: boolean("is_chat_delayed").notNull().default(false),
    isChatEnabled: boolean("is_chat_enabled").notNull().default(false),
    isChatFollowersOnly: boolean("is_chat_followers_only").notNull().default(false),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull(),

    userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
},
    (table) => [
        index("stream_userId_idx").on(table.userId)
    ]
);