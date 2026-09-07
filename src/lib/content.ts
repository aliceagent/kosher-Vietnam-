import { attractions } from "@/content/attractions";
import { communities } from "@/content/communities";
import { countries, previewDestinations } from "@/content/countries";
import { country, destinations } from "@/content/destinations";
import { guides } from "@/content/guides";
import { itineraries } from "@/content/itineraries";
import { stayAreas } from "@/content/stays";
import { venues } from "@/content/venues";

export function getCountries() {
  return countries;
}

export function getCountry(slug = "vietnam") {
  return countries.find((item) => item.slug === slug) ?? { ...country, status: "live" as const, image: "/destinations/halong.jpg" };
}

export function allDestinations() {
  return [...destinations, ...previewDestinations];
}

export function getDestinations(countrySlug?: string) {
  const list = allDestinations();
  return countrySlug ? list.filter((item) => item.countrySlug === countrySlug) : destinations;
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
  return destinations.filter((item) => country.shabbatCities.includes(item.slug));
}

export function catalog() {
  return {
    countries,
    destinations: allDestinations(),
    communities,
    venues,
    stayAreas,
    attractions,
    guides,
    itineraries,
  };
}
