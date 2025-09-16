"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import PostCard from "../../components/PostCard";
import PostModal from "../../components/PostModal";
import ConfirmModal from "@/components/layout/modals/ConfirmModal";
import { Post } from "@/types/posts";

export default function BlogDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [body, setBody] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);

  const [deletePostId, setDeletePostId] = useState<number | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const loadPosts = async () => {
    const res = await fetch("/api/posts");
    const data = await res.json();
    setPosts(data);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    if (gridRef.current) {
      gsap.from(gridRef.current.children, {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [posts]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !body) return;

    setLoading(true);
    const payload = {
      title,
      slug,
      body,
      imageUrl,
      excerpt: body.slice(0, 120),
      ...(editingPost ? { id: editingPost.id } : {}),
    };

    const url = "/api/posts";
    const method = editingPost ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      alert("Failed to save post");
      setLoading(false);
      return;
    }

    setTitle("");
    setSlug("");
    setBody("");
    setImageUrl("");
    setEditingPost(null);
    setModalOpen(false);
    loadPosts();
    setLoading(false);
  };

  const handleDelete = (id: number) => {
    setDeletePostId(id);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!deletePostId) return;
    const res = await fetch("/api/posts", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: deletePostId }),
    });

    if (res.ok) {
      setPosts(posts.filter((p) => p.id !== deletePostId));
    } else {
      alert("Failed to delete post");
    }

    setConfirmOpen(false);
    setDeletePostId(null);
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setTitle(post.title);
    setSlug(post.slug);
    setBody(post.body);
    setImageUrl(post.image_url || "");
    setModalOpen(true);
  };

  return (
    <main className="max-w-6xl mx-auto p-4 sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">
          ✍️ Blog Dashboard
        </h1>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold transition cursor-pointer"
        >
          + Create Post
        </button>
      </div>

      <div ref={gridRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <PostModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingPost(null);
          setTitle("");
          setSlug("");
          setBody("");
          setImageUrl("");
        }}
        title={title}
        slug={slug}
        body={body}
        imageUrl={imageUrl}
        loading={loading}
        editing={!!editingPost}
        setTitle={setTitle}
        setSlug={setSlug}
        setBody={setBody}
        setImageUrl={setImageUrl}
        handleSubmit={handleSubmit}
      />
      <ConfirmModal
        open={confirmOpen}
        message="Are you sure you want to delete this post? This action cannot be undone."
        onCancel={() => setConfirmOpen(false)}
        onConfirm={confirmDelete}
      />
    </main>
  );
}
