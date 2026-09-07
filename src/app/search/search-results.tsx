"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Card, inputClass } from "@/components/ui/bits";
import { searchSite } from "@/lib/search";

export function SearchResults({ initial }: { initial: string }) {
  const [q, setQ] = useState(initial);
  const hits = useMemo(() => searchSite(q), [q]);

  return (
    <div className="px-4">
      <form action="/search" className="mt-4">
        <input
          name="q"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className={inputClass}
          placeholder="kosher food Hanoi, Shabbat Da Nang…"
        />
      </form>
      <div className="mt-4 space-y-3">
        {hits.map((item) => (
          <Card key={item.href + item.title}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">{item.kind}</p>
            <Link href={item.href} className="mt-1 block font-display text-2xl text-ink">
              {item.title}
            </Link>
            <p className="mt-1 text-sm text-stone">{item.blurb}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
