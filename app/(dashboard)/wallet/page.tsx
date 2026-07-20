"use client";

import { useEffect, useState } from "react";
import { WalletCard } from "@/components/dashboard/WalletCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { History } from "lucide-react";

export default function WalletPage() {
  const [loading, setLoading] = useState(true);
  
  // Placeholder data for MVP UI until backend integration is wired up in server actions
  const walletData = {
    availablePoints: 2500,
    pendingPoints: 500,
    redeemedPoints: 10000,
  };

  const transactions = [
    { id: "tx_1", type: "CREDIT", amount: 1500, provider: "Lootably", date: "2026-06-14", status: "COMPLETED" },
    { id: "tx_2", type: "REDEMPTION", amount: -5000, provider: "Amazon", date: "2026-06-10", status: "COMPLETED" },
    { id: "tx_3", type: "PENDING_CREDIT", amount: 500, provider: "Lootably", date: "2026-06-15", status: "PENDING" },
  ];

  useEffect(() => {
    // Simulate data fetch
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

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
      case "REDEMPTION": return `Gift Card (${provider})`;
      default: return type;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-[var(--color-pk-text-primary)] mb-6">Your Wallet</h2>
        {loading ? (
          <div className="grid gap-4 md:grid-cols-3">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        ) : (
          <WalletCard {...walletData} />
        )}
      </div>

      <div>
        <h3 className="text-xl font-bold text-[var(--color-pk-text-primary)] mb-4">Recent Transactions</h3>
        <Card>
          <CardContent className="p-0">
            {loading ? (
              <div className="space-y-4 p-6">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            ) : transactions.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell className="font-medium">{tx.date}</TableCell>
                      <TableCell>{getTypeLabel(tx.type, tx.provider)}</TableCell>
                      <TableCell className={tx.amount > 0 ? "text-[var(--color-pk-success)] font-medium" : "text-[var(--color-pk-text-primary)] font-medium"}>
                        {tx.amount > 0 ? "+" : ""}{tx.amount} pts
                      </TableCell>
                      <TableCell>{getStatusBadge(tx.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <EmptyState 
                icon={History} 
                title="No transactions yet" 
                description="Complete tasks to earn points and see your history here." 
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
