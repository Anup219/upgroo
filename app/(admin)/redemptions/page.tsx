"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { RefreshCw, CheckCircle, XCircle } from "lucide-react";

interface RedemptionItem {
  id: string;
  user: string;
  card: string;
  amount: number;
  date: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

export default function RedemptionsPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [redemptions, setRedemptions] = useState<RedemptionItem[]>([
    { id: "rd_1", user: "john@example.com", card: "Amazon Pay", amount: 5000, date: "2026-06-15", status: "PENDING" },
    { id: "rd_2", user: "jane@example.com", card: "Flipkart", amount: 10000, date: "2026-06-14", status: "PENDING" },
  ]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  const handleStatusChange = (id: string, newStatus: "APPROVED" | "REJECTED") => {
    setRedemptions((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-pk-text-primary)]">Redemption Queue</h2>
          <p className="text-xs text-[var(--color-pk-text-secondary)] mt-0.5">
            Review and process user reward redemption requests.
          </p>
        </div>
        <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing} className="flex items-center gap-2">
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending Approvals</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Gift Card</TableHead>
                <TableHead>Amount (Pts)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {redemptions.map((rd) => (
                <TableRow key={rd.id}>
                  <TableCell>{rd.date}</TableCell>
                  <TableCell>{rd.user}</TableCell>
                  <TableCell className="font-medium">{rd.card}</TableCell>
                  <TableCell>{rd.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    {rd.status === "PENDING" && <Badge variant="warning">PENDING</Badge>}
                    {rd.status === "APPROVED" && <Badge variant="success">APPROVED</Badge>}
                    {rd.status === "REJECTED" && <Badge variant="destructive">REJECTED</Badge>}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    {rd.status === "PENDING" ? (
                      <>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleStatusChange(rd.id, "REJECTED")}
                        >
                          Reject
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => handleStatusChange(rd.id, "APPROVED")}
                        >
                          Approve
                        </Button>
                      </>
                    ) : (
                      <span className="text-xs text-[var(--color-pk-text-secondary)] italic">Processed</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
