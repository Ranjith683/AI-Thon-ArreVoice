import { Badge } from "@/components/ui/badge";
import { BookOpen, User, Film, Globe } from "lucide-react";

const TAG_OPTIONS = [
  { value: "personal", label: "Personal", icon: User },
  { value: "journal", label: "Journal", icon: BookOpen },
  { value: "politics", label: "Politics", icon: Globe },
  { value: "cinema", label: "Cinema", icon: Film },
];

interface TagSelectorProps {
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
}

export default function TagSelector({ selectedTags, onTagToggle }: TagSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {TAG_OPTIONS.map((tag) => {
        const Icon = tag.icon;
        const isSelected = selectedTags.includes(tag.value);
        
        return (
          <button
            key={tag.value}
            onClick={() => onTagToggle(tag.value)}
            className={`px-4 py-2 rounded-full border transition-all hover-elevate ${
              isSelected
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background text-foreground border-border"
            }`}
            data-testid={`tag-${tag.value}`}
          >
            <div className="flex items-center gap-2">
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{tag.label}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
