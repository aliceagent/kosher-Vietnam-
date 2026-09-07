"use client";

import { useEffect, useMemo, useState } from "react";
import { SearchCard } from "@/components/search/search-card";
import { inputClass } from "@/components/ui/bits";
import { groupHits, searchSite, type SearchHit } from "@/lib/search";

type KimiCard = {
  title: string;
  blurb: string;
  url?: string;
};

const SUGGESTIONS = ["kosher Hanoi", "rainy Hội An", "Hanoi to Sapa", "bathroom", "Shabbat times"];

function isInternal(url?: string) {
  return Boolean(url && url.startsWith("/"));
}

export function SearchResults({ initial }: { initial: string }) {
  const [q, setQ] = useState(initial);
  const [kimi, setKimi] = useState<{ cards: KimiCard[]; error?: string }>({ cards: [] });
  const [loading, setLoading] = useState(false);
  const [liveNote, setLiveNote] = useState("");
  const ready = q.trim().length >= 2;
  const kimiCards = ready ? kimi.cards : [];
  const hits = useMemo(() => (ready ? searchSite(q) : []), [q, ready]);
  const groups = useMemo(() => groupHits(hits), [hits]);

  useEffect(() => {
    const trimmed = q.trim();
    const next = trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : "/search";
    window.history.replaceState(null, "", next);
  }, [q]);

  useEffect(() => {
    const query = q.trim();
    if (query.length < 2) return;
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setLoading(true);
      setLiveNote("");
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`, { signal: controller.signal });
        const data = (await res.json()) as { kimi?: { cards: KimiCard[]; error?: string } };
        const first = data.kimi ?? { cards: [] };
        setKimi(first);
        setLoading(false);
        if (first.error === "Kimi is not configured." || controller.signal.aborted) return;
        setLiveNote("Checking the web…");
        const liveRes = await fetch(`/api/search?q=${encodeURIComponent(query)}&live=1`, {
          signal: controller.signal,
        });
        const liveData = (await liveRes.json()) as { kimi?: { cards: KimiCard[]; error?: string } };
        if (liveData.kimi?.cards?.length) setKimi(liveData.kimi);
        else if (liveData.kimi?.error && !first.cards.length) setKimi(liveData.kimi);
      } catch (error) {
        if ((error as { name?: string }).name !== "AbortError") {
          setKimi({ cards: [], error: "Kimi search failed." });
        }
      } finally {
        setLoading(false);
        setLiveNote("");
      }
    }, 220);
    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [q]);

  return (
    <div className="px-4">
      <form
        action="/search"
        className="relative mt-4"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <label className="sr-only" htmlFor="search-q">
          Search Orah
        </label>
        <input
          id="search-q"
          name="q"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className={`${inputClass} pr-12`}
          placeholder="kosher Hanoi, rainy Hội An, Hanoi to Sapa…"
          autoComplete="off"
        />
        {q ? (
          <button
            type="button"
            onClick={() => {
              setQ("");
              setKimi({ cards: [] });
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-stone"
          >
            Clear
          </button>
        ) : null}
      </form>

      {!ready ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {SUGGESTIONS.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setQ(item)}
              className="inline-flex min-h-10 items-center rounded-full border border-jade/15 bg-white px-3 text-sm font-semibold text-ink"
            >
              {item}
            </button>
          ))}
        </div>
      ) : null}

      {ready ? (
        <section className="mt-5">
          <div className="mb-2 flex items-baseline justify-between gap-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-lantern">Kimi live</p>
            <p className="text-[11px] font-medium text-stone">
              {loading ? "Fast results…" : liveNote || "HighSpeed + web"}
            </p>
          </div>
          {loading && kimiCards.length === 0 ? (
            <div className="rounded-2xl bg-white px-4 py-3 text-sm text-stone shadow-[0_1px_0_rgba(7,26,20,0.08)]">
              Asking Kimi HighSpeed…
            </div>
          ) : null}
          {kimi.error && !kimiCards.length && !loading ? (
            <p className="text-sm text-stone">{kimi.error} In-app results are below.</p>
          ) : null}
          <div className="space-y-3">
            {kimiCards.map((card) => (
              <SearchCard
                key={card.title + (card.url ?? "")}
                kicker="Kimi"
                kickerClass="text-lantern"
                title={card.title}
                href={card.url}
                external={Boolean(card.url && !isInternal(card.url))}
                blurb={card.blurb}
              />
            ))}
          </div>
        </section>
      ) : null}

      <div className="mt-6 space-y-6">
        {!ready ? (
          <p className="text-sm text-stone">Type a city, a phrase, or “hanoi to sapa”. Orah answers instantly.</p>
        ) : groups.length === 0 ? (
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
    <SearchCard kicker={item.kind} title={item.title} href={item.href} blurb={item.blurb} />
  );
}
