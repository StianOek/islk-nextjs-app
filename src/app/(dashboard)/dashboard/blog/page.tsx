"use client";

import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";

interface Post {
  id: number;
  title: string;
  slug: string;
  body: string;
  image_url?: string;
  excerpt?: string;
  published_at: string;
}

export default function BlogDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [body, setBody] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // Load posts
  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  // Dropzone setup
  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/files", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        console.error("Upload failed", data);
        return;
      }

      setImageUrl(data.url);
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  // Create post
  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !body) return;

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        slug,
        body,
        imageUrl,
        excerpt: body.slice(0, 120),
      }),
    });

    if (!res.ok) {
      alert("Error saving post");
      return;
    }

    const newPost = await res.json();
    setPosts([newPost, ...posts]);
    setTitle("");
    setSlug("");
    setBody("");
    setImageUrl("");
  };

  return (
    <main className="max-w-4xl mx-auto p-8">
      <motion.h1
        className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-gray-100"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        ✍️ Manage Blog Posts
      </motion.h1>

      {/* Post Form */}
      <motion.form
        onSubmit={handleAddPost}
        className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg space-y-4 mb-10 border border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="text"
          placeholder="Slug (e.g. my-first-post)"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-orange-500"
        />
        <textarea
          placeholder="Post Content"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full p-3 h-32 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-orange-500"
        />

        {/* Drag & Drop Upload */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition 
            ${isDragActive ? "border-orange-500 bg-orange-50" : "border-gray-300 dark:border-gray-600"}`}
        >
          <input {...getInputProps()} />
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Preview"
              className="mx-auto max-h-48 rounded-lg shadow-md"
            />
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              {isDragActive
                ? "Drop the image here..."
                : "Drag & drop an image, or click to select"}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Save Post
        </button>
      </motion.form>

      {/* Posts List */}
      <div className="grid sm:grid-cols-2 gap-6">
        {posts.map((post) => (
          <motion.div
            key={post.id}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700"
            whileHover={{ scale: 1.02 }}
          >
            {post.image_url && (
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full h-40 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="font-bold text-xl mb-1 text-gray-900 dark:text-gray-100">
                {post.title}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(post.published_at).toLocaleDateString("nb-NO")}
              </p>
              <p className="mt-2 text-gray-700 dark:text-gray-300 line-clamp-3">
                {post.excerpt || post.body.slice(0, 150)}...
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
