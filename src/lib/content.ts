import { attractions } from "@/content/attractions";
import { communities } from "@/content/communities";
import { country, destinations } from "@/content/destinations";
import { guides } from "@/content/guides";
import { itineraries } from "@/content/itineraries";
import { stayAreas } from "@/content/stays";
import { venues } from "@/content/venues";

export function getCountry() {
  return country;
}

export function getDestinations() {
  return destinations;
}

export function getDestination(slug: string) {
  return destinations.find((item) => item.slug === slug);
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
