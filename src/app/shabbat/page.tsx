import { Card, Disclaimer, PageIntro } from "@/components/ui/bits";
import { CardHeading } from "@/components/ui/icons";
import { shabbatCities } from "@/lib/content";
import { formatLongDate } from "@/lib/format";
import { getUpcomingShabbat } from "@/lib/shabbat";

export const metadata = { title: "Shabbat times in Vietnam" };

export default function ShabbatPage() {
  const cities = shabbatCities();
  const first = getUpcomingShabbat(cities[0]?.slug ?? "hanoi");

  return (
    <main className="pb-8">
      <PageIntro kicker="Shabbat" title="Times for the next Friday.">
        {formatLongDate(first.friday)} · {first.parsha}. Candles are 18 minutes before sunset. Tzeit shown as
        ~7.1° — ask your rav if you use 8.5° or 42 minutes.
      </PageIntro>
      <div className="mt-5 space-y-3 px-4">
        {cities.map((city) => {
          const times = getUpcomingShabbat(city.slug);
          return (
            <Card key={city.slug}>
              <CardHeading icon="flame" title={city.name} tone="lantern" />
              <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="font-semibold text-stone">Candles</p>
                  <p className="text-2xl font-bold text-ink">{times.candles?.candlesLabel}</p>
                </div>
                <div>
                  <p className="font-semibold text-stone">Sunset</p>
                  <p className="text-2xl font-bold text-ink">{times.candles?.sunsetLabel}</p>
                </div>
                <div>
                  <p className="font-semibold text-stone">Havdalah / tzeit</p>
                  <p className="text-2xl font-bold text-ink">{times.havdalah?.havdalahLabel}</p>
                </div>
                <div>
                  <p className="font-semibold text-stone">Hebrew date (Fri)</p>
                  <p className="text-sm font-bold text-ink">{times.hebrewDate}</p>
                </div>
              </div>
            </Card>
          );
        })}
        <Disclaimer />
      </div>
    </main>
  );
}
