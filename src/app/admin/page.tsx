import Link from "next/link";
import { Card, PageIntro } from "@/components/ui/bits";
import { CardHeading, IconMark, type IconName } from "@/components/ui/icons";
import { catalog } from "@/lib/content";

export const metadata = { title: "Admin / CMS" };

export default function AdminPage() {
  const data = catalog();
  const counts: { label: string; count: number; href: string; icon: IconName }[] = [
    { label: "Countries", count: data.countries.length, href: "/countries", icon: "globe" },
    { label: "Destinations", count: data.destinations.length, href: "/vietnam", icon: "pin" },
    { label: "Communities", count: data.communities.length, href: "/chabad", icon: "building" },
    { label: "Kosher venues", count: data.venues.length, href: "/kosher", icon: "bowl" },
    { label: "Stay areas", count: data.stayAreas.length, href: "/stay", icon: "bed" },
    { label: "Attractions", count: data.attractions.length, href: "/vietnam/things-to-do", icon: "star" },
    { label: "Neighborhoods", count: data.neighborhoods.length, href: "/stay", icon: "building" },
    { label: "Routes", count: data.routes.length, href: "/vietnam/go", icon: "route" },
    { label: "Apps", count: data.apps.length, href: "/guides/apps", icon: "phone" },
    { label: "Phrases", count: data.phrases.length, href: "/phrases", icon: "chat" },
    { label: "Guides", count: data.guides.length, href: "/guides", icon: "book" },
    { label: "Itineraries", count: data.itineraries.length, href: "/itineraries", icon: "calendar" },
  ];

  return (
    <main className="pb-8">
      <PageIntro kicker="CMS" title="Content console.">
        Records live in typed TypeScript files so a non-technical editor can be wired to Payload or Sanity
        later without changing the schema. Submissions wait in the moderation queue on this device.
      </PageIntro>
      <div className="mt-5 grid grid-cols-2 gap-3 px-4">
        {counts.map((item) => (
          <Link key={item.label} href={item.href}>
            <Card>
              <div className="flex items-center gap-3">
                <IconMark name={item.icon} size="sm" />
                <div>
                  <p className="text-2xl font-semibold text-jade">{item.count}</p>
                  <p className="text-sm text-stone">{item.label}</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
      <div className="mt-5 space-y-3 px-4">
        <Link href="/admin/queue" className="block">
          <Card>
            <CardHeading icon="checklist" title="Moderation queue" titleClass="font-display text-xl leading-tight text-ink" />
            <p className="mt-1 text-sm text-stone">Approve or reject traveler updates before they go public.</p>
          </Card>
        </Link>
        <Link href="/admin/records" className="block">
          <Card>
            <CardHeading icon="book" title="Browse records" titleClass="font-display text-xl leading-tight text-ink" />
            <p className="mt-1 text-sm text-stone">Every Chabad, venue, and destination with last-checked dates.</p>
          </Card>
        </Link>
      </div>
    </main>
  );
}
