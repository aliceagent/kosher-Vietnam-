import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Card, PageIntro } from "@/components/ui/bits";
import { getItineraries, getItinerary } from "@/lib/content";

export function generateStaticParams() {
  return getItineraries().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps<"/itineraries/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const trip = getItinerary(slug);
  return { title: trip?.title ?? "Itinerary" };
}

export default async function ItineraryPage({ params }: PageProps<"/itineraries/[slug]">) {
  const { slug } = await params;
  const trip = getItinerary(slug);
  if (!trip) notFound();

  return (
    <main className="pb-8">
      <PageIntro kicker={`${trip.days} days`} title={trip.title}>
        {trip.summary}
      </PageIntro>
      <div className="mt-5 space-y-3 px-4">
        {trip.daysPlan.map((day) => (
          <Card key={day.label + day.title} className={day.shabbat ? "border border-lantern/50" : ""}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-lacquer">
              {day.label}
              {day.shabbat ? " · Shabbat" : ""}
            </p>
            <h2 className="mt-1 font-display text-xl">{day.title}</h2>
            <p className="mt-2 text-sm text-stone">{day.body}</p>
          </Card>
        ))}
      </div>
    </main>
  );
}
