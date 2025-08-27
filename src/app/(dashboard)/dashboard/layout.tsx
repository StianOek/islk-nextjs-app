import { Inter } from "next/font/google";
import "../../../globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dashboard",
  description: "Manage your blog posts and events",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside className="hidden md:flex md:flex-col w-64 bg-white border-r shadow-sm p-6">
            <h2 className="text-2xl font-bold text-blue-600 mb-8">Dashboard</h2>
            <nav className="space-y-3">
              <Link
                href="/dashboard"
                className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium"
              >
                Home
              </Link>
              <Link
                href="/dashboard/blog"
                className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium"
              >
                Blog Posts
              </Link>
              <Link
                href="/dashboard/events"
                className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium"
              >
                Events
              </Link>
            </nav>
          </aside>

          {/* Mobile top bar */}
          <header className="flex md:hidden w-full bg-white shadow-sm px-4 py-3 items-center justify-between">
            <h2 className="text-lg font-bold text-blue-600">Dashboard</h2>
            <button className="p-2 rounded-lg hover:bg-gray-100">
              {/*   <Menu className="h-6 w-6 text-gray-600" /> */}
            </button>
          </header>

          {/* Main content */}
          <main className="flex-1 p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
