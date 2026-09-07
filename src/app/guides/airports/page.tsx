import Link from "next/link";
import { Card, PageIntro } from "@/components/ui/bits";
import { getAirportGuides } from "@/lib/content";

export const metadata = { title: "Airport arrivals" };

export default function AirportsIndex() {
  return (
    <main className="pb-8">
      <PageIntro kicker="Arrival" title="HAN, SGN, DAD.">
        Immigration, Grab, and Friday buffers. Not a live flight board.
      </PageIntro>
      <div className="mt-5 space-y-3 px-4">
        {getAirportGuides().map((item) => (
          <Link key={item.code} href={`/guides/airports/${item.code.toLowerCase()}`}>
            <Card>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-jade">{item.code}</p>
              <h2 className="mt-1 font-display text-2xl">{item.name}</h2>
              <p className="mt-2 text-sm text-stone">{item.fridayNote}</p>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
