import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import RecordingButton from "./RecordingButton";
import TagSelector from "./TagSelector";

interface RecordingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: {
    title: string;
    tags: string[];
    isPrivate: boolean;
    duration: number;
  }) => void;
}

export default function RecordingModal({
  open,
  onOpenChange,
  onSave,
}: RecordingModalProps) {
  const [title, setTitle] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isPrivate, setIsPrivate] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleSave = () => {
    if (duration > 0) {
      onSave({ title, tags: selectedTags, isPrivate, duration });
      handleClose();
    }
  };

  const handleClose = () => {
    setTitle("");
    setSelectedTags([]);
    setIsPrivate(false);
    setIsRecording(false);
    setDuration(0);
    onOpenChange(false);
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`max-w-2xl ${
          isPrivate
            ? "border-2 border-dashed border-muted-foreground/50 bg-card"
            : ""
        }`}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            New Recording
            {isPrivate && <Lock className="w-4 h-4 text-muted-foreground" />}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title (Optional)</Label>
            <Input
              id="title"
              placeholder="Enter a title for your recording..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              data-testid="input-recording-title"
            />
          </div>

          <div className="flex items-center justify-center py-8">
            <RecordingButton
              isRecording={isRecording}
              onStartRecording={() => setIsRecording(true)}
              onStopRecording={() => setIsRecording(false)}
              duration={duration}
            />
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <TagSelector
              selectedTags={selectedTags}
              onTagToggle={handleTagToggle}
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
            <div className="space-y-0.5">
              <Label htmlFor="private-mode" className="text-base">
                Private Mode
              </Label>
              <p className="text-sm text-muted-foreground">
                Recording will be saved locally
              </p>
            </div>
            <Switch
              id="private-mode"
              checked={isPrivate}
              onCheckedChange={setIsPrivate}
              data-testid="toggle-private-mode"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} data-testid="button-cancel">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={duration === 0}
            data-testid="button-save-recording"
          >
            Save Recording
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
