import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const token = request.cookies.get("access_token")?.value;
  const expiry = request.cookies.get("access_token_expiry")?.value;

  const isPublicPath = path === "/login";
  const isProtectedPath = path.startsWith("/dashboard");

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (
    isProtectedPath &&
    (!token || (expiry && parseInt(expiry) < Date.now()))
  ) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("expired", "true");
    return NextResponse.redirect(loginUrl);
  }

  if (expiry) {
    const remainingMs = parseInt(expiry) - Date.now();
    console.log("===========================");
    console.log("Cookie remaining seconds:", Math.floor(remainingMs / 1000));
    console.log("===========================");
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/dashboard/:path*"],
};
