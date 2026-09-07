import type { Destination } from "@/lib/schema";

export function DestinationJsonLd({ dest }: { dest: Destination }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: `${dest.name} kosher and Shabbat travel`,
    description: dest.summary,
    url: `/${dest.countrySlug}/${dest.slug}`,
    geo: {
      "@type": "GeoCoordinates",
      latitude: dest.coords.lat,
      longitude: dest.coords.lng,
    },
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
