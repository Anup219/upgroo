import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Coins, Clock, Gift } from "lucide-react";

interface WalletCardProps {
  availablePoints: number;
  pendingPoints: number;
  redeemedPoints: number;
}

export function WalletCard({ availablePoints, pendingPoints, redeemedPoints }: WalletCardProps) {
  // Assuming 100 points = ₹1
  const pointsToINR = (points: number) => (points / 100).toFixed(2);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="bg-[var(--color-pk-surface-elevated)] border-none">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-[var(--color-pk-text-secondary)]">Available Balance</CardTitle>
          <Coins className="h-4 w-4 text-[var(--color-pk-accent)]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-[var(--color-pk-text-primary)]">{availablePoints.toLocaleString()}</div>
          <p className="text-xs text-[var(--color-pk-text-secondary)] mt-1">
            ≈ ₹{pointsToINR(availablePoints)} INR
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-[var(--color-pk-surface-elevated)] border-none opacity-80">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-[var(--color-pk-text-secondary)]">Pending Verification</CardTitle>
          <Clock className="h-4 w-4 text-[var(--color-pk-warning)]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-[var(--color-pk-text-primary)]">{pendingPoints.toLocaleString()}</div>
          <p className="text-xs text-[var(--color-pk-text-secondary)] mt-1">
            Points awaiting approval
          </p>
        </CardContent>
      </Card>

      <Card className="bg-[var(--color-pk-surface-elevated)] border-none opacity-80">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-[var(--color-pk-text-secondary)]">Lifetime Redeemed</CardTitle>
          <Gift className="h-4 w-4 text-[var(--color-pk-success)]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-[var(--color-pk-text-primary)]">{redeemedPoints.toLocaleString()}</div>
          <p className="text-xs text-[var(--color-pk-text-secondary)] mt-1">
            ≈ ₹{pointsToINR(redeemedPoints)} INR
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
