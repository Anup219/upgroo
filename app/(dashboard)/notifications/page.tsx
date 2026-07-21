"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { Bell, Check, Trash2, Coins, Gift, Info, Loader2 } from "lucide-react";

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  created_at: string;
  read: boolean;
}

function timeAgo(iso: string): string {
  const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (seconds < 60) return "Just now";
  const mins = Math.floor(seconds / 60);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

const iconMap: Record<string, React.ElementType> = {
  EARN: Coins,
  REDEEM: Gift,
  SYSTEM: Info,
};

export default function NotificationsPage() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;
    fetch("/api/notifications")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setNotifications(data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user?.uid]);

  const markAllAsRead = async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    fetch("/api/notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ all: true }),
    }).catch(() => {});
  };

  const markAsRead = async (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    fetch("/api/notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    }).catch(() => {});
  };

  const clearAll = async () => {
    setNotifications([]);
    fetch("/api/notifications", { method: "DELETE" }).catch(() => {});
  };

  const deleteNotification = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    fetch(`/api/notifications?id=${id}`, { method: "DELETE" }).catch(() => {});
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-4 max-w-3xl mx-auto pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--color-border)]/50 pb-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[var(--color-text-primary)]">Notifications</h1>
          <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
            {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}` : "All caught up!"}
          </p>
        </div>
        {notifications.length > 0 && (
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-8 text-xs flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5" /> Mark all as read
            </Button>
            <Button variant="destructive" size="sm" onClick={clearAll} className="h-8 text-xs flex items-center gap-1.5 bg-red-500/10 border-red-500/20 text-red-500 hover:bg-red-500/20">
              <Trash2 className="h-3.5 w-3.5" /> Clear all
            </Button>
          </div>
        )}
      </div>

      {/* List */}
      <Card className="border border-[var(--color-border)] bg-[var(--color-surface-card)] shadow-sm overflow-hidden">
        <CardContent className="p-0">
          {loading ? (
            <div className="space-y-3 p-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-16 w-full rounded-lg" />
              ))}
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="h-12 w-12 rounded-full bg-[var(--color-surface-page)] border border-[var(--color-border)] flex items-center justify-center mb-3">
                <Bell className="h-6 w-6 text-[var(--color-text-muted)]" />
              </div>
              <p className="text-sm font-medium text-[var(--color-text-primary)]">No notifications</p>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5">You&apos;re all caught up. Check back later!</p>
            </div>
          ) : (
            <div className="divide-y divide-[var(--color-border)]">
              {notifications.map((n) => {
                const Icon = iconMap[n.type] || Info;
                return (
                  <div
                    key={n.id}
                    onClick={() => !n.read && markAsRead(n.id)}
                    className={`flex items-start gap-3 p-4 transition-colors cursor-pointer group hover:bg-[var(--color-surface-page)]/60 ${!n.read ? "bg-[var(--color-accent)]/5" : ""}`}
                  >
                    <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
                      n.type === "EARN" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" :
                      n.type === "REDEEM" ? "bg-[var(--color-accent)]/10 border-[var(--color-accent)]/20 text-[var(--color-text-accent)]" :
                      "bg-[var(--color-surface-page)] border-[var(--color-border)] text-[var(--color-text-muted)]"
                    }`}>
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className={`text-xs font-bold truncate ${!n.read ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-inverse)]"}`}>
                          {n.title}
                        </p>
                        <div className="flex items-center gap-1.5 shrink-0">
                          {!n.read && <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />}
                          <span className="text-[9px] text-[var(--color-text-muted)]">{timeAgo(n.created_at)}</span>
                          <button
                            onClick={(e) => deleteNotification(n.id, e)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--color-text-muted)] hover:text-[var(--color-danger)]"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                      <p className="text-[11px] text-[var(--color-text-muted)] mt-0.5 leading-relaxed">{n.message}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
