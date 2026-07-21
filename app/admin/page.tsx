"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { 
  Users, 
  Coins, 
  Clock, 
  Gift, 
  TrendingUp, 
  ArrowRight, 
  Loader2, 
  RefreshCw,
  ShieldCheck
} from "lucide-react";

interface OverviewData {
  totalUsers: number;
  totalAvailablePoints: number;
  totalPendingPoints: number;
  totalRedeemedPoints: number;
  pendingRedemptionsCount: number;
  recentTransactions: any[];
  recentRedemptions: any[];
}

export default function AdminOverviewPage() {
  const [data, setData] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchOverview = async () => {
    try {
      const res = await fetch("/api/admin/overview");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (e) {
      console.error("Failed to fetch admin overview:", e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchOverview();
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--color-pk-accent)]" />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-10 max-w-6xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--color-pk-border)] pb-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-pk-text-primary)] flex items-center gap-2">
            System Overview
            <Badge variant="success" className="text-xs">Live</Badge>
          </h1>
          <p className="text-xs text-[var(--color-pk-text-secondary)] mt-0.5">
            Platform performance metrics, user counts, and redemption queue metrics.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={handleRefresh} disabled={refreshing} className="flex items-center gap-2">
          <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
          <span>Refresh Data</span>
        </Button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-[var(--color-pk-text-secondary)] uppercase tracking-wider">Total Users</p>
              <h3 className="text-2xl font-extrabold text-[var(--color-pk-text-primary)] mt-1">
                {data?.totalUsers.toLocaleString()}
              </h3>
            </div>
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
              <Users className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-[var(--color-pk-text-secondary)] uppercase tracking-wider">Available Points</p>
              <h3 className="text-2xl font-extrabold text-[var(--color-pk-text-primary)] mt-1">
                {data?.totalAvailablePoints.toLocaleString()}
              </h3>
            </div>
            <div className="p-3 rounded-xl bg-[var(--color-pk-accent)]/10 text-[var(--color-pk-accent)]">
              <Coins className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-[var(--color-pk-text-secondary)] uppercase tracking-wider">Pending Queue</p>
              <h3 className="text-2xl font-extrabold text-[var(--color-pk-text-primary)] mt-1">
                {data?.pendingRedemptionsCount.toLocaleString()}
              </h3>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500">
              <Clock className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-[var(--color-pk-text-secondary)] uppercase tracking-wider">Total Redeemed</p>
              <h3 className="text-2xl font-extrabold text-[var(--color-pk-text-primary)] mt-1">
                {data?.totalRedeemedPoints.toLocaleString()}
              </h3>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500">
              <Gift className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Action Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border border-[var(--color-pk-accent)]/20 bg-[var(--color-pk-surface-elevated)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Clock className="h-5 w-5 text-amber-500" />
              Redemptions Queue
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-xs text-[var(--color-pk-text-secondary)]">
              You currently have <strong className="text-[var(--color-pk-text-primary)]">{data?.pendingRedemptionsCount} pending</strong> redemption requests requiring approval.
            </p>
            <Link href="/admin/redemptions">
              <Button size="sm" className="w-full flex items-center justify-center gap-2">
                <span>Manage Redemptions</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border border-[var(--color-pk-border)] bg-[var(--color-pk-surface-elevated)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              User Directory
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-xs text-[var(--color-pk-text-secondary)]">
              View registered users, inspect point balances, and manage platform permissions.
            </p>
            <Link href="/admin/users">
              <Button variant="outline" size="sm" className="w-full flex items-center justify-center gap-2">
                <span>View All Users</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Recent Redemptions Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-bold">Recent Redemptions</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {!data?.recentRedemptions || data.recentRedemptions.length === 0 ? (
            <div className="p-8 text-center text-xs text-[var(--color-pk-text-tertiary)]">
              No redemption requests recorded yet.
            </div>
          ) : (
            <div className="divide-y divide-[var(--color-pk-border)]">
              {data.recentRedemptions.slice(0, 5).map((r: any) => (
                <div key={r.id} className="p-3 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[var(--color-pk-text-primary)]">{r.gift_card_name || "Gift Card"}</span>
                    <p className="text-[10px] text-[var(--color-pk-text-tertiary)]">{r.user_id}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-[var(--color-pk-text-primary)]">{r.denomination || r.points_spent} pts</span>
                    <Badge variant={r.status === "PENDING" ? "warning" : r.status === "FULFILLED" || r.status === "APPROVED" ? "success" : "danger"}>
                      {r.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
