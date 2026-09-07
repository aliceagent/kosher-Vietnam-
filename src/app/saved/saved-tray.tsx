"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Card } from "@/components/ui/bits";
import { CardHeading, iconForSavedKind } from "@/components/ui/icons";
import { markBundle, reorderSaved, setLastSync } from "@/lib/storage";
import { notifyStorage, useBundles, useLastSync, useSaved } from "@/lib/use-local";

const packs = [
  { id: "vietnam", title: "All Vietnam" },
  { id: "hanoi", title: "Hanoi" },
  { id: "hoi-an", title: "Hội An" },
  { id: "ho-chi-minh-city", title: "Ho Chi Minh City" },
  { id: "trip", title: "Classic trip (HAN–Hội An–SGN)" },
];

export function SavedTray() {
  const items = useSaved();
  const bundles = useBundles();
  const lastSync = useLastSync();
  const grouped = useMemo(() => {
    const map = new Map<string, typeof items>();
    for (const item of items) {
      const key = item.destinationSlug ?? "other";
      const list = map.get(key) ?? [];
      list.push(item);
      map.set(key, list);
    }
    return [...map.entries()];
  }, [items]);

  async function savePack(id: string, title: string) {
    await fetch(`/offline/${id}`);
    markBundle(id, title);
    setLastSync(new Date().toISOString());
    notifyStorage();
  }

  function move(id: string, dir: -1 | 1) {
    const ids = items.map((item) => item.id);
    const index = ids.indexOf(id);
    const next = index + dir;
    if (index < 0 || next < 0 || next >= ids.length) return;
    const copy = [...ids];
    const [row] = copy.splice(index, 1);
    copy.splice(next, 0, row);
    reorderSaved(copy);
    notifyStorage();
  }

  return (
    <div className="mt-5 space-y-3 px-4">
      <Card>
        <CardHeading icon="download" kicker="Offline packages" title="Save a city pack" titleClass="font-display text-xl leading-tight text-ink" />
        <p className="mt-2 text-sm text-stone">
          {lastSync ? `Last synced ${new Date(lastSync).toLocaleString("en-GB")}` : "No bundle saved yet."}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {packs.map((pack) => (
            <button
              key={pack.id}
              type="button"
              onClick={() => void savePack(pack.id, pack.title)}
              className="min-h-10 rounded-full bg-jade px-3 text-xs font-semibold text-mist"
            >
              Save {pack.title}
            </button>
          ))}
        </div>
        {bundles.length > 0 ? (
          <ul className="mt-3 space-y-1 text-xs font-medium text-stone">
            {bundles.map((item) => (
              <li key={item.id}>
                {item.title} · {new Date(item.savedAt).toLocaleString("en-GB")}
              </li>
            ))}
          </ul>
        ) : null}
      </Card>

      {items.length === 0 ? (
        <Card>
          <CardHeading icon="star" title="Nothing saved yet" titleClass="font-display text-xl leading-tight text-ink" />
          <p className="mt-2 text-sm text-stone">Nothing saved yet. Use “Save offline” on a listing.</p>
        </Card>
      ) : (
        grouped.map(([slug, rows]) => (
          <section key={slug}>
            <h2 className="mb-2 font-display text-xl capitalize text-ink">{slug.replace(/-/g, " ")}</h2>
            <div className="space-y-3">
              {rows.map((item) => (
                <Card key={item.id}>
                  <CardHeading
                    icon={iconForSavedKind(item.kind)}
                    kicker={item.kind}
                    title={
                      <Link href={item.href} className="font-display text-2xl text-ink">
                        {item.title}
                      </Link>
                    }
                    titleAs="div"
                    titleClass=""
                  />
                  <p className="mt-1 text-sm text-stone">{item.blurb}</p>
                  <div className="mt-2 flex gap-2">
                    <button
                      type="button"
                      onClick={() => move(item.id, -1)}
                      className="min-h-10 rounded-full bg-mist px-3 text-xs font-semibold text-jade"
                    >
                      Up
                    </button>
                    <button
                      type="button"
                      onClick={() => move(item.id, 1)}
                      className="min-h-10 rounded-full bg-mist px-3 text-xs font-semibold text-jade"
                    >
                      Down
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
