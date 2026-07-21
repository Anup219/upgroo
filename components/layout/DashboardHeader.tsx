"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Bell } from "lucide-react";
import Link from "next/link";

interface DashboardHeaderProps {
  title: string;
}

export function DashboardHeader({ title }: DashboardHeaderProps) {
  const { user } = useAuth();

  return (
    <header className="flex h-16 items-center justify-between border-b border-[var(--color-pk-border)] bg-[var(--color-pk-bg)] px-8">
      <h1 className="text-lg font-semibold text-[var(--color-pk-text-primary)]">{title}</h1>
      
      <div className="flex items-center space-x-4">
        <Link 
          href="/notifications" 
          className="relative rounded-full p-2 text-[var(--color-pk-text-secondary)] hover:bg-[var(--color-pk-surface-elevated)] hover:text-[var(--color-pk-text-primary)] transition-colors"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 flex h-2 w-2 rounded-full bg-[var(--color-pk-accent)]"></span>
        </Link>
        
        <div className="flex items-center space-x-3 border-l border-[var(--color-pk-border)] pl-4">
          <div className="flex flex-col text-right">
            <span className="text-sm font-medium text-[var(--color-pk-text-primary)]">
              {user?.displayName || "User"}
            </span>
            <span className="text-xs text-[var(--color-pk-text-secondary)]">
              {user?.email}
            </span>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-pk-surface-elevated)] text-sm font-medium text-[var(--color-pk-text-primary)]">
            {user?.displayName?.charAt(0).toUpperCase() || "U"}
          </div>
        </div>
      </div>
    </header>
  );
}
