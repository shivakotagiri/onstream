DROP INDEX "followers_following_idx";--> statement-breakpoint
CREATE INDEX "followed_following_idx" ON "followers" USING btree ("following_id");