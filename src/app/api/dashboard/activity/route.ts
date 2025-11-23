import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getUserFromSession } from "@/lib/auth/session";
import pool from "@/lib/db";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = await getUserFromSession(cookieStore);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!pool) {
      return NextResponse.json(
        { error: "Database connection not available" },
        { status: 503 }
      );
    }

    const client = await pool.connect();

    try {
      // Fetch recent posts (last 5)
      const postsResult = await client.query(
        `SELECT id, title, slug, published_at
         FROM posts
         ORDER BY published_at DESC
         LIMIT 5`
      );

      // Transform posts into activity items
      const activities = postsResult.rows.map((post) => ({
        id: `post-${post.id}`,
        type: "post",
        title: "New blog post published",
        description: `"${post.title}" was published successfully`,
        timestamp: post.published_at,
        link: `/dashboard/blog`,
      }));

      // Sort by timestamp
      activities.sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );

      return NextResponse.json(activities.slice(0, 5));
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Error fetching activity:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
