import { ShabbatMap } from "@/components/map/shabbat-map";
import { PageIntro } from "@/components/ui/bits";
import { getDestination, shabbatCities } from "@/lib/content";
import { pinsForCity } from "@/lib/map-pins";

export const metadata = { title: "Shabbat walking map" };

export default async function MapPage({ searchParams }: PageProps<"/map">) {
  const params = await searchParams;
  const slug = typeof params.city === "string" ? params.city : "hanoi";
  const dest = getDestination(slug) ?? getDestination("hanoi");
  if (!dest) return null;
  const pins = pinsForCity(dest.slug);

  return (
    <main className="pb-8">
      <PageIntro kicker="Map" title={`Walking map · ${dest.name}`}>
        Shabbat mode hides ticketed and transport-heavy pins. Distances are walking minutes from Chabad.
      </PageIntro>
      <div className="mt-4 flex gap-2 overflow-x-auto px-4">
        {shabbatCities().map((city) => (
          <a
            key={city.slug}
            href={`/map?city=${city.slug}`}
            className={`shrink-0 rounded-full px-3 py-2 text-xs font-semibold ${
              city.slug === dest.slug ? "bg-jade text-mist" : "bg-white text-stone"
            }`}
          >
            {city.name}
          </a>
        ))}
      </div>
      <div className="mt-4 px-4">
        <ShabbatMap pins={pins} center={dest.coords} />
      </div>
    </main>
  );
}
