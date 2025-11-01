import { useState } from "react";
import ShareModal from "../ShareModal";
import { Button } from "@/components/ui/button";

export default function ShareModalExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6">
      <Button onClick={() => setOpen(true)}>Open Share Modal</Button>
      <ShareModal
        open={open}
        onOpenChange={setOpen}
        title="My thoughts on AI and creativity"
        summary="Reflection on AI's role in enhancing human creativity and its evolution from tool to collaborator."
        bulletPoints={[
          "AI is transforming from a simple tool to a creative collaborator",
          "Technology amplifies rather than replaces human creativity",
          "The creative landscape is evolving with new AI capabilities",
        ]}
      />
    </div>
  );
}
