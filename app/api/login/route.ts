import { NextResponse } from "next/server";
import i18next from "i18next";

export async function POST(req: Request) {
  const { username } = await req.json();

  if (!username) {
    return NextResponse.json(
      {
        ok: false,
        error: i18next.t("global.required", {
          value: i18next.t("global.name"),
        }),
      },
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
