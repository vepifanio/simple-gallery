import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import dotenv from 'dotenv';
dotenv.config();

const { DB_URL } = process.env;

const pool = new Pool({
  connectionString: DB_URL
});

export const db = drizzle(pool);