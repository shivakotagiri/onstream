import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  index,
  primaryKey,
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const followers = pgTable("followers", {
  followerId: text("follower_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  followingId: text("following_id").notNull().references(() => user.id, {onDelete: "cascade"}),
  createdAt: timestamp("created_at").defaultNow().notNull()
}, (table) => ({
  pk: primaryKey({ columns: [table.followerId, table.followingId] }),
  followerIdx: index("followers_follower_idx").on(table.followerId),
  followingIdx: index("followed_following_idx").on(table.followingId)
}));

export const followersRelations = relations(followers, ({ one }) => ({
  follower: one(user, {
    relationName: "follower",
    fields: [followers.followerId],
    references: [user.id],
  }),
  following: one(user, {
    relationName: "following",
    fields: [followers.followingId],
    references: [user.id]
  })
}))