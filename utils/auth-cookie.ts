export const USERNAME_COOKIE = "username";

export const usernameCookieOptions = {
  path: "/",
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  maxAge: 60 * 60 * 24 * 7,
};

/** Cookie values must be ASCII — encode so Persian/special names persist. */
export function encodeUsernameCookie(username: string): string {
  return encodeURIComponent(username.trim());
}

export function decodeUsernameCookie(value?: string | null): string | null {
  if (!value) return null;
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}
