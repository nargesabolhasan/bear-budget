import { NextResponse } from "next/server";
import i18next from "i18next";
import {
  USERNAME_COOKIE,
  encodeUsernameCookie,
  usernameCookieOptions,
} from "@/utils/auth-cookie";

export async function POST(req: Request) {
  const { username } = await req.json();

  if (!username?.trim()) {
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
    value: encodeUsernameCookie(username),
    ...usernameCookieOptions,
  });

  return res;
}
