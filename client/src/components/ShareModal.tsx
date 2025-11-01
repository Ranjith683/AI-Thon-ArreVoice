import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check } from "lucide-react";
import { SiX, SiThreads } from "react-icons/si";
import { useState } from "react";

interface ShareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  summary: string;
  bulletPoints: string[];
}

export default function ShareModal({
  open,
  onOpenChange,
  title,
  summary,
  bulletPoints,
}: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  const shareText = `🎙️ Voice Recording Summary

${title}

${summary}

${bulletPoints.map((point) => `• ${point}`).join("\n")}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareThreads = () => {
    const url = `https://threads.net/intent/post?text=${encodeURIComponent(shareText)}`;
    window.open(url, "_blank");
  };

  const handleShareX = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(url, "_blank");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Share Recording</DialogTitle>
          <DialogDescription>
            Share your transcribed recording on social media
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative">
            <Textarea
              value={shareText}
              readOnly
              className="min-h-[200px] font-mono text-sm resize-none"
              data-testid="textarea-share-content"
            />
            <Button
              size="sm"
              variant="outline"
              className="absolute top-2 right-2"
              onClick={handleCopy}
              data-testid="button-copy-text"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </>
              )}
            </Button>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleShareThreads}
              className="flex-1"
              variant="outline"
              data-testid="button-share-threads"
            >
              <SiThreads className="w-4 h-4 mr-2" />
              Share on Threads
            </Button>
            <Button
              onClick={handleShareX}
              className="flex-1"
              variant="outline"
              data-testid="button-share-x"
            >
              <SiX className="w-4 h-4 mr-2" />
              Share on X
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            {shareText.length} characters
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
