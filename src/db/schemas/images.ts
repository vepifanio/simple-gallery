import { pgTable, uuid, timestamp, varchar } from 'drizzle-orm/pg-core';

export const images = pgTable('images', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  fileName: varchar('filename', { length: 256 }).notNull(),
  fileLink: varchar('file_link', { length:256 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
});