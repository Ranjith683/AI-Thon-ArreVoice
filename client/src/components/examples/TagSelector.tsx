import { useState } from "react";
import TagSelector from "../TagSelector";

export default function TagSelectorExample() {
  const [selectedTags, setSelectedTags] = useState<string[]>(["personal"]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
    console.log("Tag toggled:", tag);
  };

  return (
    <div className="p-6">
      <TagSelector selectedTags={selectedTags} onTagToggle={handleTagToggle} />
    </div>
  );
}
