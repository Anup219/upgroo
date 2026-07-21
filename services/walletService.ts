import { supabaseRequest } from "@/lib/supabase";

export type TransactionType = "CREDIT" | "PENDING_CREDIT" | "REDEMPTION" | "REVERSAL" | "BONUS" | "MANUAL";
export type TransactionStatus = "PENDING" | "COMPLETED" | "FAILED" | "REVERSED";

export interface PointTransaction {
  id?: string;
  userId: string;
  type: TransactionType;
  amount: number;
  provider?: string;
  referenceId?: string;
  status: TransactionStatus;
  createdAt: string;
  metadata?: any;
}

export interface Wallet {
  userId: string;
  availablePoints: number;
  pendingPoints: number;
  redeemedPoints: number;
  lastUpdated: string;
  user_id: string;
  available_points: number;
  pending_points: number;
  redeemed_points: number;
  updated_at: string;
}

// Ensure a wallet row exists, create if not
async function ensureWalletExists(userId: string): Promise<Wallet> {
  const wallets = await supabaseRequest(`wallets?user_id=eq.${userId}`);
  
  if (wallets && wallets.length > 0) {
    const w = wallets[0];
    const available = Number(w.available_points || 0);
    const pending = Number(w.pending_points || 0);
    const redeemed = Number(w.redeemed_points || 0);
    const updatedAt = w.updated_at || new Date().toISOString();

    return {
      userId: w.user_id,
      availablePoints: available,
      pendingPoints: pending,
      redeemedPoints: redeemed,
      lastUpdated: updatedAt,
      user_id: w.user_id,
      available_points: available,
      pending_points: pending,
      redeemed_points: redeemed,
      updated_at: updatedAt,
    };
  }

  // Create new wallet row
  // We must ensure the user row exists first
  const users = await supabaseRequest(`users?id=eq.${userId}`);
  if (!users || users.length === 0) {
    await supabaseRequest("users", {
      method: "POST",
      body: { id: userId },
    });
  }

  const created = await supabaseRequest("wallets", {
    method: "POST",
    body: {
      user_id: userId,
      available_points: 0,
      pending_points: 0,
      redeemed_points: 0,
    },
  });

  const w = created[0];
  const updatedAt = w.updated_at || new Date().toISOString();

  return {
    userId: w.user_id,
    availablePoints: Number(w.available_points || 0),
    pendingPoints: Number(w.pending_points || 0),
    redeemedPoints: Number(w.redeemed_points || 0),
    lastUpdated: updatedAt,
    user_id: w.user_id,
    available_points: Number(w.available_points || 0),
    pending_points: Number(w.pending_points || 0),
    redeemed_points: Number(w.redeemed_points || 0),
    updated_at: updatedAt,
  };
}

export const walletService = {
  
  async getWalletBalance(userId: string): Promise<Wallet> {
    try {
      return await ensureWalletExists(userId);
    } catch (e) {
      console.error("Failed to get wallet balance:", e);
      const now = new Date().toISOString();
      return {
        userId,
        availablePoints: 0,
        pendingPoints: 0,
        redeemedPoints: 0,
        lastUpdated: now,
        user_id: userId,
        available_points: 0,
        pending_points: 0,
        redeemed_points: 0,
        updated_at: now,
      };
    }
  },

  async creditPoints(userId: string, amount: number, provider: string, referenceId: string) {
    const wallet = await ensureWalletExists(userId);
    const txId = referenceId || `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Create transaction record
    await supabaseRequest("transactions", {
      method: "POST",
      body: {
        id: txId,
        user_id: userId,
        type: "CREDIT",
        amount,
        provider,
        external_tx_id: referenceId,
        status: "COMPLETED",
      },
    });

    // Update wallet available_points
    const newAvailable = wallet.availablePoints + amount;
    await supabaseRequest(`wallets?user_id=eq.${userId}`, {
      method: "PATCH",
      body: {
        available_points: newAvailable,
        updated_at: new Date().toISOString(),
      },
    });

    return txId;
  },

  async createPendingCredit(userId: string, amount: number, provider: string, referenceId: string) {
    const wallet = await ensureWalletExists(userId);
    const txId = referenceId || `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Create transaction record
    await supabaseRequest("transactions", {
      method: "POST",
      body: {
        id: txId,
        user_id: userId,
        type: "PENDING_CREDIT",
        amount,
        provider,
        external_tx_id: referenceId,
        status: "PENDING",
      },
    });

    // Update wallet pending_points
    const newPending = wallet.pendingPoints + amount;
    await supabaseRequest(`wallets?user_id=eq.${userId}`, {
      method: "PATCH",
      body: {
        pending_points: newPending,
        updated_at: new Date().toISOString(),
      },
    });

    return txId;
  },

  async confirmPendingCredit(transactionId: string) {
    const transactions = await supabaseRequest(`transactions?id=eq.${transactionId}`);
    if (!transactions || transactions.length === 0) throw new Error("Transaction not found");
    const tx = transactions[0];

    if (tx.status !== "PENDING" || tx.type !== "PENDING_CREDIT") {
      throw new Error("Invalid transaction state");
    }

    const wallet = await ensureWalletExists(tx.user_id);

    // Update transaction to CREDIT / COMPLETED
    await supabaseRequest(`transactions?id=eq.${transactionId}`, {
      method: "PATCH",
      body: {
        type: "CREDIT",
        status: "COMPLETED",
      },
    });

    // Update wallet balances
    const newPending = wallet.pendingPoints - Number(tx.amount);
    const newAvailable = wallet.availablePoints + Number(tx.amount);

    await supabaseRequest(`wallets?user_id=eq.${tx.user_id}`, {
      method: "PATCH",
      body: {
        pending_points: Math.max(0, newPending),
        available_points: newAvailable,
        updated_at: new Date().toISOString(),
      },
    });

    return true;
  },

  async deductPointsForRedemption(userId: string, amount: number, redemptionId: string) {
    const wallet = await ensureWalletExists(userId);

    if (wallet.availablePoints < amount) {
      throw new Error("Insufficient points");
    }

    const txId = `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Create redemption transaction record
    await supabaseRequest("transactions", {
      method: "POST",
      body: {
        id: txId,
        user_id: userId,
        type: "REDEMPTION",
        amount: -amount,
        external_tx_id: redemptionId,
        status: "COMPLETED",
      },
    });

    // Update wallet balances
    const newAvailable = wallet.availablePoints - amount;
    const newRedeemed = wallet.redeemedPoints + amount;

    await supabaseRequest(`wallets?user_id=eq.${userId}`, {
      method: "PATCH",
      body: {
        available_points: newAvailable,
        redeemed_points: newRedeemed,
        updated_at: new Date().toISOString(),
      },
    });

    return txId;
  },

  async getTransactionHistory(userId: string, limit = 50): Promise<any[]> {
    try {
      const txs = await supabaseRequest(`transactions?user_id=eq.${userId}&order=created_at.desc&limit=${limit}`);
      if (!txs) return [];
      // Return raw DB fields so client components can use them directly
      return txs.map((t: any) => ({
        id: t.id,
        user_id: t.user_id,
        type: t.type,
        amount: Number(t.amount),
        provider: t.provider || "",
        external_tx_id: t.external_tx_id,
        status: t.status,
        created_at: t.created_at,
      }));
    } catch (e) {
      console.error("Failed to fetch transaction history:", e);
      return [];
    }
  }
};
