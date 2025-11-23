import { getUserFromSession } from "@/lib/auth/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import pool from "@/lib/db";
import { 
  FiFileText, 
  FiCalendar, 
  FiTrendingUp, 
  FiEye,
  FiArrowRight,
  FiPlus,
  FiEdit3
} from "react-icons/fi";

interface Activity {
  id: string;
  type: string;
  title: string;
  description: string;
  timestamp: string;
  link: string;
}

interface Stats {
  totalPosts: number;
  totalEvents: number;
  totalViews: number;
  publishedThisMonth: number;
  growthPercentage: number;
}

async function getStats(): Promise<Stats> {
  try {
    if (!pool) {
      throw new Error("Database connection not available");
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

      return {
        totalPosts,
        totalEvents: 0,
        totalViews,
        publishedThisMonth,
        growthPercentage,
      };
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Error fetching stats:", error);
    return {
      totalPosts: 0,
      totalEvents: 0,
      totalViews: 0,
      publishedThisMonth: 0,
      growthPercentage: 0,
    };
  }
}

async function getRecentActivity(): Promise<Activity[]> {
  try {
    if (!pool) {
      throw new Error("Database connection not available");
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

      return activities;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Error fetching activity:", error);
    return [];
  }
}

function getTimeAgo(timestamp: string): string {
  const now = new Date();
  const past = new Date(timestamp);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  return past.toLocaleDateString();
}

export default async function Dashboard() {
  const cookieStore = await cookies();
  const session = await getUserFromSession(cookieStore);
  if (!session) {
    redirect("/auth");
  }

  const [stats, recentActivity] = await Promise.all([
    getStats(),
    getRecentActivity(),
  ]);

  return (
    <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Welcome back 👋
        </h1>
        <p className="text-base sm:text-lg text-gray-600">
          Here's what's happening with your content today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <FiFileText className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
              +{stats.publishedThisMonth} this month
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats.totalPosts}</h3>
          <p className="text-sm text-gray-600 mt-1">Total Blog Posts</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
              <FiCalendar className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats.totalEvents}</h3>
          <p className="text-sm text-gray-600 mt-1">Upcoming Events</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
              <FiEye className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats.totalViews.toLocaleString()}</h3>
          <p className="text-sm text-gray-600 mt-1">Total Views</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              stats.growthPercentage >= 0 ? "bg-green-100" : "bg-red-100"
            }`}>
              <FiTrendingUp className={`h-6 w-6 ${
                stats.growthPercentage >= 0 ? "text-green-600" : "text-red-600"
              }`} />
            </div>
          </div>
          <h3 className={`text-2xl font-bold ${
            stats.growthPercentage >= 0 ? "text-gray-900" : "text-red-600"
          }`}>
            {stats.growthPercentage > 0 ? "+" : ""}{stats.growthPercentage}%
          </h3>
          <p className="text-sm text-gray-600 mt-1">Growth This Month</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 sm:p-8 text-white shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] duration-200">
          <div className="flex items-start justify-between mb-4 sm:mb-6">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <FiFileText className="h-6 w-6 sm:h-7 sm:w-7" />
            </div>
            <FiPlus className="h-5 w-5 sm:h-6 sm:w-6 opacity-80" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Blog Posts</h2>
          <p className="text-blue-100 mb-4 sm:mb-6 text-sm sm:text-base">
            Create, edit, and manage all your blog posts. Share your stories with the world.
          </p>
          <Link
            href="/dashboard/blog"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors group text-sm sm:text-base"
          >
            <span>Manage Posts</span>
            <FiArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 sm:p-8 text-white shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] duration-200">
          <div className="flex items-start justify-between mb-4 sm:mb-6">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <FiCalendar className="h-6 w-6 sm:h-7 sm:w-7" />
            </div>
            <FiPlus className="h-5 w-5 sm:h-6 sm:w-6 opacity-80" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Events</h2>
          <p className="text-purple-100 mb-4 sm:mb-6 text-sm sm:text-base">
            Organize and track your upcoming events. Keep your community engaged.
          </p>
          <Link
            href="/dashboard/events"
            className="inline-flex items-center gap-2 bg-white text-purple-600 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl font-semibold hover:bg-purple-50 transition-colors group text-sm sm:text-base"
          >
            <span>Manage Events</span>
            <FiArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 lg:p-8 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Recent Activity</h2>
          <Link 
            href="/dashboard/blog" 
            className="text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
          >
            <span className="hidden sm:inline">View all</span>
            <span className="sm:hidden">All</span>
            <FiArrowRight className="h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="space-y-3 sm:space-y-4">
          {recentActivity.length > 0 ? (
            recentActivity.map((activity) => {
              const Icon = activity.type === "post" ? FiEdit3 : activity.type === "event" ? FiCalendar : FiTrendingUp;
              const colorClass = activity.type === "post" 
                ? "bg-blue-100 text-blue-600 group-hover:text-blue-600" 
                : activity.type === "event"
                ? "bg-purple-100 text-purple-600 group-hover:text-purple-600"
                : "bg-green-100 text-green-600 group-hover:text-green-600";
              
              return (
                <Link
                  key={activity.id}
                  href={activity.link}
                  className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl hover:bg-gray-50 transition-colors group"
                >
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${colorClass.split(' ')[0]} ${colorClass.split(' ')[1]}`}>
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs sm:text-sm font-semibold text-gray-900 transition-colors ${colorClass.split(' ')[2]}`}>
                      {activity.title}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">
                      {activity.description}
                    </p>
                    <p className="text-xs text-gray-500 mt-1.5 sm:mt-2">
                      {getTimeAgo(activity.timestamp)}
                    </p>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="text-center py-8">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
                <FiEdit3 className="h-6 w-6 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600">No recent activity</p>
              <p className="text-xs text-gray-500 mt-1">Create your first blog post to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
