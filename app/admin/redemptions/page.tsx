"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { RefreshCw, Loader2, CheckCircle2, XCircle } from "lucide-react";

interface RedemptionRecord {
  id: string;
  user_id: string;
  gift_card_name: string;
  denomination: number;
  points_spent: number;
  status: string;
  voucher_code?: string;
  created_at: string;
}

export default function RedemptionsPage() {
  const [redemptions, setRedemptions] = useState<RedemptionRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const fetchRedemptions = async () => {
    try {
      const res = await fetch("/api/admin/redemptions");
      if (res.ok) {
        const data = await res.json();
        setRedemptions(data || []);
      }
    } catch (e) {
      console.error("Failed to fetch redemptions:", e);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRedemptions();
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchRedemptions();
  };

  const handleAction = async (redemptionId: string, action: "APPROVE" | "REJECT") => {
    setProcessingId(redemptionId);
    try {
      const res = await fetch("/api/admin/redemptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ redemptionId, action }),
      });

      if (res.ok) {
        setRedemptions((prev) =>
          prev.map((r) =>
            r.id === redemptionId
              ? {
                  ...r,
                  status: action === "APPROVE" ? "APPROVED" : "REJECTED",
                }
              : r
          )
        );
      }
    } catch (e) {
      console.error(`Failed to ${action} redemption:`, e);
    } finally {
      setProcessingId(null);
    }
  };

  function formatDate(iso: string) {
    if (!iso) return "N/A";
    return new Date(iso).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="space-y-6 max-w-6xl pb-10">
      <div className="flex items-center justify-between border-b border-[var(--color-pk-border)] pb-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-pk-text-primary)] flex items-center gap-2">
            Redemption Queue
            <Badge variant="outline" className="text-xs">{redemptions.length} Total</Badge>
          </h1>
          <p className="text-xs text-[var(--color-pk-text-secondary)] mt-0.5">
            Review and process user reward redemption requests in real time.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing} className="flex items-center gap-2">
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </Button>
      </div>

      <Card>
        <CardHeader className="py-3">
          <CardTitle className="text-sm font-bold">Redemption Requests</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-6 w-6 animate-spin text-[var(--color-pk-accent)]" />
            </div>
          ) : redemptions.length === 0 ? (
            <div className="p-12 text-center text-xs text-[var(--color-pk-text-tertiary)]">
              No redemptions submitted yet.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>User ID</TableHead>
                  <TableHead>Gift Card</TableHead>
                  <TableHead>Points</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {redemptions.map((rd) => {
                  const isPending = rd.status === "PENDING";
                  const isApproved = rd.status === "APPROVED" || rd.status === "FULFILLED";
                  const isRejected = rd.status === "REJECTED";
                  const isProcessing = processingId === rd.id;

                  return (
                    <TableRow key={rd.id}>
                      <TableCell className="text-xs text-[var(--color-pk-text-tertiary)]">{formatDate(rd.created_at)}</TableCell>
                      <TableCell className="font-mono text-xs text-[var(--color-pk-text-primary)]">{rd.user_id}</TableCell>
                      <TableCell className="font-bold text-xs">{rd.gift_card_name}</TableCell>
                      <TableCell className="font-bold text-xs">{Number(rd.denomination || rd.points_spent).toLocaleString()}</TableCell>
                      <TableCell>
                        {isPending && <Badge variant="warning">PENDING</Badge>}
                        {isApproved && <Badge variant="success">APPROVED</Badge>}
                        {isRejected && <Badge variant="danger">REJECTED</Badge>}
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        {isPending ? (
                          <>
                            <Button
                              variant="destructive"
                              size="sm"
                              disabled={isProcessing}
                              onClick={() => handleAction(rd.id, "REJECT")}
                            >
                              Reject
                            </Button>
                            <Button
                              variant="default"
                              size="sm"
                              disabled={isProcessing}
                              onClick={() => handleAction(rd.id, "APPROVE")}
                            >
                              Approve
                            </Button>
                          </>
                        ) : (
                          <span className="text-xs text-[var(--color-pk-text-tertiary)] italic">Processed</span>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
