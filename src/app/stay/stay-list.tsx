"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Card } from "@/components/ui/bits";
import { CardHeading } from "@/components/ui/icons";
import { getDestination } from "@/lib/content";
import type { StayArea } from "@/lib/schema";

const filters = [
  { id: "all", label: "All" },
  { id: "walk", label: "Near Chabad" },
  { id: "family", label: "Family rooms" },
  { id: "kitchen", label: "Kitchen / fridge" },
];

export function StayList({ areas }: { areas: StayArea[] }) {
  const [filter, setFilter] = useState("all");
  const rows = useMemo(() => {
    return areas.filter((item) => {
      if (filter === "walk") return Boolean(item.walkToCommunity?.toLowerCase().includes("walk"));
      if (filter === "family") return item.familyFit.toLowerCase().includes("family") || item.familyFit.toLowerCase().includes("children") || item.familyFit.toLowerCase().includes("sleep");
      if (filter === "kitchen") return item.kitchenNotes.toLowerCase().includes("kitchen") || item.kitchenNotes.toLowerCase().includes("fridge") || item.kitchenNotes.toLowerCase().includes("apartment");
      return true;
    });
  }, [areas, filter]);

  return (
    <>
      <div className="flex gap-2 overflow-x-auto px-4">
        {filters.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setFilter(item.id)}
            className={`shrink-0 rounded-full px-3 py-2 text-xs font-semibold ${
              filter === item.id ? "bg-jade text-mist" : "bg-white text-stone"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="mt-4 space-y-3 px-4">
        {rows.map((item) => (
          <Card key={item.id}>
            <CardHeading
              icon="bed"
              kicker={getDestination(item.destinationSlug)?.name}
              title={item.name}
            />
            <p className="mt-2 text-sm text-stone">{item.walkToCommunity}</p>
            <Link href={`/vietnam/${item.destinationSlug}#stay`} className="mt-3 inline-flex text-sm font-semibold text-jade">
              Full stay notes →
            </Link>
          </Card>
        ))}
      </div>
    </>
  );
}
