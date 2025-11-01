import { Mic } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onNewRecording: () => void;
}

export default function EmptyState({ onNewRecording }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-32 h-32 rounded-full bg-muted/50 flex items-center justify-center mb-6">
        <Mic className="w-16 h-16 text-muted-foreground" strokeWidth={1.5} />
      </div>
      <h2 className="text-2xl font-heading font-semibold mb-2">
        No recordings yet
      </h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        Start your journey by creating your first voice recording. Your thoughts and ideas deserve to be captured.
      </p>
      <Button onClick={onNewRecording} size="lg" data-testid="button-create-first-recording">
        <Mic className="w-4 h-4 mr-2" />
        Create First Recording
      </Button>
    </div>
  );
}
