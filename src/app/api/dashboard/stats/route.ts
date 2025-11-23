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
      // Get total posts count
      const postsResult = await client.query(
        `SELECT COUNT(*) as total FROM posts`
      );
      const totalPosts = parseInt(postsResult.rows[0]?.total || "0");

      // Get posts published this month
      const thisMonthResult = await client.query(
        `SELECT COUNT(*) as total 
         FROM posts 
         WHERE DATE_TRUNC('month', published_at) = DATE_TRUNC('month', CURRENT_DATE)`
      );
      const publishedThisMonth = parseInt(thisMonthResult.rows[0]?.total || "0");

      // Get last month's posts for growth calculation
      const lastMonthResult = await client.query(
        `SELECT COUNT(*) as total 
         FROM posts 
         WHERE DATE_TRUNC('month', published_at) = DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month')`
      );
      const lastMonthPosts = parseInt(lastMonthResult.rows[0]?.total || "0");

      // Calculate growth percentage
      let growthPercentage = 0;
      if (lastMonthPosts > 0) {
        growthPercentage = Math.round(
          ((publishedThisMonth - lastMonthPosts) / lastMonthPosts) * 100
        );
      } else if (publishedThisMonth > 0) {
        growthPercentage = 100;
      }

      // Get total views from analytics
      const viewsResult = await client.query(
        `SELECT COUNT(*) as total FROM post_views`
      );
      const totalViews = parseInt(viewsResult.rows[0]?.total || "0");

      const stats = {
        totalPosts,
        totalEvents: 0, // Placeholder - add events table later
        totalViews,
        publishedThisMonth,
        growthPercentage,
      };

      return NextResponse.json(stats);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
