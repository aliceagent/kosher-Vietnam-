"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Card, inputClass } from "@/components/ui/bits";
import { groupHits, searchSite } from "@/lib/search";

export function SearchResults({ initial }: { initial: string }) {
  const [q, setQ] = useState(initial);
  const groups = useMemo(() => groupHits(searchSite(q)), [q]);

  return (
    <div className="px-4">
      <form action="/search" className="mt-4">
        <input
          name="q"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className={inputClass}
          placeholder="rainy day hoi an, hanoi to sapa, bathroom…"
        />
      </form>
      <div className="mt-4 space-y-6">
        {groups.length === 0 ? (
          <p className="text-sm text-stone">No hits. Try a city, a phrase, or “hanoi to sapa”.</p>
        ) : (
          groups.map((group) => (
            <section key={group.group}>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-jade">{group.group}</p>
              <div className="mt-2 space-y-3">
                {group.hits.map((item) => (
                  <Card key={item.href + item.title}>
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-jade">{item.kind}</p>
                    <Link href={item.href} className="mt-1 block font-display text-2xl text-ink">
                      {item.title}
                    </Link>
                    <p className="mt-1 text-sm text-stone">{item.blurb}</p>
                  </Card>
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
}
