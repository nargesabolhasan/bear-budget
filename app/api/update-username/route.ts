import { NextResponse } from "next/server";
import i18next from "i18next";
import {
  USERNAME_COOKIE,
  encodeUsernameCookie,
  usernameCookieOptions,
} from "@/utils/auth-cookie";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newUsername = body.username;

    if (!newUsername?.trim()) {
      return NextResponse.json(
        {
          ok: false,
          error: i18next.t("global.required", {
            value: i18next.t("global.name"),
          }),
        },
        { status: 400 },
      );
    }

    const res = NextResponse.json({ ok: true });

    res.cookies.set({
      name: USERNAME_COOKIE,
      value: encodeUsernameCookie(newUsername),
      ...usernameCookieOptions,
    });

    return res;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 },
    );
  }
}
