import { useState, useEffect } from "react";
import RecordingButton from "../RecordingButton";

export default function RecordingButtonExample() {
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

  const handleStart = () => {
    console.log("Recording started");
    setIsRecording(true);
    setDuration(0);
  };

  const handleStop = () => {
    console.log("Recording stopped");
    setIsRecording(false);
  };

  return (
    <div className="flex items-center justify-center min-h-[300px]">
      <RecordingButton
        isRecording={isRecording}
        onStartRecording={handleStart}
        onStopRecording={handleStop}
        duration={duration}
      />
    </div>
  );
}
