import Link from "next/link";
import { Actions, Card, PageIntro, Trust } from "@/components/ui/bits";
import { getDestination, getVenues } from "@/lib/content";

export const metadata = { title: "Kosher food in Vietnam" };

export default function KosherPage() {
  const venues = getVenues();
  return (
    <main className="pb-8">
      <PageIntro kicker="Eat" title="Kosher food, labeled honestly.">
        Community kitchens at Chabad — not a hidden restaurant scene. Vegetarian is not kosher.
      </PageIntro>
      <div className="mt-5 space-y-3 px-4">
        {venues.map((item) => {
          const dest = getDestination(item.destinationSlug);
          return (
            <Card key={item.id}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-lacquer">
                {item.kashrutClass.replace("-", " ")} · {dest?.name}
              </p>
              <h2 className="mt-1 font-display text-2xl">{item.name}</h2>
              <p className="mt-2 text-sm text-stone">{item.address}</p>
              <p className="mt-2 text-sm text-stone">{item.notes}</p>
              <Actions phone={item.phone} whatsapp={item.whatsapp} website={item.website} mapsQuery={item.mapsQuery} />
              <Trust item={item.verification} />
              <Link href={`/vietnam/${item.destinationSlug}#kosher`} className="mt-3 inline-flex text-sm font-semibold text-jade">
                City guide →
              </Link>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
