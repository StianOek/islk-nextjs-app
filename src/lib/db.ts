// lib/db.ts
import { neon } from "@neondatabase/serverless";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL && process.env.NODE_ENV !== "production") {
  console.warn("DATABASE_URL not set - database features will be unavailable");
}

// Neon gives a template-tag function you call with SQL
export const sql = DATABASE_URL ? neon(DATABASE_URL) : (() => {
  throw new Error("DATABASE_URL not configured");
}) as ReturnType<typeof neon>;

export async function one<T extends Record<string, unknown>>(
  q: TemplateStringsArray,
  ...params: unknown[]
): Promise<T> {
  const rows = await sql(q, ...params);
  if (rows.length !== 1) {
    throw new Error(`Expected 1 row, got ${rows.length}`);
  }
  return rows[0] as T;
}

export async function maybeOne<T extends Record<string, unknown>>(
  q: TemplateStringsArray,
  ...params: unknown[]
): Promise<T | null> {
  const rows = await sql(q, ...params);
  return (rows[0] as T) ?? null;
}

import { Pool } from "pg";

const pool = DATABASE_URL ? new Pool({
  connectionString: DATABASE_URL, // from Neon dashboard
  ssl: { rejectUnauthorized: false }, // Neon requires SSL
}) : null;

export default pool;
