import "server-only";
import { supabaseRequest } from "@/lib/supabase";

export interface AppNotification {
  id: string;
  userId: string;
  type: "EARN" | "REDEEM" | "SYSTEM" | "WARNING";
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export const notificationService = {
  async getNotifications(userId: string, limit = 20): Promise<AppNotification[]> {
    try {
      const notifs = await supabaseRequest(`notifications?user_id=eq.${userId}&order=created_at.desc&limit=${limit}`);
      if (!notifs) return [];
      return notifs.map((n: any) => ({
        id: n.id,
        userId: n.user_id,
        type: n.type,
        title: n.title,
        message: n.message,
        read: n.read,
        createdAt: n.created_at,
      }));
    } catch (e) {
      console.error("Failed to get notifications:", e);
      return [];
    }
  },

  async markAsRead(notificationId: string) {
    await supabaseRequest(`notifications?id=eq.${notificationId}`, {
      method: "PATCH",
      body: { read: true },
    });
  },

  async markAllAsRead(userId: string) {
    await supabaseRequest(`notifications?user_id=eq.${userId}&read=eq.false`, {
      method: "PATCH",
      body: { read: true },
    });
  }
};
