import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Folder, BookOpen, User, Film, Globe, Hash } from "lucide-react";

const TAG_OPTIONS = [
  { value: "all", label: "All Recordings", icon: Hash },
  { value: "personal", label: "Personal", icon: User },
  { value: "journal", label: "Journal", icon: BookOpen },
  { value: "politics", label: "Politics", icon: Globe },
  { value: "cinema", label: "Cinema", icon: Film },
];

interface TagFilterProps {
  selectedTag: string;
  onTagSelect: (tag: string) => void;
  tagCounts?: Record<string, number>;
}

export default function TagFilter({
  selectedTag,
  onTagSelect,
  tagCounts = {},
}: TagFilterProps) {
  const totalCount = Object.values(tagCounts).reduce((sum, count) => sum + count, 0);

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Folder className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-heading font-semibold">Folders</h2>
        </div>
        <div className="space-y-1">
          {TAG_OPTIONS.map((tag) => {
            const Icon = tag.icon;
            const count = tag.value === "all" ? totalCount : tagCounts[tag.value] || 0;
            const isSelected = selectedTag === tag.value;

            return (
              <button
                key={tag.value}
                onClick={() => onTagSelect(tag.value)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-all hover-elevate ${
                  isSelected ? "bg-primary text-primary-foreground" : ""
                }`}
                data-testid={`filter-${tag.value}`}
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{tag.label}</span>
                </div>
                {count > 0 && (
                  <Badge
                    variant={isSelected ? "secondary" : "outline"}
                    className="text-xs"
                  >
                    {count}
                  </Badge>
                )}
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
