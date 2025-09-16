"use client";

import Image from "next/image";
import React from "react";

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
  if (!open) return null;

  const handleFiles = async (file: File) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/files", { method: "POST", body: formData });
    const data = await res.json();
    if (res.ok) setImageUrl(data.url);
  };

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

          {/* Upload Zone */}
          <div onDragOver={(e) => e.preventDefault()} className="flex gap-4">
            <label
              htmlFor="fileInput"
              onDrop={(e) => {
                e.preventDefault();
                const files = e.dataTransfer.files;
                if (files.length > 0) handleFiles(files[0]);
              }}
              className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition border-gray-300 dark:border-gray-600 `}
            >
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="Preview"
                  width={500}
                  height={500}
                  className="mx-auto max-h-40 rounded-lg object-contain"
                />
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <svg
                    className="w-8 h-8 mb-2 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 16v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1M12 12v9m0-9l-3 3m3-3l3 3M16 6a4 4 0 0 1-8 0 4 4 0 0 1 8 0z"
                    />
                  </svg>
                  <p className="text-gray-500 text-sm">
                    <b>Tap to upload</b> or drag an image
                  </p>
                </div>
              )}
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  // 🔹 show preview immediately
                  const reader = new FileReader();
                  reader.onloadend = () => setImageUrl(reader.result as string);
                  reader.readAsDataURL(file);

                  // 🔹 also upload to server
                  handleFiles(file);
                }}
              />
            </label>
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
