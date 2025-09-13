import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { cookies } from "next/headers";
import { getUserFromSession } from "@/lib/auth/session";

export async function GET() {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "SELECT * FROM posts ORDER BY published_at DESC LIMIT 12"
    );
    return NextResponse.json(result.rows);
  } finally {
    client.release();
  }
}

export async function POST(req: Request) {
  const user = await getUserFromSession(await cookies()); // <-- your session system
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, slug, body, imageUrl, excerpt } = await req.json();

  const client = await pool.connect();
  try {
    const result = await client.query(
      `INSERT INTO posts (title, slug, body, image_url, excerpt)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [title, slug, body, imageUrl, excerpt]
    );

    return NextResponse.json(result.rows[0]);
  } finally {
    client.release();
  }
}
