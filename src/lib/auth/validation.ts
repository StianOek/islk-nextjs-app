// lib/validation.ts
import { z } from "zod";

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const signUpSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().min(3).max(254),
  password: z.string().min(8).max(200),
});
