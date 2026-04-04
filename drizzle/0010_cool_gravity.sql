ALTER TABLE "stream" RENAME COLUMN "server_id" TO "server_url";--> statement-breakpoint
ALTER TABLE "stream" RENAME COLUMN "secret_key" TO "stream_key";--> statement-breakpoint
ALTER TABLE "stream" ADD COLUMN "thumbnail_url" text;