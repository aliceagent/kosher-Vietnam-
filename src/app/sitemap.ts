import type { MetadataRoute } from "next";
import {
  allDestinations,
  getAirportGuides,
  getCountries,
  getDestinations,
  getGuides,
  getItineraries,
  getRoutes,
} from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://orah-vietnam.vercel.app";
  const staticRoutes = [
    "",
    "/vietnam",
    "/vietnam/things-to-do",
    "/vietnam/go",
    "/kosher",
    "/chabad",
    "/shabbat",
    "/plan",
    "/stay",
    "/map",
    "/today",
    "/phrases",
    "/family",
    "/guides",
    "/guides/before",
    "/guides/apps",
    "/guides/airports",
    "/itineraries",
    "/emergency",
    "/countries",
    "/search",
    "/saved",
  ];
  return [
    ...staticRoutes.map((path) => ({ url: `${base}${path}`, changeFrequency: "weekly" as const, priority: 0.7 })),
    ...allDestinations().map((item) => ({
      url: `${base}/${item.countrySlug}/${item.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...getDestinations().map((item) => ({
      url: `${base}/vietnam/${item.slug}/things-to-do`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...getRoutes().map((item) => ({
      url: `${base}/vietnam/go/${item.fromSlug}/${item.toSlug}`,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    ...getAirportGuides().map((item) => ({
      url: `${base}/guides/airports/${item.code.toLowerCase()}`,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    ...getGuides().map((item) => ({ url: `${base}/guides/${item.slug}`, changeFrequency: "monthly" as const, priority: 0.5 })),
    ...getItineraries().map((item) => ({ url: `${base}/itineraries/${item.slug}`, changeFrequency: "monthly" as const, priority: 0.5 })),
    ...getCountries()
      .filter((item) => item.slug !== "vietnam")
      .map((item) => ({ url: `${base}/${item.slug}`, changeFrequency: "monthly" as const, priority: 0.4 })),
  ];
}
