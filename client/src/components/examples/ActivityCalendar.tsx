import ActivityCalendar from "../ActivityCalendar";

export default function ActivityCalendarExample() {
  const activityData = Array.from({ length: 365 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (364 - i));
    return {
      date,
      count: Math.random() > 0.7 ? Math.floor(Math.random() * 5) : 0,
    };
  });

  return (
    <div className="p-6 max-w-3xl">
      <ActivityCalendar activityData={activityData} />
    </div>
  );
}
