"use client";

import { useState } from "react";

interface Post {
  id: number;
  title: string;
  content: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleAddPost = () => {
    if (!title || !content) return;
    setPosts([...posts, { id: Date.now(), title, content }]);
    setTitle("");
    setContent("");
  };

  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">Blog Posts</h1>

      <div className="mb-6 space-y-2">
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <textarea
          placeholder="Post Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button
          onClick={handleAddPost}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Post
        </button>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="p-4 bg-white rounded shadow">
            <h2 className="font-bold text-lg">{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
