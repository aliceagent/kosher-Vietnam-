import Link from "next/link";
import { Card, PageIntro } from "@/components/ui/bits";
import { CardHeading } from "@/components/ui/icons";
import { getDestinations } from "@/lib/content";

export const metadata = { title: "Traveling with kids" };

const bands = [
  { id: "0-2", label: "0–2", note: "Carrier, hotel fridge, skip overnight buses and cave zip-lines." },
  { id: "3-5", label: "3–5", note: "Short boats, parks, beaches. Strollers lose in markets." },
  { id: "6-9", label: "6–9", note: "One nature day. Bà Nà is a full day, not a stack." },
  { id: "10-12", label: "10–12", note: "Museums and stairs. Talk before War Remnants." },
  { id: "teens", label: "Teens", note: "Viewpoints, longer hikes, night markets once." },
] as const;

export default function FamilyPage() {
  const dests = getDestinations().filter((item) => item.familyByAge);
  return (
    <main className="pb-8">
      <PageIntro kicker="Family" title="Vietnam with kids, by age.">
        City notes are specific. Kosher meals still come from a kitchen you trust, not a kids’ menu.
      </PageIntro>
      <div className="mt-5 space-y-3 px-4">
        {bands.map((band) => (
          <Card key={band.id}>
            <CardHeading icon="family" title={band.label} titleClass="font-display text-xl leading-tight text-ink" />
            <p className="mt-2 text-sm leading-relaxed text-stone">{band.note}</p>
            <ul className="mt-3 space-y-2">
              {dests.map((dest) =>
                dest.familyByAge?.[band.id] ? (
                  <li key={dest.slug} className="text-sm text-stone">
                    <Link href={`/vietnam/${dest.slug}#family`} className="font-semibold text-jade">
                      {dest.name}
                    </Link>
                    : {dest.familyByAge[band.id]}
                  </li>
                ) : null,
              )}
            </ul>
          </Card>
        ))}
        <Link href="/guides/family" className="inline-flex text-sm font-semibold text-jade">
          Longer family guide →
        </Link>
        <Link href="/today" className="ml-3 inline-flex text-sm font-semibold text-jade">
          What should we do today? →
        </Link>
      </div>
    </main>
  );
}
