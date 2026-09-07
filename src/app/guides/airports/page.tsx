import Link from "next/link";
import { Card, PageIntro } from "@/components/ui/bits";
import { CardHeading } from "@/components/ui/icons";
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
              <CardHeading icon="plane" kicker={item.code} title={item.name} />
              <p className="mt-2 text-sm text-stone">{item.fridayNote}</p>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
