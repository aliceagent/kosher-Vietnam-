import Link from "next/link";
import { Card, PageIntro } from "@/components/ui/bits";
import { phrases } from "@/content/phrases";
import { getGuides } from "@/lib/content";

export const metadata = { title: "Vietnam travel guides" };

export default function GuidesIndex() {
  return (
    <main className="pb-8">
      <PageIntro kicker="Basics" title="The ordinary travel layer.">
        Visas, money, SIMs, and phrases — plus the Jewish notes that sit on top.
      </PageIntro>
      <div className="mt-5 space-y-3 px-4">
        {getGuides().map((item) => (
          <Link key={item.slug} href={`/guides/${item.slug}`}>
            <Card>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-jade">{item.kicker}</p>
              <h2 className="mt-1 font-display text-2xl">{item.title}</h2>
              <p className="mt-2 text-sm text-stone">{item.summary}</p>
            </Card>
          </Link>
        ))}
        <Card>
          <h2 className="font-display text-2xl">Useful Vietnamese</h2>
          <p className="mt-2 text-xs font-medium text-stone">
            Food phrases cannot make a kitchen kosher. They only help you communicate a preference.
          </p>
          <ul className="mt-3 space-y-3">
            {phrases.map((item) => (
              <li key={item.en} className="border-t border-jade/10 pt-3 first:border-0 first:pt-0">
                <p className="font-semibold text-ink">{item.en}</p>
                <p className="text-sm text-stone">
                  {item.vi} · {item.say}
                </p>
                {item.caution ? <p className="text-xs text-lacquer">{item.caution}</p> : null}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </main>
  );
}
