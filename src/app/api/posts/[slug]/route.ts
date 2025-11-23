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
      `SELECT 
        posts.id, 
        posts.title, 
        posts.slug, 
        posts.body, 
        posts.excerpt, 
        posts.image_url, 
        posts.published_at,
        COALESCE(pvc.view_count, 0) as view_count
       FROM posts
       LEFT JOIN post_view_counts pvc ON posts.id = pvc.post_id
       WHERE posts.slug = $1
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
