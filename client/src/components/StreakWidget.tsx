import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flame, Trophy, Calendar } from "lucide-react";

interface StreakWidgetProps {
  currentStreak: number;
  longestStreak: number;
  totalRecordings: number;
}

const getStreakBadge = (streak: number) => {
  if (streak >= 60) return { tier: "Diamond", color: "bg-cyan-500" };
  if (streak >= 30) return { tier: "Platinum", color: "bg-purple-500" };
  if (streak >= 14) return { tier: "Gold", color: "bg-yellow-500" };
  if (streak >= 7) return { tier: "Silver", color: "bg-gray-400" };
  if (streak >= 3) return { tier: "Bronze", color: "bg-orange-600" };
  return { tier: "None", color: "bg-muted" };
};

export default function StreakWidget({
  currentStreak,
  longestStreak,
  totalRecordings,
}: StreakWidgetProps) {
  const badge = getStreakBadge(currentStreak);
  const nextMilestone =
    currentStreak < 3
      ? 3
      : currentStreak < 7
      ? 7
      : currentStreak < 14
      ? 14
      : currentStreak < 30
      ? 30
      : 60;

  return (
    <Card className="hover-elevate" data-testid="widget-streak">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-muted-foreground">Current Streak</h3>
          <Flame className="w-5 h-5 text-orange-500" />
        </div>
        
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-4xl font-bold font-heading" data-testid="text-current-streak">
            {currentStreak}
          </span>
          <span className="text-lg text-muted-foreground">days</span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Badge</span>
            <Badge className={`${badge.color} text-white`} data-testid="badge-streak-tier">
              {badge.tier}
            </Badge>
          </div>

          {currentStreak < 60 && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Next milestone</span>
                <span className="font-medium">{nextMilestone} days</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{
                    width: `${(currentStreak / nextMilestone) * 100}%`,
                  }}
                />
              </div>
            </div>
          )}

          <div className="pt-3 border-t space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Trophy className="w-4 h-4" />
                <span>Longest Streak</span>
              </div>
              <span className="font-medium" data-testid="text-longest-streak">{longestStreak} days</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>Total Recordings</span>
              </div>
              <span className="font-medium" data-testid="text-total-recordings">{totalRecordings}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
