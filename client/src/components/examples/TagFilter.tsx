import { useState } from "react";
import TagFilter from "../TagFilter";

export default function TagFilterExample() {
  const [selectedTag, setSelectedTag] = useState("all");

  const tagCounts = {
    personal: 12,
    journal: 8,
    politics: 3,
    cinema: 5,
  };

  return (
    <div className="p-6 max-w-sm">
      <TagFilter
        selectedTag={selectedTag}
        onTagSelect={(tag) => {
          setSelectedTag(tag);
          console.log("Selected tag:", tag);
        }}
        tagCounts={tagCounts}
      />
    </div>
  );
}
