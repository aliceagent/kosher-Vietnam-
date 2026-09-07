import { extraPois } from "@/content/pois";
import { getAttractions, getCommunities, getDestination, getNeighborhoods, getVenues } from "@/lib/content";
import { walkingMinutes } from "@/lib/geo";
import type { GeoPoint, MapPin } from "@/lib/schema";

export type { MapPin };

export function pinsForCity(slug: string): MapPin[] {
  const dest = getDestination(slug);
  if (!dest) return [];
  const chabad = getCommunities(slug).find((item) => item.coords);
  const origin = chabad?.coords ?? dest.coords;
  const pins: MapPin[] = [];

  for (const item of getCommunities(slug)) {
    if (!item.coords) continue;
    pins.push({
      id: item.id,
      title: item.name,
      kind: "chabad",
      href: `/${dest.countrySlug}/${dest.slug}#community`,
      blurb: item.address,
      coords: item.coords,
      walkMins: walkingMinutes(origin, item.coords),
      shabbatOk: true,
      address: item.address,
      addressVi: item.addressVi,
    });
  }

  for (const item of getVenues(slug)) {
    const coords = item.coords ?? chabad?.coords;
    if (!coords) continue;
    pins.push({
      id: item.id,
      title: item.name,
      kind: "kosher",
      href: `/${dest.countrySlug}/${dest.slug}#kosher`,
      blurb: item.notes,
      coords,
      walkMins: walkingMinutes(origin, coords),
      shabbatOk: /reservation|shabbat/i.test(item.shabbatStatus),
      address: item.address,
    });
  }

  for (const item of getAttractions(slug)) {
    if (!item.coords) continue;
    const sameAsCity =
      Math.abs(item.coords.lat - dest.coords.lat) < 0.0001 && Math.abs(item.coords.lng - dest.coords.lng) < 0.0001;
    if (sameAsCity && item.flags.includes("skip-if-short") && !item.flags.includes("must-do")) continue;
    pins.push({
      id: item.id,
      title: item.name,
      kind: "attraction",
      href: `/vietnam/${dest.slug}/things-to-do#${item.id}`,
      blurb: item.whyGo,
      coords: item.coords,
      walkMins: walkingMinutes(origin, item.coords),
      shabbatOk: item.shabbat !== "not-shabbat",
      flags: item.flags,
      address: item.address,
      addressVi: item.addressVi,
    });
  }

  for (const item of extraPois) {
    if (near(origin, item.coords, 80)) {
      pins.push({ ...item, walkMins: walkingMinutes(origin, item.coords) });
    }
  }

  return pins;
}

function near(a: GeoPoint, b: GeoPoint, km: number) {
  const dlat = a.lat - b.lat;
  const dlng = a.lng - b.lng;
  return Math.sqrt(dlat * dlat + dlng * dlng) * 111 < km;
}

export function pinsNear(origin: GeoPoint, km: number, citySlug?: string): MapPin[] {
  const slugs = citySlug ? [citySlug] : ["hanoi", "ho-chi-minh-city", "hoi-an", "da-nang"];
  const all = slugs.flatMap((slug) => pinsForCity(slug));
  return all
    .map((pin) => ({ ...pin, walkMins: walkingMinutes(origin, pin.coords) }))
    .filter((pin) => (pin.walkMins ?? 999) <= (km / 4.5) * 60)
    .sort((a, b) => (a.walkMins ?? 0) - (b.walkMins ?? 0));
}

export function getNeighborhoodsForMap(slug: string) {
  return getNeighborhoods(slug);
}
