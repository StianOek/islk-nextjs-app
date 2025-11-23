"use client";

import Image from "next/image";
import React from "react";
import { FiEdit2, FiTrash2, FiUser, FiEye } from "react-icons/fi";

interface Post {
  id: number;
  title: string;
  slug: string;
  body: string;
  image_url?: string;
  excerpt?: string;
  published_at: string;
  author?: string;
  view_count?: number;
}

interface PostCardProps {
  post: Post;
  onEdit: (post: Post) => void;
  onDelete: (id: number) => void;
}

export default function PostCard({ post, onEdit, onDelete }: PostCardProps) {
  console.log(post.author);
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col   relative">
      {post.image_url && (
        <Image
          width={1000}
          height={1000}
          src={post.image_url}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      )}

      {/* Action icons */}
      <div className="absolute top-3 right-3 flex gap-2">
        <button
          onClick={() => onEdit(post)}
          className="p-2 bg-gray-100 hover:bg-gray-200 text-slate-800 rounded-lg shadow-md transition cursor-pointer"
          title="Edit Post"
        >
          <FiEdit2 className="h-4 w-4" />
        </button>
        <button
          onClick={() => onDelete(post.id)}
          className="p-2 bg-gray-100 hover:bg-gray-200 text-slate-800 rounded-lg shadow-md transition cursor-pointer"
          title="Delete Post"
        >
          <FiTrash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h2 className="font-bold text-lg mb-1 text-gray-900 dark:text-gray-100">
          {post.title}
        </h2>
        <section className="flex items-center justify-between mb-2">
          <p className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
            <FiUser className="mr-1" /> {post.author}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(post.published_at).toLocaleDateString("nb-NO")}
          </p>
        </section>

        <p className="mt-2 text-gray-700 dark:text-gray-300 line-clamp-3 flex-grow">
          {post.excerpt || post.body.slice(0, 150)}...
        </p>

        {/* View count */}
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <p className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
            <FiEye className="mr-1.5" />
            <span className="font-medium">{post.view_count || 0}</span>
            <span className="ml-1">views</span>
          </p>
        </div>
      </div>
    </div>
  );
}
