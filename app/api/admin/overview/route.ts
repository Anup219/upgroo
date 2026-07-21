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

    const [users, wallets, transactions, redemptions] = await Promise.all([
      supabaseRequest("users?select=id,created_at"),
      supabaseRequest("wallets?select=user_id,available_points,pending_points,redeemed_points"),
      supabaseRequest("transactions?order=created_at.desc&limit=10"),
      supabaseRequest("redemptions?order=created_at.desc"),
    ]);

    const totalUsers = users?.length || 0;
    const totalAvailablePoints = (wallets || []).reduce((acc: number, w: any) => acc + Number(w.available_points || 0), 0);
    const totalPendingPoints = (wallets || []).reduce((acc: number, w: any) => acc + Number(w.pending_points || 0), 0);
    const totalRedeemedPoints = (wallets || []).reduce((acc: number, w: any) => acc + Number(w.redeemed_points || 0), 0);

    const pendingRedemptionsCount = (redemptions || []).filter((r: any) => r.status === "PENDING").length;

    return NextResponse.json({
      totalUsers,
      totalAvailablePoints,
      totalPendingPoints,
      totalRedeemedPoints,
      pendingRedemptionsCount,
      recentTransactions: transactions || [],
      recentRedemptions: redemptions || [],
    });
  } catch (error) {
    console.error("Admin overview API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
