"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, LayoutDashboard, Ticket } from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Redemptions Queue", href: "/admin/redemptions", icon: Ticket },
    { name: "Users", href: "/admin/users", icon: Users },
  ];

  return (
    <div className="flex h-screen w-64 flex-col border-r border-[var(--color-pk-border)] bg-[var(--color-pk-surface)]">
      <div className="flex h-16 items-center px-6 border-b border-[var(--color-pk-border)]">
        <span className="text-xl font-bold tracking-tight text-[var(--color-pk-danger)]">
          Admin Panel
        </span>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[var(--color-pk-surface-elevated)] text-[var(--color-pk-text-primary)] font-bold shadow-sm"
                    : "text-[var(--color-pk-text-secondary)] hover:bg-[var(--color-pk-surface-elevated)]/50 hover:text-[var(--color-pk-text-primary)]"
                }`}
              >
                <item.icon className={`mr-3 h-5 w-5 flex-shrink-0 ${isActive ? "text-[var(--color-pk-accent)]" : "text-[var(--color-pk-text-tertiary)]"}`} />
                {item.name}
              </Link>
            );
          })}
          <div className="pt-4 mt-4 border-t border-[var(--color-pk-border)]">
            <Link
              href="/dashboard"
              className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-[var(--color-pk-text-secondary)] hover:bg-[var(--color-pk-surface-elevated)]/50 hover:text-[var(--color-pk-text-primary)] transition-colors"
            >
              Back to App
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
