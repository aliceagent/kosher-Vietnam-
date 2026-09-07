import { fridayHelp, hospitalNotes, nationalNumbers } from "@/content/emergencies";
import {
  getAirportGuides,
  getApps,
  getAttractions,
  getChecklist,
  getCommunities,
  getDestination,
  getDestinations,
  getPhrases,
  getRoutesFrom,
  getStayAreas,
  getVenues,
} from "@/lib/content";
import { getUpcomingShabbat } from "@/lib/shabbat";

export function buildBundle(id: string) {
  const destSlugs =
    id === "vietnam" ? getDestinations().map((item) => item.slug) : id === "trip" ? ["hanoi", "hoi-an", "ho-chi-minh-city"] : [id];

  const dests = destSlugs.map((slug) => getDestination(slug)).filter(Boolean);
  const friday = new Date();
  const windows = ["hanoi", "hoi-an", "ho-chi-minh-city", "sapa"].map((slug) => {
    const times = getUpcomingShabbat(slug, friday);
    return {
      slug,
      friday: times.friday.toISOString(),
      hebrewDate: times.hebrewDate,
      parsha: times.parsha,
      candles: times.candles?.candlesLabel,
      havdalah: times.havdalah?.havdalahLabel,
    };
  });

  return {
    id,
    updatedAt: new Date().toISOString(),
    dests,
    attractions: destSlugs.flatMap((slug) => getAttractions(slug)),
    communities: destSlugs.flatMap((slug) => getCommunities(slug)),
    venues: destSlugs.flatMap((slug) => getVenues(slug)),
    stays: destSlugs.flatMap((slug) => getStayAreas(slug)),
    routes: destSlugs.flatMap((slug) => getRoutesFrom(slug)),
    phrases: getPhrases(),
    apps: getApps(),
    airports: getAirportGuides(),
    checklist: getChecklist(),
    emergency: { nationalNumbers, hospitalNotes, fridayHelp },
    shabbatWindows: windows,
  };
}
