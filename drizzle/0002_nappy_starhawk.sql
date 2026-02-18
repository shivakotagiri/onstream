CREATE TABLE "blocklist" (
	"blocker_id" text NOT NULL,
	"blocking_id" text NOT NULL,
	CONSTRAINT "blocklist_blocker_id_blocking_id_pk" PRIMARY KEY("blocker_id","blocking_id")
);
--> statement-breakpoint
ALTER TABLE "blocklist" ADD CONSTRAINT "blocklist_blocker_id_user_id_fk" FOREIGN KEY ("blocker_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "blocklist" ADD CONSTRAINT "blocklist_blocking_id_user_id_fk" FOREIGN KEY ("blocking_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "blocker_id" ON "blocklist" USING btree ("blocker_id");--> statement-breakpoint
CREATE INDEX "blocking_id" ON "blocklist" USING btree ("blocking_id");