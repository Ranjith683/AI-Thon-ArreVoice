import EmptyState from "../EmptyState";

export default function EmptyStateExample() {
  return (
    <div className="min-h-[400px]">
      <EmptyState onNewRecording={() => console.log("New recording clicked")} />
    </div>
  );
}
