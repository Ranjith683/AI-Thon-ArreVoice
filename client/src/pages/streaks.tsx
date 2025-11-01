import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import BadgeCollection from "@/components/BadgeCollection";
import StreakWidget from "@/components/StreakWidget";
import ActivityCalendar from "@/components/ActivityCalendar";

export default function Streaks() {
  const streak = {
    currentStreak: 12,
    longestStreak: 18,
    totalRecordings: 45,
  };

  const activityData = Array.from({ length: 365 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (364 - i));
    return {
      date,
      count: Math.random() > 0.7 ? Math.floor(Math.random() * 5) : 0,
    };
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon" data-testid="button-back">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold">
              Your Streak
            </h1>
            <p className="text-muted-foreground mt-1">
              Track your progress and earn achievement badges
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <StreakWidget
              currentStreak={streak.currentStreak}
              longestStreak={streak.longestStreak}
              totalRecordings={streak.totalRecordings}
            />
          </div>

          <div className="md:col-span-2">
            <ActivityCalendar activityData={activityData} />
          </div>
        </div>

        <BadgeCollection currentStreak={streak.currentStreak} />

        <div className="bg-card rounded-lg border p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Keep Going!</h3>
          <p className="text-muted-foreground">
            Record daily to maintain your streak and unlock more badges
          </p>
        </div>
      </div>
    </div>
  );
}
