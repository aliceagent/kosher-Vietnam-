import { MapExplorer } from "@/components/map/map-explorer";
import { PageIntro } from "@/components/ui/bits";
import { getDestination, getDestinations } from "@/lib/content";
import { pinsForCity } from "@/lib/map-pins";

export const metadata = { title: "Map and Near me" };

export default async function MapPage({ searchParams }: PageProps<"/map">) {
  const params = await searchParams;
  const slug = typeof params.city === "string" ? params.city : "hanoi";
  const dest = getDestination(slug) ?? getDestination("hanoi");
  if (!dest) return null;
  const pins = pinsForCity(dest.slug);
  const cities = getDestinations().map((item) => ({ slug: item.slug, name: item.name }));

  return (
    <main className="pb-8">
      <PageIntro kicker="Map" title={`Map · ${dest.name}`}>
        Explore, Shabbat walking, kids, saved, and Near me. Pins need real coordinates — we do not drop fake
        markers on the city centroid.
      </PageIntro>
      <div className="mt-4">
        <MapExplorer
          citySlug={dest.slug}
          cityName={dest.name}
          center={dest.coords}
          pins={pins}
          cities={cities}
        />
      </div>
    </main>
  );
}
