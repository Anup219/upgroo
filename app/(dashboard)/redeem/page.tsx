"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { Gift } from "lucide-react";

export default function RedeemPage() {
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [selectedDenom, setSelectedDenom] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock catalog
  const catalog = [
    {
      id: "gc_amazon_in",
      name: "Amazon Pay",
      brand: "Amazon",
      denominations: [5000, 10000, 25000, 50000],
    },
    {
      id: "gc_flipkart",
      name: "Flipkart",
      brand: "Flipkart",
      denominations: [10000, 25000, 50000],
    },
    {
      id: "gc_swiggy",
      name: "Swiggy",
      brand: "Swiggy",
      denominations: [5000, 10000, 20000],
    }
  ];

  const handleSelectCard = (card: any) => {
    setSelectedCard(card);
    setSelectedDenom(null);
    setIsModalOpen(true);
  };

  const handleRedeem = () => {
    // Call server action here
    alert(`Requested redemption for ${selectedCard.name} (${selectedDenom} points)`);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-[var(--color-pk-text-primary)]">Redeem Points</h2>
        <p className="text-[var(--color-pk-text-secondary)]">
          Exchange your points for digital gift cards. Processing typically takes 24-48 hours.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {catalog.map((card) => (
          <Card key={card.id} className="cursor-pointer hover:border-[var(--color-pk-accent)] transition-colors" onClick={() => handleSelectCard(card)}>
            <CardHeader className="text-center pb-2">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-pk-surface-elevated)]">
                <Gift className="h-8 w-8 text-[var(--color-pk-text-secondary)]" />
              </div>
              <CardTitle>{card.name}</CardTitle>
              <CardDescription>Starts at {card.denominations[0]} pts</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={`Redeem ${selectedCard?.name}`}
      >
        <div className="space-y-6">
          <p className="text-sm text-[var(--color-pk-text-secondary)]">
            Select the amount you want to redeem. Ensure you have enough points in your available balance.
          </p>
          
          <div className="grid grid-cols-2 gap-3">
            {selectedCard?.denominations.map((pts: number) => (
              <button
                key={pts}
                onClick={() => setSelectedDenom(pts)}
                className={`flex flex-col items-center rounded-md border p-3 transition-colors ${
                  selectedDenom === pts 
                    ? "border-[var(--color-pk-accent)] bg-[var(--color-pk-accent)]/10 text-[var(--color-pk-accent)]" 
                    : "border-[var(--color-pk-border)] bg-[var(--color-pk-surface)] text-[var(--color-pk-text-primary)] hover:border-[var(--color-pk-text-secondary)]"
                }`}
              >
                <span className="font-semibold">{pts} pts</span>
                <span className="text-xs opacity-80">₹{pts / 100}</span>
              </button>
            ))}
          </div>

          <div className="pt-4 flex justify-end space-x-3 border-t border-[var(--color-pk-border)]">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleRedeem} disabled={!selectedDenom}>
              Confirm Redemption
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
