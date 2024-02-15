import type { Config } from 'drizzle-kit';
import dotenv from 'dotenv';
dotenv.config();

const { DB_HOST, DB_USER, DB_NAME, DB_PASSWORD } = process.env;

if (!(DB_HOST && DB_USER && DB_NAME && DB_PASSWORD)) {
  throw new Error('Some db environment variable is missing.');
}

export default {
  schema: './src/db/schemas/index.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
  },
} satisfies Config;