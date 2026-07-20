"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Check, Trash2, Coins, Gift, Info, Trash } from "lucide-react";

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: "1", type: "EARN", title: "Points Earned!", message: "You earned 1,500 points from Lootably.", time: "2 hours ago", read: false },
    { id: "2", type: "REDEEM", title: "Redemption Approved", message: "Your Amazon Pay gift card is ready.", time: "1 day ago", read: true },
    { id: "3", type: "SYSTEM", title: "Welcome to Upgroo", message: "Thanks for joining! Head over to the Earn page to start.", time: "2 days ago", read: true },
  ]);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const deleteNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "EARN": return <Coins className="h-4.5 w-4.5 text-[var(--color-pk-accent)]" />;
      case "REDEEM": return <Gift className="h-4.5 w-4.5 text-emerald-500" />;
      default: return <Info className="h-4.5 w-4.5 text-[var(--color-pk-text-secondary)]" />;
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[var(--color-pk-text-primary)]">Notifications</h2>
          <p className="text-xs text-[var(--color-pk-text-secondary)] mt-0.5">
            Keep track of your offer updates and system announcements.
          </p>
        </div>
        {notifications.length > 0 && (
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-8 text-xs flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5" /> Mark all as read
            </Button>
            <Button variant="danger" size="sm" onClick={clearAll} className="h-8 text-xs flex items-center gap-1.5 bg-red-500/10 border-red-500/20 text-red-500 hover:bg-red-500/20">
              <Trash2 className="h-3.5 w-3.5" /> Clear all
            </Button>
          </div>
        )}
      </div>

      {notifications.length > 0 ? (
        <Card className="border border-[var(--color-pk-border)] bg-[var(--color-pk-surface)] shadow-sm overflow-hidden">
          <CardContent className="p-0 divide-y divide-[var(--color-pk-border)]">
            {notifications.map((notif) => (
              <div 
                key={notif.id} 
                onClick={() => markAsRead(notif.id)}
                className={`flex items-start justify-between p-4 transition-colors cursor-pointer hover:bg-[var(--color-pk-surface-elevated)]/30 ${
                  notif.read ? "opacity-75" : "bg-[var(--color-pk-surface-elevated)]/10"
                }`}
              >
                <div className="flex items-start flex-1 mr-4">
                  <div className="mr-3 mt-0.5 rounded-lg bg-[var(--color-pk-surface-elevated)] border border-[var(--color-pk-border)]/50 p-2 flex items-center justify-center">
                    {getIcon(notif.type)}
                  </div>
                  <div className="flex-1">
                    <h4 className={`text-xs font-bold ${notif.read ? "text-[var(--color-pk-text-secondary)]" : "text-[var(--color-pk-text-primary)]"}`}>
                      {notif.title}
                    </h4>
                    <p className="mt-1 text-[11px] text-[var(--color-pk-text-secondary)] leading-relaxed">
                      {notif.message}
                    </p>
                    <span className="mt-1.5 block text-[10px] text-[var(--color-pk-text-tertiary)]">
                      {notif.time}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {!notif.read && (
                    <div className="h-2 w-2 rounded-full bg-[var(--color-pk-accent)] animate-pulse shrink-0"></div>
                  )}
                  <button 
                    onClick={(e) => deleteNotification(notif.id, e)}
                    className="p-1 rounded text-[var(--color-pk-text-tertiary)] hover:text-red-500 hover:bg-red-500/10 transition-colors"
                    title="Delete Notification"
                  >
                    <Trash className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ) : (
        <Card className="border border-[var(--color-pk-border)] bg-[var(--color-pk-surface)] py-12">
          <EmptyState 
            title="No new notifications" 
            description="We'll let you know when your points are credited or your rewards are processed."
          />
        </Card>
      )}
    </div>
  );
}
