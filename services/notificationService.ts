import { supabaseRequest } from "@/lib/supabase";

export interface AppNotification {
  id: string;
  user_id: string;
  type: "EARN" | "REDEEM" | "SYSTEM" | "WARNING";
  title: string;
  message: string;
  read: boolean;
  created_at: string;
}

export const notificationService = {
  async getUserNotifications(userId: string, limit = 30): Promise<AppNotification[]> {
    try {
      const notifs = await supabaseRequest(
        `notifications?user_id=eq.${userId}&order=created_at.desc&limit=${limit}`
      );
      return notifs || [];
    } catch (e) {
      console.error("Failed to get notifications:", e);
      return [];
    }
  },

  async markAsRead(notificationId: string) {
    try {
      await supabaseRequest(`notifications?id=eq.${notificationId}`, {
        method: "PATCH",
        body: { read: true },
      });
    } catch (e) {
      console.error("Failed to mark notification as read:", e);
    }
  },

  async markAllAsRead(userId: string) {
    try {
      await supabaseRequest(`notifications?user_id=eq.${userId}&read=eq.false`, {
        method: "PATCH",
        body: { read: true },
      });
    } catch (e) {
      console.error("Failed to mark all notifications as read:", e);
    }
  },

  async deleteNotification(notificationId: string) {
    try {
      await supabaseRequest(`notifications?id=eq.${notificationId}`, {
        method: "DELETE",
      });
    } catch (e) {
      console.error("Failed to delete notification:", e);
    }
  },

  async createNotification(notification: {
    user_id: string;
    type: string;
    title: string;
    message: string;
  }) {
    try {
      await supabaseRequest("notifications", {
        method: "POST",
        body: { ...notification, read: false },
      });
    } catch (e) {
      console.error("Failed to create notification:", e);
    }
  },
};
