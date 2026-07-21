import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { ADMIN_EMAILS } from "@/lib/config";


export function middleware(request: NextRequest) {
  const session = request.cookies.get("session");
  const { pathname } = request.nextUrl;

  const isAuthRoute =
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/reset-password");

  const isDashboardRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/earn") ||
    pathname.startsWith("/redeem") ||
    pathname.startsWith("/wallet") ||
    pathname.startsWith("/notifications") ||
    pathname.startsWith("/settings");

  const isAdminRoute =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/redemptions");

  // Redirect authenticated users away from auth pages
  if (isAuthRoute) {
    if (session) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // Protect dashboard routes — redirect to login if no session
  if (isDashboardRoute) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  // Protect admin routes — redirect to login if no session
  if (isAdminRoute) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    // Full admin claim verification happens server-side in the page/layout.
    // Middleware just ensures the user is authenticated.
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/earn/:path*",
    "/redeem/:path*",
    "/wallet/:path*",
    "/notifications/:path*",
    "/settings/:path*",
    "/redemptions/:path*",
    "/admin/:path*",
    "/login",
    "/signup",
    "/reset-password",
  ],
};
