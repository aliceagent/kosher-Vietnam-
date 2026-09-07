import Link from "next/link";
import { ShabbatMap } from "@/components/map/shabbat-map";
import { SaveButton } from "@/components/save/save-button";
import { AttractionCard } from "@/components/things/attraction-card";
import { Actions, Card, Disclaimer, Trust } from "@/components/ui/bits";
import { CardHeading } from "@/components/ui/icons";
import { getNeighborhoods, getRoute, getRoutesFrom } from "@/lib/content";
import { hasFlag, interestRails, topMustDos } from "@/lib/filters";
import { pinsForCity } from "@/lib/map-pins";
import type { Attraction, Community, Destination, StayArea, Venue } from "@/lib/schema";
import { getUpcomingShabbat } from "@/lib/shabbat";

const sections = [
  ["overview", "Overview"],
  ["see", "Do"],
  ["neighborhoods", "Stay areas"],
  ["community", "Chabad"],
  ["kosher", "Kosher"],
  ["shabbat", "Shabbat"],
  ["map", "Map"],
  ["go", "Go"],
  ["friday", "Friday"],
  ["family", "Family"],
];

const ageOrder = ["0-2", "3-5", "6-9", "10-12", "teens"] as const;

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
  const neighborhoods = getNeighborhoods(dest.slug);
  const first = attractions.filter((item) => hasFlag(item, "must-do")).slice(0, 3);
  const top = topMustDos(attractions, 5);
  const outbound = getRoutesFrom(dest.slug).slice(0, 8);
  const nights =
    dest.minNights != null && dest.maxNights != null
      ? `${dest.minNights}–${dest.maxNights} nights`
      : dest.howLong;
  const vietnam = dest.countrySlug === "vietnam";

  return (
    <article>
      <div className="relative h-56 bg-ink text-mist">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={dest.image} alt="" className="h-full w-full object-cover opacity-75" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-lantern-soft">
            {dest.region} · {dest.localName} · {nights}
          </p>
          <h1 className="font-display text-4xl leading-none">{dest.name}</h1>
          <div className="mt-3">
            <SaveButton
              item={{
                id: dest.slug,
                href: `/${dest.countrySlug}/${dest.slug}`,
                title: dest.name,
                kind: "destination",
                blurb: dest.summary,
                destinationSlug: dest.slug,
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
          <p className="text-[16px] font-medium leading-relaxed text-stone">{dest.summary}</p>
          {dest.bestFor && dest.bestFor.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {dest.bestFor.map((tag) => (
                <span key={tag} className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-jade">
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
          {vietnam ? (
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href={`/vietnam/${dest.slug}/things-to-do`}
                className="inline-flex min-h-10 items-center rounded-full bg-jade px-3 text-xs font-semibold text-mist"
              >
                Things to do
              </Link>
              <Link
                href={`/map?city=${dest.slug}`}
                className="inline-flex min-h-10 items-center rounded-full bg-white px-3 text-xs font-semibold text-ink ring-1 ring-jade/15"
              >
                Map
              </Link>
              <Link
                href="/plan"
                className="inline-flex min-h-10 items-center rounded-full bg-white px-3 text-xs font-semibold text-ink ring-1 ring-jade/15"
              >
                Plan days
              </Link>
              <Link
                href="/today"
                className="inline-flex min-h-10 items-center rounded-full bg-white px-3 text-xs font-semibold text-ink ring-1 ring-jade/15"
              >
                Today
              </Link>
            </div>
          ) : null}
          <div className="mt-4 grid gap-3">
            <Card>
              <CardHeading icon="star" title="Why visit" titleAs="p" titleClass="text-[11px] font-bold uppercase tracking-[0.22em] text-jade" />
              <p className="mt-2 text-sm leading-relaxed text-stone">{dest.whyVisit}</p>
              {dest.whoWillLove ? <p className="mt-2 text-sm leading-relaxed text-stone">{dest.whoWillLove}</p> : null}
              {dest.whoMightNot ? (
                <p className="mt-2 text-sm leading-relaxed text-stone">Skip if: {dest.whoMightNot}</p>
              ) : null}
            </Card>
            <Card>
              <CardHeading icon="clock" title="How long" titleAs="p" titleClass="text-[11px] font-bold uppercase tracking-[0.22em] text-jade" />
              <p className="mt-2 text-sm leading-relaxed text-stone">{dest.howLong}</p>
            </Card>
            <Card>
              <CardHeading icon="cloud" title="Weather" titleAs="p" titleClass="text-[11px] font-bold uppercase tracking-[0.22em] text-jade" />
              <p className="mt-2 text-sm leading-relaxed text-stone">
                Best: {dest.weather.bestMonths}. Rain: {dest.weather.rainy}. {dest.weather.notes}
              </p>
            </Card>
            {dest.dailyBudget ? (
              <Card>
                <CardHeading icon="coins" title="Spend (non-kosher street food not included)" titleAs="p" titleClass="text-[11px] font-bold uppercase tracking-[0.22em] text-jade" />
                <p className="mt-2 text-sm leading-relaxed text-stone">
                  {dest.dailyBudget.low}. {dest.dailyBudget.typical}. {dest.dailyBudget.note}
                </p>
              </Card>
            ) : null}
          </div>
        </section>

        {first.length > 0 ? (
          <section>
            <h2 className="font-display text-2xl">If it is your first time</h2>
            <p className="mt-1 text-sm text-stone">Do these before filling leftover hours.</p>
            <div className="mt-3 space-y-3">
              {first.map((item) => (
                <AttractionCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        ) : null}

        {top.length > 0 ? (
          <section id="see">
            <h2 className="font-display text-2xl">Top things to do</h2>
            <div className="mt-3 space-y-3">
              {top.map((item) => (
                <AttractionCard key={item.id} item={item} />
              ))}
            </div>
            {vietnam ? (
              <Link href={`/vietnam/${dest.slug}/things-to-do`} className="mt-3 inline-flex text-sm font-semibold text-jade">
                See all {attractions.length} things to do →
              </Link>
            ) : null}
          </section>
        ) : null}

        {interestRails.some((rail) => attractions.some(rail.match)) ? (
          <section>
            <h2 className="font-display text-2xl">By interest</h2>
            <div className="mt-3 space-y-4">
              {interestRails.map((rail) => {
                const items = attractions.filter(rail.match).slice(0, 3);
                if (items.length === 0) return null;
                return (
                  <div key={rail.id}>
                    <h3 className="text-sm font-semibold text-ink">{rail.label}</h3>
                    <div className="mt-2 space-y-2">
                      {items.map((item) => (
                        <AttractionCard key={item.id} item={item} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ) : null}

        {neighborhoods.length > 0 ? (
          <section id="neighborhoods">
            <h2 className="font-display text-2xl">Neighborhoods</h2>
            <p className="mt-1 text-sm text-stone">Pick a sleep area before you pick a hotel brand.</p>
            <div className="mt-3 space-y-3">
              {neighborhoods.map((item) => (
                <Card key={item.id}>
                  <CardHeading icon="building" title={item.name} titleAs="h3" titleClass="font-display text-xl leading-tight text-ink" />
                  {item.localName ? <p className="mt-1 text-sm text-stone">{item.localName}</p> : null}
                  <p className="mt-2 text-sm leading-relaxed text-stone">{item.whyStay}</p>
                  <p className="mt-2 text-sm text-stone">{item.atmosphere}</p>
                  <p className="mt-1 text-sm text-stone">{item.familyFit}</p>
                  <p className="mt-1 text-sm text-stone">{item.jewishRelevance}</p>
                  <p className="mt-1 text-sm text-stone">{item.transport}</p>
                  {item.shabbatWalk ? <p className="mt-1 text-sm text-stone">Shabbat walk: {item.shabbatWalk}</p> : null}
                  <p className="mt-1 text-xs font-medium text-stone">Nights: {item.nightlife}</p>
                </Card>
              ))}
            </div>
          </section>
        ) : null}

        <section id="community">
          <h2 className="font-display text-2xl">Jewish traveler notes</h2>
          {dest.jewishSummary ? <p className="mt-1 text-sm text-stone">{dest.jewishSummary}</p> : null}
          {communities.length === 0 ? (
            <Card className="mt-3">
              <CardHeading icon="building" title={`No published house in ${dest.name}`} titleClass="font-display text-xl leading-tight text-ink" />
              <p className="mt-2 text-sm leading-relaxed text-stone">
                No published Chabad or synagogue for {dest.name}. Treat this as a weekday city if you need
                minyan or kosher meals.
              </p>
            </Card>
          ) : (
            <div className="mt-3 space-y-3">
              {communities.map((item) => (
                <Card key={item.id}>
                  <CardHeading icon="building" title={item.name} titleAs="h3" titleClass="font-display text-xl leading-tight text-ink" />
                  <p className="mt-2 text-sm text-stone">{item.address}</p>
                  {item.addressVi ? <p className="text-xs font-medium text-stone">{item.addressVi}</p> : null}
                  {item.addressNote ? <p className="mt-1 text-sm font-medium text-stone">{item.addressNote}</p> : null}
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
                        destinationSlug: dest.slug,
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
              <CardHeading icon="bowl" title="No verified kitchen" titleClass="font-display text-xl leading-tight text-ink" />
              <p className="mt-2 text-sm leading-relaxed text-stone">
                No verified kosher kitchen here. Pack food. Vegetarian restaurants are not kosher.
              </p>
            </Card>
          ) : (
            <div className="mt-3 space-y-3">
              {venues.map((item) => (
                <Card key={item.id}>
                  <CardHeading
                    icon="bowl"
                    kicker={item.kashrutClass.replace("-", " ")}
                    title={item.name}
                    titleAs="h3"
                    titleClass="font-display text-xl leading-tight text-ink"
                    kickerClass="text-lacquer"
                    tone="lacquer"
                  />
                  <p className="mt-2 text-sm text-stone">{item.address}</p>
                  {item.hours ? <p className="mt-2 text-sm text-stone">{item.hours}</p> : null}
                  {item.fridayHours ? <p className="text-sm text-stone">Friday: {item.fridayHours}</p> : null}
                  <p className="mt-2 text-sm text-stone">{item.shabbatStatus}</p>
                  <p className="mt-2 text-sm leading-relaxed text-stone">{item.notes}</p>
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
            <CardHeading
              icon="flame"
              title={dest.shabbatBase.recommended ? "Recommended Shabbat base" : "Not a Shabbat base"}
              titleClass="text-sm font-semibold text-jade"
              titleAs="p"
              tone="lantern"
            />
            <p className="mt-2 text-sm leading-relaxed text-stone">{dest.shabbatBase.neighborhood}</p>
            <p className="mt-2 text-sm leading-relaxed text-stone">{dest.shabbatBase.walkingNotes}</p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="font-semibold text-stone">Candles (next Fri)</p>
                <p className="text-2xl font-bold text-ink">{times.candles?.candlesLabel}</p>
              </div>
              <div>
                <p className="font-semibold text-stone">Havdalah (tzeit)</p>
                <p className="text-2xl font-bold text-ink">{times.havdalah?.havdalahLabel}</p>
              </div>
            </div>
            <p className="mt-3 text-xs font-medium text-stone">
              18 minutes before sunset. Confirm with your rav and the local community. {times.parsha}.
            </p>
            <p className="mt-3 text-sm text-stone">Eruv: {dest.eruv.notes}</p>
            <Trust item={dest.eruv.verification} />
            <Link href="/shabbat" className="mt-3 inline-flex text-sm font-semibold text-jade">
              Calculation preferences →
            </Link>
          </Card>
        </section>

        <section id="map">
          <h2 className="font-display text-2xl">Map</h2>
          <Card className="mt-3">
            <CardHeading icon="map" title="Walking map" titleClass="font-display text-xl leading-tight text-ink" />
            <div className="mt-3">
              <ShabbatMap pins={pinsForCity(dest.slug)} center={dest.coords} />
            </div>
            <Link href={`/map?city=${dest.slug}`} className="mt-3 inline-flex text-sm font-semibold text-jade">
              Open full map and Near me →
            </Link>
          </Card>
        </section>

        <section id="stay">
          <h2 className="font-display text-2xl">Where to stay</h2>
          <div className="mt-3 space-y-3">
            {stays.length === 0 ? (
              <Card>
                <CardHeading icon="bed" title="Self-contained stay" titleClass="font-display text-xl leading-tight text-ink" />
                <p className="mt-2 text-sm leading-relaxed text-stone">
                  No walking-radius Jewish neighborhood is published. If you stay here over Shabbat, you are
                  self-contained: food packed, no assumed minyan.
                </p>
              </Card>
            ) : (
              stays.map((item) => (
                <Card key={item.id}>
                  <CardHeading icon="bed" title={item.name} titleAs="h3" titleClass="font-display text-xl leading-tight text-ink" />
                  <p className="mt-2 text-sm text-stone">{item.walkToCommunity}</p>
                  <p className="mt-2 text-sm text-stone">{item.familyFit}</p>
                  <p className="mt-2 text-sm text-stone">{item.kitchenNotes}</p>
                  <ul className="mt-3 list-disc space-y-1 pl-4 text-sm text-stone">
                    {item.shabbatQuestions.map((q) => (
                      <li key={q}>{q}</li>
                    ))}
                  </ul>
                  <p className="mt-3 text-xs font-medium text-stone">{item.notes}</p>
                </Card>
              ))
            )}
          </div>
        </section>

        {outbound.length > 0 ? (
          <section id="go">
            <h2 className="font-display text-2xl">Getting around</h2>
            <div className="mt-3 space-y-2">
              {outbound.map((route) => (
                <Link key={route.id} href={`/vietnam/go/${route.fromSlug}/${route.toSlug}`} className="block">
                  <Card>
                    <CardHeading
                      icon="route"
                      title={`${titleCase(route.fromSlug)} → ${titleCase(route.toSlug)}`}
                      titleAs="p"
                      titleClass="text-sm font-semibold text-ink"
                    />
                    <p className="mt-1 text-xs font-medium text-stone">
                      {route.options[0]?.name} · {route.recommendation.friday}
                    </p>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <section id="friday">
          <h2 className="font-display text-2xl">Friday planning</h2>
          <Card className="mt-3">
            <CardHeading icon="flame" title="Friday planning" titleClass="font-display text-xl leading-tight text-ink" tone="lantern" />
            <p className="mt-2 text-sm leading-relaxed text-stone">{dest.shabbatBase.fridayAdvice}</p>
            <p className="mt-2 text-sm leading-relaxed text-stone">{dest.gettingThere}</p>
            <p className="mt-2 text-sm leading-relaxed text-stone">{dest.gettingAround}</p>
            <Link href="/plan#friday" className="mt-3 inline-flex text-sm font-semibold text-jade">
              Airport arrival calculator →
            </Link>
          </Card>
        </section>

        <section id="family">
          <h2 className="font-display text-2xl">With kids</h2>
          <Card className="mt-3">
            <CardHeading icon="family" title="With kids" titleClass="font-display text-xl leading-tight text-ink" />
            <p className="mt-2 text-sm leading-relaxed text-stone">{dest.familyNotes}</p>
            {dest.familyByAge
              ? ageOrder.map((band) =>
                  dest.familyByAge?.[band] ? (
                    <p key={band} className="mt-2 text-sm leading-relaxed text-stone">
                      <span className="font-semibold text-ink">{band}: </span>
                      {dest.familyByAge[band]}
                    </p>
                  ) : null,
                )
              : null}
            <Link href="/family" className="mt-3 inline-flex text-sm font-semibold text-jade">
              Family by age →
            </Link>
          </Card>
        </section>

        {nearby.length || dest.continueTrip?.length ? (
          <section>
            <h2 className="font-display text-2xl">Continue the trip</h2>
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
              {dest.continueTrip?.map((id) => {
                const route = getRoute(id);
                if (!route) return null;
                return (
                  <Link
                    key={id}
                    href={`/vietnam/go/${route.fromSlug}/${route.toSlug}`}
                    className="rounded-full bg-white px-3 py-2 text-sm font-semibold text-jade"
                  >
                    {titleCase(route.fromSlug)} → {titleCase(route.toSlug)}
                  </Link>
                );
              })}
            </div>
          </section>
        ) : null}

        <Disclaimer />
      </div>
    </article>
  );
}

function titleCase(slug: string) {
  return slug
    .split("-")
    .map((word) => word[0]?.toUpperCase() + word.slice(1))
    .join(" ");
}
