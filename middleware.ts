import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("username")?.value;
  const isLoggedIn = Boolean(token);
  const { pathname } = req.nextUrl;

  const isAuthPage = pathname.startsWith("/login");

  if (!isLoggedIn && !isAuthPage) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const response = NextResponse.next();
  response.headers.set("x-middleware-cache", "no-cache");
  return response;
}

export const config = {
  // Keep PWA/manifest/icons public so install works before login
  matcher: [
    "/((?!_next|api|fonts|images|robots\\.txt|manifest\\.json|.*\\.(?:png|jpg|jpeg|svg|ico|webp|webmanifest)$).*)",
  ],
};
