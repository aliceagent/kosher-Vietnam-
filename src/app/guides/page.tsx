import Link from "next/link";
import { Card, PageIntro } from "@/components/ui/bits";
import { CardHeading, iconForGuideKicker } from "@/components/ui/icons";
import { getGuides } from "@/lib/content";

export const metadata = { title: "Vietnam travel guides" };

const extras = [
  { href: "/guides/before", kicker: "Prep", title: "Before you go", summary: "Checklist, packed food, Friday city." },
  { href: "/guides/apps", kicker: "Phone", title: "Apps", summary: "Grab, Maps, Translate, WhatsApp." },
  { href: "/guides/airports", kicker: "Arrival", title: "HAN / SGN / DAD", summary: "Immigration, Grab, Friday buffers." },
  { href: "/phrases", kicker: "Language", title: "Vietnamese phrases", summary: "Show-to-driver. Food phrases are not kashrut." },
];

export default function GuidesIndex() {
  return (
    <main className="pb-8">
      <PageIntro kicker="Basics" title="The ordinary travel layer.">
        Visas, money, SIMs, and phrases — plus the Jewish notes that sit on top.
      </PageIntro>
      <div className="mt-5 space-y-3 px-4">
        {extras.map((item) => (
          <Link key={item.href} href={item.href}>
            <Card>
              <CardHeading icon={iconForGuideKicker(item.kicker)} kicker={item.kicker} title={item.title} />
              <p className="mt-2 text-sm text-stone">{item.summary}</p>
            </Card>
          </Link>
        ))}
        {getGuides().map((item) => (
          <Link key={item.slug} href={`/guides/${item.slug}`}>
            <Card>
              <CardHeading icon={iconForGuideKicker(item.kicker)} kicker={item.kicker} title={item.title} />
              <p className="mt-2 text-sm text-stone">{item.summary}</p>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
