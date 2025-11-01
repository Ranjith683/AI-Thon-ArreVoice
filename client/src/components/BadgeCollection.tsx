import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Lock } from "lucide-react";

interface BadgeItem {
  tier: string;
  days: number;
  color: string;
  unlocked: boolean;
}

const BADGES: BadgeItem[] = [
  { tier: "Bronze", days: 3, color: "bg-orange-600", unlocked: true },
  { tier: "Silver", days: 7, color: "bg-gray-400", unlocked: true },
  { tier: "Gold", days: 14, color: "bg-yellow-500", unlocked: false },
  { tier: "Platinum", days: 30, color: "bg-purple-500", unlocked: false },
  { tier: "Diamond", days: 60, color: "bg-cyan-500", unlocked: false },
];

interface BadgeCollectionProps {
  currentStreak: number;
}

export default function BadgeCollection({ currentStreak }: BadgeCollectionProps) {
  const badges = BADGES.map((badge) => ({
    ...badge,
    unlocked: currentStreak >= badge.days,
  }));

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-heading font-semibold">Badge Collection</h2>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.tier}
              className={`p-4 rounded-lg border text-center space-y-2 ${
                badge.unlocked ? "bg-card" : "bg-muted/30 opacity-60"
              }`}
              data-testid={`badge-${badge.tier.toLowerCase()}`}
            >
              <div
                className={`w-16 h-16 mx-auto rounded-full ${badge.color} flex items-center justify-center ${
                  !badge.unlocked && "grayscale"
                }`}
              >
                {badge.unlocked ? (
                  <Trophy className="w-8 h-8 text-white" />
                ) : (
                  <Lock className="w-8 h-8 text-white/70" />
                )}
              </div>
              <div>
                <h3 className="font-semibold">{badge.tier}</h3>
                <p className="text-sm text-muted-foreground">{badge.days} days</p>
              </div>
              {!badge.unlocked && (
                <p className="text-xs text-muted-foreground">
                  {badge.days - currentStreak} days to unlock
                </p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
