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
  const [fetchingPosts, setFetchingPosts] = useState(true);

  const [deletePostId, setDeletePostId] = useState<number | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const loadPosts = async () => {
    try {
      setFetchingPosts(true);
      const res = await fetch("/api/posts", {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to fetch posts");
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error("Error loading posts:", error);
    } finally {
      setFetchingPosts(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    // Only animate once on initial load
    if (gridRef.current && posts.length > 0 && !hasAnimated.current) {
      hasAnimated.current = true;
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
    try {
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
        throw new Error("Failed to save post");
      }

      // Reset form
      setTitle("");
      setSlug("");
      setBody("");
      setImageUrl("");
      setEditingPost(null);
      setModalOpen(false);

      // Reload posts
      await loadPosts();
    } catch (error) {
      console.error("Error saving post:", error);
      alert("Failed to save post. Please try again.");
    } finally {
      setLoading(false);
    }
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
    <main className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Blog Posts
          </h1>
          <p className="text-sm sm:text-base text-gray-400 mt-1 sm:mt-2">
            Create and manage your blog content
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200 text-sm sm:text-base cursor-pointer"
        >
          <span className="text-lg sm:text-xl">+</span>
          <span>Create Post</span>
        </button>
      </div>

      {fetchingPosts ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-gray-900/80 rounded-2xl shadow-lg overflow-hidden border border-gray-800 animate-pulse backdrop-blur-lg"
            >
              <div className="w-full h-48 bg-gray-800" />
              <div className="p-4 space-y-3">
                <div className="h-6 bg-gray-800 rounded w-3/4" />
                <div className="h-4 bg-gray-800 rounded w-1/2" />
                <div className="space-y-2">
                  <div className="h-3 bg-gray-800 rounded" />
                  <div className="h-3 bg-gray-800 rounded" />
                  <div className="h-3 bg-gray-800 rounded w-5/6" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">📝</span>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No posts yet</h3>
          <p className="text-gray-400 mb-6">Create your first blog post to get started</p>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
          >
            <span className="text-xl">+</span>
            <span>Create Your First Post</span>
          </button>
        </div>
      ) : (
        <div ref={gridRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard
              key={`post-${post.id}-${post.slug}`}
              post={post}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

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
