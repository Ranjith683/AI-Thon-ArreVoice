import { useState, useEffect } from "react";
import { Mic, Square } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RecordingButtonProps {
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  duration: number;
}

export default function RecordingButton({
  isRecording,
  onStartRecording,
  onStopRecording,
  duration,
}: RecordingButtonProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-2xl font-mono font-semibold text-foreground">
        {formatTime(duration)}
      </div>
      
      <button
        onClick={isRecording ? onStopRecording : onStartRecording}
        className={`relative w-32 h-32 rounded-full transition-all ${
          isRecording
            ? "bg-destructive hover:bg-destructive/90"
            : "bg-primary hover:bg-primary/90"
        }`}
        data-testid={isRecording ? "button-stop-recording" : "button-start-recording"}
      >
        {isRecording ? (
          <>
            <div className="absolute inset-0 rounded-full bg-destructive animate-pulse opacity-50" />
            <Square className="w-12 h-12 text-destructive-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" fill="currentColor" />
          </>
        ) : (
          <Mic className="w-12 h-12 text-primary-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        )}
      </button>
      
      {isRecording && (
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-1 bg-primary rounded-full animate-pulse"
              style={{
                height: `${Math.random() * 20 + 10}px`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
