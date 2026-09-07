import { getAttractions, getCommunities, getDestination, getStayAreas, getVenues } from "@/lib/content";
import { walkingMinutes } from "@/lib/geo";
import type { GeoPoint } from "@/lib/schema";

export type MapPin = {
  id: string;
  title: string;
  kind: "chabad" | "kosher" | "stay" | "walk" | "city";
  href?: string;
  blurb: string;
  coords: GeoPoint;
  walkMins?: number;
  shabbatOk: boolean;
};

export function pinsForCity(slug: string): MapPin[] {
  const dest = getDestination(slug);
  if (!dest) return [];
  const chabad = getCommunities(slug).find((item) => item.coords);
  const origin = chabad?.coords ?? dest.coords;
  const pins: MapPin[] = [
    {
      id: `city-${dest.slug}`,
      title: dest.name,
      kind: "city",
      href: `/${dest.countrySlug}/${dest.slug}`,
      blurb: dest.summary,
      coords: dest.coords,
      shabbatOk: dest.shabbatBase.recommended,
    },
  ];

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
    });
  }

  for (const item of getVenues(slug)) {
    const coords = chabad?.coords ?? dest.coords;
    pins.push({
      id: item.id,
      title: item.name,
      kind: "kosher",
      href: `/${dest.countrySlug}/${dest.slug}#kosher`,
      blurb: item.notes,
      coords,
      walkMins: walkingMinutes(origin, coords),
      shabbatOk: item.shabbatStatus.toLowerCase().includes("reservation") || item.shabbatStatus.toLowerCase().includes("shabbat"),
    });
  }

  for (const item of getStayAreas(slug)) {
    pins.push({
      id: item.id,
      title: item.name,
      kind: "stay",
      href: `/${dest.countrySlug}/${dest.slug}#stay`,
      blurb: item.walkToCommunity ?? item.notes,
      coords: dest.coords,
      shabbatOk: Boolean(item.walkToCommunity),
    });
  }

  for (const item of getAttractions(slug)) {
    const walkable = !item.shabbatNote.toLowerCase().includes("ticket") && !item.shabbatNote.toLowerCase().includes("not a shabbat");
    pins.push({
      id: item.id,
      title: item.name,
      kind: "walk",
      href: `/${dest.countrySlug}/${dest.slug}#attractions`,
      blurb: item.shabbatNote,
      coords: dest.coords,
      shabbatOk: walkable,
    });
  }

  return pins;
}
