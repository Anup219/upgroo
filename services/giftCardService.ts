import "server-only";
import { supabaseRequest } from "@/lib/supabase";
import { walletService } from "./walletService";
import crypto from "crypto";

export interface GiftCard {
  id: string;
  name: string;
  brand: string;
  category: string;
  imageUrl: string;
  denominations: number[]; // In points
  available: boolean;
}

export interface Redemption {
  id?: string;
  userId: string;
  giftCardId: string;
  giftCardName: string;
  denomination: number;
  pointsSpent: number;
  status: "PENDING" | "PROCESSING" | "FULFILLED" | "FAILED" | "REVERSED";
  voucherCode?: string;
  createdAt: string;
  updatedAt: string;
}

const CATALOG: GiftCard[] = [
  {
    id: "gc_amazon_in",
    name: "Amazon Pay Gift Card",
    brand: "Amazon",
    category: "Shopping",
    imageUrl: "/amazon.png",
    denominations: [5000, 10000, 25000, 50000],
    available: true,
  },
  {
    id: "gc_flipkart",
    name: "Flipkart Gift Card",
    brand: "Flipkart",
    category: "Shopping",
    imageUrl: "/flipkart.png",
    denominations: [10000, 25000, 50000],
    available: true,
  },
  {
    id: "gc_swiggy",
    name: "Swiggy Money Voucher",
    brand: "Swiggy",
    category: "Food",
    imageUrl: "/swiggy.png",
    denominations: [5000, 10000, 20000],
    available: true,
  }
];

export const giftCardService = {
  async getAvailableCards(): Promise<GiftCard[]> {
    return CATALOG.filter(c => c.available);
  },

  async requestRedemption(userId: string, cardId: string, pointsSpent: number) {
    const card = CATALOG.find(c => c.id === cardId);
    if (!card) throw new Error("Gift card not found");

    if (!card.denominations.includes(pointsSpent)) {
      throw new Error("Invalid denomination");
    }

    const redemptionId = crypto.randomUUID();
    
    // 1. Deduct points first (checks balance)
    await walletService.deductPointsForRedemption(userId, pointsSpent, redemptionId);

    // 2. Create the redemption record in Supabase
    await supabaseRequest("redemptions", {
      method: "POST",
      body: {
        id: redemptionId,
        user_id: userId,
        gift_card_id: card.id,
        gift_card_name: card.name,
        denomination: pointsSpent,
        points_spent: pointsSpent,
        status: "PENDING",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    });

    return redemptionId;
  },

  async getRedemptionHistory(userId: string): Promise<Redemption[]> {
    try {
      const redemptions = await supabaseRequest(`redemptions?user_id=eq.${userId}&order=created_at.desc`);
      if (!redemptions) return [];
      return redemptions.map((r: any) => ({
        id: r.id,
        userId: r.user_id,
        giftCardId: r.gift_card_id,
        giftCardName: r.gift_card_name,
        denomination: Number(r.denomination),
        pointsSpent: Number(r.points_spent),
        status: r.status,
        voucherCode: r.voucher_code,
        createdAt: r.created_at,
        updatedAt: r.updated_at,
      }));
    } catch (e) {
      console.error("Failed to get redemption history:", e);
      return [];
    }
  }
};
