import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  index,
  primaryKey,
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const blocklist = pgTable("blocklist", {
  blockerId: text("blocker_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  blockedId: text("blocked_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  }, (table) => ({
    pk: primaryKey({ columns: [table.blockerId, table.blockedId] }),
    blockerId: index("blocker_id").on(table.blockerId),
    blockedId: index("blocked_id").on(table.blockedId)
  })
);

export const blocklistRelations = relations(blocklist, ({ one }) => ({
  blocker: one(user, {
    fields: [blocklist.blockerId],
    references: [user.id]
  }),
  blockedUser: one(user, {
    fields: [blocklist.blockedId],
    references: [user.id]
  })
}));