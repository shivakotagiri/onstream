ALTER TABLE "rate_limit" ALTER COLUMN "key" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "rate_limit" ALTER COLUMN "count" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "rate_limit" ALTER COLUMN "last_request" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "banner_image" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "bio" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "dob" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "phone_number" text DEFAULT '';--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "phone_number_verified" boolean;--> statement-breakpoint
ALTER TABLE "rate_limit" ADD CONSTRAINT "rate_limit_key_unique" UNIQUE("key");