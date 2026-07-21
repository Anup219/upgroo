"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { walletService } from "@/services/walletService";
import { WalletCard } from "@/components/dashboard/WalletCard";
import { Card, CardContent } from "@/components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/Skeleton";
import { History, Coins } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface Transaction {
  id: string;
  type: string;
  amount: number;
  provider: string;
  created_at: string;
  status: string;
}

export default function WalletPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [walletData, setWalletData] = useState({ availablePoints: 0, pendingPoints: 0, redeemedPoints: 0 });
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    if (!user?.uid) return;
    const uid = user.uid;

    (async () => {
      try {
        const [w, txs] = await Promise.all([
          walletService.getWalletBalance(uid),
          walletService.getTransactionHistory(uid, 50),
        ]);
        if (w) {
          setWalletData({
            availablePoints: w.available_points ?? 0,
            pendingPoints: w.pending_points ?? 0,
            redeemedPoints: w.redeemed_points ?? 0,
          });
        }
        setTransactions(txs || []);
      } catch (e) {
        console.error("Wallet fetch error", e);
      } finally {
        setLoading(false);
      }
    })();
  }, [user?.uid]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "COMPLETED": return <Badge variant="success">Completed</Badge>;
      case "PENDING": return <Badge variant="warning">Pending</Badge>;
      case "FAILED": return <Badge variant="danger">Failed</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  const getTypeLabel = (type: string, provider: string) => {
    switch (type) {
      case "CREDIT": return `Offerwall (${provider})`;
      case "PENDING_CREDIT": return `Pending Offer (${provider})`;
      case "DEBIT": return `Gift Card (${provider})`;
      default: return provider || type;
    }
  };

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-8">
      <div>
        <h1 className="text-xl font-bold text-[var(--color-text-primary)] mb-1">Your Wallet</h1>
        <p className="text-xs text-[var(--color-text-inverse)]">Track your points balance and transaction history.</p>
      </div>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-3">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      ) : (
        <WalletCard {...walletData} />
      )}

      <div>
        <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-3">Transaction History</h2>
        <Card className="border border-[var(--color-border)] bg-[var(--color-surface-card)] shadow-sm overflow-hidden">
          <CardContent className="p-0">
            {loading ? (
              <div className="space-y-3 p-6">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            ) : transactions.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Points</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell className="text-xs text-[var(--color-text-muted)]">{formatDate(tx.created_at)}</TableCell>
                      <TableCell className="text-xs font-medium text-[var(--color-text-primary)]">
                        {getTypeLabel(tx.type, tx.provider)}
                      </TableCell>
                      <TableCell className={`text-xs font-bold ${tx.type === "DEBIT" ? "text-[var(--color-danger)]" : "text-emerald-500"}`}>
                        {tx.type === "DEBIT" ? "-" : "+"}{tx.amount} pts
                      </TableCell>
                      <TableCell>{getStatusBadge(tx.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <History className="h-8 w-8 text-[var(--color-text-muted)] mb-2" />
                <p className="text-sm font-medium text-[var(--color-text-primary)]">No transactions yet</p>
                <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                  Complete your first offer to see transactions here.
                </p>
                <Link href="/earn" className="mt-3">
                  <Button size="sm" variant="outline">Start Earning</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
