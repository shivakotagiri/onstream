ALTER TABLE "stream" ADD COLUMN "is_live" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "stream" ADD CONSTRAINT "stream_user_id_unique" UNIQUE("user_id");