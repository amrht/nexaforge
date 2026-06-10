"use client";

import { useQueryState } from "nuqs";

interface BlogFilterProps {
  tags: string[];
  defaultTag?: string;
}

export default function BlogFilter({ tags, defaultTag = "" }: BlogFilterProps) {
  const [activeTag, setActiveTag] = useQueryState("tag", { defaultValue: defaultTag });

  return (
    <div className="mb-12 flex flex-wrap gap-3" role="group" aria-label="Filter by tag">
      <button
        onClick={() => setActiveTag("")}
        className={`rounded-full px-4 py-2 text-sm transition-colors ${
          !activeTag
            ? "bg-accent text-white"
            : "border border-border text-muted hover:text-white"
        }`}
        aria-pressed={!activeTag}
      >
        All
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => setActiveTag(tag)}
          className={`rounded-full px-4 py-2 text-sm transition-colors ${
            activeTag === tag
              ? "bg-accent text-white"
              : "border border-border text-muted hover:text-white"
          }`}
          aria-pressed={activeTag === tag}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
