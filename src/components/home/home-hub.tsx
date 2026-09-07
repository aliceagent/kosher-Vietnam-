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
  { href: "/vietnam/things-to-do", label: "Things to do" },
  { href: "/today", label: "What today?" },
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
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/65" />
        <div className="relative px-4 pb-8 pt-6">
          <Kicker className="text-lantern-soft">Kosher · Shomer Shabbat · Vietnam</Kicker>
          <h1 className="mt-3 font-display text-[2.1rem] font-semibold leading-[1.05] text-white">
            Vietnam for the kosher traveler.
          </h1>
          <p className="mt-3 max-w-md text-[16px] font-medium leading-relaxed text-white">
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
              className="min-h-12 w-full rounded-2xl bg-white px-4 text-base font-medium text-ink outline-none placeholder:text-stone"
            />
          </form>
        </div>
      </section>

      <section className="px-4 py-5">
        <Card className="border border-jade/15 bg-white text-ink">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-lacquer">
            Upcoming Shabbat
          </p>
          <p className="mt-2 font-display text-2xl font-semibold text-ink">
            {formatLongDate(shabbat.friday)}
          </p>
          <p className="mt-1 text-sm font-medium text-stone">
            {shabbat.parsha} · {shabbat.hebrewDate}
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="font-semibold text-stone">Hanoi candles</p>
              <p className="text-2xl font-bold text-ink">{shabbat.candles?.candlesLabel}</p>
            </div>
            <div>
              <p className="font-semibold text-stone">Saigon candles</p>
              <p className="text-2xl font-bold text-ink">{saigon.candles?.candlesLabel}</p>
            </div>
          </div>
          <Link href="/shabbat" className="mt-4 inline-flex text-sm font-bold text-jade">
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
              className="flex min-h-16 items-center rounded-2xl border border-jade/15 bg-white px-3 text-sm font-bold text-ink"
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
          <ChipLink href="/guides/before">Before you go</ChipLink>
          <ChipLink href="/today">Today</ChipLink>
          <ChipLink href="/vietnam/things-to-do">Things to do</ChipLink>
          <ChipLink href="/phrases">Phrases</ChipLink>
          <ChipLink href="/map">Map & Near me</ChipLink>
          <ChipLink href="/vietnam/go">City to city</ChipLink>
          <ChipLink href="/itineraries">Itineraries</ChipLink>
          <ChipLink href="/family">Family</ChipLink>
          <ChipLink href="/guides/apps">Apps</ChipLink>
          <ChipLink href="/guides/airports">Airports</ChipLink>
          <ChipLink href="/emergency">Emergency</ChipLink>
          <ChipLink href="/saved">My trip</ChipLink>
          <ChipLink href="/countries">More countries</ChipLink>
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
