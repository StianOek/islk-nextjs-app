import { Inter } from "next/font/google";
import "../../../globals.css";
import DashboardSidebar from "./DashboardSidebar";

const inter = Inter({ subsets: ["latin"] });

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-gray-900 via-gray-800 to-black`}>
        <div className="flex min-h-screen">
          <DashboardSidebar />
          
          {/* Main Content - Responsive spacing */}
          <div className="flex-1 flex flex-col min-h-screen w-full md:ml-72">
            {/* Page Content with proper mobile spacing */}
            <main className="flex-1 w-full p-4 sm:p-6 lg:p-8 pt-20 md:pt-4">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
