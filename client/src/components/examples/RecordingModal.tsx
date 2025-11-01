import { useState } from "react";
import RecordingModal from "../RecordingModal";
import { Button } from "@/components/ui/button";

export default function RecordingModalExample() {
  const [open, setOpen] = useState(false);

  const handleSave = (data: any) => {
    console.log("Recording saved:", data);
  };

  return (
    <div className="p-6">
      <Button onClick={() => setOpen(true)}>Open Recording Modal</Button>
      <RecordingModal open={open} onOpenChange={setOpen} onSave={handleSave} />
    </div>
  );
}
