import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DestinationView } from "@/components/destination/destination-view";
import {
  getAttractions,
  getCommunities,
  getDestination,
  getDestinations,
  getNearby,
  getStayAreas,
  getVenues,
} from "@/lib/content";

export function generateStaticParams() {
  return getDestinations().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/vietnam/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const dest = getDestination(slug);
  if (!dest) return {};
  return {
    title: `${dest.name} kosher & Shabbat guide`,
    description: dest.summary,
  };
}

export default async function DestinationPage({ params }: PageProps<"/vietnam/[slug]">) {
  const { slug } = await params;
  const dest = getDestination(slug);
  if (!dest) notFound();

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
