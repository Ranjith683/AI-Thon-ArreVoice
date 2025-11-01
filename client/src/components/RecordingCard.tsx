import { useState } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Share2, Trash2, Lock, ChevronDown, ChevronUp } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface RecordingCardProps {
  id: string;
  title?: string;
  tags: string[];
  transcription?: string;
  summary?: string;
  bulletPoints?: string[];
  duration: number;
  isPrivate: boolean;
  createdAt: Date;
  onPlay: (id: string) => void;
  onShare: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function RecordingCard({
  id,
  title,
  tags,
  transcription,
  summary,
  bulletPoints,
  duration,
  isPrivate,
  createdAt,
  onPlay,
  onShare,
  onDelete,
}: RecordingCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Card className="hover-elevate" data-testid={`card-recording-${id}`}>
      <CardHeader className="space-y-2 pb-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold truncate">
              {title || "Untitled Recording"}
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <span>{formatDistanceToNow(createdAt, { addSuffix: true })}</span>
              <span>•</span>
              <span>{formatDuration(duration)}</span>
              {isPrivate && (
                <>
                  <span>•</span>
                  <Lock className="w-3 h-3" />
                </>
              )}
            </div>
          </div>
        </div>
        
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="capitalize" data-testid={`badge-tag-${tag}`}>
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {transcription && (
          <div className="space-y-2">
            <p className={`text-sm text-foreground ${!isExpanded && "line-clamp-3"}`}>
              {transcription}
            </p>
            {transcription.length > 150 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-sm text-primary hover:underline flex items-center gap-1"
                data-testid="button-expand-transcription"
              >
                {isExpanded ? (
                  <>
                    <span>Show less</span>
                    <ChevronUp className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <span>Read more</span>
                    <ChevronDown className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        )}

        {summary && (
          <div className="space-y-2 p-4 rounded-lg bg-muted/50">
            <p className="text-sm italic text-muted-foreground">{summary}</p>
            {bulletPoints && bulletPoints.length > 0 && (
              <ul className="space-y-1 ml-4">
                {bulletPoints.map((point, index) => (
                  <li key={index} className="text-sm list-disc text-foreground">
                    {point}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex gap-2 pt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPlay(id)}
          data-testid={`button-play-${id}`}
        >
          <Play className="w-4 h-4 mr-2" />
          Play
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onShare(id)}
          data-testid={`button-share-${id}`}
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDelete(id)}
          className="ml-auto"
          data-testid={`button-delete-${id}`}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
