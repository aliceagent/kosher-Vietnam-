import { Card, PageIntro, Trust } from "@/components/ui/bits";
import { CardHeading } from "@/components/ui/icons";
import { catalog } from "@/lib/content";

export const metadata = { title: "Content records" };

export default function RecordsPage() {
  const data = catalog();
  return (
    <main className="pb-8">
      <PageIntro kicker="CMS" title="Published records.">
        Last-checked dates travel with every sensitive row.
      </PageIntro>
      <div className="mt-5 space-y-3 px-4">
        {data.communities.map((item) => (
          <Card key={item.id}>
            <CardHeading icon="building" kicker="Community" title={item.name} titleClass="font-display text-xl leading-tight text-ink" kickerClass="text-muted" />
            <p className="mt-1 text-sm text-stone">{item.address}</p>
            <Trust item={item.verification} />
          </Card>
        ))}
        {data.venues.map((item) => (
          <Card key={item.id}>
            <CardHeading icon="bowl" kicker="Venue" title={item.name} titleClass="font-display text-xl leading-tight text-ink" kickerClass="text-muted" />
            <Trust item={item.verification} />
          </Card>
        ))}
      </div>
    </main>
  );
}
