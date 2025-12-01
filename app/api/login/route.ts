import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username } = await req.json();

  if (!username) {
    return NextResponse.json(
      { ok: false, error: "Your name is require" },
      { status: 400 }
    );
  }

  const res = NextResponse.json({ ok: true });

  // Set cookie
  res.cookies.set({
    name: "username",
    value: username,
    path: "/",
    httpOnly: true, // secure
    sameSite: "lax", // prevent CSRF issues
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}
