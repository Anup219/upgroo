"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Users, Search, ShieldCheck, RefreshCw, Loader2 } from "lucide-react";

interface AdminUser {
  uid: string;
  email: string;
  displayName: string;
  createdAt: string;
  lastSignIn: string;
  isAdmin: boolean;
  availablePoints: number;
  pendingPoints: number;
  redeemedPoints: number;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      if (res.ok) {
        const data = await res.json();
        setUsers(data || []);
      }
    } catch (e) {
      console.error("Failed to fetch users:", e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchUsers();
  };

  const filteredUsers = users.filter(
    (u) =>
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.displayName.toLowerCase().includes(search.toLowerCase()) ||
      u.uid.toLowerCase().includes(search.toLowerCase())
  );

  function formatDate(iso: string) {
    if (!iso) return "N/A";
    return new Date(iso).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <div className="space-y-6 max-w-6xl pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--color-pk-border)] pb-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-pk-text-primary)] flex items-center gap-2">
            User Management
            <Badge variant="outline" className="text-xs">{users.length} Registered</Badge>
          </h1>
          <p className="text-xs text-[var(--color-pk-text-secondary)] mt-0.5">
            Monitor registered platform accounts, wallet balances, and administrator status.
          </p>
        </div>

        <Button variant="outline" size="sm" onClick={handleRefresh} disabled={refreshing} className="flex items-center gap-2">
          <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </Button>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-[var(--color-pk-text-tertiary)]" />
          <Input
            placeholder="Search by email, name, or UID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 text-xs"
          />
        </div>
      </div>

      <Card>
        <CardHeader className="py-3">
          <CardTitle className="text-sm font-bold">Registered Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-6 w-6 animate-spin text-[var(--color-pk-accent)]" />
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="p-12 text-center text-xs text-[var(--color-pk-text-tertiary)]">
              No users found matching query.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User / Email</TableHead>
                  <TableHead>Joined Date</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Available Pts</TableHead>
                  <TableHead>Pending Pts</TableHead>
                  <TableHead>Redeemed Pts</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((u) => (
                  <TableRow key={u.uid}>
                    <TableCell>
                      <div>
                        <p className="font-bold text-xs text-[var(--color-pk-text-primary)]">{u.displayName}</p>
                        <p className="text-[11px] text-[var(--color-pk-text-tertiary)]">{u.email}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs">{formatDate(u.createdAt)}</TableCell>
                    <TableCell>
                      {u.isAdmin ? (
                        <Badge variant="danger" className="flex items-center gap-1 w-fit">
                          <ShieldCheck className="h-3 w-3" /> Admin
                        </Badge>
                      ) : (
                        <Badge variant="outline">User</Badge>
                      )}
                    </TableCell>
                    <TableCell className="font-bold text-xs text-emerald-500">
                      {u.availablePoints.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-xs text-amber-500 font-semibold">
                      {u.pendingPoints.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-xs text-[var(--color-pk-text-secondary)] font-semibold">
                      {u.redeemedPoints.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
