"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function RedemptionsPage() {
  // Placeholder data
  const redemptions = [
    { id: "rd_1", user: "john@example.com", card: "Amazon Pay", amount: 5000, date: "2026-06-15", status: "PENDING" },
    { id: "rd_2", user: "jane@example.com", card: "Flipkart", amount: 10000, date: "2026-06-14", status: "PENDING" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[var(--color-pk-text-primary)]">Redemption Queue</h2>
        <Button variant="outline">Refresh</Button>
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
                  <TableCell>{rd.amount}</TableCell>
                  <TableCell><Badge variant="warning">{rd.status}</Badge></TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="destructive" size="sm">Reject</Button>
                    <Button variant="default" size="sm">Approve</Button>
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
