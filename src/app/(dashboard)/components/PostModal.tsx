"use client";

import React from "react";
import { useDropzone } from "react-dropzone";

interface PostModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  slug: string;
  body: string;
  imageUrl: string;
  loading: boolean;
  editing: boolean;
  setTitle: (val: string) => void;
  setSlug: (val: string) => void;
  setBody: (val: string) => void;
  setImageUrl: (val: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export default function PostModal({
  open,
  onClose,
  title,
  slug,
  body,
  imageUrl,
  loading,
  editing,
  setTitle,
  setSlug,
  setBody,
  setImageUrl,
  handleSubmit,
}: PostModalProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/files", { method: "POST", body: formData });
      const data = await res.json();
      if (res.ok) setImageUrl(data.url);
    },
    accept: { "image/*": [] },
    multiple: false,
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-4">
          {editing ? "Edit Post" : "Create Post"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {editing ? "Update Post" : "Create Post"}
          </button>
        </form>
      </div>
    </div>
  );
}
