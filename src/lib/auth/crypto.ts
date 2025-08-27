import crypto from "crypto";
import argon2 from "argon2";

// Generate random salt per user
export function generateSalt(len = 16) {
  return crypto.randomBytes(len).toString("hex");
}

// Hash password + salt
export async function hashPassword(password: string, salt: string) {
  return argon2.hash(password + salt, { type: argon2.argon2id });
}

// Verify password + salt against hash
export async function verifyPassword(
  hash: string,
  password: string,
  salt: string
) {
  if (!hash || !hash.startsWith("$argon2")) {
    throw new Error("Invalid password hash in DB");
  }
  return argon2.verify(hash, password + salt);
}
