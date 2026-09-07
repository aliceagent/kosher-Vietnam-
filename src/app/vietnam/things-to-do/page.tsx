import Link from "next/link";
import { AttractionFilterList } from "@/components/things/attraction-filter-list";
import { PageIntro } from "@/components/ui/bits";
import { getAttractions, getDestinations } from "@/lib/content";
import type { AttractionFlag } from "@/lib/schema";

export const metadata = { title: "Things to do in Vietnam" };

export default async function ThingsToDoPage({ searchParams }: PageProps<"/vietnam/things-to-do">) {
  const params = await searchParams;
  const dest = typeof params.dest === "string" ? params.dest : "";
  const interest = typeof params.interest === "string" ? params.interest : "all";
  const dests = getDestinations();
  const items = dest ? getAttractions(dest) : getAttractions();
  const flag = (["all", ...items.flatMap((item) => item.flags)].includes(interest) ? interest : "all") as
    | AttractionFlag
    | "all";

  return (
    <main className="pb-8">
      <PageIntro kicker="Vietnam" title="Things to do.">
        Decision notes, not “beautiful views.” Religious sites stay labeled. Ticket prices go stale — confirm live.
      </PageIntro>
      <div className="mt-4 flex gap-2 overflow-x-auto px-4">
        <Link
          href="/vietnam/things-to-do"
          className={`shrink-0 rounded-full px-3 py-2 text-xs font-semibold ${
            dest === "" ? "bg-jade text-mist" : "bg-white text-stone"
          }`}
        >
          All
        </Link>
        {dests.map((item) => (
          <Link
            key={item.slug}
            href={`/vietnam/${item.slug}/things-to-do`}
            className={`shrink-0 rounded-full px-3 py-2 text-xs font-semibold ${
              dest === item.slug ? "bg-jade text-mist" : "bg-white text-stone"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div className="mt-4 px-4">
        <AttractionFilterList items={items} initialFlag={flag} />
      </div>
    </main>
  );
}
