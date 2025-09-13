import crypto from "crypto";
import { z } from "zod";
import { sql, maybeOne } from "@/lib/db";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

const SESSION_EXPIRATION_SECONDS = 60 * 60 * 24 * 7; // 7 days
const COOKIE_SESSION_KEY = "session-id";

const userRoles = ["admin", "user"] as const;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const sessionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  role: z.enum(userRoles),
  expiresAt: z.string(),
  name: z.string(),
});

export type UserSession = z.infer<typeof sessionSchema>;

export type Cookies = {
  set: (
    key: string,
    value: string,
    options: {
      secure?: boolean;
      httpOnly?: boolean;
      sameSite?: "strict" | "lax";
      expires?: number;
    }
  ) => void;
  get: (key: string) => { name: string; value: string } | undefined;
  delete: (key: string) => void;
};

// ----------------- CREATE SESSION -----------------
export async function createUserSession(
  user: Pick<UserSession, "userId" | "role">,
  cookies: Pick<Cookies, "set">
) {
  const sessionId = crypto.randomBytes(64).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_EXPIRATION_SECONDS * 1000);

  await sql`
    INSERT INTO sessions (id, user_id, role, expires_at)
    VALUES (${sessionId}, ${user.userId}, ${user.role}, ${expiresAt})
  `;

  setCookie(sessionId, cookies, expiresAt);
}

// ----------------- GET SESSION -----------------
export async function getUserFromSession(
  cookies: Pick<ReadonlyRequestCookies, "get">
) {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
  if (!sessionId) return null;

  return getUserSessionById(sessionId);
}

async function getUserSessionById(sessionId: string) {
  const session = await maybeOne<UserSession>`
    SELECT id, user_id as "userId", role, expires_at as "expiresAt"
    FROM sessions
    WHERE id = ${sessionId} AND expires_at > NOW()
  `;
  return session ?? null;
}

// ----------------- UPDATE SESSION EXPIRATION -----------------
export async function updateUserSessionExpiration(
  cookies: Pick<Cookies, "get" | "set">
) {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
  if (!sessionId) return null;

  const user = await getUserSessionById(sessionId);
  if (!user) return null;

  const newExpiresAt = new Date(Date.now() + SESSION_EXPIRATION_SECONDS * 1000);

  await sql`
    UPDATE sessions
    SET expires_at = ${newExpiresAt}
    WHERE id = ${sessionId}
  `;

  setCookie(sessionId, cookies, newExpiresAt);
}

// ----------------- REMOVE SESSION -----------------
export async function removeUserFromSession(
  cookies: Pick<Cookies, "get" | "delete">
) {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
  if (!sessionId) return null;

  await sql`DELETE FROM sessions WHERE id = ${sessionId}`;
  cookies.delete(COOKIE_SESSION_KEY);
}

// ----------------- SET COOKIE -----------------
function setCookie(
  sessionId: string,
  cookies: Pick<Cookies, "set">,
  expiresAt: Date
) {
  cookies.set(COOKIE_SESSION_KEY, sessionId, {
    secure: true,
    httpOnly: true,
    sameSite: "lax",
    expires: expiresAt.getTime(),
  });
}
