// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";
import { removeUserFromSession, Cookies } from "@/lib/auth/session";

export async function POST(req: Request) {
  const res = NextResponse.redirect(new URL("/auth", req.url));

  // create a cookies handler compatible with your session.ts
  const cookieHandler: Pick<Cookies, "get" | "delete"> = {
    get: (key: string) => {
      const cookieHeader = req.headers.get("cookie");
      if (!cookieHeader) return undefined;
      const match = cookieHeader
        .split("; ")
        .find((c) => c.startsWith(`${key}=`));
      if (!match) return undefined;
      return { name: key, value: match.split("=")[1] };
    },
    delete: (key: string) => {
      res.cookies.delete(key);
    },
  };

  await removeUserFromSession(cookieHandler);
  return res;
}
