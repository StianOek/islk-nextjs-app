"use client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SignoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/signout", { method: "POST" });
      if (res.ok) {
        toast.success("Logged out!");
        router.push("/auth");
      } else {
        toast.error("Failed to logout");
      }
    } catch {
      toast.error("Error logging out");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
    >
      Logout
    </button>
  );
}
