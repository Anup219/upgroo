import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { token } = await request.json();
    if (!token) {
      return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    let sessionCookie: string = token;

    try {
      sessionCookie = await adminAuth.createSessionCookie(token, { expiresIn });
    } catch (e) {
      console.warn("createSessionCookie fallback to token:", e);
    }

    (await cookies()).set("session", sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    });

    return NextResponse.json({ status: "success" });
  } catch (error) {
    console.error("Session creation error", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE() {
  (await cookies()).delete("session");
  return NextResponse.json({ status: "success" });
}
