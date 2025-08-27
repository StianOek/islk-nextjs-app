"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { MdMailOutline, MdLockOutline } from "react-icons/md";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const signUpSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});
type SignUpInputs = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInputs>({ resolver: zodResolver(signUpSchema) });

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    }
  }, []);

  const onSubmit = async (data: SignUpInputs) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (res.ok && result.ok) {
        toast.success("Account created!");
        router.push("/dashboard");
      } else {
        toast.error(result.error || "Signup failed");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
      <Toaster />
      <div
        ref={cardRef}
        className="w-full max-w-md rounded-2xl bg-gray-900/80 border border-gray-800 shadow-2xl backdrop-blur-lg p-8"
      >
        <h1 className="text-center text-3xl font-bold text-white mb-8">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Full Name"
              {...register("name")}
              className={`w-full rounded-xl border py-3 px-4 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 ${
                errors.name ? "border-red-500" : "border-gray-700 bg-gray-800"
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="relative">
            <MdMailOutline
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className={`w-full rounded-xl border py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 ${
                errors.email ? "border-red-500" : "border-gray-700 bg-gray-800"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="relative">
            <MdLockOutline
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              className={`w-full rounded-xl border py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 ${
                errors.password
                  ? "border-red-500"
                  : "border-gray-700 bg-gray-800"
              }`}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white shadow-lg transition hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
