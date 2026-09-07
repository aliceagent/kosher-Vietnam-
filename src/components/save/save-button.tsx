"use client";

import { toggleSaved } from "@/lib/storage";
import { notifyStorage, useIsSaved } from "@/lib/use-local";
import type { SavedItem } from "@/lib/schema";

export function SaveButton({ item }: { item: SavedItem }) {
  const on = useIsSaved(item.id);

  return (
    <button
      type="button"
      onClick={() => {
        toggleSaved(item);
        notifyStorage();
      }}
      className={`min-h-10 rounded-full px-3 text-xs font-semibold ${
        on ? "bg-lantern text-ink" : "bg-mist text-jade"
      }`}
    >
      {on ? "Saved offline" : "Save offline"}
    </button>
  );
}
