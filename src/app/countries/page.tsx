import Link from "next/link";
import { Card, PageIntro } from "@/components/ui/bits";
import { CardHeading } from "@/components/ui/icons";
import { getCountries } from "@/lib/content";

export const metadata = { title: "Countries" };

export default function CountriesPage() {
  return (
    <main className="pb-8">
      <PageIntro kicker="Worldwide" title="One schema. Many countries.">
        Vietnam is live. Thailand, Japan, and Italy prove `/country/city` works without a redesign.
      </PageIntro>
      <div className="mt-5 space-y-3 px-4">
        {getCountries().map((item) => (
          <Link key={item.slug} href={item.slug === "vietnam" ? "/vietnam" : `/${item.slug}`}>
            <Card>
              <CardHeading icon="globe" kicker={item.status} title={item.name} kickerClass="text-lacquer" />
              <p className="mt-2 text-sm text-stone">{item.summary}</p>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
