ALTER TABLE "blocklist" RENAME COLUMN "blocking_id" TO "blocked_id";--> statement-breakpoint
ALTER TABLE "blocklist" DROP CONSTRAINT "blocklist_blocking_id_user_id_fk";
--> statement-breakpoint
DROP INDEX "blocking_id";--> statement-breakpoint
ALTER TABLE "blocklist" DROP CONSTRAINT "blocklist_blocker_id_blocking_id_pk";--> statement-breakpoint
ALTER TABLE "blocklist" ADD CONSTRAINT "blocklist_blocker_id_blocked_id_pk" PRIMARY KEY("blocker_id","blocked_id");--> statement-breakpoint
ALTER TABLE "blocklist" ADD CONSTRAINT "blocklist_blocked_id_user_id_fk" FOREIGN KEY ("blocked_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "blocked_id" ON "blocklist" USING btree ("blocked_id");