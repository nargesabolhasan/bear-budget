import { NextResponse } from "next/server";
import i18next from "i18next";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newUsername = body.username;

    if (!newUsername) {
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

    // Update the cookie
    res.cookies.set({
      name: "username",
      value: newUsername,
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}
