import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { headers } from "next/headers";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (!pool) {
      return NextResponse.json(
        { error: "Database connection not available" },
        { status: 503 }
      );
    }

    const client = await pool.connect();

    try {
      // Get post ID from slug
      const postResult = await client.query(
        `SELECT id FROM posts WHERE slug = $1`,
        [slug]
      );

      if (postResult.rows.length === 0) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
      }

      const postId = postResult.rows[0].id;

      // Get IP and user agent for basic tracking
      const headersList = await headers();
      const ipAddress =
        headersList.get("x-forwarded-for") ||
        headersList.get("x-real-ip") ||
        "unknown";
      const userAgent = headersList.get("user-agent") || "unknown";

      // Insert view record
      await client.query(
        `INSERT INTO post_views (post_id, ip_address, user_agent)
         VALUES ($1, $2, $3)`,
        [postId, ipAddress, userAgent]
      );

      return NextResponse.json({ success: true });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Error tracking view:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
