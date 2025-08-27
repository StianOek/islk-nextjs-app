import { NextResponse } from "next/server";
import { signUp } from "@/lib/auth/auth";
import { Cookies } from "@/lib/auth/session";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = NextResponse.json({ ok: true });
    const mutableCookies: Pick<Cookies, "set"> = {
      set: res.cookies.set.bind(res.cookies),
    };

    const result = await signUp(body, mutableCookies);

    if (typeof result === "string") {
      return NextResponse.json({ error: result }, { status: 400 });
    }

    return res;
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
