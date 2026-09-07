import Link from "next/link";
import { Card, PageIntro } from "@/components/ui/bits";
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
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-lacquer">
                {item.days} days
              </p>
              <h2 className="mt-1 font-display text-2xl">{item.title}</h2>
              <p className="mt-2 text-sm text-stone">{item.summary}</p>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
