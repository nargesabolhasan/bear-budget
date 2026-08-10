import { NextResponse } from "next/server";
import { USERNAME_COOKIE } from "@/utils/auth-cookie";

export async function POST() {
  const res = NextResponse.json({ ok: true });

  res.cookies.set({
    name: USERNAME_COOKIE,
    value: "",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
  });

  return res;
}
