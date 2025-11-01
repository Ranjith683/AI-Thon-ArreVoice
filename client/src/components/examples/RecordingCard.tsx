import RecordingCard from "../RecordingCard";

export default function RecordingCardExample() {
  const mockRecording = {
    id: "1",
    title: "My thoughts on AI and creativity",
    tags: ["personal", "journal"],
    transcription:
      "Today I was thinking about how artificial intelligence is changing the creative landscape. It's fascinating to see how tools like language models and image generators are becoming collaborators rather than just tools. There's something profound about the way technology can amplify human creativity.",
    summary:
      "Reflection on AI's role in enhancing human creativity and its evolution from tool to collaborator.",
    bulletPoints: [
      "AI is transforming from a simple tool to a creative collaborator",
      "Technology amplifies rather than replaces human creativity",
      "The creative landscape is evolving with new AI capabilities",
    ],
    duration: 125,
    isPrivate: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  };

  return (
    <div className="p-6 max-w-2xl">
      <RecordingCard
        {...mockRecording}
        onPlay={(id) => console.log("Play:", id)}
        onShare={(id) => console.log("Share:", id)}
        onDelete={(id) => console.log("Delete:", id)}
      />
    </div>
  );
}
