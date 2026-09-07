import Link from "next/link";
import { Card, ChipLink, Disclaimer, Kicker, PrimaryLink } from "@/components/ui/bits";
import { getDestinations } from "@/lib/content";
import { formatLongDate } from "@/lib/format";
import { getUpcomingShabbat } from "@/lib/shabbat";

const actions = [
  { href: "/plan", label: "Plan around Shabbat" },
  { href: "/kosher", label: "Find kosher food" },
  { href: "/chabad", label: "Find Chabad" },
  { href: "/shabbat", label: "Shabbat times" },
  { href: "/stay", label: "Where to stay" },
  { href: "/guides/visas", label: "Vietnam basics" },
];

export function HomeHub() {
  const dests = getDestinations();
  const shabbat = getUpcomingShabbat("hanoi");
  const saigon = getUpcomingShabbat("ho-chi-minh-city");

  return (
    <main>
      <section className="relative overflow-hidden bg-ink text-mist">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/destinations/halong.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/30" />
        <div className="relative px-4 pb-8 pt-6">
          <Kicker>Kosher · Shomer Shabbat · Vietnam</Kicker>
          <h1 className="mt-3 font-display text-[2.1rem] font-medium leading-[1.05]">
            Vietnam for the kosher traveler.
          </h1>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-mist/80">
            Plan the week around Friday. Eat where it is actually kosher. Walk when the cars stop.
          </p>
          <form action="/search" className="mt-5">
            <label className="sr-only" htmlFor="q">
              Search
            </label>
            <input
              id="q"
              name="q"
              placeholder="Where are you going?"
              className="min-h-12 w-full rounded-2xl bg-white px-4 text-base text-ink outline-none"
            />
          </form>
        </div>
      </section>

      <section className="px-4 py-5">
        <Card className="bg-jade text-mist">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-lantern-soft">
            Upcoming Shabbat
          </p>
          <p className="mt-2 font-display text-2xl">{formatLongDate(shabbat.friday)}</p>
          <p className="mt-1 text-sm text-mist/80">
            {shabbat.parsha} · {shabbat.hebrewDate}
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-mist/60">Hanoi candles</p>
              <p className="text-lg font-semibold">{shabbat.candles?.candlesLabel}</p>
            </div>
            <div>
              <p className="text-mist/60">Saigon candles</p>
              <p className="text-lg font-semibold">{saigon.candles?.candlesLabel}</p>
            </div>
          </div>
          <Link href="/shabbat" className="mt-4 inline-flex text-sm font-semibold text-lantern-soft">
            All cities and havdalah →
          </Link>
        </Card>
      </section>

      <section className="px-4 pb-2">
        <div className="grid grid-cols-2 gap-2">
          {actions.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex min-h-16 items-center rounded-2xl bg-white px-3 text-sm font-semibold text-jade shadow-[0_1px_0_rgba(7,26,20,0.06)]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="px-4 py-6">
        <div className="flex items-end justify-between">
          <div>
            <Kicker>Destinations</Kicker>
            <h2 className="mt-1 font-display text-2xl text-ink">Where Friday works</h2>
          </div>
          <Link href="/vietnam" className="text-sm font-semibold text-jade">
            All
          </Link>
        </div>
        <div className="-mx-4 mt-4 flex gap-3 overflow-x-auto px-4 pb-1">
          {dests.map((item) => (
            <Link
              key={item.slug}
              href={`/vietnam/${item.slug}`}
              className="w-[78%] shrink-0 overflow-hidden rounded-2xl bg-ink text-mist"
            >
              <div className="relative h-40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt="" className="h-full w-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="font-display text-2xl">{item.name}</p>
                  <p className="text-xs text-mist/75">
                    {item.jewishInfrastructure === "strong"
                      ? "Shabbat base"
                      : item.jewishInfrastructure === "seasonal"
                        ? "Confirm Chabad first"
                        : "Weekday only"}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-4 pb-8">
        <Kicker>Start here</Kicker>
        <div className="mt-3 flex flex-wrap gap-2">
          <ChipLink href="/itineraries">Itineraries</ChipLink>
          <ChipLink href="/family">Family</ChipLink>
          <ChipLink href="/guides/visas">Visas</ChipLink>
          <ChipLink href="/emergency">Emergency</ChipLink>
          <ChipLink href="/submit">Update a listing</ChipLink>
          <ChipLink href="/guides">Phrases & basics</ChipLink>
          <ChipLink href="/map">Shabbat map</ChipLink>
          <ChipLink href="/countries">More countries</ChipLink>
          <ChipLink href="/saved">Saved offline</ChipLink>
        </div>
        <div className="mt-6">
          <PrimaryLink href="/plan">Build a Shabbat-aware route</PrimaryLink>
        </div>
        <div className="mt-4">
          <Disclaimer />
        </div>
      </section>
    </main>
  );
}
