"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "@/components/copy-button";
import { SaveButton } from "@/components/save/save-button";
import { Card } from "@/components/ui/bits";
import type { Phrase, PhraseCategory } from "@/lib/schema";

const cats: { id: PhraseCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "basics", label: "Basics" },
  { id: "directions", label: "Directions" },
  { id: "grab", label: "Grab" },
  { id: "hotel", label: "Hotel" },
  { id: "shopping", label: "Shopping" },
  { id: "food", label: "Food" },
  { id: "medical", label: "Medical" },
  { id: "family", label: "Family" },
  { id: "emergency", label: "Emergency" },
  { id: "numbers", label: "Numbers" },
  { id: "travel", label: "Travel" },
];

export function PhraseBook({ phrases }: { phrases: Phrase[] }) {
  const [cat, setCat] = useState<PhraseCategory | "all">("all");
  const [show, setShow] = useState<Phrase | null>(null);
  const rows = useMemo(
    () => (cat === "all" ? phrases : phrases.filter((item) => item.category === cat)),
    [cat, phrases],
  );

  return (
    <div className="mt-4 px-4">
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
        {cats.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setCat(item.id)}
            className={`shrink-0 rounded-full px-3 py-2 text-xs font-semibold ${
              cat === item.id ? "bg-jade text-mist" : "bg-white text-stone"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="mt-4 space-y-3">
        {rows.map((item) => (
          <Card key={item.id ?? item.en}>
            <p id={item.id} className="font-semibold text-ink">
              {item.en}
            </p>
            <p className="mt-1 text-lg text-ink">{item.vi}</p>
            <p className="text-sm text-stone">{item.say}</p>
            {item.caution ? <p className="mt-2 text-xs font-medium text-lacquer">{item.caution}</p> : null}
            <div className="mt-3 flex flex-wrap gap-2">
              <CopyButton text={`${item.en} — ${item.vi}`} />
              {item.showToDriver ? (
                <button
                  type="button"
                  onClick={() => setShow(item)}
                  className="inline-flex min-h-10 items-center rounded-full bg-jade px-3 text-xs font-semibold text-mist"
                >
                  Show to driver
                </button>
              ) : null}
              {item.saveable ? (
                <SaveButton
                  item={{
                    id: `phrase:${item.id ?? item.en}`,
                    href: `/phrases#${item.id ?? item.en}`,
                    title: item.en,
                    kind: "phrase",
                    blurb: `${item.vi} · ${item.say}`,
                  }}
                />
              ) : null}
            </div>
          </Card>
        ))}
      </div>

      {show ? (
        <button
          type="button"
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-6 text-left"
          onClick={() => setShow(null)}
        >
          <div className="max-w-lg text-center text-mist">
            <p className="text-sm font-medium text-lantern-soft">{show.en}</p>
            <p className="mt-4 font-display text-5xl leading-tight">{show.vi}</p>
            <p className="mt-4 text-lg">{show.say}</p>
            <p className="mt-8 text-xs uppercase tracking-[0.16em]">Tap to close</p>
          </div>
        </button>
      ) : null}
    </div>
  );
}
