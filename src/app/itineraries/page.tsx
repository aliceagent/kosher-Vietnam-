import Link from "next/link";
import { Card, PageIntro } from "@/components/ui/bits";
import { CardHeading } from "@/components/ui/icons";
import { getItineraries } from "@/lib/content";

export const metadata = { title: "Shabbat-aware itineraries" };

export default function ItinerariesPage() {
  return (
    <main className="pb-8">
      <PageIntro kicker="Routes" title="Itineraries that already know Friday.">
        Monday–Thursday you move. Friday you arrive. Saturday you walk.
      </PageIntro>
      <div className="mt-5 space-y-3 px-4">
        {getItineraries().map((item) => (
          <Link key={item.slug} href={`/itineraries/${item.slug}`}>
            <Card>
              <CardHeading icon="calendar" kicker={`${item.days} days`} title={item.title} kickerClass="text-lacquer" />
              <p className="mt-2 text-sm text-stone">{item.summary}</p>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
