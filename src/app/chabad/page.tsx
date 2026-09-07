import Link from "next/link";
import { Actions, Card, PageIntro, Trust } from "@/components/ui/bits";
import { CardHeading } from "@/components/ui/icons";
import { getCommunities, getDestination } from "@/lib/content";

export const metadata = { title: "Chabad in Vietnam" };

export default function ChabadPage() {
  return (
    <main className="pb-8">
      <PageIntro kicker="Community" title="Four published houses.">
        Hanoi, Saigon, Hội An, and a newer Sapa listing. Write before you fly. Addresses move.
      </PageIntro>
      <div className="mt-5 space-y-3 px-4">
        {getCommunities().map((item) => (
          <Card key={item.id}>
            <CardHeading
              icon="building"
              kicker={getDestination(item.destinationSlug)?.name}
              title={item.name}
            />
            <p className="mt-2 text-sm text-stone">{item.address}</p>
            <Actions phone={item.phone} whatsapp={item.whatsapp} website={item.website} mapsQuery={item.mapsQuery} />
            <Trust item={item.verification} />
            <Link href={`/vietnam/${item.destinationSlug}#community`} className="mt-3 inline-flex text-sm font-semibold text-jade">
              Destination Shabbat guide →
            </Link>
          </Card>
        ))}
      </div>
    </main>
  );
}
