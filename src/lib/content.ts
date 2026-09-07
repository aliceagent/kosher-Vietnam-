import { airportGuides } from "@/content/airports";
import { apps } from "@/content/apps";
import { attractions } from "@/content/attractions";
import { checklist } from "@/content/checklist";
import { communities } from "@/content/communities";
import { countries, previewDestinations } from "@/content/countries";
import { country, destinations } from "@/content/destinations";
import { guides } from "@/content/guides";
import { itineraries } from "@/content/itineraries";
import { neighborhoods } from "@/content/neighborhoods";
import { extraPois } from "@/content/pois";
import { phrases } from "@/content/phrases";
import { routes } from "@/content/routes";
import { stayAreas } from "@/content/stays";
import { withTravel } from "@/content/travel-profile";
import { venues } from "@/content/venues";
import type { AttractionFlag } from "@/lib/schema";

export function getCountries() {
  return countries;
}

export function getCountry(slug = "vietnam") {
  return countries.find((item) => item.slug === slug) ?? { ...country, status: "live" as const, image: "/destinations/halong.jpg" };
}

export function allDestinations() {
  return [...destinations, ...previewDestinations].map(withTravel);
}

export function getDestinations(countrySlug?: string) {
  const list = allDestinations();
  return countrySlug ? list.filter((item) => item.countrySlug === countrySlug) : destinations.map(withTravel);
}

export function getDestination(slug: string) {
  return allDestinations().find((item) => item.slug === slug);
}

export function getCommunities(slug?: string) {
  return slug ? communities.filter((item) => item.destinationSlug === slug) : communities;
}

export function getVenues(slug?: string) {
  return slug ? venues.filter((item) => item.destinationSlug === slug) : venues;
}

export function getStayAreas(slug?: string) {
  return slug ? stayAreas.filter((item) => item.destinationSlug === slug) : stayAreas;
}

export function getAttractions(slug?: string) {
  return slug ? attractions.filter((item) => item.destinationSlug === slug) : attractions;
}

export function getAttraction(id: string) {
  return attractions.find((item) => item.id === id);
}

export function getNeighborhoods(slug?: string) {
  return slug ? neighborhoods.filter((item) => item.destinationSlug === slug) : neighborhoods;
}

export function getNeighborhood(id: string) {
  return neighborhoods.find((item) => item.id === id);
}

export function getRoutes() {
  return routes;
}

export function getRoute(id: string) {
  return routes.find((item) => item.id === id);
}

export function getRoutesFrom(slug: string) {
  return routes.filter((item) => item.fromSlug === slug || item.toSlug === slug);
}

export function getRouteBetween(from: string, to: string) {
  return routes.find(
    (item) =>
      (item.fromSlug === from && item.toSlug === to) || (item.fromSlug === to && item.toSlug === from),
  );
}

export function getApps() {
  return apps;
}

export function getPhrases() {
  return phrases;
}

export function getAirportGuides() {
  return airportGuides;
}

export function getAirportGuide(code: string) {
  return airportGuides.find((item) => item.code.toLowerCase() === code.toLowerCase());
}

export function getChecklist() {
  return checklist;
}

export function getExtraPois() {
  return extraPois;
}

export function getGuides() {
  return guides;
}

export function getGuide(slug: string) {
  return guides.find((item) => item.slug === slug);
}

export function getItineraries() {
  return itineraries;
}

export function getItinerary(slug: string) {
  return itineraries.find((item) => item.slug === slug);
}

export function getNearby(slug: string) {
  const dest = getDestination(slug);
  if (!dest) return [];
  return dest.nearby.map((id) => getDestination(id)).filter(Boolean);
}

export function shabbatCities() {
  return getDestinations().filter((item) => country.shabbatCities.includes(item.slug));
}

export function attractionsByFlag(slug: string, flag: AttractionFlag) {
  return getAttractions(slug).filter((item) => item.flags.includes(flag));
}

export function catalog() {
  return {
    countries,
    destinations: allDestinations(),
    communities,
    venues,
    stayAreas,
    attractions,
    neighborhoods,
    routes,
    apps,
    phrases,
    airportGuides,
    guides,
    itineraries,
  };
}
