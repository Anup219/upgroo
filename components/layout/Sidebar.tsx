"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  Coins,
  Gift,
  History,
  Bell,
  Settings,
  LogOut,
  ShieldAlert,
} from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();
  const { signOut, user } = useAuth();
  const isAdmin = true; // Set to true for previewing admin pages

  const navItems = [
    { name: "Dashboard",   href: "/dashboard",     icon: LayoutDashboard },
    { name: "Earn Points",  href: "/earn",          icon: Coins           },
    { name: "Redeem",       href: "/redeem",        icon: Gift            },
    { name: "Wallet",       href: "/wallet",        icon: History         },
  ];

  const bottomItems = [
    { name: "Notifications", href: "/notifications", icon: Bell     },
    { name: "Settings",      href: "/settings",      icon: Settings },
  ];

  const linkBase =
    "flex items-center rounded-[var(--radius-xs)] px-3 py-2.5 text-[var(--font-size-sm)] font-medium transition-colors duration-[150ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-1";

  const activeLink  = "bg-[var(--color-surface-page)] text-[var(--color-text-primary)] shadow-[var(--shadow-1)]";
  const inactiveLink = "text-[var(--color-text-inverse)] hover:bg-[var(--color-surface-page)]/70 hover:text-[var(--color-text-primary)]";

  return (
    <div className="flex h-screen w-60 flex-col border-r border-[var(--color-border)] bg-[var(--color-surface-card)]">

      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center px-5 border-b border-[var(--color-border)]">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2 rounded-[var(--radius-xs)]"
          aria-label="Upgroo dashboard"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-xs)] bg-[var(--color-accent)]">
            <span className="text-xs font-bold text-white" aria-hidden="true">UG</span>
          </div>
          <span className="text-base font-semibold tracking-tight text-[var(--color-text-primary)]">
            Upgroo
          </span>
        </Link>
      </div>

      {/* Main nav */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav aria-label="Dashboard navigation" className="space-y-0.5 px-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`${linkBase} ${isActive ? activeLink : inactiveLink}`}
              >
                <item.icon
                  className={`mr-3 h-4 w-4 shrink-0 ${
                    isActive ? "text-[var(--color-accent)]" : "text-[var(--color-text-muted)]"
                  }`}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}

          {isAdmin && (
            <div className="pt-4 mt-4 border-t border-[var(--color-border)]">
              <Link
                href="/redemptions"
                aria-current={pathname.startsWith("/redemptions") ? "page" : undefined}
                className={`${linkBase} ${
                  pathname.startsWith("/redemptions") ? activeLink : inactiveLink
                }`}
              >
                <ShieldAlert className="mr-3 h-4 w-4 shrink-0 text-[var(--color-danger)]" aria-hidden="true" />
                Admin Panel
              </Link>
            </div>
          )}
        </nav>
      </div>

      {/* Bottom nav */}
      <div className="border-t border-[var(--color-border)] p-3">
        <nav aria-label="Account navigation" className="space-y-0.5">
          {bottomItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`${linkBase} ${isActive ? activeLink : inactiveLink}`}
              >
                <item.icon className="mr-3 h-4 w-4 shrink-0 text-[var(--color-text-muted)]" aria-hidden="true" />
                {item.name}
              </Link>
            );
          })}

          <button
            onClick={signOut}
            className={`${linkBase} w-full text-[var(--color-text-inverse)] hover:bg-[var(--color-danger)]/10 hover:text-[var(--color-danger)]`}
          >
            <LogOut className="mr-3 h-4 w-4 shrink-0 text-[var(--color-text-muted)]" aria-hidden="true" />
            Sign Out
          </button>
        </nav>
      </div>

    </div>
  );
}
