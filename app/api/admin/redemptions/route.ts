import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebase/server";
import { supabaseRequest } from "@/lib/supabase";
import { walletService } from "@/services/walletService";
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

    const redemptions = await supabaseRequest("redemptions?order=created_at.desc");

    return NextResponse.json(redemptions || []);
  } catch (error) {
    console.error("Admin redemptions GET API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
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

    const { redemptionId, action, voucherCode } = await request.json();

    if (!redemptionId || !["APPROVE", "REJECT"].includes(action)) {
      return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
    }

    // Get redemption record
    const redemptions = await supabaseRequest(`redemptions?id=eq.${redemptionId}`);
    if (!redemptions || redemptions.length === 0) {
      return NextResponse.json({ error: "Redemption record not found" }, { status: 404 });
    }

    const redemption = redemptions[0];

    if (action === "APPROVE") {
      const code = voucherCode || `VOUCHER-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
      await supabaseRequest(`redemptions?id=eq.${redemptionId}`, {
        method: "PATCH",
        body: {
          status: "FULFILLED",
          voucher_code: code,
          updated_at: new Date().toISOString(),
        },
      });
      return NextResponse.json({ status: "success", message: "Redemption approved and voucher assigned." });
    }

    if (action === "REJECT") {
      // Refund points to user wallet
      const pointsToRefund = Number(redemption.points_spent || redemption.denomination || 0);
      if (pointsToRefund > 0) {
        await walletService.creditPoints(
          redemption.user_id,
          pointsToRefund,
          "REDEMPTION_REFUND",
          `refund_${redemptionId}`
        );
      }

      await supabaseRequest(`redemptions?id=eq.${redemptionId}`, {
        method: "PATCH",
        body: {
          status: "REJECTED",
          updated_at: new Date().toISOString(),
        },
      });
      return NextResponse.json({ status: "success", message: "Redemption rejected and points refunded." });
    }
  } catch (error) {
    console.error("Admin redemptions POST API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
