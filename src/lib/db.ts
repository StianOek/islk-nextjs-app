// lib/db.ts
import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL not set");
}

// Neon gives a template-tag function you call with SQL
export const sql = neon(process.env.DATABASE_URL);

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
