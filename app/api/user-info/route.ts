import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { USERNAME_COOKIE, decodeUsernameCookie } from "@/utils/auth-cookie";

export async function GET() {
  const cookieStore = await cookies();
  const username = decodeUsernameCookie(
    cookieStore.get(USERNAME_COOKIE)?.value,
  );

  return NextResponse.json({ username });
}
