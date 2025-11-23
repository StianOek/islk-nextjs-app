import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  if (!pool) {
    return NextResponse.json(
      { error: "Database connection not available" },
      { status: 503 }
    );
  }

  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT id, title, slug, body, excerpt, image_url, published_at
       FROM posts
       WHERE slug = $1
       LIMIT 1`,
      [slug]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } finally {
    client.release();
  }
}
