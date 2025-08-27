import { NextResponse } from "next/server";
import { signin } from "@/lib/auth/auth";
import { Cookies } from "@/lib/auth/session";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = NextResponse.json({ ok: true });
    const mutableCookies: Pick<Cookies, "set"> = {
      set: res.cookies.set.bind(res.cookies),
    };

    const result = await signin(body, mutableCookies);

    if (typeof result === "string") {
      return NextResponse.json({ error: result }, { status: 401 });
    }

    return res;
  } catch (err) {
    console.error("Signin error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
