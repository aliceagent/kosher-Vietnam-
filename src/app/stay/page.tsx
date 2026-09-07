import Link from "next/link";
import { Card, PageIntro } from "@/components/ui/bits";
import { getDestination, getStayAreas } from "@/lib/content";

export const metadata = { title: "Where to stay for Shabbat" };

export default function StayPage() {
  return (
    <main className="pb-8">
      <PageIntro kicker="Stay" title="Neighborhoods, not star ratings.">
        We list walking questions. We do not invent electronic-key or elevator facts for hotels we have not
        inspected.
      </PageIntro>
      <div className="mt-5 space-y-3 px-4">
        {getStayAreas().map((item) => (
          <Card key={item.id}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
              {getDestination(item.destinationSlug)?.name}
            </p>
            <h2 className="mt-1 font-display text-2xl">{item.name}</h2>
            <p className="mt-2 text-sm text-stone">{item.walkToCommunity}</p>
            <Link href={`/vietnam/${item.destinationSlug}#stay`} className="mt-3 inline-flex text-sm font-semibold text-jade">
              Full stay notes →
            </Link>
          </Card>
        ))}
      </div>
    </main>
  );
}
