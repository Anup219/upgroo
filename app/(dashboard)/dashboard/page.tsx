"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
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
} from "lucide-react";

export default function UserDashboardPage() {
  const { user } = useAuth();
  
  // Simulated stats
  const pointsBalance = 12450;
  const rupeeEquivalent = (pointsBalance / 100).toFixed(2);
  const dailyStreak = 5;
  const completedTasks = 47;
  
  const targetReward = {
    brand: "Amazon Pay Gift Card",
    value: "₹250",
    cost: 25000,
    progress: Math.min(100, Math.round((pointsBalance / 25000) * 100)),
  };

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

  const recentTransactions = [
    {
      id: 1,
      desc: "App installation reward",
      pts: "+450 pts",
      date: "Today, 10:15 AM",
      status: "Approved",
      statusColor: "bg-emerald-500/10 text-emerald-500",
    },
    {
      id: 2,
      desc: "Customer feedback survey",
      pts: "+150 pts",
      date: "Yesterday, 3:30 PM",
      status: "Pending",
      statusColor: "bg-[var(--color-accent)]/10 text-[var(--color-text-accent)]",
    },
    {
      id: 3,
      desc: "Daily streak bonus",
      pts: "+25 pts",
      date: "Yesterday, 8:00 AM",
      status: "Approved",
      statusColor: "bg-emerald-500/10 text-emerald-500",
    },
    {
      id: 4,
      desc: "Referred friend signup",
      pts: "+100 pts",
      date: "15 Jun, 2:40 PM",
      status: "Approved",
      statusColor: "bg-emerald-500/10 text-emerald-500",
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-8">
      
      {/* Top Welcome / Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--color-border)]/50 pb-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[var(--color-text-primary)]">
            Welcome back, {user?.displayName || "Rahul"} 👋
          </h1>
          <p className="text-xs text-[var(--color-text-inverse)] mt-0.5">
            Monitor your rewards and point performance in real-time.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-[var(--color-accent-muted)] border-[var(--color-accent)]/20 text-[var(--color-text-accent)] px-3 py-1 rounded-full font-semibold text-xs flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Earn 500+ points today</span>
          </Badge>
        </div>
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Points Balance Card */}
        <Card className="border border-[var(--color-border)] bg-[var(--color-surface-card)] relative overflow-hidden shadow-sm">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                  Points Balance
                </p>
                <h3 className="text-2xl font-extrabold text-[var(--color-text-primary)] mt-0.5">
                  {pointsBalance.toLocaleString()}
                </h3>
              </div>
              <div className="h-8 w-8 rounded-[var(--radius-xs)] bg-[var(--color-accent-muted)] flex items-center justify-center text-[var(--color-text-accent)]">
                <Coins className="h-4.5 w-4.5" />
              </div>
            </div>
            <div className="flex items-center gap-1.5 border-t border-[var(--color-border)] pt-2.5 mt-2.5 text-[11px] text-[var(--color-text-inverse)]">
              <span className="font-semibold text-[var(--color-text-primary)]">
                Equivalent to:
              </span>
              <span className="font-bold text-emerald-500">
                ₹{rupeeEquivalent}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Daily Streak Card */}
        <Card className="border border-[var(--color-border)] bg-[var(--color-surface-card)] relative overflow-hidden shadow-sm">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                  Daily Active Streak
                </p>
                <h3 className="text-2xl font-extrabold text-[var(--color-text-primary)] mt-0.5">
                  {dailyStreak} Days
                </h3>
              </div>
              <div className="h-8 w-8 rounded-[var(--radius-xs)] bg-amber-500/10 flex items-center justify-center text-amber-500">
                <Zap className="h-4.5 w-4.5 fill-current" />
              </div>
            </div>
            <div className="flex items-center gap-1.5 border-t border-[var(--color-border)] pt-2.5 mt-2.5 text-[11px] text-[var(--color-text-inverse)]">
              <span className="font-semibold text-amber-500">
                Tomorrow's Bonus:
              </span>
              <span className="font-bold text-[var(--color-text-primary)]">
                +50 bonus pts
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Tasks Completed Card */}
        <Card className="border border-[var(--color-border)] bg-[var(--color-surface-card)] relative overflow-hidden shadow-sm">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                  Tasks Completed
                </p>
                <h3 className="text-2xl font-extrabold text-[var(--color-text-primary)] mt-0.5">
                  {completedTasks} Tasks
                </h3>
              </div>
              <div className="h-8 w-8 rounded-[var(--radius-xs)] bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                <TrendingUp className="h-4.5 w-4.5" />
              </div>
            </div>
            <div className="flex items-center gap-1.5 border-t border-[var(--color-border)] pt-2.5 mt-2.5 text-[11px] text-[var(--color-text-inverse)]">
              <span className="font-semibold text-[var(--color-text-primary)]">
                Last completed:
              </span>
              <span>
                Today, 10:15 AM
              </span>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Quick Actions & Target Goal */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Quick Actions Grid (2 cols equivalent) */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickActions.map((action) => (
              <Card key={action.title} className="border border-[var(--color-border)] bg-[var(--color-surface-card)] shadow-sm">
                <CardHeader className="p-4 pb-2">
                  <div className={`h-8 w-8 rounded-[var(--radius-xs)] border ${action.color} flex items-center justify-center mb-2`}>
                    <action.icon className="h-4.5 w-4.5" />
                  </div>
                  <CardTitle className="text-sm font-bold">{action.title}</CardTitle>
                  <CardDescription className="text-[11px] leading-relaxed mt-0.5">
                    {action.desc}
                  </CardDescription>
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
        </div>

        {/* Target Reward Goal progress */}
        <div className="flex flex-col space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
            Active Goal
          </h2>
          <Card className="border border-[var(--color-border)] bg-[var(--color-surface-card)] flex-1 shadow-sm flex flex-col justify-between p-4">
            <div>
              <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-2 mb-3">
                <div className="flex h-6 w-6 items-center justify-center rounded bg-emerald-500/10 text-emerald-500">
                  <Gift className="h-3.5 w-3.5" />
                </div>
                <span className="text-xs font-bold text-[var(--color-text-primary)]">
                  My Target Reward
                </span>
              </div>
              <div className="mb-3">
                <p className="text-[10px] text-[var(--color-text-inverse)]">
                  {targetReward.brand}
                </p>
                <h4 className="text-sm font-bold text-[var(--color-text-primary)] mt-0.5">
                  {targetReward.value} Voucher
                </h4>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-[var(--color-text-inverse)]">Goal Progress</span>
                  <span className="font-bold text-[var(--color-text-primary)]">{targetReward.progress}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-[var(--color-surface-page)] overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-emerald-500 transition-all duration-500" 
                    style={{ width: `${targetReward.progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-[9px] text-[var(--color-text-muted)] pt-0.5">
                  <span>{pointsBalance.toLocaleString()} pts</span>
                  <span>{targetReward.cost.toLocaleString()} pts</span>
                </div>
              </div>
            </div>
            <div className="pt-3 mt-3 border-t border-[var(--color-border)]">
              <Link href="/redeem" className="w-full">
                <Button variant="ghost" className="w-full h-8 text-xs text-center hover:bg-black/[0.04]">
                  Change Goal
                </Button>
              </Link>
            </div>
          </Card>
        </div>

      </div>

      {/* Recent Activity Feed */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
            Recent Transactions
          </h2>
          <Link href="/wallet" className="text-xs font-semibold text-[var(--color-text-accent)] hover:underline">
            View Statement
          </Link>
        </div>
        <Card className="border border-[var(--color-border)] bg-[var(--color-surface-card)] shadow-sm overflow-hidden">
          <div className="divide-y divide-[var(--color-border)]">
            {recentTransactions.map((tx) => (
              <div key={tx.id} className="flex justify-between items-center p-3 hover:bg-[var(--color-surface-page)]/50 transition-colors">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-[var(--color-surface-page)] border border-[var(--color-border)] text-[var(--color-text-primary)]">
                    {tx.status === "Approved" ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <Clock className="h-4 w-4 text-[var(--color-text-accent)]" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[var(--color-text-primary)]">
                      {tx.desc}
                    </p>
                    <p className="text-[9px] text-[var(--color-text-muted)] mt-0.5">
                      {tx.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-extrabold text-[var(--color-text-primary)]">
                    {tx.pts}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${tx.statusColor}`}>
                    {tx.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

    </div>
  );
}
