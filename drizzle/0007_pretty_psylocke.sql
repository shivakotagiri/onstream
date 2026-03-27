CREATE TABLE "stream" (
	"stream_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"server_id" text DEFAULT '',
	"ingress_id" text DEFAULT '',
	"secret_key" text DEFAULT '',
	"is_chat_delayed" boolean DEFAULT false,
	"is_chat_enabled" boolean DEFAULT false,
	"is_chat_followers_only" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "stream" ADD CONSTRAINT "stream_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "stream_userId_idx" ON "stream" USING btree ("user_id");