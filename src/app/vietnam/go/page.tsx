import Link from "next/link";
import { Card, PageIntro } from "@/components/ui/bits";
import { getDestination, getRoutes } from "@/lib/content";

export const metadata = { title: "Getting around Vietnam" };

export default function GoIndexPage() {
  const routes = getRoutes();
  return (
    <main className="pb-8">
      <PageIntro kicker="Transport" title="City to city.">
        Spine pairs with Friday warnings. This is not a live timetable.
      </PageIntro>
      <div className="mt-5 space-y-3 px-4">
        {routes.map((item) => {
          const from = getDestination(item.fromSlug);
          const to = getDestination(item.toSlug);
          return (
            <Link key={item.id} href={`/vietnam/go/${item.fromSlug}/${item.toSlug}`} className="block">
              <Card>
                <h2 className="font-display text-xl">
                  {from?.name ?? item.fromSlug} → {to?.name ?? item.toSlug}
                </h2>
                <p className="mt-1 text-sm text-stone">{item.recommendation.friday}</p>
              </Card>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
