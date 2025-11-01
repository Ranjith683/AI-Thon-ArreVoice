import BadgeCollection from "../BadgeCollection";

export default function BadgeCollectionExample() {
  return (
    <div className="p-6 max-w-3xl">
      <BadgeCollection currentStreak={12} />
    </div>
  );
}
