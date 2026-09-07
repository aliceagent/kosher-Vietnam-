import Link from "next/link";
import { ShabbatMap } from "@/components/map/shabbat-map";
import { SaveButton } from "@/components/save/save-button";
import { Actions, Card, Disclaimer, Kicker, Trust } from "@/components/ui/bits";
import { pinsForCity } from "@/lib/map-pins";
import type { Attraction, Community, Destination, StayArea, Venue } from "@/lib/schema";
import { getUpcomingShabbat } from "@/lib/shabbat";

const sections = [
  ["overview", "Overview"],
  ["community", "Chabad"],
  ["kosher", "Kosher"],
  ["shabbat", "Shabbat"],
  ["map", "Map"],
  ["stay", "Stay"],
  ["attractions", "See"],
  ["friday", "Friday"],
  ["family", "Family"],
];

export function DestinationView({
  dest,
  communities,
  venues,
  stays,
  attractions,
  nearby,
}: {
  dest: Destination;
  communities: Community[];
  venues: Venue[];
  stays: StayArea[];
  attractions: Attraction[];
  nearby: Destination[];
}) {
  const times = getUpcomingShabbat(dest.slug);

  return (
    <article>
      <div className="relative h-56 bg-ink text-mist">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={dest.image} alt="" className="h-full w-full object-cover opacity-75" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-lantern-soft">
            {dest.region} · {dest.localName}
          </p>
          <h1 className="font-display text-4xl leading-none">{dest.name}</h1>
          <div className="mt-3">
            <SaveButton
              item={{
                id: dest.slug,
                href: `/${dest.countrySlug}/${dest.slug}`,
                title: dest.name,
                kind: "Destination",
                blurb: dest.summary,
              }}
            />
          </div>
        </div>
      </div>

      <div className="sticky top-12 z-20 border-b border-jade/10 bg-fog/95 backdrop-blur">
        <div className="flex gap-2 overflow-x-auto px-3 py-2">
          {sections.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className="shrink-0 rounded-full bg-white px-3 py-2 text-xs font-semibold text-jade"
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      <div className="space-y-4 px-4 py-5">
        <section id="overview">
          <p className="text-[15px] leading-relaxed text-stone">{dest.summary}</p>
          <div className="mt-4 grid gap-3">
            <Card>
              <Kicker>Why visit</Kicker>
              <p className="mt-2 text-sm leading-relaxed text-stone">{dest.whyVisit}</p>
            </Card>
            <Card>
              <Kicker>How long</Kicker>
              <p className="mt-2 text-sm leading-relaxed text-stone">{dest.howLong}</p>
            </Card>
            <Card>
              <Kicker>Weather</Kicker>
              <p className="mt-2 text-sm leading-relaxed text-stone">
                Best: {dest.weather.bestMonths}. Rain: {dest.weather.rainy}. {dest.weather.notes}
              </p>
            </Card>
          </div>
        </section>

        <section id="community">
          <h2 className="font-display text-2xl">Jewish community</h2>
          {communities.length === 0 ? (
            <Card className="mt-3">
              <p className="text-sm leading-relaxed text-stone">
                No published Chabad or synagogue for {dest.name}. Treat this as a weekday city if you need
                minyan or kosher meals.
              </p>
            </Card>
          ) : (
            <div className="mt-3 space-y-3">
              {communities.map((item) => (
                <Card key={item.id}>
                  <h3 className="font-display text-xl">{item.name}</h3>
                  <p className="mt-2 text-sm text-stone">{item.address}</p>
                  {item.addressNote ? <p className="mt-1 text-sm text-muted">{item.addressNote}</p> : null}
                  <p className="mt-3 text-sm leading-relaxed text-stone">{item.services}</p>
                  <p className="mt-2 text-sm leading-relaxed text-stone">{item.meals}</p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-lacquer">
                    Contact before you arrive
                  </p>
                  <Actions
                    phone={item.phone}
                    whatsapp={item.whatsapp}
                    website={item.website}
                    mapsQuery={item.mapsQuery}
                  />
                  <Trust item={item.verification} />
                  <div className="mt-3">
                    <SaveButton
                      item={{
                        id: item.id,
                        href: `/${dest.countrySlug}/${dest.slug}#community`,
                        title: item.name,
                        kind: "Chabad",
                        blurb: item.address,
                      }}
                    />
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>

        <section id="kosher">
          <h2 className="font-display text-2xl">Kosher food</h2>
          {venues.length === 0 ? (
            <Card className="mt-3">
              <p className="text-sm leading-relaxed text-stone">
                No verified kosher kitchen here. Pack food. Vegetarian restaurants are not kosher.
              </p>
            </Card>
          ) : (
            <div className="mt-3 space-y-3">
              {venues.map((item) => (
                <Card key={item.id}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-lacquer">
                    {item.kashrutClass.replace("-", " ")}
                  </p>
                  <h3 className="mt-1 font-display text-xl">{item.name}</h3>
                  <p className="mt-2 text-sm text-stone">{item.address}</p>
                  {item.hours ? <p className="mt-2 text-sm text-stone">{item.hours}</p> : null}
                  {item.fridayHours ? <p className="text-sm text-stone">Friday: {item.fridayHours}</p> : null}
                  <p className="mt-2 text-sm text-stone">{item.shabbatStatus}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.notes}</p>
                  <Actions
                    phone={item.phone}
                    whatsapp={item.whatsapp}
                    website={item.website}
                    mapsQuery={item.mapsQuery}
                  />
                  <Trust item={item.verification} />
                </Card>
              ))}
            </div>
          )}
        </section>

        <section id="shabbat">
          <h2 className="font-display text-2xl">Shabbat guide</h2>
          <Card className="mt-3">
            <p className="text-sm font-semibold text-jade">
              {dest.shabbatBase.recommended ? "Recommended Shabbat base" : "Not a Shabbat base"}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-stone">{dest.shabbatBase.neighborhood}</p>
            <p className="mt-2 text-sm leading-relaxed text-stone">{dest.shabbatBase.walkingNotes}</p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-muted">Candles (next Fri)</p>
                <p className="text-lg font-semibold">{times.candles?.candlesLabel}</p>
              </div>
              <div>
                <p className="text-muted">Havdalah (tzeit)</p>
                <p className="text-lg font-semibold">{times.havdalah?.havdalahLabel}</p>
              </div>
            </div>
            <p className="mt-3 text-xs text-muted">
              18 minutes before sunset. Confirm with your rav and the local community. {times.parsha}.
            </p>
            <p className="mt-3 text-sm text-stone">
              Eruv: {dest.eruv.notes}
            </p>
            <Trust item={dest.eruv.verification} />
            <Link href="/shabbat" className="mt-3 inline-flex text-sm font-semibold text-jade">
              Calculation preferences →
            </Link>
          </Card>
        </section>

        <section id="map">
          <h2 className="font-display text-2xl">Shabbat walking map</h2>
          <Card className="mt-3">
            <ShabbatMap pins={pinsForCity(dest.slug)} center={dest.coords} />
            <Link href={`/map?city=${dest.slug}`} className="mt-3 inline-flex text-sm font-semibold text-jade">
              Open full map →
            </Link>
          </Card>
        </section>

        <section id="stay">
          <h2 className="font-display text-2xl">Where to stay</h2>
          <div className="mt-3 space-y-3">
            {stays.length === 0 ? (
              <Card>
                <p className="text-sm leading-relaxed text-stone">
                  No walking-radius Jewish neighborhood is published. If you stay here over Shabbat, you are
                  self-contained: food packed, no assumed minyan.
                </p>
              </Card>
            ) : (
              stays.map((item) => (
                <Card key={item.id}>
                  <h3 className="font-display text-xl">{item.name}</h3>
                  <p className="mt-2 text-sm text-stone">{item.walkToCommunity}</p>
                  <p className="mt-2 text-sm text-stone">{item.familyFit}</p>
                  <p className="mt-2 text-sm text-stone">{item.kitchenNotes}</p>
                  <ul className="mt-3 list-disc space-y-1 pl-4 text-sm text-stone">
                    {item.shabbatQuestions.map((q) => (
                      <li key={q}>{q}</li>
                    ))}
                  </ul>
                  <p className="mt-3 text-xs text-muted">{item.notes}</p>
                </Card>
              ))
            )}
          </div>
        </section>

        <section id="attractions">
          <h2 className="font-display text-2xl">Attractions</h2>
          <div className="mt-3 space-y-3">
            {attractions.map((item) => (
              <Card key={item.id}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                  {item.category}
                  {item.religiousSite ? " · religious site" : ""}
                </p>
                <h3 className="mt-1 font-display text-xl">{item.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone">{item.description}</p>
                <p className="mt-2 text-sm text-muted">
                  {item.duration} · Ages {item.ages} · Stroller: {item.stroller}
                </p>
                <p className="mt-2 text-sm text-stone">{item.shabbatNote}</p>
              </Card>
            ))}
          </div>
        </section>

        <section id="friday">
          <h2 className="font-display text-2xl">Friday planning</h2>
          <Card className="mt-3">
            <p className="text-sm leading-relaxed text-stone">{dest.shabbatBase.fridayAdvice}</p>
            <p className="mt-2 text-sm leading-relaxed text-stone">{dest.gettingThere}</p>
            <p className="mt-2 text-sm leading-relaxed text-stone">{dest.gettingAround}</p>
            <Link href="/plan#friday" className="mt-3 inline-flex text-sm font-semibold text-jade">
              Airport arrival calculator →
            </Link>
          </Card>
        </section>

        <section id="family">
          <h2 className="font-display text-2xl">Family</h2>
          <Card className="mt-3">
            <p className="text-sm leading-relaxed text-stone">{dest.familyNotes}</p>
            <Link href="/family" className="mt-3 inline-flex text-sm font-semibold text-jade">
              Family guide →
            </Link>
          </Card>
        </section>

        {nearby.length ? (
          <section>
            <h2 className="font-display text-2xl">Nearby</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {nearby.map((item) => (
                <Link
                  key={item.slug}
                  href={`/${item.countrySlug}/${item.slug}`}
                  className="rounded-full bg-white px-3 py-2 text-sm font-semibold text-jade"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <Disclaimer />
      </div>
    </article>
  );
}
