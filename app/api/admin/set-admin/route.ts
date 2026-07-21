import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase/server";
import { cookies } from "next/headers";
import { isAdminEmail } from "@/lib/config";

// Protected internal endpoint: sets admin: true custom claim on a Firebase user.
// Called automatically on first sign-in for admin emails.
export async function POST(request: Request) {
  try {
    // Verify the caller is already authenticated via session cookie
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;

    if (!sessionCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify the session belongs to an admin (either by claim or email)
    const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);
    const callerEmail = decoded.email ?? "";
    const callerIsAdmin =
      decoded.admin === true ||
      isAdminEmail(callerEmail);

    if (!callerIsAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { uid } = await request.json();
    if (!uid) {
      return NextResponse.json({ error: "Missing uid" }, { status: 400 });
    }

    // Set the admin custom claim
    await adminAuth.setCustomUserClaims(uid, { admin: true });

    return NextResponse.json({ status: "success", message: `Admin claim set for uid: ${uid}` });
  } catch (error) {
    console.error("Set admin claim error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
