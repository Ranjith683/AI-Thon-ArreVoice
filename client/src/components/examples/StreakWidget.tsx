import StreakWidget from "../StreakWidget";

export default function StreakWidgetExample() {
  return (
    <div className="p-6 max-w-sm">
      <StreakWidget currentStreak={12} longestStreak={18} totalRecordings={45} />
    </div>
  );
}
