import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DestinationView } from "@/components/destination/destination-view";
import {
  getAttractions,
  getCommunities,
  getCountries,
  getDestination,
  getDestinations,
  getNearby,
  getStayAreas,
  getVenues,
} from "@/lib/content";

export function generateStaticParams() {
  return getCountries()
    .filter((item) => item.slug !== "vietnam")
    .flatMap((country) =>
      getDestinations(country.slug).map((dest) => ({ country: country.slug, slug: dest.slug })),
    );
}

export async function generateMetadata({
  params,
}: PageProps<"/[country]/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const dest = getDestination(slug);
  return { title: dest ? `${dest.name} preview` : "City" };
}

export default async function PreviewCityPage({ params }: PageProps<"/[country]/[slug]">) {
  const { country, slug } = await params;
  const dest = getDestination(slug);
  if (!dest || dest.countrySlug !== country || country === "vietnam") notFound();

  return (
    <DestinationView
      dest={dest}
      communities={getCommunities(dest.slug)}
      venues={getVenues(dest.slug)}
      stays={getStayAreas(dest.slug)}
      attractions={getAttractions(dest.slug)}
      nearby={getNearby(dest.slug) as typeof dest[]}
    />
  );
}
