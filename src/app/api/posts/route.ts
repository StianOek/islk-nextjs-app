import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { cookies } from "next/headers";
import { getUserFromSession } from "@/lib/auth/session";

// GET all posts with publisher name
export async function GET() {
  if (!pool) {
    return NextResponse.json(
      { error: "Database connection not available" },
      { status: 503 }
    );
  }

  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT 
        posts.*, 
        users.name AS author,
        COALESCE(pvc.view_count, 0) as view_count
       FROM posts
       JOIN users ON posts.user_id = users.id
       LEFT JOIN post_view_counts pvc ON posts.id = pvc.post_id
       ORDER BY published_at DESC
       LIMIT 12`
    );
    return NextResponse.json(result.rows);
  } finally {
    client.release();
  }
}

// CREATE a new post
export async function POST(req: Request) {
  // Get user from session
  const user = await getUserFromSession(await cookies());
  console.log(user);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Parse request body
  const { title, slug, body, imageUrl, excerpt } = await req.json();

  if (!title || !slug || !body) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  if (!pool) {
    return NextResponse.json(
      { error: "Database connection not available" },
      { status: 503 }
    );
  }

  const client = await pool.connect();

  try {
    // Insert post with UUID user_id
    const result = await client.query(
      `INSERT INTO posts (title, slug, body, image_url, excerpt, user_id)
   VALUES ($1, $2, $3, $4, $5, $6)
   RETURNING *`,
      [title, slug, body, imageUrl || null, excerpt || null, user.userId] // user.id must be UUID
    );

    // Attach publisher name for frontend
    const newPost = { ...result.rows[0], publisher_name: user.name };

    return NextResponse.json(newPost);
  } catch (err) {
    console.error("POST /api/posts error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}

// UPDATE an existing post
export async function PUT(req: Request) {
  const user = await getUserFromSession(await cookies());
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, title, slug, body, imageUrl, excerpt } = await req.json();

  if (!pool) {
    return NextResponse.json(
      { error: "Database connection not available" },
      { status: 503 }
    );
  }

  const client = await pool.connect();
  try {
    const result = await client.query(
      `UPDATE posts SET
        title = $1,
        slug = $2,
        body = $3,
        image_url = $4,
        excerpt = $5
       WHERE id = $6
       RETURNING *`,
      [title, slug, body, imageUrl, excerpt, id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Fetch publisher name
    const postWithPublisher = await client.query(
      `SELECT posts.*, users.name AS publisher_name
       FROM posts
       JOIN users ON posts.user_id = users.id
       WHERE posts.id = $1`,
      [id]
    );

    return NextResponse.json(postWithPublisher.rows[0]);
  } finally {
    client.release();
  }
}

// DELETE a post
export async function DELETE(req: Request) {
  const user = await getUserFromSession(await cookies());
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();

  if (!pool) {
    return NextResponse.json(
      { error: "Database connection not available" },
      { status: 503 }
    );
  }

  const client = await pool.connect();
  try {
    const result = await client.query(
      `DELETE FROM posts WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Post deleted successfully" });
  } finally {
    client.release();
  }
}
