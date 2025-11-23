import { z } from "zod";
import { maybeOne } from "@/lib/db";

import { generateSalt, hashPassword, verifyPassword } from "./crypto";
import { Cookies, createUserSession } from "./session";
import { signinSchema, signUpSchema } from "./validation";

export async function signUp(
  data: z.infer<typeof signUpSchema>,
  cookies: Pick<Cookies, "set">
) {
  // check if user exists
  const existingUser = await maybeOne<{ id: string }>`
    SELECT id FROM users WHERE email = ${data.email}
  `;
  if (existingUser) return "Account already exists for this email";

  const salt = generateSalt();
  const hashedPassword = await hashPassword(data.password, salt);

  const user = await maybeOne<{ id: string; role: "admin" | "user" }>`
    INSERT INTO users (name, email, password_hash, salt)
    VALUES (${data.name}, ${data.email}, ${hashedPassword}, ${salt})
    RETURNING id, role
  `;

  if (!user) return "Unable to create account";

  // create DB session
  await createUserSession({ userId: user.id, role: user.role }, cookies);
}

export async function signin(
  data: z.infer<typeof signinSchema>,
  cookies: Pick<Cookies, "set">
) {
  const user = await maybeOne<{
    id: string;
    password_hash: string;
    salt: string;
    role: "admin" | "user";
  }>`
    SELECT id, password_hash, salt, role FROM users WHERE email = ${data.email}
  `;

  if (!user) return "Invalid credentials";

  const valid = await verifyPassword(
    user.password_hash,
    data.password,
    user.salt
  );
  if (!valid) return "Invalid credentials";

  // create DB session with mutable cookies
  await createUserSession({ userId: user.id, role: user.role }, cookies);

  return { ok: true };
}
