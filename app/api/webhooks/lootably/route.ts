import { NextResponse } from "next/server";
import { supabaseRequest } from "@/lib/supabase";
import { walletService } from "@/services/walletService";
import crypto from "crypto";

// Lootably Postback Parameters
// ?user_id={USER_ID}&amount={REWARD}&transaction_id={TRANSACTION_ID}&offer_name={OFFER_NAME}&hash={HASH}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("user_id");
    const amountStr = searchParams.get("amount");
    const transactionId = searchParams.get("transaction_id");
    const offerName = searchParams.get("offer_name");
    const providedHash = searchParams.get("hash");

    if (!userId || !amountStr || !transactionId || !providedHash) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    const amount = parseFloat(amountStr);
    const secret = process.env.LOOTABLY_POSTBACK_SECRET || "";

    // 1. Signature / Hash verification
    if (secret) {
      // Standard signature formula: md5(userId + transactionId + amount + secret)
      const computedHash = crypto
        .createHash("md5")
        .update(`${userId}${transactionId}${amountStr}${secret}`)
        .digest("hex");

      if (computedHash !== providedHash) {
        console.warn("Lootably postback signature mismatch:", { computedHash, providedHash });
        return NextResponse.json({ error: "Unauthorized signature mismatch" }, { status: 401 });
      }
    }

    // 2. Duplicate transaction check in Supabase
    const existingTx = await supabaseRequest(`transactions?id=eq.${transactionId}`);
    if (existingTx && existingTx.length > 0) {
      // Idempotent success response so Lootably stops retrying
      return NextResponse.json({ status: "success", message: "Duplicate event ignored" });
    }

    // 3. Credit points to wallet (this also logs the transaction)
    await walletService.creditPoints(userId, amount, "Lootably", transactionId);

    // 4. Create notification for user in Supabase
    await supabaseRequest("notifications", {
      method: "POST",
      body: {
        user_id: userId,
        type: "EARN",
        title: "Points Earned!",
        message: `You earned ${amount} points from ${offerName || "Lootably"}.`,
        read: false,
      },
    });

    return new NextResponse("OK", { status: 200 });
  } catch (error) {
    console.error("Lootably webhook error", error);
    // Return 500 so Lootably retries later
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
