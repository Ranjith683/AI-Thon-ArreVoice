import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ActivityCalendarProps {
  activityData: { date: Date; count: number }[];
}

export default function ActivityCalendar({ activityData }: ActivityCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const getActivityColor = (count: number) => {
    if (count === 0) return "bg-muted hover:bg-muted";
    if (count === 1) return "bg-primary/30 hover:bg-primary/40";
    if (count === 2) return "bg-primary/50 hover:bg-primary/60";
    if (count === 3) return "bg-primary/70 hover:bg-primary/80";
    return "bg-primary hover:bg-primary/90";
  };

  const getActivityForDate = (date: Date) => {
    const activity = activityData.find(
      (a) =>
        a.date.getDate() === date.getDate() &&
        a.date.getMonth() === date.getMonth() &&
        a.date.getFullYear() === date.getFullYear()
    );
    return activity?.count || 0;
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const goToCurrentMonth = () => {
    setCurrentMonth(new Date());
  };

  const isCurrentMonth = () => {
    const now = new Date();
    return (
      currentMonth.getMonth() === now.getMonth() &&
      currentMonth.getFullYear() === now.getFullYear()
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-heading font-semibold">Activity Calendar</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPreviousMonth}
              data-testid="button-previous-month"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={goToCurrentMonth}
              disabled={isCurrentMonth()}
              data-testid="button-current-month"
            >
              Today
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={goToNextMonth}
              data-testid="button-next-month"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold">
            {monthNames[month]} {year}
          </h3>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className="text-center text-sm font-medium text-muted-foreground py-2"
            >
              {day}
            </div>
          ))}

          {Array.from({ length: startingDayOfWeek }).map((_, index) => (
            <div key={`empty-${index}`} className="aspect-square" />
          ))}

          {Array.from({ length: daysInMonth }).map((_, index) => {
            const day = index + 1;
            const date = new Date(year, month, day);
            const activityCount = getActivityForDate(date);
            const isToday =
              date.toDateString() === new Date().toDateString();

            return (
              <div
                key={day}
                className={`aspect-square rounded-md border flex items-center justify-center relative transition-all ${getActivityColor(
                  activityCount
                )} ${isToday ? "ring-2 ring-primary ring-offset-2" : ""}`}
                title={`${date.toLocaleDateString()}: ${activityCount} recordings`}
              >
                <span className={`text-sm font-medium ${activityCount > 0 ? "text-primary-foreground" : "text-foreground"}`}>
                  {day}
                </span>
                {activityCount > 0 && (
                  <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-primary-foreground" />
                )}
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground pt-4 border-t">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-4 h-4 rounded-sm bg-muted border" />
            <div className="w-4 h-4 rounded-sm bg-primary/30 border" />
            <div className="w-4 h-4 rounded-sm bg-primary/50 border" />
            <div className="w-4 h-4 rounded-sm bg-primary/70 border" />
            <div className="w-4 h-4 rounded-sm bg-primary border" />
          </div>
          <span>More</span>
        </div>
      </CardContent>
    </Card>
  );
}
