import { Card, PageIntro, Trust } from "@/components/ui/bits";
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
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">Community</p>
            <h2 className="font-display text-xl">{item.name}</h2>
            <p className="mt-1 text-sm text-stone">{item.address}</p>
            <Trust item={item.verification} />
          </Card>
        ))}
        {data.venues.map((item) => (
          <Card key={item.id}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">Venue</p>
            <h2 className="font-display text-xl">{item.name}</h2>
            <Trust item={item.verification} />
          </Card>
        ))}
      </div>
    </main>
  );
}
