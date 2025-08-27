import SignoutButton from "@/components/ui/buttons/SignoutButton";
import { getUserFromSession } from "@/lib/auth/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Dashboard() {
  const cookieStore = await cookies();
  const session = await getUserFromSession(cookieStore);
  if (!session) {
    redirect("/auth");
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back 👋</h1>
          <p className="text-gray-600">
            Manage your blog posts and upcoming events.
          </p>
        </div>
        <SignoutButton />
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <Link
          href="/dashboard/blog"
          className="bg-white rounded-2xl p-6 shadow hover:shadow-md transition flex flex-col justify-between"
        >
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Blog Posts</h2>
            <p className="text-gray-600 mt-2">
              Create, edit, and manage all your blog posts.
            </p>
          </div>
          <div className="mt-4 text-blue-600 font-medium">Go to Blog →</div>
        </Link>

        <Link
          href="/dashboard/events"
          className="bg-white rounded-2xl p-6 shadow hover:shadow-md transition flex flex-col justify-between"
        >
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Events</h2>
            <p className="text-gray-600 mt-2">
              Organize and track your upcoming events.
            </p>
          </div>
          <div className="mt-4 text-blue-600 font-medium">Go to Events →</div>
        </Link>
      </div>
    </div>
  );
}
