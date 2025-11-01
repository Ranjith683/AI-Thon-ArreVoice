import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mic, Plus } from "lucide-react";
import RecordingModal from "@/components/RecordingModal";
import RecordingCard from "@/components/RecordingCard";
import ShareModal from "@/components/ShareModal";
import StreakWidget from "@/components/StreakWidget";
import EmptyState from "@/components/EmptyState";

export default function Home() {
  const [recordingModalOpen, setRecordingModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedRecording, setSelectedRecording] = useState<any>(null);
  
  const [recordings, setRecordings] = useState([
    {
      id: "1",
      title: "Morning reflections on productivity",
      tags: ["personal", "journal"],
      transcription:
        "This morning I realized that true productivity isn't about doing more, it's about doing what matters. I've been spending too much time on tasks that don't align with my goals. Moving forward, I want to be more intentional about how I spend my time and energy.",
      summary:
        "Reflection on redefining productivity from quantity to quality and intentionality.",
      bulletPoints: [
        "Productivity should focus on meaningful work, not just quantity",
        "Many tasks don't align with long-term goals",
        "Intentionality is key to effective time management",
      ],
      duration: 95,
      isPrivate: false,
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
    },
    {
      id: "2",
      title: "Movie review: The latest sci-fi blockbuster",
      tags: ["cinema"],
      transcription:
        "Just watched the new sci-fi film and I have mixed feelings. The visual effects were absolutely stunning, but the plot felt rushed in the third act. The director clearly has a vision, but I think they needed another 20 minutes to properly develop the characters.",
      summary: "Mixed review of new sci-fi film praising visuals but critiquing pacing.",
      bulletPoints: [
        "Outstanding visual effects and cinematography",
        "Third act felt rushed and underdeveloped",
        "Characters needed more development time",
      ],
      duration: 142,
      isPrivate: false,
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    },
  ]);

  const [streak, setStreak] = useState({
    currentStreak: 12,
    longestStreak: 18,
    totalRecordings: 45,
  });

  const handleSaveRecording = (data: any) => {
    const newRecording = {
      id: Date.now().toString(),
      ...data,
      transcription: "Transcription will be processed...",
      summary: "AI summary will be generated...",
      bulletPoints: [],
      createdAt: new Date(),
    };
    setRecordings([newRecording, ...recordings]);
    console.log("Recording saved:", newRecording);
  };

  const handleShare = (id: string) => {
    const recording = recordings.find((r) => r.id === id);
    if (recording) {
      setSelectedRecording(recording);
      setShareModalOpen(true);
    }
  };

  const handleDelete = (id: string) => {
    setRecordings(recordings.filter((r) => r.id !== id));
    console.log("Recording deleted:", id);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold">
              VoiceNote
            </h1>
            <p className="text-muted-foreground mt-1">
              Capture your thoughts with AI-powered transcription
            </p>
          </div>
          <Button
            size="lg"
            onClick={() => setRecordingModalOpen(true)}
            data-testid="button-new-recording"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Recording
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-xl font-heading font-semibold">
              Recent Recordings
            </h2>
            
            {recordings.length === 0 ? (
              <EmptyState onNewRecording={() => setRecordingModalOpen(true)} />
            ) : (
              <div className="space-y-4">
                {recordings.map((recording) => (
                  <RecordingCard
                    key={recording.id}
                    {...recording}
                    onPlay={(id) => console.log("Play:", id)}
                    onShare={handleShare}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </div>

          <div>
            <StreakWidget
              currentStreak={streak.currentStreak}
              longestStreak={streak.longestStreak}
              totalRecordings={streak.totalRecordings}
            />
          </div>
        </div>
      </div>

      <RecordingModal
        open={recordingModalOpen}
        onOpenChange={setRecordingModalOpen}
        onSave={handleSaveRecording}
      />

      {selectedRecording && (
        <ShareModal
          open={shareModalOpen}
          onOpenChange={setShareModalOpen}
          title={selectedRecording.title || "Untitled Recording"}
          summary={selectedRecording.summary || ""}
          bulletPoints={selectedRecording.bulletPoints || []}
        />
      )}
    </div>
  );
}
