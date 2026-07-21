import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebase/server";
import { walletService } from "@/services/walletService";

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;

    if (!sessionCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);
    const userId = decoded.uid;

    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? parseInt(limitParam, 10) : 50;

    const [wallet, transactions] = await Promise.all([
      walletService.getWalletBalance(userId),
      walletService.getTransactionHistory(userId, limit),
    ]);

    return NextResponse.json({ wallet, transactions });
  } catch (error) {
    console.error("Wallet API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
