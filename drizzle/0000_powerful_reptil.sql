CREATE TABLE IF NOT EXISTS "images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"filename" varchar(256) NOT NULL,
	"file_link" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
