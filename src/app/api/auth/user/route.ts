import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getUserFromSession } from "@/lib/auth/session";
import { maybeOne } from "@/lib/db";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = await getUserFromSession(cookieStore);

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Fetch user details from database
    const user = await maybeOne<{ name: string; email: string }>`
      SELECT name, email
      FROM users
      WHERE id = ${session.userId}
    `;

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
