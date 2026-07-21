"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { walletService } from "@/services/walletService";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  Coins,
  Gift,
  Zap,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  Loader2,
} from "lucide-react";

interface Transaction {
  id: string;
  type: string;
  amount: number;
  provider: string;
  status: string;
  created_at: string;
}

interface WalletData {
  available_points: number;
  pending_points: number;
  redeemed_points: number;
}

export default function UserDashboardPage() {
  const { user } = useAuth();

  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loadingWallet, setLoadingWallet] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;
    const uid = user.uid;

    (async () => {
      try {
        const [w, txs] = await Promise.all([
          walletService.getWalletBalance(uid),
          walletService.getTransactionHistory(uid, 5),
        ]);
        setWallet(w);
        setTransactions(txs || []);
      } catch (e) {
        console.error("Dashboard data fetch error", e);
      } finally {
        setLoadingWallet(false);
      }
    })();
  }, [user?.uid]);

  const pointsBalance = wallet?.available_points ?? 0;
  const rupeeEquivalent = (pointsBalance / 100).toFixed(2);
  const pendingPoints = wallet?.pending_points ?? 0;
  const redeemedPoints = wallet?.redeemed_points ?? 0;

  const quickActions = [
    {
      title: "Earn Points",
      desc: "Complete surveys, play games, and test new apps to earn points.",
      icon: Coins,
      color: "bg-[var(--color-accent)]/10 text-[var(--color-text-accent)] border-[var(--color-accent)]/20",
      href: "/earn",
      actionText: "Browse Tasks",
    },
    {
      title: "Redeem Rewards",
      desc: "Exchange your points instantly for digital gift vouchers.",
      icon: Gift,
      color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      href: "/redeem",
      actionText: "View Catalog",
    },
  ];

  function formatDate(iso: string) {
    const d = new Date(iso);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - d.getTime()) / 86400000);
    if (diffDays === 0) return `Today, ${d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
    if (diffDays === 1) return `Yesterday, ${d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
    return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-8">

      {/* Top Welcome / Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--color-border)]/50 pb-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[var(--color-text-primary)]">
            Welcome back, {user?.displayName?.split(" ")[0] || "there"} 👋
          </h1>
          <p className="text-xs text-[var(--color-text-inverse)] mt-0.5">
            Monitor your rewards and point performance in real-time.
          </p>
        </div>
        <Badge className="bg-[var(--color-accent-muted)] border-[var(--color-accent)]/20 text-[var(--color-text-accent)] px-3 py-1 rounded-full font-semibold text-xs flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Earn 500+ points today</span>
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        {/* Points Balance */}
        <Card className="border border-[var(--color-border)] bg-[var(--color-surface-card)] relative overflow-hidden shadow-sm">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">Points Balance</p>
                {loadingWallet ? (
                  <Loader2 className="h-5 w-5 animate-spin text-[var(--color-text-muted)] mt-1" />
                ) : (
                  <h3 className="text-2xl font-extrabold text-[var(--color-text-primary)] mt-0.5">
                    {pointsBalance.toLocaleString()}
                  </h3>
                )}
              </div>
              <div className="h-8 w-8 rounded-[var(--radius-xs)] bg-[var(--color-accent-muted)] flex items-center justify-center text-[var(--color-text-accent)]">
                <Coins className="h-4 w-4" />
              </div>
            </div>
            <div className="flex items-center gap-1.5 border-t border-[var(--color-border)] pt-2.5 mt-2.5 text-[11px] text-[var(--color-text-inverse)]">
              <span className="font-semibold text-[var(--color-text-primary)]">Equivalent to:</span>
              <span className="font-bold text-emerald-500">₹{rupeeEquivalent}</span>
            </div>
          </CardContent>
        </Card>

        {/* Pending Points */}
        <Card className="border border-[var(--color-border)] bg-[var(--color-surface-card)] relative overflow-hidden shadow-sm">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">Pending Points</p>
                {loadingWallet ? (
                  <Loader2 className="h-5 w-5 animate-spin text-[var(--color-text-muted)] mt-1" />
                ) : (
                  <h3 className="text-2xl font-extrabold text-[var(--color-text-primary)] mt-0.5">
                    {pendingPoints.toLocaleString()}
                  </h3>
                )}
              </div>
              <div className="h-8 w-8 rounded-[var(--radius-xs)] bg-amber-500/10 flex items-center justify-center text-amber-500">
                <Zap className="h-4 w-4 fill-current" />
              </div>
            </div>
            <div className="flex items-center gap-1.5 border-t border-[var(--color-border)] pt-2.5 mt-2.5 text-[11px] text-[var(--color-text-inverse)]">
              <span className="font-semibold text-amber-500">Under Review:</span>
              <span className="font-bold text-[var(--color-text-primary)]">Awaiting confirmation</span>
            </div>
          </CardContent>
        </Card>

        {/* Redeemed Points */}
        <Card className="border border-[var(--color-border)] bg-[var(--color-surface-card)] relative overflow-hidden shadow-sm">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">Total Redeemed</p>
                {loadingWallet ? (
                  <Loader2 className="h-5 w-5 animate-spin text-[var(--color-text-muted)] mt-1" />
                ) : (
                  <h3 className="text-2xl font-extrabold text-[var(--color-text-primary)] mt-0.5">
                    {redeemedPoints.toLocaleString()}
                  </h3>
                )}
              </div>
              <div className="h-8 w-8 rounded-[var(--radius-xs)] bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                <TrendingUp className="h-4 w-4" />
              </div>
            </div>
            <div className="flex items-center gap-1.5 border-t border-[var(--color-border)] pt-2.5 mt-2.5 text-[11px] text-[var(--color-text-inverse)]">
              <span className="font-semibold text-[var(--color-text-primary)]">Lifetime earnings:</span>
              <span className="font-bold text-indigo-500">₹{((pointsBalance + redeemedPoints) / 100).toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-3">Quick Actions</h2>
        </div>
        {quickActions.map((action) => (
          <Card key={action.title} className="border border-[var(--color-border)] bg-[var(--color-surface-card)] shadow-sm">
            <CardHeader className="p-4 pb-2">
              <div className={`h-8 w-8 rounded-[var(--radius-xs)] border ${action.color} flex items-center justify-center mb-2`}>
                <action.icon className="h-4 w-4" />
              </div>
              <CardTitle className="text-sm font-bold">{action.title}</CardTitle>
              <CardDescription className="text-[11px] leading-relaxed mt-0.5">{action.desc}</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <Link href={action.href}>
                <Button variant="outline" className="w-full h-8 text-xs flex items-center justify-center gap-1.5 group">
                  <span>{action.actionText}</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Transactions */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--color-text-muted)]">Recent Transactions</h2>
          <Link href="/wallet" className="text-xs font-semibold text-[var(--color-text-accent)] hover:underline">
            View All
          </Link>
        </div>
        <Card className="border border-[var(--color-border)] bg-[var(--color-surface-card)] shadow-sm overflow-hidden">
          {loadingWallet ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="h-5 w-5 animate-spin text-[var(--color-text-muted)]" />
            </div>
          ) : transactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <Coins className="h-8 w-8 text-[var(--color-text-muted)] mb-2" />
              <p className="text-sm font-medium text-[var(--color-text-primary)]">No transactions yet</p>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5">Complete your first task to earn points!</p>
              <Link href="/earn" className="mt-3">
                <Button size="sm" variant="outline">Start Earning</Button>
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-[var(--color-border)]">
              {transactions.map((tx) => (
                <div key={tx.id} className="flex justify-between items-center p-3 hover:bg-[var(--color-surface-page)]/50 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-[var(--color-surface-page)] border border-[var(--color-border)]">
                      {tx.status === "COMPLETED" ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <Clock className="h-4 w-4 text-[var(--color-text-accent)]" />
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[var(--color-text-primary)]">{tx.provider}</p>
                      <p className="text-[9px] text-[var(--color-text-muted)] mt-0.5">{formatDate(tx.created_at)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-extrabold text-[var(--color-text-primary)]">
                      {tx.type === "CREDIT" || tx.type === "PENDING_CREDIT" ? "+" : "-"}{tx.amount} pts
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                      tx.status === "COMPLETED"
                        ? "bg-emerald-500/10 text-emerald-500"
                        : "bg-[var(--color-accent)]/10 text-[var(--color-text-accent)]"
                    }`}>
                      {tx.status === "COMPLETED" ? "Approved" : "Pending"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
