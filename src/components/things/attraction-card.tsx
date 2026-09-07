import Link from "next/link";
import { CopyButton } from "@/components/copy-button";
import { SaveButton } from "@/components/save/save-button";
import { appleMapsUrl, mapsUrl } from "@/lib/format";
import { durationLabel, shabbatLabel } from "@/lib/filters";
import type { Attraction } from "@/lib/schema";

export function AttractionCard({ item }: { item: Attraction }) {
  const query = item.address ?? (item.coords ? `${item.coords.lat},${item.coords.lng}` : "");

  return (
    <article id={item.id} className="overflow-hidden rounded-2xl bg-white text-ink shadow-[0_1px_0_rgba(7,26,20,0.08)]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={item.image} alt="" className="h-44 w-full object-cover" />
      <div className="p-4">
        <div className="flex flex-wrap gap-1">
          {item.flags.slice(0, 4).map((flag) => (
            <span key={flag} className="rounded-full bg-mist px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-jade">
              {flag.replace(/-/g, " ")}
            </span>
          ))}
          {item.religiousSite ? (
            <span className="rounded-full bg-mist px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-lacquer">
              Religious site
            </span>
          ) : null}
        </div>
        <h3 className="mt-2 font-display text-xl">{item.name}</h3>
        {item.localName ? <p className="text-sm font-medium text-stone">{item.localName}</p> : null}
        <p className="mt-2 text-sm font-semibold text-ink">{item.whyGo}</p>
        <p className="mt-2 text-sm leading-relaxed text-stone">{item.description}</p>
        <p className="mt-3 text-sm font-medium text-stone">
          {durationLabel(item)} · {shabbatLabel(item.shabbat)}
          {item.ticket === "paid" ? " · paid" : " · free"}
          {item.priceAdult ? ` · ${item.priceAdult}` : ""}
        </p>
        {item.priceNote ? <p className="mt-1 text-xs font-medium text-stone">{item.priceNote}</p> : null}
        <p className="mt-1 text-xs font-medium text-stone">{item.shabbatNote}</p>
        {item.walkingFromJewishArea ? (
          <p className="mt-1 text-xs font-medium text-stone">{item.walkingFromJewishArea}</p>
        ) : null}
        <div className="mt-3 flex flex-wrap gap-2">
          <SaveButton
            item={{
              id: item.id,
              href: `/vietnam/${item.destinationSlug}/things-to-do#${item.id}`,
              title: item.name,
              kind: "attraction",
              blurb: item.whyGo,
              destinationSlug: item.destinationSlug,
            }}
          />
          <Link href={`/vietnam/${item.destinationSlug}`} className="inline-flex min-h-10 items-center text-sm font-semibold text-jade">
            City guide →
          </Link>
          {query ? (
            <>
              <a
                href={mapsUrl(query)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-10 items-center text-sm font-semibold text-jade"
              >
                Google Maps
              </a>
              <a
                href={appleMapsUrl(query)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-10 items-center text-sm font-semibold text-jade"
              >
                Apple Maps
              </a>
              {item.address ? <CopyButton text={item.address} label="Copy address" /> : null}
            </>
          ) : null}
        </div>
      </div>
    </article>
  );
}
