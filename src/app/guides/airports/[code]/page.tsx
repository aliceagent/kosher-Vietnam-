import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, PageIntro } from "@/components/ui/bits";
import { CardHeading, iconForHeading } from "@/components/ui/icons";
import { getAirportGuide, getAirportGuides, getDestination } from "@/lib/content";

export function generateStaticParams() {
  return getAirportGuides().map((item) => ({ code: item.code.toLowerCase() }));
}

export async function generateMetadata({
  params,
}: PageProps<"/guides/airports/[code]">): Promise<Metadata> {
  const { code } = await params;
  const guide = getAirportGuide(code);
  return { title: guide ? `${guide.code} arrival` : "Airport" };
}

export default async function AirportPage({ params }: PageProps<"/guides/airports/[code]">) {
  const { code } = await params;
  const guide = getAirportGuide(code);
  if (!guide) notFound();
  const dest = getDestination(guide.destSlug);

  return (
    <main className="pb-8">
      <PageIntro kicker={guide.code} title={guide.name}>
        {guide.fridayNote}
      </PageIntro>
      <div className="mt-5 space-y-3 px-4">
        <Card>
          <CardHeading icon={iconForHeading("Immigration")} title="Immigration" titleClass="font-display text-xl leading-tight text-ink" />
          <p className="mt-2 text-sm leading-relaxed text-stone">{guide.immigration}</p>
        </Card>
        <Card>
          <CardHeading icon="luggage" title="Bags" titleClass="font-display text-xl leading-tight text-ink" />
          <p className="mt-2 text-sm leading-relaxed text-stone">{guide.baggage}</p>
        </Card>
        <Card>
          <CardHeading icon="signal" title="SIM / eSIM" titleClass="font-display text-xl leading-tight text-ink" />
          <p className="mt-2 text-sm leading-relaxed text-stone">{guide.sim}</p>
        </Card>
        <Card>
          <CardHeading icon="coins" title="ATM" titleClass="font-display text-xl leading-tight text-ink" />
          <p className="mt-2 text-sm leading-relaxed text-stone">{guide.atm}</p>
        </Card>
        <Card>
          <CardHeading icon="car" title="Grab" titleClass="font-display text-xl leading-tight text-ink" />
          <p className="mt-2 text-sm leading-relaxed text-stone">{guide.grab}</p>
          <p className="mt-2 text-sm leading-relaxed text-lacquer">{guide.taxiWarning}</p>
        </Card>
        <Card>
          <CardHeading icon="wifi" title="Wi-Fi" titleClass="font-display text-xl leading-tight text-ink" />
          <p className="mt-2 text-sm leading-relaxed text-stone">{guide.wifi}</p>
        </Card>
        <Card>
          <CardHeading icon="pin" title="To the city" titleClass="font-display text-xl leading-tight text-ink" />
          <ul className="mt-2 space-y-2 text-sm text-stone">
            {guide.toDistricts.map((row) => (
              <li key={row.area}>
                <span className="font-semibold text-ink">{row.area}</span> · {row.minutes} min · {row.cost}
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <CardHeading icon="moon" title="Night arrival" titleClass="font-display text-xl leading-tight text-ink" />
          <p className="mt-2 text-sm leading-relaxed text-stone">{guide.nightArrival}</p>
        </Card>
        {dest ? (
          <Link href={`/vietnam/${dest.slug}`} className="inline-flex text-sm font-semibold text-jade">
            Open {dest.name} dashboard →
          </Link>
        ) : null}
        <Link href="/plan#friday" className="block text-sm font-semibold text-jade">
          Friday arrival math →
        </Link>
      </div>
    </main>
  );
}
