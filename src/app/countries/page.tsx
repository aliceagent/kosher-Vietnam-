import Link from "next/link";
import { Card, PageIntro } from "@/components/ui/bits";
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
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-lacquer">
                {item.status}
              </p>
              <h2 className="font-display text-2xl">{item.name}</h2>
              <p className="mt-2 text-sm text-stone">{item.summary}</p>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
