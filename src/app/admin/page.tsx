import Link from "next/link";
import { Card, PageIntro } from "@/components/ui/bits";
import { catalog } from "@/lib/content";

export const metadata = { title: "Admin / CMS" };

export default function AdminPage() {
  const data = catalog();
  const counts = [
    ["Countries", data.countries.length, "/countries"],
    ["Destinations", data.destinations.length, "/vietnam"],
    ["Communities", data.communities.length, "/chabad"],
    ["Kosher venues", data.venues.length, "/kosher"],
    ["Stay areas", data.stayAreas.length, "/stay"],
    ["Attractions", data.attractions.length, "/vietnam/things-to-do"],
    ["Neighborhoods", data.neighborhoods.length, "/stay"],
    ["Routes", data.routes.length, "/vietnam/go"],
    ["Apps", data.apps.length, "/guides/apps"],
    ["Phrases", data.phrases.length, "/phrases"],
    ["Guides", data.guides.length, "/guides"],
    ["Itineraries", data.itineraries.length, "/itineraries"],
  ] as const;

  return (
    <main className="pb-8">
      <PageIntro kicker="CMS" title="Content console.">
        Records live in typed TypeScript files so a non-technical editor can be wired to Payload or Sanity
        later without changing the schema. Submissions wait in the moderation queue on this device.
      </PageIntro>
      <div className="mt-5 grid grid-cols-2 gap-3 px-4">
        {counts.map(([label, count, href]) => (
          <Link key={label} href={href}>
            <Card>
              <p className="text-2xl font-semibold text-jade">{count}</p>
              <p className="text-sm text-stone">{label}</p>
            </Card>
          </Link>
        ))}
      </div>
      <div className="mt-5 space-y-3 px-4">
        <Link href="/admin/queue" className="block">
          <Card>
            <h2 className="font-display text-xl">Moderation queue</h2>
            <p className="mt-1 text-sm text-stone">Approve or reject traveler updates before they go public.</p>
          </Card>
        </Link>
        <Link href="/admin/records" className="block">
          <Card>
            <h2 className="font-display text-xl">Browse records</h2>
            <p className="mt-1 text-sm text-stone">Every Chabad, venue, and destination with last-checked dates.</p>
          </Card>
        </Link>
      </div>
    </main>
  );
}
