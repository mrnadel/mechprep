CREATE TABLE "course_access" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"profession_id" text NOT NULL,
	"granted_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "feature_flags" (
	"key" text PRIMARY KEY NOT NULL,
	"enabled" boolean DEFAULT true NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"category" text DEFAULT 'general' NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "course_progress" ADD COLUMN "active_profession" text DEFAULT 'mechanical-engineering';--> statement-breakpoint
ALTER TABLE "course_progress" ADD COLUMN "course_intros" jsonb DEFAULT '{}'::jsonb;--> statement-breakpoint
ALTER TABLE "course_access" ADD CONSTRAINT "course_access_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "course_access_user_profession_idx" ON "course_access" USING btree ("user_id","profession_id");--> statement-breakpoint
CREATE INDEX "course_access_user_idx" ON "course_access" USING btree ("user_id");