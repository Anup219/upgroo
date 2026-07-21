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

  // Protect admin routes — verify session and admin role at Edge level
  if (isAdminRoute) {
    if (!session?.value) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      // Decode JWT payload without external libraries in Edge runtime
      const parts = session.value.split(".");
      if (parts.length === 3) {
        const payloadBase64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
        const payloadJson = atob(payloadBase64);
        const payload = JSON.parse(payloadJson);
        const email = (payload.email || "").toLowerCase().trim();
        const isAdmin = payload.admin === true || ADMIN_EMAILS.includes(email);

        if (!isAdmin) {
          return NextResponse.redirect(new URL("/dashboard", request.url));
        }
      } else {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

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
