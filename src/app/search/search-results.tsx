"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ExpandableText } from "@/components/search/expandable-text";
import { Card, inputClass } from "@/components/ui/bits";
import { groupHits, searchSite, type SearchHit } from "@/lib/search";

type KimiCard = {
  title: string;
  blurb: string;
  url?: string;
};

function isInternal(url?: string) {
  return Boolean(url && url.startsWith("/"));
}

export function SearchResults({ initial }: { initial: string }) {
  const [q, setQ] = useState(initial);
  const [kimi, setKimi] = useState<{ cards: KimiCard[]; error?: string }>({ cards: [] });
  const [loading, setLoading] = useState(false);
  const ready = q.trim().length >= 2;
  const kimiCards = ready ? kimi.cards : [];
  const hits = useMemo(() => searchSite(q), [q]);
  const groups = useMemo(() => groupHits(hits), [hits]);

  useEffect(() => {
    const query = q.trim();
    if (query.length < 2) return;
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`, { signal: controller.signal });
        const data = (await res.json()) as { kimi?: { cards: KimiCard[]; error?: string } };
        setKimi(data.kimi ?? { cards: [] });
      } catch (error) {
        if ((error as { name?: string }).name !== "AbortError") {
          setKimi({ cards: [], error: "Kimi search failed." });
        }
      } finally {
        setLoading(false);
      }
    }, 280);
    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [q]);

  return (
    <div className="px-4">
      <form
        action="/search"
        className="mt-4"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <input
          name="q"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className={inputClass}
          placeholder="kosher Hanoi, rainy day Hội An, Hanoi to Sapa…"
          autoComplete="off"
        />
      </form>

      {ready ? (
      <section className="mt-5">
        <div className="mb-2 flex items-baseline justify-between">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-jade">Kimi live</p>
          <p className="text-[11px] font-medium text-stone">{loading && ready ? "Searching…" : "Web + Orah"}</p>
        </div>
        {loading && ready && kimiCards.length === 0 ? (
          <Card>
            <p className="text-sm text-stone">Asking Kimi…</p>
          </Card>
        ) : null}
        {kimi.error && ready && !kimiCards.length && !loading ? (
          <p className="text-sm text-stone">{kimi.error} In-app results are below.</p>
        ) : null}
        <div className="space-y-3">
          {kimiCards.map((card) => (
            <Card key={card.title + (card.url ?? "")}>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-lantern">Kimi</p>
              {card.url && isInternal(card.url) ? (
                <Link href={card.url} className="mt-1 block font-display text-2xl text-ink">
                  {card.title}
                </Link>
              ) : card.url ? (
                <a href={card.url} target="_blank" rel="noreferrer" className="mt-1 block font-display text-2xl text-ink">
                  {card.title}
                </a>
              ) : (
                <h3 className="mt-1 font-display text-2xl">{card.title}</h3>
              )}
              <div className="mt-2">
                <ExpandableText text={card.blurb} limit={120} />
              </div>
            </Card>
          ))}
        </div>
      </section>
      ) : null}

      <div className="mt-6 space-y-6">
        {groups.length === 0 ? (
          <p className="text-sm text-stone">Nothing in Orah matched. Try a city, a phrase, or “hanoi to sapa”.</p>
        ) : (
          groups.map((group) => (
            <section key={group.group}>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-jade">{group.group}</p>
              <div className="mt-2 space-y-3">
                {group.hits.map((item) => (
                  <ResultCard key={item.href + item.title} item={item} />
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
}

function ResultCard({ item }: { item: SearchHit }) {
  return (
    <Card>
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-jade">{item.kind}</p>
      <Link href={item.href} className="mt-1 block font-display text-2xl leading-tight text-ink">
        {item.title}
      </Link>
      <div className="mt-2">
        <ExpandableText text={item.blurb} limit={110} />
      </div>
    </Card>
  );
}
