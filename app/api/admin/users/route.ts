import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebase/server";
import { supabaseRequest } from "@/lib/supabase";
import { isAdminEmail } from "@/lib/config";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;

    if (!sessionCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);
    const isAllowed = decoded.admin === true || isAdminEmail(decoded.email);

    if (!isAllowed) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Fetch Firebase users list
    const listUsersResult = await adminAuth.listUsers(100);
    const firebaseUsers = listUsersResult.users;

    // Fetch Supabase wallets
    const wallets = await supabaseRequest("wallets");
    const walletMap = new Map<string, any>();
    (wallets || []).forEach((w: any) => walletMap.set(w.user_id, w));

    const userList = firebaseUsers.map((u) => {
      const w = walletMap.get(u.uid);
      const isUserAdmin = u.customClaims?.admin === true || isAdminEmail(u.email);

      return {
        uid: u.uid,
        email: u.email || "No email",
        displayName: u.displayName || u.email?.split("@")[0] || "User",
        createdAt: u.metadata.creationTime,
        lastSignIn: u.metadata.lastSignInTime,
        isAdmin: isUserAdmin,
        availablePoints: Number(w?.available_points || 0),
        pendingPoints: Number(w?.pending_points || 0),
        redeemedPoints: Number(w?.redeemed_points || 0),
      };
    });

    return NextResponse.json(userList);
  } catch (error) {
    console.error("Admin users API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
