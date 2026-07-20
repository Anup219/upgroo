import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("session");
  const isAuthRoute = request.nextUrl.pathname.startsWith("/login") || 
                      request.nextUrl.pathname.startsWith("/signup") ||
                      request.nextUrl.pathname.startsWith("/reset-password");
  
  const isDashboardRoute = request.nextUrl.pathname.startsWith("/dashboard") ||
                           request.nextUrl.pathname.startsWith("/earn") ||
                           request.nextUrl.pathname.startsWith("/redeem") ||
                           request.nextUrl.pathname.startsWith("/wallet") ||
                           request.nextUrl.pathname.startsWith("/notifications");
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin") ||
                       request.nextUrl.pathname.startsWith("/redemptions");

  // Allow unauthenticated users on auth routes
  if (isAuthRoute) {
    if (session) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // Protect dashboard routes (temporarily bypassed for preview)
  if (isDashboardRoute) {
    return NextResponse.next();
  }
  
  // Protect admin routes (temporarily bypassed for preview)
  if (isAdminRoute) {
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
    "/redemptions/:path*",
    "/admin/:path*",
    "/login",
    "/signup",
    "/reset-password"
  ],
};
