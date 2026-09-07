"use client";

import { useMemo, useState } from "react";
import { AttractionCard } from "@/components/things/attraction-card";
import { filterAttractions, interestFilters } from "@/lib/filters";
import type { Attraction, AttractionFlag } from "@/lib/schema";

export function AttractionFilterList({
  items,
  initialFlag = "all",
}: {
  items: Attraction[];
  initialFlag?: AttractionFlag | "all";
}) {
  const [flag, setFlag] = useState<AttractionFlag | "all">(initialFlag);
  const rows = useMemo(() => filterAttractions(items, flag), [items, flag]);

  return (
    <div>
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
        {interestFilters.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setFlag(item.id === "all" ? "all" : item.id)}
            className={`shrink-0 rounded-full px-3 py-2 text-xs font-semibold ${
              flag === item.id ? "bg-jade text-mist" : "bg-white text-stone"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <p className="mt-3 text-xs font-medium text-stone">{rows.length} places</p>
      <div className="mt-3 space-y-3">
        {rows.map((item) => (
          <AttractionCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
