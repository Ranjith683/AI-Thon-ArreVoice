import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Mic, Plus } from "lucide-react";
import RecordingModal from "@/components/RecordingModal";
import RecordingCard from "@/components/RecordingCard";
import ShareModal from "@/components/ShareModal";
import StreakWidget from "@/components/StreakWidget";
import EmptyState from "@/components/EmptyState";
import TagFilter from "@/components/TagFilter";

export default function Home() {
  const [recordingModalOpen, setRecordingModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedRecording, setSelectedRecording] = useState<any>(null);
  const [selectedTag, setSelectedTag] = useState("all");
  
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
      isPinned: true,
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
      isPinned: false,
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    },
    {
      id: "3",
      title: "Political thoughts on current events",
      tags: ["politics"],
      transcription:
        "The recent policy changes have really made me think about how government decisions affect everyday people. It's important to stay informed and engaged in the democratic process.",
      summary: "Reflection on political engagement and civic responsibility.",
      bulletPoints: [
        "Policy changes have significant impacts on daily life",
        "Staying informed is crucial for democracy",
        "Civic engagement requires active participation",
      ],
      duration: 78,
      isPrivate: false,
      isPinned: false,
      createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
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
      isPinned: false,
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

  const handlePin = (id: string) => {
    setRecordings(
      recordings.map((r) =>
        r.id === id ? { ...r, isPinned: !r.isPinned } : r
      )
    );
    console.log("Recording pin toggled:", id);
  };

  const filteredRecordings = useMemo(() => {
    if (selectedTag === "all") {
      return recordings;
    }
    return recordings.filter((r) => r.tags.includes(selectedTag));
  }, [recordings, selectedTag]);

  const pinnedRecordings = useMemo(() => {
    return filteredRecordings.filter((r) => r.isPinned);
  }, [filteredRecordings]);

  const unpinnedRecordings = useMemo(() => {
    return filteredRecordings.filter((r) => !r.isPinned);
  }, [filteredRecordings]);

  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    recordings.forEach((recording) => {
      recording.tags.forEach((tag) => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });
    return counts;
  }, [recordings]);

  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="./BGbanner.jpg"
            alt="Voice waveform background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4 text-foreground">
            Your Voice, Your Story
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Record, transcribe, and understand your thoughts with AI-powered audio journaling
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => setRecordingModalOpen(true)}
              className="text-base px-6 py-6"
              data-testid="button-new-recording"
            >
              <Mic className="w-5 h-5 mr-2" />
              Start Recording
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                document.getElementById('recordings-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-base px-6 py-6 bg-background/80 backdrop-blur"
              data-testid="button-view-library"
            >
              View Library
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-6" id="recordings-section">

        <div className="grid md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <div className="space-y-6">
              <TagFilter
                selectedTag={selectedTag}
                onTagSelect={setSelectedTag}
                tagCounts={tagCounts}
              />
              <StreakWidget
                currentStreak={streak.currentStreak}
                longestStreak={streak.longestStreak}
                totalRecordings={streak.totalRecordings}
              />
            </div>
          </div>

          <div className="md:col-span-3 space-y-6">
            {filteredRecordings.length === 0 ? (
              <EmptyState onNewRecording={() => setRecordingModalOpen(true)} />
            ) : (
              <>
                {pinnedRecordings.length > 0 && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-heading font-semibold">
                      Pinned Recordings
                    </h2>
                    {pinnedRecordings.map((recording) => (
                      <RecordingCard
                        key={recording.id}
                        {...recording}
                        onPlay={(id) => console.log("Play:", id)}
                        onShare={handleShare}
                        onDelete={handleDelete}
                        onPin={handlePin}
                      />
                    ))}
                  </div>
                )}

                {unpinnedRecordings.length > 0 && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-heading font-semibold">
                      {selectedTag === "all" ? "Recent Recordings" : `${selectedTag.charAt(0).toUpperCase() + selectedTag.slice(1)} Recordings`}
                    </h2>
                    {unpinnedRecordings.map((recording) => (
                      <RecordingCard
                        key={recording.id}
                        {...recording}
                        onPlay={(id) => console.log("Play:", id)}
                        onShare={handleShare}
                        onDelete={handleDelete}
                        onPin={handlePin}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
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
