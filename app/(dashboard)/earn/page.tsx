"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { 
  ArrowLeft, 
  Gamepad2, 
  Sparkles, 
  Lock, 
  Zap, 
  CheckCircle2, 
  Compass, 
  ListTodo, 
  DollarSign 
} from "lucide-react";

interface Wall {
  id: string;
  name: string;
  type: "Offerwall" | "Surveywall";
  description: string;
  rating: string;
  pointsRange: string;
  status: "ACTIVE" | "COMING_SOON";
  icon: any;
}

export default function EarnPage() {
  const { user } = useAuth();
  const [selectedWallId, setSelectedWallId] = useState<string | null>(null);

  const placementId = process.env.NEXT_PUBLIC_LOOTABLY_PLACEMENT_ID || "DEMO_PLACEMENT";
  const offerwallUrl = `https://wall.lootably.com/?placementID=${placementId}&sid=${user?.uid || ""}`;

  const walls: Wall[] = [
    {
      id: "lootably",
      name: "Lootably",
      type: "Offerwall",
      description: "High-paying offers, games, video rewards, and surveys verified instantly.",
      rating: "4.9/5",
      pointsRange: "100 - 50,000 pts",
      status: "COMING_SOON",
      icon: Zap,
    },
    {
      id: "bitlabs",
      name: "BitLabs Surveys",
      type: "Surveywall",
      description: "High match-rate profiling surveys tailored to your demographic preferences.",
      rating: "4.7/5",
      pointsRange: "500 - 15,000 pts",
      status: "COMING_SOON",
      icon: ListTodo,
    },
    {
      id: "monlix",
      name: "Monlix",
      type: "Offerwall",
      description: "Exciting new games, utility applications, and micro-tasks for rapid earning.",
      rating: "4.6/5",
      pointsRange: "150 - 35,000 pts",
      status: "COMING_SOON",
      icon: Gamepad2,
    },
    {
      id: "adgatemedia",
      name: "AdGate Media",
      type: "Offerwall",
      description: "Free trials, mobile app installs, and quiz rewards with quick support.",
      rating: "4.5/5",
      pointsRange: "50 - 25,000 pts",
      status: "COMING_SOON",
      icon: Compass,
    },
    {
      id: "cpalead",
      name: "CPALead",
      type: "Offerwall",
      description: "Short registration tasks, fast apps installs, and daily micro-credits.",
      rating: "4.3/5",
      pointsRange: "50 - 10,000 pts",
      status: "COMING_SOON",
      icon: DollarSign,
    },
  ];

  if (selectedWallId === "lootably") {
    return (
      <div className="flex h-[calc(100vh-8rem)] flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setSelectedWallId(null)}
              className="flex items-center gap-1.5"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to all walls</span>
            </Button>
            <h2 className="text-xl font-bold text-[var(--color-pk-text-primary)]">Lootably Offerwall</h2>
          </div>
          <Badge variant="success">Active Partner</Badge>
        </div>

        <Card className="flex-1 overflow-hidden border border-[var(--color-pk-border)] bg-[var(--color-pk-surface)]">
          <div className="h-full w-full bg-[var(--color-pk-bg)] flex items-center justify-center">
             {user ? (
               <iframe 
                 src={offerwallUrl} 
                 className="h-full w-full border-none"
                 title="Lootably Offerwall"
                 sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
               />
             ) : (
               <p className="text-[var(--color-pk-text-secondary)]">Loading offerwall...</p>
             )}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-10">
      <div>
        <h2 className="text-2xl font-bold text-[var(--color-pk-text-primary)]">Earn Points</h2>
        <p className="text-[var(--color-pk-text-secondary)]">
          Choose a partner wall below to complete offers, download apps, and answer surveys.
        </p>
      </div>

      <div className="rounded-xl border border-[var(--color-pk-accent)]/20 bg-[var(--color-pk-accent)]/5 p-4 text-[var(--color-pk-text-primary)] flex items-start gap-3">
        <Sparkles className="h-5 w-5 text-[var(--color-pk-accent)] shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <p className="font-semibold text-sm">Offerwalls Integration Coming Soon!</p>
          <p className="text-[var(--color-pk-text-secondary)] leading-relaxed">
            We are currently partnering with top reward providers to bring you verified, high-payout offerwalls and surveys. Stay tuned as new partner walls launch shortly!
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {walls.map((wall) => {
          const WallIcon = wall.icon;
          const isActive = wall.status === "ACTIVE";

          return (
            <Card 
              key={wall.id} 
              className={`relative overflow-hidden transition-all flex flex-col justify-between border ${
                isActive 
                  ? "cursor-pointer border-[var(--color-pk-border)] hover:border-[var(--color-pk-accent)] hover:shadow-md" 
                  : "border-[var(--color-pk-border)]/50 opacity-80"
              }`}
              onClick={() => isActive && setSelectedWallId(wall.id)}
            >
              {/* Background Glow for Active Card */}
              {isActive && (
                <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--color-pk-accent)]/5 rounded-full blur-2xl pointer-events-none" />
              )}

              <CardHeader className="pb-2">
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2.5 rounded-xl ${
                    isActive 
                      ? "bg-[var(--color-pk-accent)]/10 text-[var(--color-pk-accent)]" 
                      : "bg-[var(--color-pk-surface-elevated)] text-[var(--color-pk-text-tertiary)]"
                  }`}>
                    <WallIcon className="h-5 w-5" />
                  </div>
                  <Badge variant={isActive ? "default" : "outline"} className="text-xs">
                    {isActive ? wall.type : "Coming Soon"}
                  </Badge>
                </div>
                <CardTitle className="text-lg flex items-center gap-1.5 font-bold">
                  {wall.name}
                  {isActive && <Sparkles className="h-3.5 w-3.5 text-[var(--color-pk-accent)]" />}
                </CardTitle>
                <CardDescription className="text-sm line-clamp-2 mt-1">
                  {wall.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-2 flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs border-t border-[var(--color-pk-border)]/50 pt-3 mt-1">
                  <span className="text-[var(--color-pk-text-tertiary)]">Payout Range:</span>
                  <span className="font-semibold text-[var(--color-pk-text-primary)]">{wall.pointsRange}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[var(--color-pk-text-tertiary)]">User Rating:</span>
                  <span className="font-semibold text-[var(--color-pk-text-primary)]">{wall.rating}</span>
                </div>
              </CardContent>

              <div className="p-4 pt-0 mt-2">
                {isActive ? (
                  <Button className="w-full flex items-center justify-center gap-1">
                    Open Wall
                  </Button>
                ) : (
                  <div className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-md bg-[var(--color-pk-surface-elevated)]/60 text-xs font-semibold text-[var(--color-pk-text-tertiary)] border border-[var(--color-pk-border)]/20">
                    <Lock className="h-3.5 w-3.5" />
                    Locked / Integration Pending
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
